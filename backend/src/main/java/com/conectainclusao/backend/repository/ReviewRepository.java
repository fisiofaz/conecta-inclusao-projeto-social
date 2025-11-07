package com.conectainclusao.backend.repository;

import com.conectainclusao.backend.model.EntityType;
import com.conectainclusao.backend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    /**
     * Encontra todas as avaliações para um item específico (ex: todas as avaliações da Oportunidade 5).
     */
    List<Review> findByEntityTypeAndEntityId(EntityType entityType, Long entityId);

    /**
     * Encontra todas as avaliações escritas por um usuário específico.
     */
    List<Review> findByAuthorId(Long authorId);

    /**
     * Verifica se um usuário específico (authorId) JÁ avaliou um item específico (entityId).
     * Isso impede que o mesmo usuário avalie o mesmo item duas vezes.
     */
    Optional<Review> findByAuthorIdAndEntityTypeAndEntityId(Long authorId, EntityType entityType, Long entityId);
}