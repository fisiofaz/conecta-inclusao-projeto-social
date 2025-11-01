package com.conectainclusao.backend.repository;

import com.conectainclusao.backend.model.ComplaintReport;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface ComplaintReportRepository extends JpaRepository<ComplaintReport, Long> {
	@Query("SELECT c FROM ComplaintReport c WHERE c.titulo ILIKE %:query% OR c.descricao ILIKE %:query% OR c.localizacaoOcorrencia ILIKE %:query%")
    List<ComplaintReport> searchByQuery(@Param("query") String query);
}