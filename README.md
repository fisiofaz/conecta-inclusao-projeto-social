# Conecta Inclusão

O Conecta Inclusão é uma plataforma web que visa conectar pessoas com deficiência a oportunidades de emprego, recursos de saúde e bem-estar, e comunidades de apoio. O projeto busca promover a inclusão social e o crescimento profissional, alinhado com os Objetivos de Desenvolvimento Sustentável da ONU.

## ✨ Objetivos do Projeto

- **ODS 3 (Saúde e Bem-estar):** Facilitar o acesso a recursos de saúde e bem-estar para pessoas com deficiência.
- **ODS 8 (Trabalho Decente e Crescimento Econômico):** Conectar talentos com deficiência a vagas de emprego inclusivas.
- **ODS 16 (Paz, Justiça e Instituições Eficazes):** Construir uma comunidade de apoio e fortalecer a inclusão social.

## 🚀 Tecnologias Utilizadas

Este projeto é dividido em duas partes principais: o backend e o frontend.

**Backend:**
- Java 17
- Spring Boot 3
- Spring MVC
- Spring Data JPA
- Spring Security
- PostgreSQL

**Frontend:**
- React
- Vite
- Axios
- React Router DOM
- Tailwind CSS

**Ferramentas e Infraestrutura:**
- Docker
- Postman (para testes de API)
- Git & GitHub

## 📋 Pré-requisitos

Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas em sua máquina:

- [Java 17 (JDK)](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Maven](https://maven.apache.org/download.cgi)
- [Node.js (versão 18 ou superior)](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/products/docker-desktop/) (recomendado para o banco de dados)

## ⚙️ Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e rodar o ambiente de desenvolvimento.

### 1. Clone o Repositório

```bash
git clone [https://github.com/fisiofaz/conecta-inclusao-projeto-social.git](https://github.com/fisiofaz/conecta-inclusao-projeto-social.git)
cd conecta-inclusao-projeto-social
```

### 2. Configurando o Banco de Dados (com Docker)
A maneira mais fácil de rodar o banco de dados PostgreSQL é utilizando o Docker.

```bash
docker run --name conecta-inclusao-db -e POSTGRES_USER=seu_usuario -e POSTGRES_PASSWORD=sua_senha -p 5432:5432 -d postgres
```
Substitua ```seu_usuario``` e ```sua_senha``` pelas credenciais que desejar.

### 3. Configurando o Backend

#### 1. Navegue até a pasta do backend:
```bash
cd backend
```

### 2. Configure as variáveis de ambiente. Renomeie o arquivo
```application.properties.example``` para ```application.properties``` (ou crie um novo) e ajuste as configurações do banco de dados:
```bash
spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
spring.jpa.hibernate.ddl-auto=update
```
Lembre-se de usar as mesmas credenciais que você configurou no Docker

#### 3. Execute o projeto Spring Boot:
```bash
mvn spring-boot:run
```
O backend estará rodando em ```http://localhost:8080```.

### 4. Configurando o Frontend

#### 1. Abra um novo terminal e navegue até a pasta do frontend:
```bash
cd conectainclusao-frontend
```
#### 2. Instale as dependências:
```bash
npm install
# ou
yarn install
```
#### 3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```
O frontend estará acessível em ```http://localhost:3000``` (ou outra porta indicada no terminal).

## 🗂️ Estrutura do Projeto

```bash
.
├── backend/                   # Código-fonte do backend (Spring Boot)
│   ├── src/
│   └── pom.xml
├── conectainclusao-frontend/  # Código-fonte do frontend (React)
│   ├── src/
│   └── package.json
└── README.md                  # Este arquivo
```

## 🤝 Como Contribuir

```bash
Ficamos felizes com o seu interesse em contribuir! Em breve, adicionaremos um guia de contribuição (CONTRIBUTING.md) com mais detalhes sobre como você pode nos ajudar.
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido por:** [Fábio André Zatta]
