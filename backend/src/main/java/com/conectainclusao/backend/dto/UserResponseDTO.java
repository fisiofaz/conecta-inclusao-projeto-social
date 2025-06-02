package com.conectainclusao.backend.dto;

import java.time.LocalDate;

public class UserResponseDTO {
    private Long id;
    private String nome;
    private String email;
    private String tipoPerfil;
    private LocalDate dataNascimento;
    private String deficiencia;
    private String cidade;
    private String estado;
    private String bio;

    // Construtor sem argumentos
    public UserResponseDTO() {
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getTipoPerfil() {
        return tipoPerfil;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public String getDeficiencia() {
        return deficiencia;
    }

    public String getCidade() {
        return cidade;
    }

    public String getEstado() {
        return estado;
    }

    public String getBio() {
        return bio;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setTipoPerfil(String tipoPerfil) {
        this.tipoPerfil = tipoPerfil;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public void setDeficiencia(String deficiencia) {
        this.deficiencia = deficiencia;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}