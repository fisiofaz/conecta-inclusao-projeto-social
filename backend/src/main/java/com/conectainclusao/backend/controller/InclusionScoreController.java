package com.conectainclusao.backend.controller;

import com.conectainclusao.backend.dto.InclusionScoreDTO;
import com.conectainclusao.backend.service.InclusionScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/inclusion-score")
public class InclusionScoreController {

    @Autowired
    private InclusionScoreService inclusionScoreService;

    /**
     * Endpoint PÚBLICO para buscar o "selo" de uma empresa (pelo ID do usuário dono).
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<InclusionScoreDTO> getScoreByUserId(@PathVariable Long userId) {
        InclusionScoreDTO score = inclusionScoreService.getInclusionScore(userId);
        return ResponseEntity.ok(score);
    }
}