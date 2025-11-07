package com.conectainclusao.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(value = 1, message = "A avaliação deve ser no mínimo 1")
    @Max(value = 5, message = "A avaliação deve ser no máximo 5")
    @Column(nullable = false)
    private int rating; // A nota (ex: 1 a 5 estrelas)

    @Column(columnDefinition = "TEXT")
    private String comment; // O comentário em texto

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Relação: Muitas (Reviews) para Um (User)
    // Quem escreveu a avaliação
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_user_id", nullable = false)
    private User author;

    // --- A "MÁGICA" POLIMÓRFICA ---

    // O ID da entidade que está sendo avaliada (ex: o ID da Oportunidade ou da Clínica)
    @Column(nullable = false)
    private Long entityId;

    // O tipo da entidade (ex: "OPPORTUNITY" ou "HEALTH_RESOURCE")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private EntityType entityType;

    // --- Construtores, Getters e Setters ---

    public Review() {}

    // Getters
    public Long getId() { return id; }
    public int getRating() { return rating; }
    public String getComment() { return comment; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public User getAuthor() { return author; }
    public Long getEntityId() { return entityId; }
    public EntityType getEntityType() { return entityType; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setRating(int rating) { this.rating = rating; }
    public void setComment(String comment) { this.comment = comment; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setAuthor(User author) { this.author = author; }
    public void setEntityId(Long entityId) { this.entityId = entityId; }
    public void setEntityType(EntityType entityType) { this.entityType = entityType; }
}