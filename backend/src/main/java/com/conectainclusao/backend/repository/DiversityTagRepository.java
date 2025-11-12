package com.conectainclusao.backend.repository;

import com.conectainclusao.backend.model.DiversityTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DiversityTagRepository extends JpaRepository<DiversityTag, Long> {
    // Método para nos ajudar a encontrar a tag pela "key"
    Optional<DiversityTag> findByTagKey(String tagKey);
}