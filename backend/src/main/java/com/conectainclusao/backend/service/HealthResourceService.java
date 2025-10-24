package com.conectainclusao.backend.service;

import com.conectainclusao.backend.dto.HealthResourceRequestDTO;
import com.conectainclusao.backend.dto.HealthResourceResponseDTO;
import com.conectainclusao.backend.exception.ResourceNotFoundException;
import com.conectainclusao.backend.model.HealthResource;
import com.conectainclusao.backend.repository.HealthResourceRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HealthResourceService {

    private final HealthResourceRepository healthResourceRepository;

    @Autowired
    public HealthResourceService(HealthResourceRepository healthResourceRepository) {
        this.healthResourceRepository = healthResourceRepository;
    }

    // --- CRIAR ---
    @Transactional
    public HealthResourceResponseDTO createHealthResource(HealthResourceRequestDTO dto) {
        HealthResource healthResource = new HealthResource();
        BeanUtils.copyProperties(dto, healthResource);
        HealthResource savedResource = healthResourceRepository.save(healthResource);
        return mapEntityToResponseDTO(savedResource);
    }

    // --- LISTAR TODOS ---
    @Transactional(readOnly = true)
    public List<HealthResourceResponseDTO> getAllHealthResources() {
        return healthResourceRepository.findAll().stream()
                .map(this::mapEntityToResponseDTO)
                .collect(Collectors.toList());
    }

    // --- BUSCAR POR ID ---
    @Transactional(readOnly = true)
    public HealthResourceResponseDTO getHealthResourceById(Long id) {
        HealthResource resource = healthResourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recurso de Saúde não encontrado com ID: " + id));
        return mapEntityToResponseDTO(resource);
    }

    // --- ATUALIZAR ---
    @Transactional
    public HealthResourceResponseDTO updateHealthResource(Long id, HealthResourceRequestDTO dto) {
        HealthResource existingResource = healthResourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recurso de Saúde não encontrado com ID: " + id));

        BeanUtils.copyProperties(dto, existingResource, "id");
        HealthResource updatedResource = healthResourceRepository.save(existingResource);
        return mapEntityToResponseDTO(updatedResource);
    }

    // --- DELETAR ---
    @Transactional
    public void deleteHealthResource(Long id) {
        if (!healthResourceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Recurso de Saúde não encontrado com ID: " + id);
        }
        healthResourceRepository.deleteById(id);
    }

    // --- Mapeamento Auxiliar ---
    private HealthResourceResponseDTO mapEntityToResponseDTO(HealthResource resource) {
        HealthResourceResponseDTO dto = new HealthResourceResponseDTO();
        BeanUtils.copyProperties(resource, dto);
        return dto;
    }
}