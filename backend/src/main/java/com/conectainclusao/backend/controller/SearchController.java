package com.conectainclusao.backend.controller;

import com.conectainclusao.backend.dto.SearchResultDTO;
import com.conectainclusao.backend.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/search") // Define a base da URL para este controller
public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping // Mapeia requisições GET para /api/search
    public ResponseEntity<List<SearchResultDTO>> search(@RequestParam("q") String query) {
        // Validação básica do parâmetro
        if (query == null || query.trim().isEmpty()) {
            return ResponseEntity.badRequest().build(); // Retorna 400 Bad Request se 'q' for vazio
        }
        
        List<SearchResultDTO> results = searchService.searchAll(query.trim());
        return ResponseEntity.ok(results); // Retorna a lista de resultados com status 200 OK
    }
}