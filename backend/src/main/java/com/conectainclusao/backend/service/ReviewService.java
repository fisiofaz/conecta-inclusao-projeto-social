package com.conectainclusao.backend.service;

import com.conectainclusao.backend.dto.ReviewDTO;
import com.conectainclusao.backend.model.EntityType;
import com.conectainclusao.backend.model.Review;
import com.conectainclusao.backend.model.User;
import com.conectainclusao.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    /**
     * Cria uma nova avaliação para um item (Oportunidade, Clínica, etc.)
     */
    @Transactional
    public ReviewDTO createReview(ReviewDTO reviewDTO, User author) {
        
        // Verifica se este usuário já avaliou este item
        reviewRepository.findByAuthorIdAndEntityTypeAndEntityId(
                author.getId(), 
                reviewDTO.getEntityType(), 
                reviewDTO.getEntityId()
        ).ifPresent(existingReview -> {
            throw new IllegalStateException("Você já avaliou este item.");
        });

        // (No futuro, poderíamos checar aqui se a entidade (ex: Oportunidade) realmente existe)
        
        //Cria a nova entidade Review
        Review newReview = new Review();
        newReview.setAuthor(author); // Associa o usuário logado
        newReview.setEntityType(reviewDTO.getEntityType());
        newReview.setEntityId(reviewDTO.getEntityId());
        newReview.setRating(reviewDTO.getRating());
        newReview.setComment(reviewDTO.getComment());
        // (data de criação é automática)

        Review savedReview = reviewRepository.save(newReview);
        
        return mapEntityToDTO(savedReview);
    }

    /**
     * Lista todas as avaliações de um item específico
     * (Ex: Todas as avaliações da Oportunidade ID=5)
     */
    @Transactional(readOnly = true)
    public List<ReviewDTO> getReviewsForItem(EntityType entityType, Long entityId) {
        return reviewRepository.findByEntityTypeAndEntityId(entityType, entityId).stream()
                .map(this::mapEntityToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Lista todas as avaliações que um usuário escreveu
     */
    @Transactional(readOnly = true)
    public List<ReviewDTO> getReviewsByAuthor(User author) {
        return reviewRepository.findByAuthorId(author.getId()).stream()
                .map(this::mapEntityToDTO)
                .collect(Collectors.toList());
    }

    // --- Método Auxiliar de Mapeamento ---
    private ReviewDTO mapEntityToDTO(Review review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        dto.setEntityId(review.getEntityId());
        dto.setEntityType(review.getEntityType());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setCreatedAt(review.getCreatedAt());
        
        if (review.getAuthor() != null) {
            dto.setAuthorName(review.getAuthor().getNome());
        }
        
        return dto;
    }
}