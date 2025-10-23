package com.conectainclusao.backend.repository;

import com.conectainclusao.backend.model.Opportunity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {
    List<Opportunity> findByTituloContainingIgnoreCaseOrDescricaoContainingIgnoreCaseOrLocalizacaoContainingIgnoreCase(
        String titulo, String descricao, String localizacao);
}