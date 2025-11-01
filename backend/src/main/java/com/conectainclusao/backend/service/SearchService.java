package com.conectainclusao.backend.service;

import com.conectainclusao.backend.dto.SearchResultDTO;
import com.conectainclusao.backend.repository.ComplaintReportRepository;
import com.conectainclusao.backend.repository.HealthResourceRepository;
import com.conectainclusao.backend.repository.OpportunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class SearchService {

    @Autowired
    private OpportunityRepository opportunityRepository;

    @Autowired
    private HealthResourceRepository healthResourceRepository;

    @Autowired
    private ComplaintReportRepository complaintReportRepository; 

    public List<SearchResultDTO> searchAll(String query) {
        String lowerCaseQuery = query.toLowerCase();

        // Busca Oportunidades (CORRIGIDO para searchByQuery)
        Stream<SearchResultDTO> opportunityResults = opportunityRepository
            .searchByQuery(query) // Chama o novo método
            .stream()
            .map(opp -> {
                int score = 0;
                if (opp.getTitulo() != null && opp.getTitulo().toLowerCase().contains(lowerCaseQuery)) score += 3; // Mais pontos para o título
                if (opp.getDescricao() != null && opp.getDescricao().toLowerCase().contains(lowerCaseQuery)) score += 1;
                if (opp.getLocalizacao() != null && opp.getLocalizacao().toLowerCase().contains(lowerCaseQuery)) score += 1;
                // 👇 ADICIONADO: Pontuação para o TIPO
                if (opp.getTipoOportunidade() != null && opp.getTipoOportunidade().name().toLowerCase().contains(lowerCaseQuery)) score += 2;

                SearchResultDTO dto = new SearchResultDTO();
                dto.setId(opp.getId());
                dto.setType("opportunity");
                dto.setTitle(opp.getTitulo());
                dto.setDescription(opp.getDescricao());
                dto.setScore(score);
                dto.setLocation(opp.getLocalizacao());
                dto.setCompany(opp.getEmpresaOuOrgResponsavel());
                dto.setDetails(opp.getTipoOportunidade() != null ? opp.getTipoOportunidade().name() : null);
                return dto;
            });

        // Busca Recursos de Saúde (CORRIGIDO para searchByQuery)
        Stream<SearchResultDTO> healthResourceResults = healthResourceRepository
            .searchByQuery(query) // Chama o novo método
            .stream()
            .map(hr -> {
                int score = 0;
                if (hr.getNome() != null && hr.getNome().toLowerCase().contains(lowerCaseQuery)) score += 3;
                if (hr.getEspecialidade() != null && hr.getEspecialidade().toLowerCase().contains(lowerCaseQuery)) score += 1;
                if (hr.getEndereco() != null && hr.getEndereco().toLowerCase().contains(lowerCaseQuery)) score += 1;
                if (hr.getTipoRecurso() != null && hr.getTipoRecurso().name().toLowerCase().contains(lowerCaseQuery)) score += 2;

                SearchResultDTO dto = new SearchResultDTO();
                dto.setId(hr.getId());
                dto.setType("health_resource");
                dto.setTitle(hr.getNome());
                dto.setDescription(hr.getEspecialidade());
                dto.setScore(score);
                dto.setLocation(hr.getEndereco());
                dto.setPhone(hr.getTelefone());
                return dto;
            });

        // Busca Denúncias (já usava searchByQuery, só atualiza o score)
        Stream<SearchResultDTO> complaintResults = complaintReportRepository.searchByQuery(query)
            .stream()
            .map(cr -> {
                int score = 0;
                if (cr.getTitulo() != null && cr.getTitulo().toLowerCase().contains(lowerCaseQuery)) score += 3;
                if (cr.getDescricao() != null && cr.getDescricao().toLowerCase().contains(lowerCaseQuery)) score += 1;
                if (cr.getLocalizacaoOcorrencia() != null && cr.getLocalizacaoOcorrencia().toLowerCase().contains(lowerCaseQuery)) score += 1;
                if (cr.getTipoProblema() != null && cr.getTipoProblema().name().toLowerCase().contains(lowerCaseQuery)) score += 2;

                SearchResultDTO dto = new SearchResultDTO();
                dto.setId(cr.getId());
                dto.setType("complaint");
                dto.setTitle(cr.getTitulo());
                dto.setDescription(cr.getDescricao());
                dto.setScore(score);
                dto.setLocation(cr.getLocalizacaoOcorrencia());
                dto.setDetails(cr.getTipoProblema() != null ? cr.getTipoProblema().name() : null);
                dto.setStatus(cr.getStatus() != null ? cr.getStatus().name() : null);
                return dto;
            });

        // Combina os TRÊS resultados
        List<SearchResultDTO> combinedResults = Stream.of(opportunityResults, healthResourceResults, complaintResults)
            .flatMap(s -> s) 
            .filter(dto -> dto.getScore() > 0) // 👈 SÓ RETORNA SE ACHAR ALGO
            .collect(Collectors.toList());

        // Ordena pela pontuação
        combinedResults.sort(Comparator.comparingInt(SearchResultDTO::getScore).reversed());
        
        return combinedResults;
    }
}