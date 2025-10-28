package com.conectainclusao.backend.controller;

//FORÇANDO ATUALIZAÇÃO DO DEPLOY v5

import com.conectainclusao.backend.dto.OpportunityRequestDTO;
import com.conectainclusao.backend.dto.OpportunityResponseDTO;
import com.conectainclusao.backend.service.OpportunityService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize; 
import java.util.List;

@RestController
@RequestMapping("/api/opportunities")
public class OpportunityController {

    private final OpportunityService opportunityService; // Injetar o Serviço

    @Autowired // Injeção via construtor
    public OpportunityController(OpportunityService opportunityService) {
        this.opportunityService = opportunityService;
    }

    // --- CRIAR ---
    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_EMPRESA', 'ROLE_ADMIN')")
    public ResponseEntity<OpportunityResponseDTO> createOpportunity(@RequestBody @Valid OpportunityRequestDTO opportunityRequestDTO) {
        // Delega para o Serviço 
        OpportunityResponseDTO createdOpportunityDTO = opportunityService.createOpportunity(opportunityRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOpportunityDTO);
    }

    // --- LISTAR TODOS ---
    @GetMapping
    public ResponseEntity<List<OpportunityResponseDTO>> getAllOpportunities() {
        // Delega para o Serviço >>>
        List<OpportunityResponseDTO> opportunitiesDTO = opportunityService.getAllOpportunities();
        return ResponseEntity.ok(opportunitiesDTO);
    }

    // --- BUSCAR POR ID ---
    @GetMapping("/{id}")
    public ResponseEntity<OpportunityResponseDTO> getOpportunityById(@PathVariable Long id) {
        //  Delega para o Serviço (ele trata Not Found) 
        OpportunityResponseDTO opportunityDTO = opportunityService.getOpportunityById(id);
        return ResponseEntity.ok(opportunityDTO);
    }

    // --- ATUALIZAR ---
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_EMPRESA', 'ROLE_ADMIN')")
    public ResponseEntity<OpportunityResponseDTO> updateOpportunity(@PathVariable Long id, @RequestBody @Valid OpportunityRequestDTO opportunityRequestDTO) {
        // Delega para o Serviço (ele trata Not Found) 
        OpportunityResponseDTO updatedOpportunityDTO = opportunityService.updateOpportunity(id, opportunityRequestDTO);
        return ResponseEntity.ok(updatedOpportunityDTO);
    }

    // --- DELETAR ---
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_EMPRESA', 'ROLE_ADMIN')")
    public ResponseEntity<Void> deleteOpportunity(@PathVariable Long id) {
        //  Delega para o Serviço (ele trata Not Found) 
        opportunityService.deleteOpportunity(id);
        return ResponseEntity.noContent().build();
    }
}