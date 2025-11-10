package com.conectainclusao.backend.dto;

// DTO para enviar os dados do "Selo" para o frontend
public class InclusionScoreDTO {

    private long opportunityCount; // Total de vagas postadas
    private Double averageRating;  // Média de 0 a 5
    private String sealLevel;      // "NENHUM", "BRONZE", "PRATA", "OURO"

    public InclusionScoreDTO(long opportunityCount, Double averageRating, String sealLevel) {
        this.opportunityCount = opportunityCount;
        this.averageRating = averageRating;
        this.sealLevel = sealLevel;
    }

    // Getters e Setters
    public long getOpportunityCount() { return opportunityCount; }
    public void setOpportunityCount(long opportunityCount) { this.opportunityCount = opportunityCount; }
    public Double getAverageRating() { return averageRating; }
    public void setAverageRating(Double averageRating) { this.averageRating = averageRating; }
    public String getSealLevel() { return sealLevel; }
    public void setSealLevel(String sealLevel) { this.sealLevel = sealLevel; }
}