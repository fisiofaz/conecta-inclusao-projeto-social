package com.conectainclusao.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Set;
import java.util.HashSet;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.JoinTable;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
    
    // Relação: Muitas (Opportunities) para Um (User)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_user_id") // Nome da nova coluna no banco
    @JsonIgnore // Ignora no JSON para não causar loops
    private User owner;
    
    // Lista de candidaturas que esta vaga recebeu
    @OneToMany(
        mappedBy = "opportunity", // "opportunity" é o nome do campo na classe Candidatura.java
        cascade = CascadeType.ALL, 
        orphanRemoval = true, 
        fetch = FetchType.LAZY
    )
    @JsonIgnore
    private Set<Candidatura> candidaturas = new HashSet<>();
    
    // Relação: Uma Vaga pode ser afirmativa para Muitas Etiquetas
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "opportunity_target_groups", // Nova tabela de ligação
        joinColumns = @JoinColumn(name = "opportunity_id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    @JsonIgnore
    private Set<DiversityTag> targetGroups = new HashSet<>();

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
    public Set<Candidatura> getCandidaturas() {return candidaturas;}
    public Set<DiversityTag> getTargetGroups() {return targetGroups;}
  
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
    public User getOwner() {return owner; }
    public void setOwner(User owner) {this.owner = owner;}
    public void setCandidaturas(Set<Candidatura> candidaturas) {this.candidaturas = candidaturas;}
    public void setTargetGroups(Set<DiversityTag> targetGroups) {this.targetGroups = targetGroups;}
}