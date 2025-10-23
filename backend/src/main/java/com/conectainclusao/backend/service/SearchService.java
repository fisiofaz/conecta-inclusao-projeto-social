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
import java.util.Comparator;

@Service
public class SearchService {

        @Autowired
        private OpportunityRepository opportunityRepository;

        @Autowired
        private HealthResourceRepository healthResourceRepository;

        public List<SearchResultDTO> searchAll(String query) {
        String lowerCaseQuery = query.toLowerCase();
        // Busca nas duas entidades
        List<Opportunity> opportunities = opportunityRepository
        .findByTituloContainingIgnoreCaseOrDescricaoContainingIgnoreCaseOrLocalizacaoContainingIgnoreCase(
                query, query, query);
        List<HealthResource> healthResources = healthResourceRepository
        .findByNomeContainingIgnoreCaseOrEspecialidadeContainingIgnoreCaseOrEnderecoContainingIgnoreCase(
                query, query, query);
        // Mapeia os resultados para o DTO padronizado
        Stream<SearchResultDTO> opportunityResults = opportunities.stream()
                .map(opp -> {
                        int score = 0;
                        if (opp.getTitulo() != null && opp.getTitulo().toLowerCase().contains(lowerCaseQuery)) score += 2;
                        if (opp.getDescricao() != null && opp.getDescricao().toLowerCase().contains(lowerCaseQuery)) score += 1;
                        if (opp.getLocalizacao() != null && opp.getLocalizacao().toLowerCase().contains(lowerCaseQuery)) score += 1;
                        return new SearchResultDTO(opp.getId(), "opportunity", opp.getTitulo(), opp.getDescricao(), score);
                });

        Stream<SearchResultDTO> healthResourceResults = healthResources.stream()
                .map(hr -> { // 'hr' não deve mais estar vermelho após importar Stream
                        int score = 0;
                        if (hr.getNome() != null && hr.getNome().toLowerCase().contains(lowerCaseQuery)) score += 2;
                        if (hr.getEspecialidade() != null && hr.getEspecialidade().toLowerCase().contains(lowerCaseQuery)) score += 1;
                        if (hr.getEndereco() != null && hr.getEndereco().toLowerCase().contains(lowerCaseQuery)) score += 1;
                    // Certifique-se que HealthResource tem getEspecialidade() ou use outro campo para description
                        return new SearchResultDTO(hr.getId(), "health_resource", hr.getNome(), hr.getEspecialidade(), score); 
                });
        // Combina os resultados das duas buscas em uma única lista
        List<SearchResultDTO> combinedResults = Stream.concat(opportunityResults, healthResourceResults)
                .collect(Collectors.toList());

        combinedResults.sort(Comparator.comparingInt(SearchResultDTO::getScore).reversed());       
        
        return combinedResults;
        }
}