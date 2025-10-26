package com.conectainclusao.backend.controller;

import com.conectainclusao.backend.dto.HealthResourceRequestDTO;
import com.conectainclusao.backend.dto.HealthResourceResponseDTO;
import com.conectainclusao.backend.service.HealthResourceService;
import org.slf4j.Logger;

import org.slf4j.LoggerFactory;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/health-resources")
public class HealthResourceController {

    private final HealthResourceService healthResourceService; // <<< Injetar Serviço

    // Remover injeção do Repository
    // @Autowired
    // private HealthResourceRepository healthResourceRepository;

    @Autowired // Injeção via construtor
    public HealthResourceController(HealthResourceService healthResourceService) {
        this.healthResourceService = healthResourceService;
    }

    private static final Logger logger = LoggerFactory.getLogger(HealthResourceController.class);
    // --- CRIAR ---
    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ORGAO_APOIO', 'ROLE_ADMIN')")
    public ResponseEntity<HealthResourceResponseDTO> createHealthResource(@RequestBody @Valid HealthResourceRequestDTO healthResourceRequestDTO) {
        HealthResourceResponseDTO createdResourceDTO = healthResourceService.createHealthResource(healthResourceRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdResourceDTO);
    }

    // --- LISTAR TODOS ---
    @GetMapping
    public ResponseEntity<List<HealthResourceResponseDTO>> getAllHealthResources() {
        List<HealthResourceResponseDTO> resourcesDTO = healthResourceService.getAllHealthResources();
        return ResponseEntity.ok(resourcesDTO);
    }

    // --- BUSCAR POR ID ---
    @GetMapping("/{id}")
    public ResponseEntity<HealthResourceResponseDTO> getHealthResourceById(@PathVariable Long id) {
        // O serviço agora lança ResourceNotFoundException, que o Spring trata (retorna 404)
        HealthResourceResponseDTO resourceDTO = healthResourceService.getHealthResourceById(id);
        return ResponseEntity.ok(resourceDTO);
    }

    // --- ATUALIZAR ---
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ORGAO_APOIO', 'ROLE_ADMIN')")
    public ResponseEntity<HealthResourceResponseDTO> updateHealthResource(@PathVariable Long id, @RequestBody @Valid HealthResourceRequestDTO healthResourceRequestDTO) {
        // O serviço agora lança ResourceNotFoundException
        HealthResourceResponseDTO updatedResourceDTO = healthResourceService.updateHealthResource(id, healthResourceRequestDTO);
        return ResponseEntity.ok(updatedResourceDTO);
    }

    // --- DELETAR ---
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ORGAO_APOIO', 'ROLE_ADMIN')")
    public ResponseEntity<Void> deleteHealthResource(@PathVariable Long id) {
         // O serviço agora lança ResourceNotFoundException
        healthResourceService.deleteHealthResource(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/version")
    @ResponseBody 
    public Map<String, String> getVersion() {
        Map<String, String> versionInfo = new HashMap<>();
        versionInfo.put("version", "v2.1-teste-deploy-options"); // Dê um nome único
        return versionInfo;
    }
}