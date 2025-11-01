package com.conectainclusao.backend.repository;

import com.conectainclusao.backend.model.ComplaintReport;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface ComplaintReportRepository extends JpaRepository<ComplaintReport, Long> {
	@Query("SELECT c FROM ComplaintReport c WHERE " +
	           "LOWER(c.titulo) LIKE LOWER(concat('%', :query, '%')) OR " +
	           "LOWER(c.descricao) LIKE LOWER(concat('%', :query, '%')) OR " +
	           "LOWER(c.localizacaoOcorrencia) LIKE LOWER(concat('%', :query, '%')) OR " +
	           "LOWER(CAST(c.tipoProblema AS string)) LIKE LOWER(concat('%', :query, '%'))")
	    List<ComplaintReport> searchByQuery(@Param("query") String query);
}