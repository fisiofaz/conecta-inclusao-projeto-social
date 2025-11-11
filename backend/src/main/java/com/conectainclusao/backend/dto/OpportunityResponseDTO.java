package com.conectainclusao.backend.dto;

import java.time.LocalDate;
import com.conectainclusao.backend.model.TipoOportunidade;

public class OpportunityResponseDTO {
    private Long id;
    private String titulo;
    private String descricao;
    private TipoOportunidade tipoOportunidade;
    private String empresaOuOrgResponsavel;
    private String localizacao;
    private String requisitosAcessibilidade;
    private LocalDate dataPublicacao;
    private String contato;
    private Long ownerId; 

    // Construtor sem argumentos
    public OpportunityResponseDTO() {}

    // Construtor com todos os argumentos (opcional)
    public OpportunityResponseDTO(Long id, String titulo, String descricao, TipoOportunidade tipoOportunidade,
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

    // Getters (gerar manualmente)
    public Long getId() { return id; }
    public String getTitulo() { return titulo; }
    public String getDescricao() { return descricao; }
    public TipoOportunidade getTipoOportunidade() { return tipoOportunidade; }
    public String getEmpresaOuOrgResponsavel() { return empresaOuOrgResponsavel; }
    public String getLocalizacao() { return localizacao; }
    public String getRequisitosAcessibilidade() { return requisitosAcessibilidade; }
    public LocalDate getDataPublicacao() { return dataPublicacao; }
    public String getContato() { return contato; }
    public Long getOwnerId() { return ownerId; }

    // Setters (gerar manualmente)
    public void setId(Long id) { this.id = id; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public void setTipoOportunidade(TipoOportunidade tipoOportunidade) { this.tipoOportunidade = tipoOportunidade; }
    public void setEmpresaOuOrgResponsavel(String empresaOuOrgResponsavel) { this.empresaOuOrgResponsavel = empresaOuOrgResponsavel; }
    public void setLocalizacao(String localizacao) { this.localizacao = localizacao; }
    public void setRequisitosAcessibilidade(String requisitosAcessibilidade) { this.requisitosAcessibilidade = requisitosAcessibilidade; }
    public void setDataPublicacao(LocalDate dataPublicacao) { this.dataPublicacao = dataPublicacao; }
    public void setContato(String contato) { this.contato = contato; }
    public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }
}