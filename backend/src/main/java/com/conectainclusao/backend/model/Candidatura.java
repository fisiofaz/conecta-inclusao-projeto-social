package com.conectainclusao.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "candidaturas")
public class Candidatura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Muitos (Candidaturas) para Um (User)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // O candidato

    // Muitos (Candidaturas) para Um (Opportunity)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "opportunity_id", nullable = false)
    private Opportunity opportunity; // A vaga

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private StatusCandidatura status;

    @CreationTimestamp // Define a data/hora automaticamente quando é criado
    @Column(nullable = false, updatable = false)
    private LocalDateTime dataCandidatura;

    // Construtores
    public Candidatura() {}

    public Candidatura(User user, Opportunity opportunity) {
        this.user = user;
        this.opportunity = opportunity;
        this.status = StatusCandidatura.APLICADA; // Define o status padrão
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Opportunity getOpportunity() { return opportunity; }
    public void setOpportunity(Opportunity opportunity) { this.opportunity = opportunity; }
    public StatusCandidatura getStatus() { return status; }
    public void setStatus(StatusCandidatura status) { this.status = status; }
    public LocalDateTime getDataCandidatura() { return dataCandidatura; }
    public void setDataCandidatura(LocalDateTime dataCandidatura) { this.dataCandidatura = dataCandidatura; }
}