package com.conectainclusao.backend.repository;

import com.conectainclusao.backend.model.Opportunity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.Query; 
import org.springframework.data.repository.query.Param; 


@Repository
public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {
	
    @Query("SELECT o FROM Opportunity o WHERE " +
           "LOWER(o.titulo) LIKE LOWER(concat('%', :query, '%')) OR " +
           "LOWER(o.descricao) LIKE LOWER(concat('%', :query, '%')) OR " +
           "LOWER(o.localizacao) LIKE LOWER(concat('%', :query, '%')) OR " +
           "LOWER(CAST(o.tipoOportunidade AS string)) LIKE LOWER(concat('%', :query, '%'))")
    List<Opportunity> searchByQuery(@Param("query") String query);
}