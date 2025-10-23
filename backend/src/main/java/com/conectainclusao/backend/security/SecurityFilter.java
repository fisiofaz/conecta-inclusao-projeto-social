package com.conectainclusao.backend.security;

import com.conectainclusao.backend.repository.UserRepository;
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
    AuthorizationService authorizationService; // Use the UserDetailsService

    // No need to inject UserRepository directly here if AuthorizationService uses it
    // @Autowired
    // UserRepository userRepository; 

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, 
                                    @NonNull HttpServletResponse response, 
                                    @NonNull FilterChain filterChain) 
            throws ServletException, IOException {
        
        var token = this.recoverToken(request);
        
        if (token != null) {
            var login = tokenService.validateToken(token); 

            if (login != null) { 
                UserDetails userDetails = authorizationService.loadUserByUsername(login); 

                if (userDetails != null) {

                    var authentication = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                   
                    SecurityContextHolder.getContext().setAuthentication(authentication);

                    System.out.println("DEBUG: SecurityFilter - User authenticated: " + userDetails.getUsername());
                    System.out.println("DEBUG: SecurityFilter - Authorities: " + userDetails.getAuthorities());
                } else {
                     System.out.println("DEBUG: SecurityFilter - User not found for login: " + login);
                }
            } else {
                 System.out.println("DEBUG: SecurityFilter - Invalid or expired token received.");
            }
        }
        
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