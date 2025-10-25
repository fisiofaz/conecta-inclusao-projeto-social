package com.conectainclusao.backend.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.conectainclusao.backend.model.TipoProblema; 
import com.conectainclusao.backend.model.StatusDenuncia;

public class ComplaintReportResponseDTO {
    private Long id;
    private String titulo;
    private String descricao;
    private TipoProblema tipoProblema;
    private String localizacaoOcorrencia;
    
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataOcorrencia;
    
    private StatusDenuncia status;
    private String userName;

    // Construtor sem argumentos
    public ComplaintReportResponseDTO() {}

    public ComplaintReportResponseDTO(Long id, String titulo, String descricao, TipoProblema tipoProblema,
                                      String localizacaoOcorrencia, LocalDate dataOcorrencia,
                                      StatusDenuncia status, String userName) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.tipoProblema = tipoProblema;
        this.localizacaoOcorrencia = localizacaoOcorrencia;
        this.dataOcorrencia = dataOcorrencia;
        this.status = status;
        this.userName = userName;
    }

    // Getters
    public Long getId() { return id; }
    public String getTitulo() { return titulo; }
    public String getDescricao() { return descricao; }
    public TipoProblema getTipoProblema() { return tipoProblema; }
    public String getLocalizacaoOcorrencia() { return localizacaoOcorrencia; }
    public LocalDate getDataOcorrencia() { return dataOcorrencia; }
    public StatusDenuncia getStatus() { return status; }
    public String getUserName() { return userName; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public void setTipoProblema(TipoProblema tipoProblema) { this.tipoProblema = tipoProblema; }
    public void setLocalizacaoOcorrencia(String localizacaoOcorrencia) { this.localizacaoOcorrencia = localizacaoOcorrencia; }
    public void setDataOcorrencia(LocalDate dataOcorrencia) { this.dataOcorrencia = dataOcorrencia; }
    public void setStatus(StatusDenuncia status) { this.status = status; }
    public void setUserName(String userName) { this.userName = userName; }
}