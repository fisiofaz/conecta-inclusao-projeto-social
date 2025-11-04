package com.conectainclusao.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;

@SpringBootApplication

// Define as informações gerais da sua API
@OpenAPIDefinition(
	info = @Info(
		title = "Conecta Inclusão API", 
		version = "1.0", 
		description = "API para o projeto Conecta Inclusão, conectando PCDs a oportunidades."
	),
 // Aplica o cadeado de segurança em TODOS os endpoints (pode ser refinado depois)
	security = @SecurityRequirement(name = "bearerAuth") 
)
//Define o que é o "bearerAuth": um token JWT (Bearer)
@SecurityScheme(
	name = "bearerAuth",
	type = SecuritySchemeType.HTTP,
	scheme = "bearer",
	bearerFormat = "JWT"
)

public class ConectaInclusaoBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConectaInclusaoBackendApplication.class, args);
	}

}
