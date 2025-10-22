package com.conectainclusao.backend.service;

import com.conectainclusao.backend.dto.SearchResultDTO;
import com.conectainclusao.backend.model.Opportunity;
import com.conectainclusao.backend.model.HealthResource;
import com.conectainclusao.backend.repository.OpportunityRepository;
import com.conectainclusao.backend.repository.HealthResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class SearchService {

    @Autowired
    private OpportunityRepository opportunityRepository;

    @Autowired
    private HealthResourceRepository healthResourceRepository;

    public List<SearchResultDTO> searchAll(String query) {
        // Busca nas duas entidades
        List<Opportunity> opportunities = opportunityRepository.findByTituloContainingIgnoreCaseOrDescricaoContainingIgnoreCase(query, query);
        List<HealthResource> healthResources = healthResourceRepository.findByNomeContainingIgnoreCaseOrEspecialidadeContainingIgnoreCase(query, query);

        // Mapeia os resultados para o DTO padronizado
        Stream<SearchResultDTO> opportunityResults = opportunities.stream()
                .map(opp -> new SearchResultDTO(opp.getId(), "opportunity", opp.getTitulo(), opp.getDescricao()));

        Stream<SearchResultDTO> healthResourceResults = healthResources.stream()
                .map(hr -> new SearchResultDTO(hr.getId(), "health_resource", hr.getNome(), hr.getEspecialidade())); // Use um campo relevante para descrição

        // Combina os resultados das duas buscas em uma única lista
        List<SearchResultDTO> combinedResults = Stream.concat(opportunityResults, healthResourceResults)
                .collect(Collectors.toList());

        return combinedResults;
    }
}