package com.conectainclusao.backend.dto;

import org.hibernate.validator.constraints.URL;

import com.conectainclusao.backend.model.TipoRecurso;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotNull;

public class HealthResourceRequestDTO {

    @NotBlank(message = "O nome do recurso de saúde não pode estar em branco")
    @Size(max = 255, message = "O nome deve ter no máximo 255 caracteres")
    private String nome;

    @NotNull(message = "O tipo do recurso não pode ser nulo")
    private TipoRecurso tipoRecurso;

    @Size(max = 255, message = "A especialidade deve ter no máximo 255 caracteres")
    private String especialidade;

    @NotBlank(message = "O endereço não pode estar em branco")
    @Size(max = 255, message = "O endereço deve ter no máximo 255 caracteres")
    private String endereco;

    @Size(max = 50, message = "O telefone deve ter no máximo 50 caracteres")
    @Pattern(regexp = "^[0-9\\s\\(\\)-]*$", message = "Formato de telefone inválido")
    private String telefone;

    @Size(max = 255, message = "O website deve ter no máximo 255 caracteres")
    @URL(message = "O formato do website é inválido")
    private String website;

    @NotBlank(message = "Os detalhes de acessibilidade não podem estar em branco")
    private String acessibilidadeDetalhes;

    @Size(max = 255, message = "O horário de funcionamento deve ter no máximo 255 caracteres")
    private String horarioFuncionamento;
    

    // Construtor sem argumentos
    public HealthResourceRequestDTO() {}

    // Construtor com todos os argumentos (opcional)
    public HealthResourceRequestDTO(String nome, TipoRecurso tipoRecurso, String especialidade, String endereco,
                                    String telefone, String website, String acessibilidadeDetalhes,
                                    String horarioFuncionamento) {
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
    public String getNome() { return nome; }
    public TipoRecurso getTipoRecurso() { return tipoRecurso; }
    public String getEspecialidade() { return especialidade; }
    public String getEndereco() { return endereco; }
    public String getTelefone() { return telefone; }
    public String getWebsite() { return website; }
    public String getAcessibilidadeDetalhes() { return acessibilidadeDetalhes; }
    public String getHorarioFuncionamento() { return horarioFuncionamento; }

    // Setters (gerar manualmente)
    public void setNome(String nome) { this.nome = nome; }
    public void setTipoRecurso(TipoRecurso tipoRecurso) { this.tipoRecurso = tipoRecurso; }
    public void setEspecialidade(String especialidade) { this.especialidade = especialidade; }
    public void setEndereco(String endereco) { this.endereco = endereco; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    public void setWebsite(String website) { this.website = website; }
    public void setAcessibilidadeDetalhes(String acessibilidadeDetalhes) { this.acessibilidadeDetalhes = acessibilidadeDetalhes; }
    public void setHorarioFuncionamento(String horarioFuncionamento) { this.horarioFuncionamento = horarioFuncionamento; }
}