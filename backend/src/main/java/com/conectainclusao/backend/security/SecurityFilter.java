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

    @Autowired
    AuthorizationService authorizationService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, 
                                    @NonNull HttpServletResponse response, 
                                    @NonNull FilterChain filterChain) 
            throws ServletException, IOException {

        var token = this.recoverToken(request);

        try {
            if (token != null) {
                var login = tokenService.validateToken(token);

                if (login != null) {
                    UserDetails userDetails = authorizationService.loadUserByUsername(login);

                    if (userDetails != null) {
                        var authentication = new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(authentication);

                        System.out.println(String.format(
                            "DEBUG: SecurityFilter - Auth OK! User: %s | Authorities: %s | URI: %s",
                            userDetails.getUsername(),
                            userDetails.getAuthorities(),
                            request.getRequestURI()
                        ));
                    } else {
                        System.out.println("DEBUG: SecurityFilter - User not found for login: " + login);
                    }
                } else {
                    // Token inválido ou expirado, mas não bloqueia rotas públicas
                    System.out.println("DEBUG: SecurityFilter - Token inválido ou expirado, mas rota pública: " 
                        + request.getRequestURI());
                }
            }
        } catch (Exception e) {
            // Qualquer exceção durante validação não bloqueia rotas públicas
            System.out.println("DEBUG: SecurityFilter - Erro ao validar token (ignorado para rota pública): " + e.getMessage());
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

