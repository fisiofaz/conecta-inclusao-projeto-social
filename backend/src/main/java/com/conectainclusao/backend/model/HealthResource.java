package com.conectainclusao.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table; 
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "health_resources")
public class HealthResource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome do recurso de saúde não pode estar em branco")
    @Size(max = 255, message = "O nome deve ter no máximo 255 caracteres")
    @Column(nullable = false, length = 255)
    private String nome;

    @NotBlank(message = "O tipo do recurso de saúde não pode estar em branco")
    @Size(max = 100, message = "O tipo deve ter no máximo 100 caracteres")
    @Column(nullable = false, length = 100)
    private String tipoRecurso; 

    @Size(max = 255, message = "A especialidade deve ter no máximo 255 caracteres")
    @Column(length = 255)
    private String especialidade; 

    @NotBlank(message = "O endereço não pode estar em branco")
    @Size(max = 255, message = "O endereço deve ter no máximo 255 caracteres")
    @Column(nullable = false, length = 255)
    private String endereco;

    @Size(max = 50, message = "O telefone deve ter no máximo 50 caracteres")
    @Column(length = 50)
    private String telefone;

    @Size(max = 255, message = "O website deve ter no máximo 255 caracteres")
    @Column(length = 255)
    private String website;

    @NotBlank(message = "Os detalhes de acessibilidade não podem estar em branco")
    @Column(nullable = false, columnDefinition = "TEXT") 
    private String acessibilidadeDetalhes; 

    @Size(max = 255, message = "O horário de funcionamento deve ter no máximo 255 caracteres")
    @Column(length = 255)
    private String horarioFuncionamento;

    // Construtor sem argumentos
    public HealthResource() {}

    // Construtor com todos os argumentos
    public HealthResource(Long id, String nome, String tipoRecurso, String especialidade,
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