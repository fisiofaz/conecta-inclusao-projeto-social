package com.conectainclusao.backend.service;

import com.conectainclusao.backend.model.HealthResource;
import com.conectainclusao.backend.model.Opportunity;
import com.conectainclusao.backend.model.User;
import com.conectainclusao.backend.repository.HealthResourceRepository;
import com.conectainclusao.backend.repository.OpportunityRepository;
import com.conectainclusao.backend.repository.UserRepository;
import com.conectainclusao.backend.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.List;
import java.util.Map;
import java.util.HashMap; // 👈 ADICIONE ESTE IMPORT

@Service
public class FavoriteService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OpportunityRepository opportunityRepository;

    @Autowired
    private HealthResourceRepository healthResourceRepository;

    // --- (Os métodos add/remove continuam os mesmos) ---

    @Transactional
    public void addOpportunityToFavorites(Long userId, Long opportunityId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
        Opportunity opportunity = opportunityRepository.findById(opportunityId)
                .orElseThrow(() -> new ResourceNotFoundException("Oportunidade não encontrada"));
        user.getFavoriteOpportunities().add(opportunity);
        userRepository.save(user);
    }

    @Transactional
    public void removeOpportunityFromFavorites(Long userId, Long opportunityId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
        Opportunity opportunity = opportunityRepository.findById(opportunityId)
                .orElseThrow(() -> new ResourceNotFoundException("Oportunidade não encontrada"));
        user.getFavoriteOpportunities().remove(opportunity);
        userRepository.save(user);
    }

    @Transactional
    public void addHealthResourceToFavorites(Long userId, Long healthResourceId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
        HealthResource resource = healthResourceRepository.findById(healthResourceId)
                .orElseThrow(() -> new ResourceNotFoundException("Recurso de saúde não encontrado"));
        user.getFavoriteHealthResources().add(resource);
        userRepository.save(user);
    }

    @Transactional
    public void removeHealthResourceFromFavorites(Long userId, Long healthResourceId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
        HealthResource resource = healthResourceRepository.findById(healthResourceId)
                .orElseThrow(() -> new ResourceNotFoundException("Recurso de saúde não encontrado"));
        user.getFavoriteHealthResources().remove(resource);
        userRepository.save(user);
    }

    // --- LÓGICA PARA LISTAR "MEUS FAVORITOS" (CORRIGIDA) ---

    @Transactional(readOnly = true)
    public List<Map<String, Object>> getAllFavoritesByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        // Converte as oportunidades favoritas (MODO SEGURO)
        Stream<Map<String, Object>> favoriteOpportunities = user.getFavoriteOpportunities().stream()
                .map(opp -> {
                    // Usamos HashMap para permitir valores nulos
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", opp.getId());
                    map.put("type", "opportunity");
                    map.put("titulo", opp.getTitulo());
                    map.put("descricao", opp.getDescricao());
                    map.put("localizacao", opp.getLocalizacao());
                    return map;
                });

        // Converte os recursos de saúde favoritos (MODO SEGURO)
        Stream<Map<String, Object>> favoriteHealthResources = user.getFavoriteHealthResources().stream()
                .map(hr -> {
                    // Usamos HashMap para permitir valores nulos
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", hr.getId());
                    map.put("type", "health"); // Usando 'health' (corrigido)
                    map.put("nome", hr.getNome());
                    map.put("endereco", hr.getEndereco());
                    map.put("especialidade", hr.getEspecialidade()); // Esta linha pode ser nula
                    return map;
                });

        // Junta as duas listas
        return Stream.concat(favoriteOpportunities, favoriteHealthResources)
                .collect(Collectors.toList());
    }
}