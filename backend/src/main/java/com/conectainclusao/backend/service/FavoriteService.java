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

import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.List;
import java.util.Map; // Para o DTO de favoritos

@Service
public class FavoriteService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OpportunityRepository opportunityRepository;

    @Autowired
    private HealthResourceRepository healthResourceRepository;

    // --- LÓGICA PARA OPORTUNIDADES ---

    @Transactional
    public void addOpportunityToFavorites(Long userId, Long opportunityId) {
        // Encontra o usuário e a oportunidade no banco
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
        Opportunity opportunity = opportunityRepository.findById(opportunityId)
                .orElseThrow(() -> new ResourceNotFoundException("Oportunidade não encontrada"));

        // Adiciona a oportunidade à lista de favoritos do usuário
        user.getFavoriteOpportunities().add(opportunity);
        userRepository.save(user); // Salva a mudança no usuário (o JPA cuida da tabela de join)
    }

    @Transactional
    public void removeOpportunityFromFavorites(Long userId, Long opportunityId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
        Opportunity opportunity = opportunityRepository.findById(opportunityId)
                .orElseThrow(() -> new ResourceNotFoundException("Oportunidade não encontrada"));

        // Remove a oportunidade da lista
        user.getFavoriteOpportunities().remove(opportunity);
        userRepository.save(user);
    }

    // --- LÓGICA PARA RECURSOS DE SAÚDE ---

    @Transactional
    public void addHealthResourceToFavorites(Long userId, Long healthResourceId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
        HealthResource resource = healthResourceRepository.findById(healthResourceId)
                .orElseThrow(() -> new ResourceNotFoundException("Recurso de saúde não encontrado"));

        // Adiciona o recurso à lista de favoritos
        user.getFavoriteHealthResources().add(resource);
        userRepository.save(user);
    }

    @Transactional
    public void removeHealthResourceFromFavorites(Long userId, Long healthResourceId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
        HealthResource resource = healthResourceRepository.findById(healthResourceId)
                .orElseThrow(() -> new ResourceNotFoundException("Recurso de saúde não encontrado"));

        // Remove o recurso da lista
        user.getFavoriteHealthResources().remove(resource);
        userRepository.save(user);
    }

    // --- LÓGICA PARA LISTAR "MEUS FAVORITOS" ---

    @Transactional(readOnly = true)
    public List<Map<String, Object>> getAllFavoritesByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        // Converte as oportunidades favoritas para o mesmo formato do 'Search'
        Stream<Map<String, Object>> favoriteOpportunities = user.getFavoriteOpportunities().stream()
                .map(opp -> Map.of(
                        "id", opp.getId(),
                        "type", "opportunity",
                        "titulo", opp.getTitulo(),
                        "descricao", opp.getDescricao(),
                        "localizacao", opp.getLocalizacao()
                ));

        // Converte os recursos de saúde favoritos para o mesmo formato do 'Search'
        Stream<Map<String, Object>> favoriteHealthResources = user.getFavoriteHealthResources().stream()
                .map(hr -> Map.of(
                        "id", hr.getId(),
                        "type", "health_resource",
                        "nome", hr.getNome(),
                        "endereco", hr.getEndereco(),
                        "especialidade", hr.getEspecialidade()
                ));

        // Junta as duas listas
        return Stream.concat(favoriteOpportunities, favoriteHealthResources)
                .collect(Collectors.toList());
    }
}