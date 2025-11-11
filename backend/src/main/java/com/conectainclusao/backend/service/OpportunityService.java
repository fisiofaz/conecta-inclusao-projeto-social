package com.conectainclusao.backend.service;

import com.conectainclusao.backend.model.User;

import com.conectainclusao.backend.dto.OpportunityRequestDTO;
import com.conectainclusao.backend.dto.OpportunityResponseDTO;
import com.conectainclusao.backend.exception.ResourceNotFoundException;
import com.conectainclusao.backend.model.Opportunity;
import com.conectainclusao.backend.repository.OpportunityRepository;
import com.conectainclusao.backend.repository.OpportunitySpecification;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OpportunityService {

    private final OpportunityRepository opportunityRepository;

    @Autowired
    public OpportunityService(OpportunityRepository opportunityRepository) {
        this.opportunityRepository = opportunityRepository;
    }

    // --- CRIAR OPORTUNIDADE ---
    @Transactional
    public OpportunityResponseDTO createOpportunity(OpportunityRequestDTO dto, User owner) {
        Opportunity opportunity = new Opportunity();
        BeanUtils.copyProperties(dto, opportunity);
        opportunity.setDataPublicacao(LocalDate.now()); 
        opportunity.setOwner(owner);
        Opportunity savedOpportunity = opportunityRepository.save(opportunity);
        return mapEntityToResponseDTO(savedOpportunity);
    }

    // --- LISTAR TODAS AS OPORTUNIDADES ---
    @Transactional(readOnly = true)
    public List<OpportunityResponseDTO> getAllOpportunities(String tipo, String localizacao) {
        
        // Cria a 'Specification' usando a nossa nova classe
        Specification<Opportunity> spec = OpportunitySpecification.getByFilters(tipo, localizacao);

        // Usa o novo método 'findAll(spec)' que ganhamos do JpaSpecificationExecutor
        return opportunityRepository.findAll(spec).stream()
                .map(this::mapEntityToResponseDTO)
                .collect(Collectors.toList());
    }

    // --- BUSCAR OPORTUNIDADE POR ID ---
    @Transactional(readOnly = true)
    public OpportunityResponseDTO getOpportunityById(Long id) {
        Opportunity opportunity = opportunityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Oportunidade não encontrada com ID: " + id));
        return mapEntityToResponseDTO(opportunity);
    }

    // --- ATUALIZAR OPORTUNIDADE ---
    @Transactional
    public OpportunityResponseDTO updateOpportunity(Long id, OpportunityRequestDTO dto) {
        Opportunity existingOpportunity = opportunityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Oportunidade não encontrada com ID: " + id));

        BeanUtils.copyProperties(dto, existingOpportunity, "id");
        Opportunity updatedOpportunity = opportunityRepository.save(existingOpportunity);
        return mapEntityToResponseDTO(updatedOpportunity);
    }

    // --- DELETAR OPORTUNIDADE ---
    @Transactional
    private OpportunityResponseDTO mapEntityToResponseDTO(Opportunity opportunity) {
    	OpportunityResponseDTO dto = new OpportunityResponseDTO();
    	BeanUtils.copyProperties(opportunity, dto);    	        
    		
    	if (opportunity.getOwner() != null) {
    		dto.setOwnerId(opportunity.getOwner().getId());
    	}
    	 	        
    	return dto;
   }
}