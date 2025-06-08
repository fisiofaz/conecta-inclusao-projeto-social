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

@Configuration
@EnableWebSecurity 
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    SecurityFilter securityFilter; 

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable()) // Desabilita CSRF para APIs REST sem sessão
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Sessão sem estado
                .authorizeHttpRequests(authorize -> authorize
                        // --- 1. ROTAS PUBLICAS (PERMITALL) ---
                        // Permite login e cadastro de novos usuários sem autenticação
                        .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/users").permitAll()

                        // Permite GETs (listagem e busca por ID) de oportunidades, denúncias e recursos de saúde para QUALQUER UM (mesmo não autenticado)
                        .requestMatchers(HttpMethod.GET, "/api/opportunities").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/opportunities/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/complaints").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/complaints/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/health-resources").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/health-resources/{id}").permitAll()

                        // --- 2. ROTAS PROTEGIDAS POR ROLE OU AUTENTICAÇÃO GERAL ---
                        
                        // Listar/Buscar Usuários exige autenticação
                        .requestMatchers(HttpMethod.GET, "/api/users").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/users/{id}").authenticated()
                        
                        // Criar Denúncias exige autenticação (qualquer usuário logado)
                        .requestMatchers(HttpMethod.POST, "/api/complaints").authenticated()
                        
                        // --- 3. ROTAS QUE EXIGEM ROLES ESPECÍFICAS (@PreAuthorize nos Controllers) ---
                        // Oportunidades: POST/PUT/DELETE exigem EMPRESA ou ADMIN
                        .requestMatchers(HttpMethod.POST, "/api/opportunities").hasAnyRole("EMPRESA", "ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/opportunities/{id}").hasAnyRole("EMPRESA", "ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/opportunities/{id}").hasAnyRole("EMPRESA", "ADMIN")
                        	
                    	// Denúncias: PUT/DELETE exigem ADMIN
                        .requestMatchers(HttpMethod.PUT, "/api/complaints/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/complaints/{id}").hasRole("ADMIN")

                        // Recursos de Saúde: POST/PUT/DELETE exigem ORGAO_APOIO ou ADMIN
                        
                        .requestMatchers(HttpMethod.POST, "/api/health-resources").hasAnyRole("ORGAO_APOIO", "ADMIN") // << ATENÇÃO A ESTA LINHA. Alterei de permitAll para hasAnyRole
                        .requestMatchers(HttpMethod.PUT, "/api/health-resources/{id}").hasAnyRole("ORGAO_APOIO", "ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/health-resources/{id}").hasAnyRole("ORGAO_APOIO", "ADMIN")

                        
                        // --- 4. REGRA CATCH-ALL ---                        
                        .anyRequest().authenticated()                       
                        
                )
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
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
        
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://127.0.0.1:5173"));
        
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        configuration.setAllowedHeaders(Collections.singletonList("*"));
       
        configuration.setAllowCredentials(true);
       
        configuration.setMaxAge(3600L); 

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}