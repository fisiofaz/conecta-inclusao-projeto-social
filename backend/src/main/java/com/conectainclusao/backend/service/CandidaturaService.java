package com.conectainclusao.backend.service;

import com.conectainclusao.backend.dto.CandidaturaDTO; // (Vamos criar este DTO a seguir)
import com.conectainclusao.backend.model.Candidatura;
import com.conectainclusao.backend.model.Opportunity;
import com.conectainclusao.backend.model.PerfilUsuario;
import com.conectainclusao.backend.model.User;
import com.conectainclusao.backend.repository.CandidaturaRepository;
import com.conectainclusao.backend.repository.OpportunityRepository;
import com.conectainclusao.backend.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CandidaturaService {

    @Autowired
    private CandidaturaRepository candidaturaRepository;

    @Autowired
    private OpportunityRepository opportunityRepository;

    // --- LÓGICA PARA SE CANDIDATAR A UMA VAGA ---
    @Transactional
    public CandidaturaDTO applyToOpportunity(Long opportunityId, User user) {
        
        // 1. Verifica se a oportunidade existe
        Opportunity opportunity = opportunityRepository.findById(opportunityId)
                .orElseThrow(() -> new ResourceNotFoundException("Oportunidade não encontrada"));

        // 2. Verifica se o usuário já se candidatou a esta vaga
        candidaturaRepository.findByUserIdAndOpportunityId(user.getId(), opportunityId)
            .ifPresent(existingCandidatura -> {
                // Se já existe, lança um erro
                throw new IllegalStateException("Você já se candidatou a esta vaga.");
            });

        // 3. Cria a nova candidatura
        Candidatura novaCandidatura = new Candidatura(user, opportunity);        
        Candidatura savedCandidatura = candidaturaRepository.save(novaCandidatura);
        
        return mapEntityToDTO(savedCandidatura);
    }

    // --- LÓGICA PARA LISTAR "MINHAS CANDIDATURAS" (para o PCD) ---
    @Transactional(readOnly = true)
    public List<CandidaturaDTO> getMyApplications(User user) {
        return candidaturaRepository.findByUserId(user.getId()).stream()
                .map(this::mapEntityToDTO)
                .collect(Collectors.toList());
    }

    // --- LÓGICA PARA LISTAR CANDIDATOS DE UMA VAGA (para a Empresa) ---
    @Transactional(readOnly = true)
    public List<CandidaturaDTO> getApplicationsForOpportunity(Long opportunityId, User loggedInUser) {
        
    	// Busca a vaga
        Opportunity opportunity = opportunityRepository.findById(opportunityId)
                .orElseThrow(() -> new ResourceNotFoundException("Oportunidade não encontrada"));

        // VERIFICAÇÃO DE SEGURANÇA (O "DONO")
        // Se o usuário logado NÃO for ADMIN...
        if (!loggedInUser.getTipoPerfil().equals(PerfilUsuario.ROLE_ADMIN)) {
            // E se o "dono" da vaga (que acabamos de adicionar) for nulo 
            // OU o ID do dono for DIFERENTE do ID do usuário logado...
            if (opportunity.getOwner() == null || !opportunity.getOwner().getId().equals(loggedInUser.getId())) {
                // Então, proíba o acesso.
                throw new AccessDeniedException("Você não tem permissão para ver os candidatos desta vaga.");
            }
        }
        
        // Se a segurança passar (é Admin ou é o Dono), retorne a lista
        return candidaturaRepository.findByOpportunityId(opportunityId).stream()
                .map(this::mapEntityToDTO)
                .collect(Collectors.toList());
    }
    
    // --- MÉTODO AUXILIAR PARA MAPEAR ---
    private CandidaturaDTO mapEntityToDTO(Candidatura candidatura) {
        CandidaturaDTO dto = new CandidaturaDTO();
        dto.setId(candidatura.getId());
        dto.setStatus(candidatura.getStatus().name());
        dto.setDataCandidatura(candidatura.getDataCandidatura());
        
        // Dados do Usuário (Candidato)
        if (candidatura.getUser() != null) {
            dto.setUserId(candidatura.getUser().getId());
            dto.setUserName(candidatura.getUser().getNome());
            dto.setUserEmail(candidatura.getUser().getEmail()); // (Importante para a empresa)
        }
        
        // Dados da Vaga
        if (candidatura.getOpportunity() != null) {
            dto.setOpportunityId(candidatura.getOpportunity().getId());
            dto.setOpportunityTitle(candidatura.getOpportunity().getTitulo());
            dto.setOpportunityCompany(candidatura.getOpportunity().getEmpresaOuOrgResponsavel());
        }
        
        return dto;
    }
}