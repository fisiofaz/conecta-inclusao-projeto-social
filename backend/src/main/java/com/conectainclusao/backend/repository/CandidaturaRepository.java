package com.conectainclusao.backend.repository;

import com.conectainclusao.backend.model.Candidatura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional; // 👈 Adicione este import

@Repository
public interface CandidaturaRepository extends JpaRepository<Candidatura, Long> {

    // Método para buscar todas as candidaturas de um usuário específico
    List<Candidatura> findByUserId(Long userId);

    // Método para buscar todas as candidaturas de uma vaga específica
    List<Candidatura> findByOpportunityId(Long opportunityId);

    // Método para checar se um usuário JÁ se candidatou a uma vaga
    Optional<Candidatura> findByUserIdAndOpportunityId(Long userId, Long opportunityId);
}