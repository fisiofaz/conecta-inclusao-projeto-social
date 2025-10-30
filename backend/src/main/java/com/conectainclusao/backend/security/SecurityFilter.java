package com.conectainclusao.backend.security;


// IMPORTS ADICIONADOS
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.List;
// FIM DOS IMPORTS ADICIONADOS

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

    // O AuthorizationService foi REMOVIDO daqui

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        var token = this.recoverToken(request);

        if (token != null) {
            System.out.println("DEBUG (NÍVEL 1): Token RECUPERADO. Verificando..."); // <-- NOVO LOG
            System.out.println("DEBUG (NÍVEL 1.5): O token recebido é: [" + token + "]");
            try {
                var login = tokenService.validateToken(token); // Pega o Email
                System.out.println("DEBUG (NÍVEL 2): Login extraído: " + login); // <-- NOVO LOG
                

                List<String> roles = tokenService.getRolesFromToken(token); // Pega as ROLES
                System.out.println("DEBUG (NÍVEL 3): Roles extraídas: " + roles); // <-- NOVO LOG

                if (login != null && roles != null) { 
                    System.out.println("DEBUG (NÍVEL 4): Autenticação VAI COMEÇAR."); // <-- NOVO LOG

                    var authorities = roles.stream()
                            .map(SimpleGrantedAuthority::new)
                            .toList();

                    UserDetails userDetails = new org.springframework.security.core.userdetails.User(login, "", authorities);

                    var authentication = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());

                    SecurityContextHolder.getContext().setAuthentication(authentication);

                    System.out.println(String.format( // O log antigo
                       "DEBUG (FINAL): SecurityFilter - Auth OK! User: %s | Authorities: %s | URI: %s",
                       userDetails.getUsername(), userDetails.getAuthorities(), request.getRequestURI()
                    ));
                } else {
                     System.out.println("DEBUG (FALHA): O login ou as roles são NULOS. Pulando autenticação."); // <-- NOVO LOG
                }

            } catch (Exception e) {
                SecurityContextHolder.clearContext();
                System.out.println("DEBUG (ERRO): Token JWT inválido ou expirado: " + e.getMessage()); // <-- LOG DE ERRO
            }
        } else {
             System.out.println("DEBUG (FALHA): Token é NULO. Nenhum header 'Authorization' encontrado."); // <-- NOVO LOG
        }

        // Continua o fluxo da requisição
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
