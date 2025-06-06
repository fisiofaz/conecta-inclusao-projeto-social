package com.conectainclusao.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class ComplaintReportRequestDTO {

    @NotBlank(message = "O título da denúncia/relato não pode estar em branco")
    @Size(max = 255, message = "O título deve ter no máximo 255 caracteres")
    private String titulo;

    @NotBlank(message = "A descrição da denúncia/relato não pode estar em branco")
    private String descricao;

    @NotBlank(message = "O tipo de problema não pode estar em branco")
    private String tipoProblema;

    @NotBlank(message = "A localização da ocorrência não pode estar em branco")
    @Size(max = 255, message = "A localização deve ter no máximo 255 caracteres")
    private String localizacaoOcorrencia;

    @NotNull(message = "A data da ocorrência não pode ser nula")
    private LocalDate dataOcorrencia;

   // Construtor sem argumentos
    public ComplaintReportRequestDTO() {}

    public ComplaintReportRequestDTO(String titulo, String descricao, String tipoProblema,
                                     String localizacaoOcorrencia, LocalDate dataOcorrencia) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.tipoProblema = tipoProblema;
        this.localizacaoOcorrencia = localizacaoOcorrencia;
        this.dataOcorrencia = dataOcorrencia;
    }

    // Getters
    public String getTitulo() { return titulo; }
    public String getDescricao() { return descricao; }
    public String getTipoProblema() { return tipoProblema; }
    public String getLocalizacaoOcorrencia() { return localizacaoOcorrencia; }
    public LocalDate getDataOcorrencia() { return dataOcorrencia; }

    // Setters
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public void setTipoProblema(String tipoProblema) { this.tipoProblema = tipoProblema; }
    public void setLocalizacaoOcorrencia(String localizacaoOcorrencia) { this.localizacaoOcorrencia = localizacaoOcorrencia; }
    public void setDataOcorrencia(LocalDate dataOcorrencia) { this.dataOcorrencia = dataOcorrencia; }
}