package com.conectainclusao.backend.security;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity; 
import org.springframework.security.config.Customizer;

@Configuration
@EnableWebSecurity 
@EnableMethodSecurity
public class SecurityConfig {

    // Injeção via construtor
    private final SecurityFilter securityFilter;
    
    @Autowired // Opcional no construtor
    public SecurityConfig(SecurityFilter securityFilter) {
        this.securityFilter = securityFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable()) // Desabilita CSRF para APIs REST sem sessão
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Sessão sem estado
                .authorizeHttpRequests(authorize -> authorize
                		 // --- 1. ROTAS PUBLICAS (PERMITALL) ---
                		.requestMatchers("/api/auth/**").permitAll() // Login e Registro
                        .requestMatchers(HttpMethod.GET, "/api/opportunities", "/api/opportunities/**").permitAll() // Ver Oportunidades
                        .requestMatchers(HttpMethod.GET, "/api/complaints", "/api/complaints/**").permitAll() // Ver Denúncias
                        .requestMatchers(HttpMethod.GET, "/api/health-resources", "/api/health-resources/**").permitAll() // Ver Recursos
                        .requestMatchers(HttpMethod.GET, "/api/search").permitAll()
                        .requestMatchers("/api/auth/profile").authenticated()// Busca pública
                        
                        // --- QUALQUER OUTRA ROTA EXIGE AUTENTICAÇÃO ---
                        // A verificação específica de ROLE será feita via @PreAuthorize nos controllers/services
                        .anyRequest().authenticated()
                        
                )
                // Usar a configuração CORS definida no Bean corsConfigurationSource
                .cors(Customizer.withDefaults()) // Simplifica a aplicação da config CORS do Bean
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean 
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean 
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        configuration.setAllowedOrigins(Arrays.asList(
        	    "http://localhost:5173",
        	    "http://127.0.0.1:5173",
        	    "https://inclusaosocial.netlify.app"
        ));
        
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        configuration.setAllowedHeaders(Collections.singletonList("*"));
       
        configuration.setAllowCredentials(true);
       
        configuration.setMaxAge(3600L); 

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}