package com.conectainclusao.backend.controller;

import com.conectainclusao.backend.dto.ReviewDTO;
import com.conectainclusao.backend.model.EntityType;
import com.conectainclusao.backend.model.User;
import com.conectainclusao.backend.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews") // Base da URL para este controller
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    /**
     * Endpoint para um usuário (PCD) CRIAR uma nova avaliação.
     */
    @PostMapping
    @PreAuthorize("isAuthenticated()") // Só usuários logados podem avaliar
    public ResponseEntity<?> createReview(
            @Valid @RequestBody ReviewDTO reviewDTO,
            @AuthenticationPrincipal User author) { // Pega o usuário logado
        
        try {
            ReviewDTO createdReview = reviewService.createReview(reviewDTO, author);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdReview);
        } catch (IllegalStateException e) {
            // Captura o erro "Você já avaliou este item."
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    /**
     * Endpoint PÚBLICO para listar todas as avaliações de um item específico.
     * (Ex: /api/reviews/OPPORTUNITY/5)
     */
    @GetMapping("/{entityType}/{entityId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsForItem(
            @PathVariable EntityType entityType,
            @PathVariable Long entityId) {
        
        List<ReviewDTO> reviews = reviewService.getReviewsForItem(entityType, entityId);
        return ResponseEntity.ok(reviews);
    }

    /**
     * Endpoint PRIVADO para um usuário ver todas as avaliações que ELE FEZ.
     */
    @GetMapping("/my-reviews")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<ReviewDTO>> getMyReviews(
            @AuthenticationPrincipal User author) { // Pega o usuário logado
        
        List<ReviewDTO> myReviews = reviewService.getReviewsByAuthor(author);
        return ResponseEntity.ok(myReviews);
    }
}