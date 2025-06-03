package com.conectainclusao.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table; 
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

@Entity
@Table(name = "complaint_reports") // Nome da tabela no banco
public class ComplaintReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O título da denúncia/relato não pode estar em branco")
    @Size(max = 255, message = "O título deve ter no máximo 255 caracteres")
    @Column(nullable = false, length = 255)
    private String titulo;

    @NotBlank(message = "A descrição da denúncia/relato não pode estar em branco")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricao;

    @NotBlank(message = "O tipo de problema não pode estar em branco")
    @Column(nullable = false, length = 100)
    private String tipoProblema; 

    @NotBlank(message = "A localização da ocorrência não pode estar em branco")
    @Size(max = 255, message = "A localização deve ter no máximo 255 caracteres")
    @Column(nullable = false, length = 255)
    private String localizacaoOcorrencia;

    @NotNull(message = "A data da ocorrência não pode ser nula")
    @Column(nullable = false)
    private LocalDate dataOcorrencia;

    @Column(nullable = false, length = 50)
    private String status; 

    // Campo para associar a denúncia a um usuário (futuramente, pode ser uma relação @ManyToOne com a entidade User)
    // Por enquanto, apenas o ID do usuário como String, para simplificar.
    @Column(length = 255)
    private String userId; // ID do usuário que fez a denúncia

    // Construtor sem argumentos
    public ComplaintReport() {}

    // Construtor com todos os argumentos
    public ComplaintReport(Long id, String titulo, String descricao, String tipoProblema,
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