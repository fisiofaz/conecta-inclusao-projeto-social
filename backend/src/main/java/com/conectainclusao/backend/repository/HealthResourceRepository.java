package com.conectainclusao.backend.repository;

import com.conectainclusao.backend.model.HealthResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HealthResourceRepository extends JpaRepository<HealthResource, Long> {
    
}