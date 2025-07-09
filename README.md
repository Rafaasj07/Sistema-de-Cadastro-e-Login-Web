# Sistema de Cadastro e Login

Este é um projeto full-stack que implementa um sistema completo de registro, login, recuperação de senha e gerenciamento de usuários, com perfis distintos para "Usuário" e "Administrador".

## 🚀 Acesso à Aplicação

Você pode acessar e testar a versão ao vivo do projeto através do seguinte link:

**[https://sistema-de-cadastro-e-login-web.onrender.com/home](https://sistema-de-cadastro-e-login-web.onrender.com/home)**

## Descrição

A aplicação permite que novos usuários se cadastrem em um processo de duas etapas, definindo uma pergunta e resposta de segurança. Usuários existentes podem fazer login, e caso esqueçam a senha, podem recuperá-la através da pergunta secreta.

A interface do administrador oferece funcionalidades adicionais, como a capacidade de visualizar, buscar e excluir usuários cadastrados no sistema.

O frontend é construído com **React** e **Vite**, consumindo uma API RESTful desenvolvida em **Node.js** com **Express**. O banco de dados utilizado é o **MongoDB**, com o **Prisma** atuando como ORM para facilitar as operações de banco de dados.

---

## Tecnologias Utilizadas

Esta é a lista das principais tecnologias e bibliotecas usadas no projeto:

#### Frontend
* React: Biblioteca para construção da interface de usuário.
* Vite: Ferramenta de build e servidor de desenvolvimento para o frontend.
* React Router Dom: Para gerenciamento das rotas e navegação na aplicação.
* Axios: Cliente HTTP para realizar requisições à API do backend.
* CSS: Estilização dos componentes através de arquivos CSS dedicados.

#### Backend
* Node.js: Ambiente de execução para o JavaScript no servidor.
* Express: Framework para a construção da API RESTful.
* Prisma: ORM para interagir com o banco de dados MongoDB.
* Bcrypt: Biblioteca para criptografar e verificar senhas de forma segura.
* CORS: Middleware para habilitar o Cross-Origin Resource Sharing.
* Dotenv: Para gerenciar variáveis de ambiente de forma segura.

#### Banco de Dados
* MongoDB: Banco de dados NoSQL orientado a documentos.

---

## Como Rodar o Projeto

Siga estas instruções para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

Antes de começar, certifique-se de que você tem os seguintes softwares instalados em sua máquina:
* Node.js (que inclui o npm)
* MongoDB

### Configuração do Backend

1.  Clone o Repositório:
    `git clone https://github.com/Rafaasj07/Cadastro_Usuarios_Web.git`
    `cd Cadastro_Usuarios_Web/backend`

2.  Instale as Dependências:
    `npm install express mongodb cors bcrypt dotenv`
    `npm install prisma --save-dev`

3.  Configure as Variáveis de Ambiente:
    Crie um arquivo `.env` na raiz da pasta do backend e adicione sua string de conexão do MongoDB:
    `DATABASE_URL="mongodb+srv://seu_usuario:sua_senha@seu_cluster.mongodb.net/seu_banco_de_dados"`

4.  Sincronize o Banco de Dados com o Prisma:
    `npx prisma generate`
    `npx prisma db push`

### Configuração do Frontend

1.  Navegue para a Pasta do Frontend:
    `cd Cadastro_Usuarios_Web/frontend`

2.  Instale as Dependências:
    `npm install`

### Executando a Aplicação

Você precisará de dois terminais abertos: um para o backend e outro para o frontend.

1.  Inicie o Servidor Backend (no terminal do backend):
    `node --watch server.js`

2.  Inicie o Servidor Frontend (no terminal do frontend):
    `npm run dev`

---

## Comandos Úteis

- Prisma Studio: Para visualizar e gerenciar seu banco de dados.
  `npx prisma studio`

- Verificar e Corrigir Pacotes:
  `npm audit`
  `npm audit fix`
