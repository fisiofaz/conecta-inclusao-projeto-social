package com.conectainclusao.backend.security;

import com.conectainclusao.backend.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
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
    UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var token = this.recoverToken(request);
        if(token != null){
            var login = tokenService.validateToken(token);
            
            UserDetails userDetails = userRepository.findByEmail(login).orElse(null);
            
            if (userDetails != null) {
                
                var authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
               
                SecurityContextHolder.getContext().setAuthentication(authentication);
             // Adicione estas linhas para depuração:
                System.out.println("DEBUG: SecurityFilter - Usuário autenticado no contexto: " + userDetails.getUsername());
                System.out.println("DEBUG: SecurityFilter - Autoridades no contexto: " + userDetails.getAuthorities());
                System.out.println("DEBUG: SecurityFilter - Request URI: " + request.getRequestURI()); // Para ver qual URL está sendo processada
            }
        }
        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request){
        var authHeader = request.getHeader("Authorization");
        if(authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }
}