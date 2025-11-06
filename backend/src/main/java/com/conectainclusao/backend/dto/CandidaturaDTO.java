package com.conectainclusao.backend.dto;

import java.time.LocalDateTime;

// Este DTO vai carregar os dados formatados para o frontend
public class CandidaturaDTO {

    private Long id;
    private String status;
    private LocalDateTime dataCandidatura;
    
    // Dados do Usuário
    private Long userId;
    private String userName;
    private String userEmail;
    
    // Dados da Vaga
    private Long opportunityId;
    private String opportunityTitle;
    private String opportunityCompany;

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getDataCandidatura() { return dataCandidatura; }
    public void setDataCandidatura(LocalDateTime dataCandidatura) { this.dataCandidatura = dataCandidatura; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    public Long getOpportunityId() { return opportunityId; }
    public void setOpportunityId(Long opportunityId) { this.opportunityId = opportunityId; }
    public String getOpportunityTitle() { return opportunityTitle; }
    public void setOpportunityTitle(String opportunityTitle) { this.opportunityTitle = opportunityTitle; }
    public String getOpportunityCompany() { return opportunityCompany; }
    public void setOpportunityCompany(String opportunityCompany) { this.opportunityCompany = opportunityCompany; }
}