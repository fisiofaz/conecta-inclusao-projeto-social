package com.conectainclusao.backend.dto;

import java.time.LocalDate;

public class ComplaintReportResponseDTO {
    private Long id;
    private String titulo;
    private String descricao;
    private String tipoProblema;
    private String localizacaoOcorrencia;
    private LocalDate dataOcorrencia;
    private String status;
    private String userId; // ID do usuário que fez a denúncia

    // Construtor sem argumentos
    public ComplaintReportResponseDTO() {}

    public ComplaintReportResponseDTO(Long id, String titulo, String descricao, String tipoProblema,
                                      String localizacaoOcorrencia, LocalDate dataOcorrencia,
                                      String status, String userId) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.tipoProblema = tipoProblema;
        this.localizacaoOcorrencia = localizacaoOcorrencia;
        this.dataOcorrencia = dataOcorrencia;
        this.status = status;
        this.userId = userId;
    }

    // Getters
    public Long getId() { return id; }
    public String getTitulo() { return titulo; }
    public String getDescricao() { return descricao; }
    public String getTipoProblema() { return tipoProblema; }
    public String getLocalizacaoOcorrencia() { return localizacaoOcorrencia; }
    public LocalDate getDataOcorrencia() { return dataOcorrencia; }
    public String getStatus() { return status; }
    public String getUserId() { return userId; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public void setTipoProblema(String tipoProblema) { this.tipoProblema = tipoProblema; }
    public void setLocalizacaoOcorrencia(String localizacaoOcorrencia) { this.localizacaoOcorrencia = localizacaoOcorrencia; }
    public void setDataOcorrencia(LocalDate dataOcorrencia) { this.dataOcorrencia = dataOcorrencia; }
    public void setStatus(String status) { this.status = status; }
    public void setUserId(String userId) { this.userId = userId; }
}