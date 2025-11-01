package com.conectainclusao.backend.repository;

import com.conectainclusao.backend.model.HealthResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.Query; 
import org.springframework.data.repository.query.Param; 

@Repository
public interface HealthResourceRepository extends JpaRepository<HealthResource, Long> {
	@Query("SELECT h FROM HealthResource h WHERE " +
	           "LOWER(h.nome) LIKE LOWER(concat('%', :query, '%')) OR " +
	           "LOWER(h.especialidade) LIKE LOWER(concat('%', :query, '%')) OR " +
	           "LOWER(h.endereco) LIKE LOWER(concat('%', :query, '%')) OR " +
	           "LOWER(CAST(h.tipoRecurso AS string)) LIKE LOWER(concat('%', :query, '%'))")
	    List<HealthResource> searchByQuery(@Param("query") String query);
}