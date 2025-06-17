# Conecta Inclusão - Plataforma de Impacto Social para PCDs

## Visão Geral do Projeto
Este projeto visa criar uma plataforma web para conectar Pessoas com Deficiência (PCDs) a oportunidades de emprego, recursos de saúde e bem-estar, e comunidades de apoio. O objetivo é promover a inclusão social e o crescimento profissional, alinhado aos Objetivos de Desenvolvimento Sustentável (ODS) da ONU: ODS 3 (Saúde e Bem-Estar), ODS 8 (Trabalho Decente e Crescimento Econômico) e ODS 16 (Paz, Justiça e Instituições Eficazes).

## Stack Tecnológica
* **Backend:** Spring Boot (Java 17), Spring MVC, Spring Data JPA, Spring Security, PostgreSQL
* **Frontend:** React (com Vite, Axios, React Router DOM) e Tailwind CSS
* **Banco de Dados:** PostgreSQL (local para desenvolvimento, Neon para deploy)
* **Docker:** Empacotamento do projeto
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

### Frontend (Status: ✅ Funcionalidade e Estilização Concluídas Localmente)
* **Estrutura da Aplicação:**
    * Projeto React inicializado com Vite.
    * Estrutura de pastas organizada (`src/components`, `src/pages`, `src/services`, `src/assets`, etc.).
    * Roteamento de página configurado com `react-router-dom`.
    * **Componente Navbar:** Barra de navegação global para fácil acesso às principais seções.
    * **Componente Footer:** Rodapé moderno e responsivo presente em todas as páginas.
    * **Mostrar/Ocultar Senha:** Adicionada funcionalidade de alternar a visibilidade da senha nos formulários de login e registro para melhor usabilidade e acessibilidade.
* **Estilização e Design:**
    * Design moderno, elegante e responsivo aplicado a **todas as páginas** utilizando **Tailwind CSS**.
    * Cores e tipografia consistentes para uma melhor experiência visual.
    * Campos como caixas de seleção (select) e seletores de data (input type="date") foram padronizados para um visual moderno e consistente.
* **Módulos de Autenticação:**
    * **Tela de Registro (`/register`):** Formulário funcional e estilizado para cadastro de novos usuários, conectando-se ao backend.
    * **Tela de Login (`/login`):** Formulário funcional e estilizado para autenticação de usuários, obtendo e armazenando o token JWT no `localStorage`.
* **Visualização de Dados:**
    * **Lista de Oportunidades (`/opportunities`):** Exibe uma lista de oportunidades disponíveis com cards estilizados, buscando dados do backend.
    * **Detalhes da Oportunidade (`/opportunities/:id`):** Exibe informações detalhadas de uma oportunidade específica com design limpo.
    * ***Formulário de Oportunidades (`/opportunities/new`, `/opportunities/edit/:id`):** Permite criar e editar oportunidades.**
    * **Lista de Denúncias/Relatos (`/complaints`):** Exibe uma lista de denúncias registradas com status visuais, buscando dados do backend.
    * **Detalhes da Denúncia/Relato (`/complaints/:id`):** Exibe informações detalhadas de uma denúncia específica com design limpo.
    * **Formulário de Denúncias (`/complaints/new`, `/complaints/edit/:id`):** Permite registrar e editar denúncias/relatos.**
    * **Lista de Recursos de Saúde (`/health-resources`):** Exibe uma lista de recursos de saúde com cards estilizados, buscando dados do backend.
    * **Detalhes do Recurso de Saúde (`/health-resources/:id`):** Exibe informações detalhadas de um recurso específico com design limpo.
    * **Formulário de Recursos de Saúde (`/health-resources/new`, `/health-resources/edit/:id`):** Permite criar e editar recursos de saúde.**
    

## Como Rodar o Projeto

### Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas:
* **Backend:**
    * Java Development Kit (JDK) 17 ou superior.
    * Apache Maven 3.9.x ou superior.
    * PostgreSQL 16 ou superior.
    * IDE: Eclipse IDE for Enterprise Java and Web Developers.
    * Docker Desktop: Instalado e em execução.
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
#### Executando o Backend com Docker (Recomendado)

Esta é a forma recomendada de executar o backend, pois padroniza o ambiente e facilita o deploy.

**Pré-requisitos Adicionais:**
* **Docker Desktop:** Instalado e em execução.

