package com.conectainclusao.backend.controller;

import com.conectainclusao.backend.dto.OpportunityRequestDTO;
import com.conectainclusao.backend.dto.OpportunityResponseDTO;
import com.conectainclusao.backend.model.Opportunity;
import com.conectainclusao.backend.repository.OpportunityRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize; 
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/opportunities")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class OpportunityController {

    @Autowired
    private OpportunityRepository opportunityRepository;

    // ENDPOINT PARA CRIAR NOVA OPORTUNIDADE (POST /api/opportunities)    
    @PostMapping
    @PreAuthorize("hasAnyRole('EMPRESA', 'ADMIN')")
    public ResponseEntity<OpportunityResponseDTO> createOpportunity(@RequestBody @Valid OpportunityRequestDTO opportunityRequestDTO) {
        Opportunity opportunity = new Opportunity();
        BeanUtils.copyProperties(opportunityRequestDTO, opportunity);

        Opportunity savedOpportunity = opportunityRepository.save(opportunity);

        OpportunityResponseDTO opportunityResponseDTO = new OpportunityResponseDTO();
        BeanUtils.copyProperties(savedOpportunity, opportunityResponseDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(opportunityResponseDTO);
    }

    // ENDPOINT PARA LISTAR TODAS AS OPORTUNIDADES (GET /api/opportunities)   
    @GetMapping
    @PreAuthorize("hasAnyRole('EMPRESA', 'ADMIN')") 
    public ResponseEntity<List<OpportunityResponseDTO>> getAllOpportunities() {
        List<Opportunity> opportunities = opportunityRepository.findAll();
        List<OpportunityResponseDTO> opportunitiesDTO = opportunities.stream()
                .map(opportunity -> {
                    OpportunityResponseDTO dto = new OpportunityResponseDTO();
                    BeanUtils.copyProperties(opportunity, dto);
                    return dto;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(opportunitiesDTO);
    }

    // ENDPOINT PARA BUSCAR OPORTUNIDADE POR ID (GET /api/opportunities/{id})    
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('EMPRESA', 'ADMIN')") 
    public ResponseEntity<OpportunityResponseDTO> getOpportunityById(@PathVariable Long id) {
        Optional<Opportunity> opportunityOptional = opportunityRepository.findById(id);
        if (opportunityOptional.isPresent()) {
            OpportunityResponseDTO opportunityResponseDTO = new OpportunityResponseDTO();
            BeanUtils.copyProperties(opportunityOptional.get(), opportunityResponseDTO);
            return ResponseEntity.ok(opportunityResponseDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ENDPOINT PARA ATUALIZAR OPORTUNIDADE (PUT /api/opportunities/{id})
    // Apenas usuários autenticados podem atualizar oportunidades
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('EMPRESA', 'ADMIN')")
    public ResponseEntity<OpportunityResponseDTO> updateOpportunity(@PathVariable Long id, @RequestBody @Valid OpportunityRequestDTO opportunityRequestDTO) {
    	System.out.println("DEBUG: OpportunityController.updateOpportunity - Tentativa de atualização para ID: " + id);
    	Optional<Opportunity> opportunityOptional = opportunityRepository.findById(id);
        if (opportunityOptional.isPresent()) {
            Opportunity existingOpportunity = opportunityOptional.get();
            BeanUtils.copyProperties(opportunityRequestDTO, existingOpportunity, "id");

            Opportunity updatedOpportunity = opportunityRepository.save(existingOpportunity);

            OpportunityResponseDTO opportunityResponseDTO = new OpportunityResponseDTO();
            BeanUtils.copyProperties(updatedOpportunity, opportunityResponseDTO);
            return ResponseEntity.ok(opportunityResponseDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ENDPOINT PARA DELETAR OPORTUNIDADE (DELETE /api/opportunities/{id})
    // Apenas usuários autenticados podem deletar oportunidades
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('EMPRESA', 'ADMIN')")
    public ResponseEntity<Void> deleteOpportunity(@PathVariable Long id) {
        if (opportunityRepository.existsById(id)) {
            opportunityRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}