package com.conectainclusao.backend.model;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table; 
import java.time.LocalDate;

@Entity
@Table(name = "complaint_reports") // Nome da tabela no banco
public class ComplaintReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String titulo;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 100)
    private TipoProblema tipoProblema; 

    @Column(nullable = false, length = 255)
    private String localizacaoOcorrencia;

    @Column(nullable = false)
    private LocalDate dataOcorrencia;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private StatusDenuncia status; 

    @ManyToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "user_id") 
    private User user; 

    // Construtor sem argumentos
    public ComplaintReport() {}

    // Construtor com todos os argumentos
    public ComplaintReport(Long id, String titulo, String descricao, TipoProblema tipoProblema,
                           String localizacaoOcorrencia, LocalDate dataOcorrencia,
                           StatusDenuncia status, User user) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.tipoProblema = tipoProblema;
        this.localizacaoOcorrencia = localizacaoOcorrencia;
        this.dataOcorrencia = dataOcorrencia;
        this.status = status;
        this.user = user;
    }

    // Getters
    public Long getId() { return id; }
    public String getTitulo() { return titulo; }
    public String getDescricao() { return descricao; }
    public TipoProblema getTipoProblema() { return tipoProblema; }
    public String getLocalizacaoOcorrencia() { return localizacaoOcorrencia; }
    public LocalDate getDataOcorrencia() { return dataOcorrencia; }
    public StatusDenuncia getStatus() { return status; }
    public User getUser() { return user; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public void setTipoProblema(TipoProblema tipoProblema) { this.tipoProblema = tipoProblema; }
    public void setLocalizacaoOcorrencia(String localizacaoOcorrencia) { this.localizacaoOcorrencia = localizacaoOcorrencia; }
    public void setDataOcorrencia(LocalDate dataOcorrencia) { this.dataOcorrencia = dataOcorrencia; }
    public void setStatus(StatusDenuncia status) { this.status = status; }
    public void setUser(User user) { this.user = user; }
}