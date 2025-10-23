package com.conectainclusao.backend.dto;

// DTO para padronizar os resultados da busca
public class SearchResultDTO {
    private Long id;
    private String type; // "opportunity" ou "health_resource"
    private String title; // Título da oportunidade ou nome do recurso
    private String description; // Descrição curta
    private int score;
    // Você pode adicionar outros campos comuns se desejar (ex: location)

    // Construtor, Getters e Setters
    public SearchResultDTO(Long id, String type, String title, String description, int score) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.description = description;
        this.score = score;
    }

    // Getters e Setters ...
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
}