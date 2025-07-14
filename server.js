// --- CONFIGURAÇÃO INICIAL ---
// Importa as dependências essenciais para o servidor.
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';

// --- INICIALIZAÇÃO ---
// Cria instâncias do Express e Prisma.
const prisma = new PrismaClient();
const app = express();
const saltRounds = 10; // "Força" da criptografia da senha.

// Configura os caminhos de diretório.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- MIDDLEWARES ---
// Habilita o parsing de JSON, o CORS e o serviço de arquivos estáticos do frontend.
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

// --- ROTAS DE USUÁRIOS (CRUD) ---

// Rota para CRIAR um novo usuário (etapa 1 do cadastro).
app.post('/usuarios', async (req, res) => {
    try {
        const { email, nome, senha, perfil } = req.body;
        // Valida se os dados essenciais foram recebidos.
        if (!email || !nome || !senha || !perfil) {
            return res.status(400).json({ mensagem: "Dados incompletos para o cadastro." });
        }
        // Criptografa a senha antes de salvar.
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
        // Cria o usuário no banco de dados.
        const novoUsuario = await prisma.usuario.create({
            data: { email, nome, senha: senhaCriptografada, perfil }
        });
        res.status(201).json(novoUsuario);
    } catch (error) {
        // Trata erros, como e-mail duplicado.
        if (error.code === 'P2002') {
            const campo = error.meta.target.join(', ');
            return res.status(409).json({ mensagem: `O campo ${campo} já está em uso.` });
        }
        res.status(500).json({ mensagem: 'Ocorreu um erro interno no servidor.' });
    }
});

// Rota para ATUALIZAR um usuário (usado na etapa 2 do cadastro e para alterar senha).
app.put('/usuarios/:id', async (req, res) => {
    try {
        // Se uma nova senha for enviada, criptografa-a.
        if (req.body.senha) {
            req.body.senha = await bcrypt.hash(req.body.senha, saltRounds);
        }
        // Atualiza os dados do usuário no banco.
        const usuarioAtualizado = await prisma.usuario.update({
            where: { id: req.params.id },
            data: req.body
        });
        res.status(200).json(usuarioAtualizado);
    } catch (error) {
        res.status(500).json({ mensagem: 'Ocorreu um erro interno no servidor.' });
    }
});

// Rota para LISTAR usuários (com filtros opcionais por nome ou email).
app.get('/usuarios', async (req, res) => {
    try {
        const { nome, email } = req.query;
        const where = {};
        if (nome) where.nome = { contains: nome, mode: 'insensitive' };
        if (email) where.email = email;
        const usuarios = await prisma.usuario.findMany({ where });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensagem: 'Ocorreu um erro interno no servidor.' });
    }
});

// Rota para DELETAR um usuário por ID.
app.delete('/usuarios/:id', async (req, res) => {
    try {
        await prisma.usuario.delete({ where: { id: req.params.id } });
        res.status(200).json({ message: 'Usuário deletado!' });
    } catch (error) {
        res.status(500).json({ mensagem: 'Ocorreu um erro interno no servidor.' });
    }
});

// --- ROTA DE AUTENTICAÇÃO ---

// Rota para LOGIN.
app.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        // Busca o usuário pelo e-mail.
        const usuario = await prisma.usuario.findUnique({ where: { email } });
        if (!usuario) {
            return res.status(401).json({ sucesso: false, mensagem: 'Email ou senha inválidos' });
        }
        // Compara a senha enviada com a senha criptografada no banco.
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (senhaCorreta) {
            // Retorna sucesso e dados do usuário se a senha estiver correta.
            res.status(200).json({ sucesso: true, id: usuario.id, perfil: usuario.perfil });
        } else {
            res.status(401).json({ sucesso: false, mensagem: 'Email ou senha inválidos' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Ocorreu um erro interno no servidor.' });
    }
});

// --- ROTAS PARA RECUPERAÇÃO DE SENHA ---

// Rota para buscar um usuário pelo e-mail e retornar sua pergunta secreta.
app.post('/buscaUsuario', async (req, res) => {
    try {
        const { tentativaEmail } = req.body;
        const usuario = await prisma.usuario.findUnique({ where: { email: tentativaEmail } });
        if (usuario) {
            res.status(200).json({ sucesso: true, id: usuario.id, pergunta: usuario.pergunta });
        } else {
            res.status(404).json({ sucesso: false, mensagem: 'Usuário não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ sucesso: false, mensagem: 'Ocorreu um erro interno no servidor.' });
    }
});

// Rota para verificar se a resposta da pergunta secreta está correta.
app.post('/verificar-resposta', async (req, res) => {
    try {
        const { id, tentativaResposta } = req.body;
        const usuario = await prisma.usuario.findUnique({ where: { id } });
        if (!usuario) {
            return res.status(404).json({ sucesso: false, mensagem: 'Utilizador não encontrado.' });
        }
        if (usuario.resposta === tentativaResposta) {
            res.status(200).json({ sucesso: true });
        } else {
            res.status(401).json({ sucesso: false, mensagem: 'Resposta de segurança incorreta.' });
        }
    } catch (error) {
        res.status(500).json({ sucesso: false, mensagem: 'Ocorreu um erro interno no servidor.' });
    }
});

// Rota para definir uma nova senha.
app.post('/mudarSenha', async (req, res) => {
    try {
        const { id, NovaSenha } = req.body;
        const usuario = await prisma.usuario.findUnique({ where: { id } });
        if (!usuario) {
            return res.status(404).json({ sucesso: false, mensagem: 'Usuário não encontrado.' });
        }
        // Criptografa a nova senha.
        const novaSenhaCriptografada = await bcrypt.hash(NovaSenha, 10);
        // Atualiza a senha no banco.
        await prisma.usuario.update({
            where: { id },
            data: { senha: novaSenhaCriptografada }
        });
        res.status(200).json({ sucesso: true, mensagem: 'Senha atualizada com sucesso!', perfil: usuario.perfil });
    } catch (error) {
        res.status(500).json({ sucesso: false, mensagem: 'Ocorreu um erro interno no servidor.' });
    }
});

// --- ROTA "CATCH-ALL" ---
// Qualquer rota não encontrada pela API servirá o `index.html` do React.
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// --- INICIALIZAÇÃO DO SERVIDOR ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});