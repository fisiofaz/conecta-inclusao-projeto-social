package com.conectainclusao.backend.dto;

public class AuthenticationResponseDTO {
    private String token;
    private String tipoPerfil;

    public AuthenticationResponseDTO() {
    }

    public AuthenticationResponseDTO(String token, String tipoPerfil) {
        this.token = token;
        this.tipoPerfil = tipoPerfil;
    }
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
    
    public String getTipoPerfil() {
        return tipoPerfil;
    }

    public void setTipoPerfil(String tipoPerfil) {
        this.tipoPerfil = tipoPerfil;
    }
}