# Conecta Inclusão - Plataforma de Impacto Social para PCDs

## Visão Geral do Projeto
Este projeto visa criar uma plataforma web para conectar Pessoas com Deficiência (PCDs) a oportunidades de emprego, recursos de saúde e bem-estar, e comunidades de apoio. O objetivo é promover a inclusão social e o crescimento profissional, alinhado aos Objetivos de Desenvolvimento Sustentável (ODS) da ONU: ODS 3 (Saúde e Bem-Estar), ODS 8 (Trabalho Decente e Crescimento Econômico) e ODS 16 (Paz, Justiça e Instituições Eficazes).

## Stack Tecnológica
* **Backend:** Spring Boot (Java 17), Spring MVC, Spring Data JPA, Spring Security, PostgreSQL
* **Frontend:** React (com Vite, Axios, React Router DOM)
* **Banco de Dados:** PostgreSQL (local para desenvolvimento, Neon para deploy)
* **Controle de Versão:** Git / GitHub
* **Deploy (Futuro):** Render (Backend), Netlify (Frontend), Neon (Banco de Dados)
* **Postaman:** Teste de API

## Funcionalidades Implementadas

### Backend (Status: ✅ Completo e Testado Localmente)
* **Gerenciamento de Usuários (`/api/users`):**
    * CRUD completo (Criar, Listar, Buscar por ID, Atualizar, Excluir).
    * Cadastro de usuários (`POST /api/users`) e login (`POST /api/auth/login`) acessíveis publicamente.
* **Segurança Robusta:**
    * Autenticação e Autorização baseadas em **JSON Web Tokens (JWT)**.
    * Senhas armazenadas de forma segura com criptografia BCrypt.
    * Rotas protegidas que exigem token JWT válido para acesso (`Authorization: Bearer <token>`).
    * Configuração global de CORS para permitir comunicação com o frontend.
* **Gerenciamento de Oportunidades (`/api/opportunities`):**
    * CRUD completo (Criar, Listar, Buscar por ID, Atualizar, Excluir).
    * Listagem e busca por ID são acessíveis publicamente (`GET /api/opportunities`, `GET /api/opportunities/{id}`).
    * Criação, atualização e exclusão (`POST`, `PUT`, `DELETE`) exigem autenticação JWT.
* **Gerenciamento de Denúncias/Relatos (`/api/complaints`):**
    * CRUD completo (Criar, Listar, Buscar por ID, Atualizar, Excluir).
    * Listagem e busca por ID são acessíveis publicamente (`GET /api/complaints`, `GET /api/complaints/{id}`).
    * Criação, atualização e exclusão (`POST`, `PUT`, `DELETE`) exigem autenticação JWT, com o ID do usuário logado sendo anexado automaticamente na criação.

### Teste de API (Status: ✅ Completo e Testado Localmente)
[Lick dos Teste de API no Postman}(https://documenter.getpostman.com/view/14093940/2sB2x2HtSk)

### Frontend (Status: ✅ Funcionalidade Básica Concluída Localmente)
* **Estrutura da Aplicação:**
    * Projeto React inicializado com Vite.
    * Estrutura de pastas organizada (`src/components`, `src/pages`, `src/services`, `src/assets`, etc.).
    * Roteamento de página configurado com `react-router-dom`.
* **Módulos de Autenticação:**
    * **Tela de Registro (`/register`):** Formulário funcional para cadastro de novos usuários, conectando-se ao backend.
    * **Tela de Login (`/login`):** Formulário funcional para autenticação de usuários, obtendo e armazenando o token JWT no `localStorage`.
* **Visualização de Dados:**
    * **Lista de Oportunidades (`/opportunities`):** Exibe uma lista de oportunidades disponíveis, buscando dados do backend.
    * **Detalhes da Oportunidade (`/opportunities/:id`):** Exibe informações detalhadas de uma oportunidade específica.
    * **Lista de Denúncias/Relatos (`/complaints`):** Exibe uma lista de denúncias registradas, buscando dados do backend.
    * **Detalhes da Denúncia/Relato (`/complaints/:id`):** Exibe informações detalhadas de uma denúncia específica.

## Como Rodar o Projeto

### Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas:
* **Backend:**
    * Java Development Kit (JDK) 17 ou superior.
    * Apache Maven 3.9.x ou superior.
    * PostgreSQL 16 ou superior.
    * IDE: Eclipse IDE for Enterprise Java and Web Developers.
* **Frontend:**
    * Node.js (versão LTS ou superior).
    * npm (Node Package Manager).
    * IDE: Visual Studio Code.

### Configuração do Banco de Dados (PostgreSQL)
1.  Instale e inicie o servidor PostgreSQL localmente.
2.  Crie um banco de dados, por exemplo, `conecta_inclusao_db`.
3.  No arquivo `backend/src/main/resources/application.properties`, configure as credenciais:
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/conecta_inclusao_db
    spring.datasource.username=postgres
    spring.datasource.password=SUA_SENHA_DO_POSTGRES
    server.port=8081 # Ou a porta que você configurou
    api.security.token.secret=SEU_SEGREDO_LONGO_E_COMPLEXO
    # ... outras configurações JPA ...
    ```

### Executando o Backend
1.  Abra a pasta `backend` do projeto no Eclipse.
2.  Faça `Project > Clean...` e `Project > Build Project`.
3.  Clique com o botão direito no arquivo `ConectaInclusaoBackendApplication.java` e selecione `Run As > Spring Boot App`.
4.  Confirme no console que o servidor Tomcat iniciou na porta configurada (ex: 8081).

### Executando o Frontend
1.  Navegue até a pasta `conectainclusao-frontend` no seu terminal.
2.  Instale as dependências do projeto: `npm install`
3.  Inicie o servidor de desenvolvimento: `npm run dev`
4.  A aplicação React estará disponível em `http://localhost:5173/` (ou a porta que o Vite indicar no terminal).

### Teste de Comunicação Frontend-Backend
* Acesse `http://localhost:5173/register` e tente cadastrar um novo usuário.
* Acesse `http://localhost:5173/login` e tente fazer login com o usuário cadastrado.
* Navegue para `/opportunities` e `/complaints` para ver as listas de dados do backend.

---

**Desenvolvido por:** [Fábio André Zatta]
