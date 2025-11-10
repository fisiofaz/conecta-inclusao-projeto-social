package com.conectainclusao.backend.service;

import com.conectainclusao.backend.dto.InclusionScoreDTO;
import com.conectainclusao.backend.repository.OpportunityRepository;
import com.conectainclusao.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InclusionScoreService {

    @Autowired
    private OpportunityRepository opportunityRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Transactional(readOnly = true)
    public InclusionScoreDTO getInclusionScore(Long ownerId) {
        
        // Conta as vagas
        long opportunityCount = opportunityRepository.countByOwnerId(ownerId);

        // Calcula a média de avaliações
        // O 'averageRating' pode ser null se a empresa não tiver avaliações
        Double averageRating = reviewRepository.findAverageRatingForOpportunityOwner(ownerId);
        
        // Determina o Nível do Selo
        String sealLevel = "NENHUM";
        double avg = (averageRating != null) ? averageRating : 0.0;

        if (opportunityCount >= 10 && avg >= 4.5) {
            sealLevel = "OURO";
        } else if (opportunityCount >= 5 && avg >= 4.0) {
            sealLevel = "PRATA";
        } else if (opportunityCount >= 1 && avg >= 3.0) {
            sealLevel = "BRONZE";
        }

        return new InclusionScoreDTO(opportunityCount, (averageRating != null ? avg : null), sealLevel);
    }
}