package com.conectainclusao.backend.service;

import com.conectainclusao.backend.dto.OpportunityRequestDTO;
import com.conectainclusao.backend.dto.OpportunityResponseDTO;
import com.conectainclusao.backend.exception.ResourceNotFoundException;
import com.conectainclusao.backend.model.Opportunity;
import com.conectainclusao.backend.repository.OpportunityRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
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
    public OpportunityResponseDTO createOpportunity(OpportunityRequestDTO dto) {
        Opportunity opportunity = new Opportunity();
        BeanUtils.copyProperties(dto, opportunity);
        opportunity.setDataPublicacao(LocalDate.now()); 
        Opportunity savedOpportunity = opportunityRepository.save(opportunity);
        return mapEntityToResponseDTO(savedOpportunity);
    }

    // --- LISTAR TODAS AS OPORTUNIDADES ---
    @Transactional(readOnly = true)
    public List<OpportunityResponseDTO> getAllOpportunities() {
        return opportunityRepository.findAll().stream()
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
    public void deleteOpportunity(Long id) {
        if (!opportunityRepository.existsById(id)) {
            throw new ResourceNotFoundException("Oportunidade não encontrada com ID: " + id);
        }
        opportunityRepository.deleteById(id);
    }

    // --- Mapeamento Auxiliar ---
    private OpportunityResponseDTO mapEntityToResponseDTO(Opportunity opportunity) {
        OpportunityResponseDTO dto = new OpportunityResponseDTO();
        BeanUtils.copyProperties(opportunity, dto);
        return dto;
    }
}