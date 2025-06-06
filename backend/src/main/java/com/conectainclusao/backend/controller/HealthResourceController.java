package com.conectainclusao.backend.controller;

import com.conectainclusao.backend.dto.HealthResourceRequestDTO;
import com.conectainclusao.backend.dto.HealthResourceResponseDTO;
import com.conectainclusao.backend.model.HealthResource;
import com.conectainclusao.backend.repository.HealthResourceRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.cors.CorsConfiguration; 

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/health-resources") 

public class HealthResourceController {

    @Autowired
    private HealthResourceRepository healthResourceRepository;

    // ENDPOINT PARA CRIAR NOVO RECURSO DE SAÚDE (POST /api/health-resources)
    // Apenas usuários autenticados podem criar recursos
    @PostMapping
    public ResponseEntity<HealthResourceResponseDTO> createHealthResource(@RequestBody @Valid HealthResourceRequestDTO healthResourceRequestDTO) {
        HealthResource healthResource = new HealthResource();
        BeanUtils.copyProperties(healthResourceRequestDTO, healthResource);

        HealthResource savedHealthResource = healthResourceRepository.save(healthResource);

        HealthResourceResponseDTO healthResourceResponseDTO = new HealthResourceResponseDTO();
        BeanUtils.copyProperties(savedHealthResource, healthResourceResponseDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(healthResourceResponseDTO);
    }

    // ENDPOINT PARA LISTAR TODOS OS RECURSOS DE SAÚDE (GET /api/health-resources)
    // Acesso público para visualização
    @GetMapping
    public ResponseEntity<List<HealthResourceResponseDTO>> getAllHealthResources() {
        List<HealthResource> healthResources = healthResourceRepository.findAll();
        List<HealthResourceResponseDTO> resourcesDTO = healthResources.stream()
                .map(resource -> {
                    HealthResourceResponseDTO dto = new HealthResourceResponseDTO();
                    BeanUtils.copyProperties(resource, dto);
                    return dto;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(resourcesDTO);
    }

    // ENDPOINT PARA BUSCAR RECURSO DE SAÚDE POR ID (GET /api/health-resources/{id})
    // Acesso público
    @GetMapping("/{id}")
    public ResponseEntity<HealthResourceResponseDTO> getHealthResourceById(@PathVariable Long id) {
        Optional<HealthResource> healthResourceOptional = healthResourceRepository.findById(id);
        if (healthResourceOptional.isPresent()) {
            HealthResourceResponseDTO healthResourceResponseDTO = new HealthResourceResponseDTO();
            BeanUtils.copyProperties(healthResourceOptional.get(), healthResourceResponseDTO);
            return ResponseEntity.ok(healthResourceResponseDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ENDPOINT PARA ATUALIZAR RECURSO DE SAÚDE (PUT /api/health-resources/{id})
    // Apenas usuários autenticados podem atualizar
    @PutMapping("/{id}")
    public ResponseEntity<HealthResourceResponseDTO> updateHealthResource(@PathVariable Long id, @RequestBody @Valid HealthResourceRequestDTO healthResourceRequestDTO) {
        Optional<HealthResource> healthResourceOptional = healthResourceRepository.findById(id);
        if (healthResourceOptional.isPresent()) {
            HealthResource existingHealthResource = healthResourceOptional.get();
            BeanUtils.copyProperties(healthResourceRequestDTO, existingHealthResource, "id"); // Ignora o ID na cópia

            HealthResource updatedHealthResource = healthResourceRepository.save(existingHealthResource);

            HealthResourceResponseDTO healthResourceResponseDTO = new HealthResourceResponseDTO();
            BeanUtils.copyProperties(updatedHealthResource, healthResourceResponseDTO);
            return ResponseEntity.ok(healthResourceResponseDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ENDPOINT PARA DELETAR RECURSO DE SAÚDE (DELETE /api/health-resources/{id})
    // Apenas usuários autenticados podem deletar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHealthResource(@PathVariable Long id) {
        if (healthResourceRepository.existsById(id)) {
            healthResourceRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}