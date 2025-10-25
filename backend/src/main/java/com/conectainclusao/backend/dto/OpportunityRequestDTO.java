package com.conectainclusao.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import com.conectainclusao.backend.model.TipoOportunidade;

import java.time.LocalDate;

public class OpportunityRequestDTO {

    @NotBlank(message = "O título da oportunidade não pode estar em branco")
    @Size(max = 255, message = "O título deve ter no máximo 255 caracteres")
    private String titulo;

    @NotBlank(message = "A descrição não pode estar em branco")
    private String descricao;

    @NotNull(message = "O tipo de oportunidade não pode ser nulo")
    private TipoOportunidade tipoOportunidade;

    @NotBlank(message = "A empresa/organização responsável não pode estar em branco")
    @Size(max = 100, message = "O nome da empresa/organização deve ter no máximo 100 caracteres")
    private String empresaOuOrgResponsavel;

    @NotBlank(message = "A localização não pode estar em branco")
    @Size(max = 100, message = "A localização deve ter no máximo 100 caracteres")
    private String localizacao;

    @NotBlank(message = "Os requisitos de acessibilidade não podem estar em branco")
    private String requisitosAcessibilidade;

    @NotNull(message = "A data de publicação não pode ser nula")
    @jakarta.validation.constraints.PastOrPresent(message = "A data de publicação não pode ser futura")
    private LocalDate dataPublicacao;

    @NotBlank(message = "As informações de contato não podem estar em branco")
    @Size(max = 255, message = "O contato deve ter no máximo 255 caracteres")
    private String contato;

    // Construtor sem argumentos
    public OpportunityRequestDTO() {}

    // Construtor com todos os argumentos (opcional, mas bom para testes/inicialização)
    public OpportunityRequestDTO(String titulo, String descricao, TipoOportunidade tipoOportunidade,
                                 String empresaOuOrgResponsavel, String localizacao,
                                 String requisitosAcessibilidade, LocalDate dataPublicacao, String contato) {
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
    public String getTitulo() { return titulo; }
    public String getDescricao() { return descricao; }
    public TipoOportunidade getTipoOportunidade() { return tipoOportunidade; }
    public String getEmpresaOuOrgResponsavel() { return empresaOuOrgResponsavel; }
    public String getLocalizacao() { return localizacao; }
    public String getRequisitosAcessibilidade() { return requisitosAcessibilidade; }
    public LocalDate getDataPublicacao() { return dataPublicacao; }
    public String getContato() { return contato; }

    // Setters (gerar manualmente)
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public void setTipoOportunidade(TipoOportunidade tipoOportunidade) { this.tipoOportunidade = tipoOportunidade; }
    public void setEmpresaOuOrgResponsavel(String empresaOuOrgResponsavel) { this.empresaOuOrgResponsavel = empresaOuOrgResponsavel; }
    public void setLocalizacao(String localizacao) { this.localizacao = localizacao; }
    public void setRequisitosAcessibilidade(String requisitosAcessibilidade) { this.requisitosAcessibilidade = requisitosAcessibilidade; }
    public void setDataPublicacao(LocalDate dataPublicacao) { this.dataPublicacao = dataPublicacao; }
    public void setContato(String contato) { this.contato = contato; }
}