package com.conectainclusao.backend.dto;

public class HealthResourceResponseDTO {
    private Long id;
    private String nome;
    private String tipoRecurso;
    private String especialidade;
    private String endereco;
    private String telefone;
    private String website;
    private String acessibilidadeDetalhes;
    private String horarioFuncionamento;

    // Construtor sem argumentos
    public HealthResourceResponseDTO() {}

    // Construtor com todos os argumentos (opcional)
    public HealthResourceResponseDTO(Long id, String nome, String tipoRecurso, String especialidade,
                                     String endereco, String telefone, String website,
                                     String acessibilidadeDetalhes, String horarioFuncionamento) {
        this.id = id;
        this.nome = nome;
        this.tipoRecurso = tipoRecurso;
        this.especialidade = especialidade;
        this.endereco = endereco;
        this.telefone = telefone;
        this.website = website;
        this.acessibilidadeDetalhes = acessibilidadeDetalhes;
        this.horarioFuncionamento = horarioFuncionamento;
    }

    // Getters (gerar manualmente)
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getTipoRecurso() { return tipoRecurso; }
    public String getEspecialidade() { return especialidade; }
    public String getEndereco() { return endereco; }
    public String getTelefone() { return telefone; }
    public String getWebsite() { return website; }
    public String getAcessibilidadeDetalhes() { return acessibilidadeDetalhes; }
    public String getHorarioFuncionamento() { return horarioFuncionamento; }

    // Setters (gerar manualmente)
    public void setId(Long id) { this.id = id; }
    public void setNome(String nome) { this.nome = nome; }
    public void setTipoRecurso(String tipoRecurso) { this.tipoRecurso = tipoRecurso; }
    public void setEspecialidade(String especialidade) { this.especialidade = especialidade; }
    public void setEndereco(String endereco) { this.endereco = endereco; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    public void setWebsite(String website) { this.website = website; }
    public void setAcessibilidadeDetalhes(String acessibilidadeDetalhes) { this.acessibilidadeDetalhes = acessibilidadeDetalhes; }
    public void setHorarioFuncionamento(String horarioFuncionamento) { this.horarioFuncionamento = horarioFuncionamento; }
}