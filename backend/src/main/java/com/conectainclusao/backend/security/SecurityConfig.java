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

    private final SecurityFilter securityFilter;
    
    private static final String[] SWAGGER_WHITELIST = {
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui.html"
    };

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
                		
                		.requestMatchers(SWAGGER_WHITELIST).permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() 
                        
                        // Permite login e registro
                        .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/register").permitAll() 

                        // Permite GETs públicos para visualização
                        .requestMatchers(HttpMethod.GET, "/api/search").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/opportunities", "/api/opportunities/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/complaints", "/api/complaints/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/health-resources", "/api/health-resources/**").permitAll()
                        
                        // Rota pública para LER avaliações
                        .requestMatchers(HttpMethod.GET, "/api/reviews/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/inclusion-score/**").permitAll()
                        
                        // --- 2. ROTAS AUTENTICADAS (NÍVEL GERAL) ---
                        // (Rotas que exigem login, mas qualquer perfil pode acessar)                        
                        .requestMatchers(HttpMethod.POST, "/api/complaints").authenticated() 
                        .requestMatchers(HttpMethod.GET, "/api/auth/profile").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/complaints/my-complaints").authenticated()
                        
                        // Rotas de Favoritos Simplificado 
                        .requestMatchers("/api/favorites/**").authenticated()
                        
                        // Rotas de Candidaturas Simplificado
                        .requestMatchers("/api/candidaturas/**").authenticated()
                        
                        // Rotas de Avaliação Privadas
                        .requestMatchers(HttpMethod.POST, "/api/reviews").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/reviews/my-reviews").authenticated()
                        
                        // --- 3. ROTAS COM AUTORIZAÇÃO ESPECÍFICA (ROLE/AUTHORITY) ---
                        // (Rotas que exigem perfis específicos)

                        // Gerenciamento de Usuários (só ADMIN)
                        .requestMatchers(HttpMethod.GET, "/api/users", "/api/users/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/users/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/users/**").hasAuthority("ROLE_ADMIN")
                        
                        // Gerenciamento de Oportunidades (EMPRESA ou ADMIN)
                        .requestMatchers(HttpMethod.POST, "/api/opportunities").hasAnyAuthority("ROLE_EMPRESA", "ROLE_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/opportunities/**").hasAnyAuthority("ROLE_EMPRESA", "ROLE_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/opportunities/**").hasAnyAuthority("ROLE_EMPRESA", "ROLE_ADMIN")

                        // Gerenciamento de Denúncias (só ADMIN)
                        .requestMatchers(HttpMethod.PUT, "/api/complaints/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/complaints/**").hasAuthority("ROLE_ADMIN")

                        // Gerenciamento de Recursos de Saúde (ORGAO_APOIO ou ADMIN)
                        .requestMatchers(HttpMethod.POST, "/api/health-resources").hasAnyAuthority("ROLE_ORGAO_APOIO", "ROLE_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/health-resources/**").hasAnyAuthority("ROLE_ORGAO_APOIO", "ROLE_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/health-resources/**").hasAnyAuthority("ROLE_ORGAO_APOIO", "ROLE_ADMIN")
                        
                        // --- 4. REGRA CATCH-ALL ---
                        // Qualquer outra rota não listada acima exige autenticação
                        .anyRequest().authenticated() 
                )
                .cors(Customizer.withDefaults()) // Usa o Bean corsConfigurationSource
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
    
    // O seu Bean de CORS (que já permite OPTIONS)
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Em vez de especificar origens, vamos permitir todas para este teste
        configuration.setAllowedOrigins(Collections.singletonList("https://inclusaosocial.netlify.app"));
        
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type")); // Ser explícito
        configuration.setAllowCredentials(true); // Manter para requisições autenticadas

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}