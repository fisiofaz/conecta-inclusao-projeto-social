package com.conectainclusao.backend.controller;

import com.conectainclusao.backend.dto.HealthResourceRequestDTO;
import com.conectainclusao.backend.dto.HealthResourceResponseDTO;
import com.conectainclusao.backend.service.HealthResourceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

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

    // --- CRIAR ---
    @PostMapping
    @PreAuthorize("hasAnyRole('ORGAO_APOIO', 'ADMIN')")
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
    @PreAuthorize("hasAnyRole('ORGAO_APOIO', 'ADMIN')")
    public ResponseEntity<HealthResourceResponseDTO> updateHealthResource(@PathVariable Long id, @RequestBody @Valid HealthResourceRequestDTO healthResourceRequestDTO) {
        // O serviço agora lança ResourceNotFoundException
        HealthResourceResponseDTO updatedResourceDTO = healthResourceService.updateHealthResource(id, healthResourceRequestDTO);
        return ResponseEntity.ok(updatedResourceDTO);
    }

    // --- DELETAR ---
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ORGAO_APOIO', 'ADMIN')")
    public ResponseEntity<Void> deleteHealthResource(@PathVariable Long id) {
         // O serviço agora lança ResourceNotFoundException
        healthResourceService.deleteHealthResource(id);
        return ResponseEntity.noContent().build();
    }
}