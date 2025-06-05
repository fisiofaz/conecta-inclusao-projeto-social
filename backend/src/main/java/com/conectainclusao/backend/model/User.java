package com.conectainclusao.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonFormat;

import org.springframework.security.core.GrantedAuthority; 
import org.springframework.security.core.authority.SimpleGrantedAuthority; 
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome não pode estar em branco")
    @Size(max = 100, message = "O nome deve ter no máximo 100 caracteres")
    @Column(nullable = false, length = 100)
    private String nome;

    @NotBlank(message = "O email não pode estar em branco")
    @Email(message = "Formato de email inválido")
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @NotBlank(message = "A senha não pode estar em branco")
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
    @Column(nullable = false, length = 255)
    private String senha;

    @Column(nullable = false, length = 50)
    private String tipoPerfil;
    
  
    @Column
    private LocalDate dataNascimento;

    @Column(length = 50)
    private String deficiencia;

    @Column(length = 50)
    private String cidade;

    @Column(length = 50)
    private String estado;

    @Column(length = 500)
    private String bio;

    // Construtor sem argumentos (NoArgsConstructor)
    public User() {
    }

    // Construtor com todos os argumentos (AllArgsConstructor)
    public User(Long id, String nome, String email, String senha, String tipoPerfil, LocalDate dataNascimento,
                String deficiencia, String cidade, String estado, String bio) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.tipoPerfil = tipoPerfil;
        this.dataNascimento = dataNascimento;
        this.deficiencia = deficiencia;
        this.cidade = cidade;
        this.estado = estado;
        this.bio = bio;
    }
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {        
    	if (this.tipoPerfil != null && Objects.equals(this.tipoPerfil, "ADMIN")) {
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        } else {
            return List.of(new SimpleGrantedAuthority("ROLE_USER"));
        }
    }
    
    @Override
    public String getPassword() {
        return this.senha;
    }
    
    @Override
    public String getUsername() {
        return this.email;
    }
      
    @Override
    public boolean isAccountNonExpired() {
        return true; 
    }
    
    @Override
    public boolean isAccountNonLocked() {
        return true; 
    }
    
    @Override
    public boolean isCredentialsNonExpired() {
        return true; 
    }
    
    @Override
    public boolean isEnabled() {
        return true; 
    }

 // --- Getters e Setters 
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
    public String getTipoPerfil() { return tipoPerfil; }
    public void setTipoPerfil(String tipoPerfil) { this.tipoPerfil = tipoPerfil; }
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