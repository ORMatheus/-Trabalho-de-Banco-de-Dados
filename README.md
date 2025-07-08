# Pregai - E-commerce de Moda Cristã

Este é o repositório do projeto full-stack "Pregai", um sistema de e-commerce completo para uma marca de moda com propósito. O projeto é dividido em um frontend para os clientes e uma área administrativa completa para o gerenciamento da loja.

## Visão Geral do Projeto

A arquitetura do sistema é composta por duas partes principais:

1.  **Frontend**: Uma aplicação web estática construída com HTML, CSS (TailwindCSS) e JavaScript puro. É a vitrine da loja, onde os clientes podem ver os produtos e se cadastrar.
2.  **Backend**: Uma API RESTful robusta desenvolvida em Node.js com o framework Express.js. Ela é responsável por toda a lógica de negócio, interações com o banco de dados (via Sequelize ORM) e segurança.

---

## Funcionalidades Implementadas

### Frontend (Loja Pública)

-   **Página Inicial (`index.html`):** Apresenta a marca, sua missão e uma vitrine com os produtos cadastrados.
-   **Listagem de Produtos:** Exibe dinamicamente os produtos cadastrados no banco de dados, incluindo imagem, nome, descrição e preço.
-   **Cadastro de Clientes:** Formulário para que novos usuários possam se registrar na plataforma.
-   **Design Responsivo:** A interface se adapta para uma boa visualização em dispositivos móveis.

### Painel Administrativo

-   **Dashboard Central:** Uma página de entrada que direciona o administrador para as áreas de gerenciamento.
-   **CRUD Completo de Produtos:**
    -   **Create:** Formulário para cadastrar novos produtos, incluindo o upload de imagem.
    -   **Read:** Listagem de todos os produtos na página principal.
    -   **(TODO) Update/Delete:** Funcionalidades de edição e exclusão de produtos.
-   **CRUD Completo de Administradores:**
    -   **Create:** Formulário para cadastrar novos administradores.
    -   **Read:** Página para listar todos os administradores.
    -   **Update:** Página para editar os dados de um administrador (com opção de alterar a senha).
    -   **Delete:** Botão para excluir um administrador com diálogo de confirmação.
-   **CRUD Completo de Gerentes:**
    -   Funcionalidades de Criar, Listar, Editar e Excluir gerentes, seguindo o mesmo padrão dos administradores.
-   **CRUD Completo de Entregadores:**
    -   Funcionalidades de Criar, Listar, Editar e Excluir entregadores (sem campo de senha).

---

## Tecnologias e Dependências

### Backend

-   **Node.js**: Ambiente de execução do JavaScript no servidor.
-   **Express.js**: Framework para a construção da API, gerenciamento de rotas e middlewares.
-   **Sequelize**: ORM (Object-Relational Mapper) para interagir com o banco de dados de forma segura e produtiva.
-   **PostgreSQL**: O banco de dados relacional utilizado no projeto.
-   **`pg`**: Driver do Node.js para conectar com o PostgreSQL.
-   **`bcryptjs`**: Biblioteca para criptografar e verificar senhas de forma segura.
-   **`multer`**: Middleware para lidar com o upload de arquivos (imagens dos produtos).
-   **`cors`**: Middleware para habilitar o Cross-Origin Resource Sharing, permitindo a comunicação entre frontend e backend.
-   **`dotenv`**: Para carregar variáveis de ambiente a partir de um arquivo `.env`.

### Frontend

-   **HTML5**: Linguagem de marcação para a estrutura das páginas.
-   **TailwindCSS**: Framework de CSS utilizado via CDN para estilização rápida e moderna.
-   **JavaScript (Vanilla)**: Linguagem de programação para a interatividade do frontend, manipulação do DOM e requisições à API (usando `fetch`).

---

## Instalação e Execução

Para rodar este projeto localmente, siga os passos abaixo.

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 18 ou superior)
-   [NPM](https://www.npmjs.com/) (geralmente instalado com o Node.js)
-   Um servidor [PostgreSQL](https://www.postgresql.org/) ativo e rodando.

### Configuração do Backend

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-seu-repositorio>
    baixe o banco de dados
    ```

2.  **Navegue até a pasta do backend:**
    ```bash
    cd <pasta-do-projeto>/backend
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo chamado `.env` na raiz da pasta `backend`. Ele guardará as credenciais do seu banco de dados. Preencha com suas informações:
    ```env
    DB_HOST=localhost
    DB_USER=seu_usuario_postgres
    DB_PASS=sua_senha_postgres
    DB_NAME=pregai
    DB_PORT=5432
    ```

5.  **Configure o Banco de Dados:**
    Este projeto assume que o banco de dados e suas tabelas já foram criados manualmente conforme o esquema definido. Certifique-se de ter um banco de dados com o nome especificado em `DB_NAME` e que todas as tabelas (`cliente`, `produto`, `adm`, etc.) existam.

6.  **Inicie o servidor:**
    ```bash
    npm start
    ```
    O servidor backend estará rodando em `http://localhost:3000`.

### Execução do Frontend

O frontend não requer um processo de build. Basta abrir os arquivos `.html` diretamente no seu navegador de preferência.

-   Para ver a loja, abra o arquivo `index.html`.
-   Para acessar o painel administrativo, abra o arquivo `admin-seeder.html`.