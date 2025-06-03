package com.conectainclusao.backend.repository;

import com.conectainclusao.backend.model.ComplaintReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplaintReportRepository extends JpaRepository<ComplaintReport, Long> {
    
}