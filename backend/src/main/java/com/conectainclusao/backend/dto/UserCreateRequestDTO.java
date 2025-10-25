package com.conectainclusao.backend.dto;

import com.conectainclusao.backend.model.PerfilUsuario; 
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past; 
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public class UserCreateRequestDTO {

    @NotBlank(message = "O nome não pode estar em branco")
    @Size(max = 100)
    private String nome;

    @NotBlank(message = "O email não pode estar em branco")
    @Email(message = "Formato de email inválido")
    private String email;

    @NotBlank(message = "A senha não pode estar em branco") // Senha Obrigatória
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
    private String senha;

    @NotNull(message = "O tipo de perfil não pode ser nulo") // Usar Enum
    private PerfilUsuario tipoPerfil; 

    @Past(message = "A data de nascimento deve ser no passado") // Validação de Data
    private LocalDate dataNascimento; // Pode ser nulo se for opcional? Se sim, remova @NotNull implícito de @Past

    @Size(max = 50, message = "Deficiência - Máximo 50 caracteres") // Adicionando Size
    private String deficiencia;

    @Size(max = 50, message = "Cidade - Máximo 50 caracteres") // Adicionando Size
    private String cidade;

    @Size(max = 50, message = "Estado - Máximo 50 caracteres") // Adicionando Size
    private String estado;

    @Size(max = 500, message = "Bio - Máximo 500 caracteres") // Adicionando Size
    private String bio;

    // Construtor, Getters, Setters (Gere automaticamente ou copie/adapte do UserRequestDTO original, usando PerfilUsuario)
    public UserCreateRequestDTO() {}
    
    // Getters e Setters para todos os campos...
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
    public PerfilUsuario getTipoPerfil() { return tipoPerfil; }
    public void setTipoPerfil(PerfilUsuario tipoPerfil) { this.tipoPerfil = tipoPerfil; }
    public LocalDate getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(LocalDate dataNascimento) { this.dataNascimento = dataNascimento; }
    public String getDeficiencia() { return deficiencia; }
    public void setDeficiencia(String deficiencia) { this.deficiencia = deficiencia; }
    public String getCidade() { return cidade; }
    public void setCidade(String cidade) { this.cidade = cidade; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
}