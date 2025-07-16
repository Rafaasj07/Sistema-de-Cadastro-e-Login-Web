# ⚠️ Atenção

Este projeto possui uma área de administração onde o e-mail dos usuários cadastrados pode ser visualizado publicamente.  
**Recomenda-se utilizar um e-mail fictício durante os testes**, apenas com um `@` no formato válido (exemplo: `joao@gmail.com`).  
**Não é necessário que o e-mail seja verdadeiro ou funcional.**

---

# Sistema de Cadastro e Login

Este é um projeto full-stack que implementa um sistema completo de registro, login, recuperação de senha e gerenciamento de usuários, com perfis distintos para **Usuário** e **Administrador**.

## 🚀 Acesso à Aplicação

Você pode acessar e testar a versão ao vivo do projeto através do seguinte link:

**[https://sistema-de-cadastro-e-login-web-commit.onrender.com](https://sistema-de-cadastro-e-login-web-commit.onrender.com)**

---

## 🧾 Descrição

A aplicação permite:

- Cadastro de novos usuários em duas etapas (incluindo pergunta/resposta de segurança).
- Login com verificação de credenciais.
- Recuperação de senha com validação da resposta secreta.
- Área exclusiva para administradores com funcionalidades como:
  - Listagem de todos os usuários.
  - Busca por nome ou e-mail.
  - Exclusão de usuários.

---

## 🧪 Tecnologias Utilizadas

### 🔹 Frontend
- **React** – Criação de componentes interativos.
- **Vite** – Build rápido para projetos React.
- **React Router DOM** – Gerenciamento de rotas da aplicação.
- **Axios** – Requisições HTTP para a API.
- **CSS** – Estilização visual da interface.

### 🔸 Backend
- **Node.js** – Ambiente de execução para JavaScript no servidor.
- **Express** – Framework para criação da API.
- **Prisma** – ORM para integração com o banco de dados.
- **Bcrypt** – Criptografia segura de senhas.
- **CORS** – Liberação de acesso cross-origin.
- **Dotenv** – Gerenciamento de variáveis de ambiente.

### 🗄️ Banco de Dados
- **MongoDB** – Banco de dados NoSQL orientado a documentos.

---

## ⚙️ Como Rodar o Projeto Localmente

### 📋 Pré-requisitos
- Node.js instalado ([Download aqui](https://nodejs.org))
- MongoDB local ou Atlas (nuvem)

---

### 🔧 Configuração do Backend

1. Clone o repositório:
   ```bash
   git clone https://github.com/Rafaasj07/Cadastro_Usuarios_Web.git
   cd Cadastro_Usuarios_Web/backend
````

2. Instale as dependências:

   ```bash
   npm install express mongodb cors bcrypt dotenv
   npm install prisma --save-dev
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` e adicione sua conexão do MongoDB:

   ```env
   DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/banco"
   ```

4. Gere o cliente Prisma e sincronize o banco:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

---

### 🎨 Configuração do Frontend

1. Navegue até a pasta do frontend:

   ```bash
   cd ../frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

---

### ▶️ Executando a Aplicação

Abra dois terminais:

* **Terminal 1 – Backend**:

  ```bash
  cd backend
  node --watch server.js
  ```

* **Terminal 2 – Frontend**:

  ```bash
  cd frontend
  npm run dev
  ```

Acesse em: [http://localhost:5173](http://localhost:5173)

---

## 🔍 Comandos Úteis

* Acessar o Prisma Studio:

  ```bash
  npx prisma studio
  ```

* Verificar e corrigir problemas de segurança:

  ```bash
  npm audit
  npm audit fix
  ```

---

## 👤 Autor

Desenvolvido por **Rafael Augusto**
GitHub: [@Rafaasj07](https://github.com/Rafaasj07)

