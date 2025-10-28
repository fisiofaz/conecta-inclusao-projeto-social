package com.conectainclusao.backend.security;

import java.util.Arrays; // <<< ADICIONADO IMPORT FALTANTE
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

    private final SecurityFilter securityFilter;

    @Autowired
    public SecurityConfig(SecurityFilter securityFilter) {
        this.securityFilter = securityFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable()) 
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) 
                .authorizeHttpRequests(authorize -> authorize
                	    // --- 1. ROTAS PÚBLICAS (PERMITALL) ---

                	    // PERMITE REQUISIÇÕES 'OPTIONS' (CRUCIAL PARA CORS)
                	    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() 

                	    // PERMITE LOGIN E REGISTRO EXPLÍCITOS
                	    .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                	    .requestMatchers(HttpMethod.POST, "/api/auth/register").permitAll()

                	    // PERMITE BUSCAS PÚBLICAS
                	    .requestMatchers(HttpMethod.GET, "/api/opportunities", "/api/opportunities/**").permitAll()
                	    .requestMatchers(HttpMethod.GET, "/api/complaints", "/api/complaints/**").permitAll() 
                	    .requestMatchers(HttpMethod.GET, "/api/health-resources", "/api/health-resources/**").permitAll()
                	    .requestMatchers(HttpMethod.GET, "/api/search").permitAll()

                	    // --- 2. QUALQUER OUTRA ROTA EXIGE AUTENTICAÇÃO ---
                	    .anyRequest().authenticated() 
                	)
                .cors(Customizer.withDefaults())// Usa o Bean corsConfigurationSource
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    // ... (O resto do arquivo - AuthenticationManager, PasswordEncoder, CorsConfigurationSource - continua igual) ...
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
        
        // 👇 A LINHA CRUCIAL ESTÁ AQUI 👇
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        configuration.setAllowedHeaders(Collections.singletonList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L); 

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}