**Passos:**
1.  **Navegue até a pasta `backend`** do projeto no seu terminal:
    ```bash
    cd backend
    ```
2.  **Construa a imagem Docker** da aplicação:
    ```bash
    docker build -t conecta-inclusao-backend .
    ```
    * Este comando irá compilar o projeto Java e criar a imagem Docker. Pode demorar alguns minutos na primeira vez.
3.  **Obtenha suas credenciais do Neon Postgres e a chave JWT:**
    * No seu dashboard do [Neon.tech](https://neon.tech/), copie a **Connection String (URI)** do seu banco de dados. Ela deve começar com `jdbc:postgresql://`.
    * Copie sua **chave secreta JWT** (a mesma que você usa no `application.properties` para `api.security.token.secret`).
4.  **Rode o contêiner Docker**, passando as variáveis de ambiente necessárias:
    * **Importante:** Substitua os placeholders `SUA_CONNECTION_STRING_REAL`, `SUA_CHAVE_JWT_REAL`.
    ```bash
    docker run -p 8081:8081 --name conecta-backend-container \
      -e DATABASE_URL="SUA_CONNECTION_STRING_REAL" \
      -e JWT_SECRET_KEY="SUA_CHAVE_JWT_REAL" \
      conecta-inclusao-backend
    ```
    * Onde:
        * `-p 8081:8081`: Mapeia a porta 8081 do contêiner para a porta 8081 da sua máquina local.
        * `--name conecta-backend-container`: Atribui um nome ao contêiner para facilitar o gerenciamento.
        * `-e DATABASE_URL`: Sua Connection String completa do Neon Postgres, **incluindo o prefixo `jdbc:`**.
        * `-e JWT_SECRET_KEY`: Sua chave secreta JWT.
    * Se o nome do contêiner já estiver em uso, você pode removê-lo primeiro com `docker rm conecta-backend-container`.
5.  **Verifique se o backend iniciou:** Observe os logs no seu terminal. Você deverá ver a mensagem `Tomcat started on port 8081` ou similar.

**Testando a API Dockerizada:**
Com o contêiner rodando, você pode acessar a API via Postman ou navegador em `http://localhost:8081/api/...`.

* * *

#### Executando o Backend Diretamente (Sem Docker)

(Mantenha esta seção caso alguém não queira/possa usar Docker)

**Pré-requisitos:**
* Java Development Kit (JDK) 17 ou superior.
* Apache Maven 3.9.x ou superior.
* PostgreSQL 16 ou superior (servidor local ou credenciais do Neon no `application.properties`).
* IDE: Eclipse IDE for Enterprise Java and Web Developers.

**Passos:**
1.  Abra a pasta `backend` do projeto no Eclipse.
2.  No arquivo `backend/src/main/resources/application.properties`, configure as credenciais do banco de dados (se for usar o Neon, insira-as diretamente aqui com `jdbc:`):
    ```properties
    spring.datasource.url=jdbc:postgresql://<USUARIO>:<SENHA>@<HOST>/<DB_NAME>?sslmode=require
    spring.datasource.username=<USUARIO>
    spring.datasource.password=<SENHA>
    server.port=8081 # Ou a porta que você configurou
    api.security.token.secret=<SUA_CHAVE_JWT_REAL_AQUI_SE_NAO_USAR_VAR_AMBIENTE>
    # ... outras configurações JPA ...
    ```
3.  Faça `Project > Clean...` e `Project > Build Project`.
4.  Clique com o botão direito no arquivo `ConectaInclusaoBackendApplication.java` e selecione `Run As > Spring Boot App`.
5.  Confirme no console que o servidor Tomcat iniciou na porta configurada (ex: 8081).


### Executando o Frontend
1.  Navegue até a pasta `conectainclusao-frontend` no seu terminal.
2.  Instale as dependências do projeto: `npm install`
3.  Inicie o servidor de desenvolvimento:`
4.  A aplicação React estará disponível em `http://localhost:5173/` (ou a porta que o Vite indicar no terminal).

### Teste de Comunicação Frontend-Backend
* Acesse `http://localhost:5173/register` e tente cadastrar um novo usuário.
* Acesse `http://localhost:5173/login` e tente fazer login com o usuário cadastrado.
* Navegue para `/opportunities` e `/complaints` para ver as listas de dados do backend.

---

**Desenvolvido por:** [Fábio André Zatta]
