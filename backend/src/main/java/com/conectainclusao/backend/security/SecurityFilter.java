package com.conectainclusao.backend.security;


import com.conectainclusao.backend.service.AuthorizationService; 
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    TokenService tokenService;

    // --- PASSO 1: Injetar o AuthorizationService (DE VOLTA) ---
    @Autowired
    AuthorizationService authorizationService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, 
                                    @NonNull HttpServletResponse response, 
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        var token = this.recoverToken(request);

        if (token != null) {
            try {
                // 1. Validamos o token (o bug do fuso horário JÁ FOI CORRIGIDO no TokenService)
                var login = tokenService.validateToken(token); // Pega o Email

                if (login != null) {
                    // 2. Usamos o email para buscar o USUÁRIO REAL no banco
                    // Isso retorna o (com.conectainclusao.backend.model.User)
                    UserDetails userDetails = authorizationService.loadUserByUsername(login);

                    if (userDetails != null) {
                        // 3. Agora o 'userDetails' é o usuário REAL, e o cast no controller vai funcionar
                        var authentication = new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            } catch (Exception e) {
                // Token inválido (expirado, assinatura errada, etc)
                SecurityContextHolder.clearContext();
                // System.out.println("DEBUG (SecurityFilter): Token JWT inválido ou expirado: " + e.getMessage());
            }
        }

        // Continua normalmente o fluxo da requisição
        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        return authHeader.replace("Bearer ", "");
    }
}