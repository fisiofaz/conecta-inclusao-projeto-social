package com.conectainclusao.backend.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.conectainclusao.backend.model.User;
import org.springframework.beans.factory.annotation.Value;
import java.time.temporal.ChronoUnit;
import org.springframework.stereotype.Service;
import org.springframework.security.core.GrantedAuthority;
import java.util.List;
import java.time.Instant;

@Service
public class TokenService {
	
	@Value("${api.security.token.secret}")
	private String secret;
  
    public String generateToken(User user) {
        try {
        	
            Algorithm algorithm = Algorithm.HMAC512(secret);

            // Converte as "authorities" do usuário (que são objetos) para uma lista de Strings
            List<String> roles = user.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList();

            String token = JWT.create()
                    .withIssuer("conecta-inclusao-backend")
                    .withSubject(user.getEmail())
                    .withExpiresAt(genExpirationDate())
                    .withClaim("roles", roles) // ADICIONA O CLAIM "roles" COM A LISTA
                    .sign(algorithm); 
            return token;
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Erro ao gerar token JWT", exception);
        }
    }
    
    public String validateToken(String token) {
        try {
        	
            Algorithm algorithm = Algorithm.HMAC512(secret);
            return JWT.require(algorithm)
                    .withIssuer("conecta-inclusao-backend")
                    .build()
                    .verify(token) // Verifica a validade do token
                    .getSubject(); // Retorna o assunto (email do usuário)
        } catch (JWTVerificationException exception){
            return null; // Token inválido
        }
    }

    // Novo método para extrair as roles
    public List<String> getRolesFromToken(String token) {
    	
        try {
            Algorithm algorithm = Algorithm.HMAC512(secret);
            return JWT.require(algorithm)
                    .withIssuer("conecta-inclusao-backend")
                    .build()
                    .verify(token)
                    .getClaim("roles") // Pega o claim "roles"
                    .asList(String.class); // Converte para uma Lista de Strings
        } catch (JWTVerificationException exception){
            return null; // Token inválido
        }
    }

    private Instant genExpirationDate() {
        return Instant.now().plus(2, ChronoUnit.HOURS);
    }
}