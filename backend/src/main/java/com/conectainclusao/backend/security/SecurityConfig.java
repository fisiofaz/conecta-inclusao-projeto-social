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

@Configuration
@EnableWebSecurity 
public class SecurityConfig {

    @Autowired
    SecurityFilter securityFilter; 

    @Bean 
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable()) 
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) 
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll() 
                        .requestMatchers(HttpMethod.POST, "/api/users").permitAll()                                               
                        .requestMatchers(HttpMethod.GET, "/api/opportunities").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/opportunities/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/complaints").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/complaints/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/health-resources").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/health-resources/{id}").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/health-resources").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/health-resources").hasRole("USER")
                        .requestMatchers(HttpMethod.PUT, "/api/health-resources/{id}").hasRole("USER")
                        .requestMatchers(HttpMethod.DELETE, "/api/health-resources/{id}").hasRole("USER")
                        .requestMatchers(HttpMethod.POST, "/api/opportunities").hasRole("USER")
                        .requestMatchers(HttpMethod.PUT, "/api/opportunities/{id}").hasRole("USER")
                        .requestMatchers(HttpMethod.DELETE, "/api/opportunities/{id}").hasRole("USER")
                        .requestMatchers(HttpMethod.POST, "/api/complaints").hasRole("USER")
                        .requestMatchers(HttpMethod.PUT, "/api/complaints/{id}").hasRole("USER")
                        .requestMatchers(HttpMethod.DELETE, "/api/complaints/{id}").hasRole("USER")
                        .anyRequest().authenticated() 
                )
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Adiciona esta linha
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