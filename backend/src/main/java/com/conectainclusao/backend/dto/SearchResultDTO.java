package com.conectainclusao.backend.dto;

// DTO para padronizar os resultados da busca
public class SearchResultDTO {
    private Long id;
    private String type; // "opportunity" ou "health_resource"
    private String title; // Título da oportunidade ou nome do recurso
    private String description; // Descrição curta
    private int score;
    
    // Campos Específicos (serão nulos dependendo do tipo)
    private String location; // localizacao / endereco
    private String details;  // tipoProblema / tipoOportunidade
    private String status;   // status da denúncia
    private String company;  // empresaOuOrgResponsavel
    private String phone;    // telefone
    
    public SearchResultDTO() {}
    

 // Getters e Setters (Necessários para o Jackson)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}