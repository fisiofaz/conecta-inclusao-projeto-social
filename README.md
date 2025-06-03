# Conecta Inclusão - Plataforma de Impacto Social para PCDs

## Visão Geral do Projeto
Este projeto visa criar uma plataforma web para conectar Pessoas com Deficiência (PCDs) a oportunidades de emprego, recursos de saúde e bem-estar, e comunidades de apoio. O objetivo é promover a inclusão social e o crescimento profissional, alinhado aos Objetivos de Desenvolvimento Sustentável (ODS) da ONU: ODS 3 (Saúde e Bem-Estar), ODS 8 (Trabalho Decente e Crescimento Econômico) e ODS 16 (Paz, Justiça e Instituições Eficazes).

## Stack Tecnológica
* **Backend:** Spring Boot (Java 17), Spring MVC, Spring Data JPA, Spring Security
* **Frontend:** React
* **Banco de Dados:** PostgreSQL (local para desenvolvimento, Neon para deploy)
* **Controle de Versão:** Git / GitHub
* **Deploy:** Render (Backend), Netlify (Frontend), Neon (Banco de Dados)

## Como Rodar o Projeto (Backend)

### Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas:
* **Java Development Kit (JDK) 17 ou superior:** [Adoptium Temurin](https://adoptium.net/temurin/releases/)
* **Apache Maven Daemon (MVND) ou Apache Maven 3.9.x ou superior:** [Apache Maven Downloads](https://maven.apache.org/download.cgi)
* **PostgreSQL 16 ou superior:** [PostgreSQL Downloads](https://www.postgresql.org/download/windows/)
* **IDE:** Eclipse IDE for Enterprise Java and Web Developers (ou IntelliJ IDEA, VS Code com extensões Java/Spring)

### Configuração do Banco de Dados
1.  Instale o PostgreSQL localmente.
2.  Crie um banco de dados chamado `conecta_inclusao_db` (ou o nome que preferir) em sua instância local do PostgreSQL.
3.  No arquivo `src/main/resources/application.properties`, configure as credenciais do seu banco de dados local:
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/conecta_inclusao_db
    spring.datasource.username=postgres
    spring.datasource.password=SUA_SENHA_DO_POSTGRES
    # ... outras configurações JPA ...
    ```

### Executando o Backend
1.  Clone este repositório para o seu ambiente local.
2.  Navegue até a raiz do projeto `backend` no seu terminal.
3.  Execute a aplicação Spring Boot:
    ```bash
    mvnd spring-boot:run
    ```
    (Se você estiver usando Maven tradicional, use `mvn spring-boot:run`)
4.  A aplicação estará disponível em `http://localhost:8080` (porta padrão do Spring Boot).

### Segurança (Spring Security & JWT):
1.  Autenticação de usuários via JWT.
2.  Endpoint de login (POST /api/auth/login) para obtenção do token.
3. Senhas armazenadas criptografadas com BCrypt.
4. Rotas protegidas que exigem um token JWT válido no cabeçalho 
    ```bash
    Authorization: Bearer <token>
     ```.
5. Endpoints de cadastro (POST /api/users) e login abertos ao público.

## Próximos Passos
**Modelagem das Entidades:** Criar as classes Java (`Opportunity` e `ComplaintReport`) com seus atributos e anotações JPA.
**Criação dos Repositórios:** Definir as interfaces de repositório para cada entidade, utilizando o Spring Data JPA.
**Criação dos DTOs:** Desenvolver os DTOs de requisição e resposta para cada entidade, garantindo que as validações e os dados expostos/recebidos sejam apropriados.
**Criação dos Controllers:** Implementar os controllers RESTful para cada entidade, expondo os endpoints CRUD e aplicando as regras de segurança do Spring Security (como a necessidade de um token JWT para acessar certas operações).

**Desenvolvido por:** [Faábio André Zatta]