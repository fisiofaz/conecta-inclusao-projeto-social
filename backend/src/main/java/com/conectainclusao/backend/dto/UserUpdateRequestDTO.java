package com.conectainclusao.backend.dto;

import com.conectainclusao.backend.model.PerfilUsuario; 
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public class UserUpdateRequestDTO {

    @NotBlank(message = "O nome não pode estar em branco")
    @Size(max = 100)
    private String nome;

    @NotBlank(message = "O email não pode estar em branco")
    @Email(message = "Formato de email inválido")
    private String email;

    // 👇 SENHA OPCIONAL NA ATUALIZAÇÃO 👇
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres") // Apenas valida o tamanho SE fornecida
    private String senha; // SEM @NotBlank

    @NotNull(message = "O tipo de perfil não pode ser nulo") // Usar Enum
    private PerfilUsuario tipoPerfil; 

    @Past(message = "A data de nascimento deve ser no passado")
    private LocalDate dataNascimento;

    @Size(max = 50)
    private String deficiencia;

    @Size(max = 50)
    private String cidade;

    @Size(max = 50)
    private String estado;

    @Size(max = 500)
    private String bio;

    // Construtor, Getters, Setters (Gere automaticamente ou copie/adapte, usando PerfilUsuario)
     public UserUpdateRequestDTO() {}

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