# --- Fase de Build (Constrói o JAR executável) ---
FROM maven:3.8.5-openjdk-17 AS builder

WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean install -DskipTests

# --- Fase de Runtime (Executa o JAR) ---
# Use eclipse-temurin para a imagem JRE, que é mais robusta e confiável
FROM eclipse-temurin:17-jre-focal

# Define o diretório de trabalho
WORKDIR /app

# Copia o JAR executável da fase de build
COPY --from=builder /app/target/*.jar app.jar

# Expõe a porta em que a aplicação Spring Boot irá rodar (8081, como configuramos)
EXPOSE 8081

# Comando para rodar a aplicação quando o contêiner for iniciado
ENTRYPOINT ["java", "-jar", "app.jar"]
