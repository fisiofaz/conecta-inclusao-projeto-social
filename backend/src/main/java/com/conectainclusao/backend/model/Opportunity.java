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
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import com.conectainclusao.backend.model.TipoOportunidade;

import java.time.LocalDate;

@Entity
@Table(name = "opportunities") // Nome da tabela no banco
public class Opportunity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O título da oportunidade não pode estar em branco")
    @Size(max = 255, message = "O título deve ter no máximo 255 caracteres")
    @Column(nullable = false, length = 255)
    private String titulo;

    @NotBlank(message = "A descrição não pode estar em branco")
    @Column(nullable = false, columnDefinition = "TEXT") 
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private TipoOportunidade tipoOportunidade; 

    @NotBlank(message = "A empresa/organização responsável não pode estar em branco")
    @Size(max = 100, message = "O nome da empresa/organização deve ter no máximo 100 caracteres")
    @Column(nullable = false, length = 100)
    private String empresaOuOrgResponsavel;

    @NotBlank(message = "A localização não pode estar em branco")
    @Size(max = 100, message = "A localização deve ter no máximo 100 caracteres")
    @Column(nullable = false, length = 100)
    private String localizacao;

    @NotBlank(message = "Os requisitos de acessibilidade não podem estar em branco")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String requisitosAcessibilidade; 

    @NotNull(message = "A data de publicação não pode ser nula")
    @Column(nullable = false)
    private LocalDate dataPublicacao;

    @NotBlank(message = "As informações de contato não podem estar em branco")
    @Size(max = 255, message = "O contato deve ter no máximo 255 caracteres")
    @Column(nullable = false, length = 255)
    private String contato;

    // Construtor sem argumentos
    public Opportunity() {}

    // Construtor com todos os argumentos
    public Opportunity(Long id, String titulo, String descricao, TipoOportunidade tipoOportunidade,
                       String empresaOuOrgResponsavel, String localizacao,
                       String requisitosAcessibilidade, LocalDate dataPublicacao, String contato) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.tipoOportunidade = tipoOportunidade;
        this.empresaOuOrgResponsavel = empresaOuOrgResponsavel;
        this.localizacao = localizacao;
        this.requisitosAcessibilidade = requisitosAcessibilidade;
        this.dataPublicacao = dataPublicacao;
        this.contato = contato;
    }

    // Getters
    public Long getId() { return id; }
    public String getTitulo() { return titulo; }
    public String getDescricao() { return descricao; }
    public TipoOportunidade getTipoOportunidade() { return tipoOportunidade; }
    public String getEmpresaOuOrgResponsavel() { return empresaOuOrgResponsavel; }
    public String getLocalizacao() { return localizacao; }
    public String getRequisitosAcessibilidade() { return requisitosAcessibilidade; }
    public LocalDate getDataPublicacao() { return dataPublicacao; }
    public String getContato() { return contato; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public void setTipoOportunidade(TipoOportunidade tipoOportunidade) { this.tipoOportunidade = tipoOportunidade; }
    public void setEmpresaOuOrgResponsavel(String empresaOuOrgResponsavel) { this.empresaOuOrgResponsavel = empresaOuOrgResponsavel; }
    public void setLocalizacao(String localizacao) { this.localizacao = localizacao; }
    public void setRequisitosAcessibilidade(String requisitosAcessibilidade) { this.requisitosAcessibilidade = requisitosAcessibilidade; }
    public void setDataPublicacao(LocalDate dataPublicacao) { this.dataPublicacao = dataPublicacao; }
    public void setContato(String contato) { this.contato = contato; }
}