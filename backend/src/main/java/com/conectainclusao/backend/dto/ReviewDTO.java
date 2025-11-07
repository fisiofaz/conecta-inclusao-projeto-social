package com.conectainclusao.backend.dto;

import com.conectainclusao.backend.model.EntityType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

// Este DTO será usado para CRIAR e para LER avaliações
public class ReviewDTO {

    // Campos para CRIAR uma avaliação (enviados pelo frontend)
    @NotNull(message = "O ID da entidade é obrigatório")
    private Long entityId;

    @NotNull(message = "O tipo da entidade é obrigatório")
    private EntityType entityType;

    @NotNull(message = "A nota (rating) é obrigatória")
    @Min(value = 1, message = "A nota deve ser no mínimo 1")
    @Max(value = 5, message = "A nota deve ser no máximo 5")
    private Integer rating; // (int)

    private String comment;

    // Campos para LER uma avaliação (enviados pelo backend)
    private Long id; // ID da própria avaliação
    private LocalDateTime createdAt;
    private String authorName; // Nome de quem escreveu

    // Construtor vazio
    public ReviewDTO() {}

    // Getters e Setters
    public Long getEntityId() { return entityId; }
    public void setEntityId(Long entityId) { this.entityId = entityId; }
    public EntityType getEntityType() { return entityType; }
    public void setEntityType(EntityType entityType) { this.entityType = entityType; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }
}