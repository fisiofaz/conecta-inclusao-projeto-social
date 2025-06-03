package com.conectainclusao.backend.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.conectainclusao.backend.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${api.security.token.secret}") // O segredo será lido do application.properties
    private String secret;

    public String generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()
                    .withIssuer("conecta-inclusao-backend") // Emissor do token
                    .withSubject(user.getEmail()) // Assunto (geralmente o identificador único do usuário)
                    .withExpiresAt(genExpirationDate()) // Data de expiração
                    .sign(algorithm); // Assina o token com o algoritmo e o segredo
            return token;
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Erro ao gerar token JWT", exception);
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("conecta-inclusao-backend")
                    .build()
                    .verify(token) // Verifica a validade do token
                    .getSubject(); // Retorna o assunto (email do usuário)
        } catch (JWTVerificationException exception){
            return ""; // Token inválido
        }
    }

    private Instant genExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}