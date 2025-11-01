package com.conectainclusao.backend.service;

import com.conectainclusao.backend.dto.SearchResultDTO;
import com.conectainclusao.backend.model.ComplaintReport; 
import com.conectainclusao.backend.model.Opportunity;
import com.conectainclusao.backend.model.HealthResource;
import com.conectainclusao.backend.repository.ComplaintReportRepository; 
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

    @Autowired
    private ComplaintReportRepository complaintReportRepository; // 👈 ADICIONADO

    public List<SearchResultDTO> searchAll(String query) {
        String lowerCaseQuery = query.toLowerCase();

        // 1. Busca Oportunidades
        Stream<SearchResultDTO> opportunityResults = opportunityRepository
            .findByTituloContainingIgnoreCaseOrDescricaoContainingIgnoreCaseOrLocalizacaoContainingIgnoreCase(query, query, query)
            .stream()
            .map(opp -> {
                int score = 0;
                if (opp.getTitulo() != null && opp.getTitulo().toLowerCase().contains(lowerCaseQuery)) score += 2;
                if (opp.getDescricao() != null && opp.getDescricao().toLowerCase().contains(lowerCaseQuery)) score += 1;
                if (opp.getLocalizacao() != null && opp.getLocalizacao().toLowerCase().contains(lowerCaseQuery)) score += 1;
                
                // Mapeia para o DTO
                return new SearchResultDTO(
                    opp.getId(), 
                    "opportunity", // O tipo que o frontend espera
                    opp.getTitulo(), 
                    opp.getDescricao(), // Usar a descrição
                    score
                );
            });

        // 2. Busca Recursos de Saúde
        Stream<SearchResultDTO> healthResourceResults = healthResourceRepository
            .findByNomeContainingIgnoreCaseOrEspecialidadeContainingIgnoreCaseOrEnderecoContainingIgnoreCase(query, query, query)
            .stream()
            .map(hr -> {
                int score = 0;
                if (hr.getNome() != null && hr.getNome().toLowerCase().contains(lowerCaseQuery)) score += 2;
                if (hr.getEspecialidade() != null && hr.getEspecialidade().toLowerCase().contains(lowerCaseQuery)) score += 1;
                if (hr.getEndereco() != null && hr.getEndereco().toLowerCase().contains(lowerCaseQuery)) score += 1;
                
                // Mapeia para o DTO
                return new SearchResultDTO(
                    hr.getId(), 
                    "health_resource", // O tipo que o frontend espera
                    hr.getNome(), 
                    hr.getEspecialidade(), // Usa descrição, ou especialidade como fallback
                    score
                );
            });

        // 3. Busca Denúncias (NOVO)
        Stream<SearchResultDTO> complaintResults = complaintReportRepository.searchByQuery(query)
            .stream()
            .map(cr -> {
                int score = 0;
                if (cr.getTitulo() != null && cr.getTitulo().toLowerCase().contains(lowerCaseQuery)) score += 2;
                if (cr.getDescricao() != null && cr.getDescricao().toLowerCase().contains(lowerCaseQuery)) score += 1;
                if (cr.getLocalizacaoOcorrencia() != null && cr.getLocalizacaoOcorrencia().toLowerCase().contains(lowerCaseQuery)) score += 1;
                
                // Mapeia para o DTO
                return new SearchResultDTO(
                    cr.getId(), 
                    "complaint", // O tipo que o frontend espera
                    cr.getTitulo(), 
                    cr.getDescricao(),
                    score
                );
            });

        // Combina os TRÊS resultados em uma única lista
        List<SearchResultDTO> combinedResults = Stream.of(opportunityResults, healthResourceResults, complaintResults)
            .flatMap(s -> s) // Achata os 3 streams em 1
            .collect(Collectors.toList());

        // Ordena pela pontuação (score)
        combinedResults.sort(Comparator.comparingInt(SearchResultDTO::getScore).reversed());
        
        return combinedResults;
    }
}