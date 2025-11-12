package com.conectainclusao.backend.controller;

//FORÇANDO ATUALIZAÇÃO DO DEPLOY v5

import com.conectainclusao.backend.dto.OpportunityRequestDTO;
import com.conectainclusao.backend.dto.OpportunityResponseDTO;
import com.conectainclusao.backend.service.OpportunityService;
import com.conectainclusao.backend.model.User;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<OpportunityResponseDTO> createOpportunity(
    		@RequestBody @Valid OpportunityRequestDTO opportunityRequestDTO,
    		@AuthenticationPrincipal User authenticatedUser) {
        // Delega para o Serviço 
        OpportunityResponseDTO createdOpportunityDTO = opportunityService.createOpportunity(opportunityRequestDTO, authenticatedUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOpportunityDTO);
    }

    // --- LISTAR TODOS ---
    @GetMapping
    public ResponseEntity<List<OpportunityResponseDTO>> getAllOpportunities(
            //Adiciona os parâmetros da URL (não obrigatórios)
            @RequestParam(required = false) String tipo,
            @RequestParam(required = false) String localizacao
    ) {
        //Passa os filtros para o serviço
        List<OpportunityResponseDTO> opportunitiesDTO = opportunityService.getAllOpportunities(tipo, localizacao);
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
    
    @GetMapping("/v2-test") // <<<--- ROTA NOVA E ÚNICA
    @ResponseBody 
    public Map<String, String> getOpportunityVersion() {
        Map<String, String> versionInfo = new HashMap<>();
        versionInfo.put("controller_version", "v2-opp-controller-works");
        return versionInfo;
    }
}