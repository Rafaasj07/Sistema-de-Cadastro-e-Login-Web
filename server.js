import express from 'express'
import { PrismaClient } from './generated/prisma/index.js'
import cors from 'cors'

/**
 * HTTP (HyperText Transfer Protocol) é um protocolo de comunicação — ou seja, 
 * um conjunto de regras que define como dados são enviados e recebidos entre cliente e servidor na web.
 * É uma linguagem de comunicação entre sistemas através da internet.
 *
 * Regras para criar rotas (comunicação entre front-end e back-end):
 * 
 * 1) Método HTTP — tipo da ação desejada:
 *    - GET     -> listar dados
 *    - POST    -> criar dados
 *    - PUT     -> editar todos os dados (substituir)
 *    - PATCH   -> editar parte dos dados
 *    - DELETE  -> deletar dados
 * 
 * 2) URL — o "endereço" onde o cliente (front) fará a requisição ao servidor (back).
 *
 * HTTP Status Codes:
 *    - 2xx -> Sucesso
 *    - 4xx -> Erro no cliente (ex: dados inválidos)
 *    - 5xx -> Erro no servidor (ex: problema no código do back-end)
 */

// Thunder Client é uma extensão do VS Code que serve para testar APIs.
// Simula requisições como se fossem feitas pelo front-end, facilitando a visualização de respostas.

// Cria uma instância do Prisma Client para interagir com o banco de dados
const prisma = new PrismaClient()

// Cria uma instância do Express para configurar o servidor HTTP
const app = express()

// Middleware para que o servidor entenda requisições com corpo em JSON
app.use(express.json())

// Permito qualquer página html acessar meu back-and. ISSO NãO É SEGURO!!!
app.use(cors())
// Rota para criar um novo usuário
app.post('/usuarios', async (req, res) => {
    // Usa o Prisma para criar um novo registro na tabela 'usuario' com os dados do corpo da requisição (req.body)
    await prisma.usuario.create({
        data: {
            email: req.body.email,  // Pega o email enviado pelo cliente
            nome: req.body.nome,    // Pega o nome enviado pelo cliente
            idade: parseInt(req.body.idade)   // Pega a idade enviada pelo cliente
        }
    })

    // Responde com status 201 (Created) e retorna os dados do usuário criado
    res.status(201).json(req.body)
})

// Rota para editar um usuário existente
app.put('/usuarios/:id', async (req, res) => {
    // Usa o Prisma para atualizar um registro na tabela 'usuario' com base no ID passado pela URL
    await prisma.usuario.update({
        where: {
            id: req.params.id // Acessa o id do usuário que será modificado (vindo da URL)
        },
        data: {
            email: req.body.email,  // Atualiza o email com o novo valor enviado pelo cliente
            nome: req.body.nome,    // Atualiza o nome com o novo valor enviado pelo cliente
            idade: parseInt(req.body.idade)   // Atualiza a idade com o novo valor enviado pelo cliente
        }
    })

    // Responde com status 201 (Created) e retorna os dados atualizados
    res.status(201).json(req.body)
})

// Rota para listar todos os usuários (com ou sem filtros)
app.get('/usuarios', async (req, res) => {
    // Busca todos os usuários salvos no banco usando o Prisma

    let usuarios = []

    if (req.query) { 
        // Se houver filtros passados como query (ex: /usuarios?nome=Maria), aplica os filtros
        usuarios = await prisma.usuario.findMany({
            where: {
                email: req.query.email,  // Filtra por email (se fornecido)
                nome: req.query.nome,    // Filtra por nome (se fornecido)
                idade: req.query.idade ? Number(req.query.idade) : undefined  // Filtra por idade (se fornecido) e converte para numero caso fornecido
            }
        })
    } else {
        // Se nenhum filtro for passado, retorna todos os usuários
        usuarios = await prisma.usuario.findMany()
    }

    // Retorna a lista de usuários com status 200 (OK)
    res.status(200).json(usuarios)
})

// Rota para excluir um usuário
app.delete('/usuarios/:id', async (req, res) => {
    // Usa o Prisma para deletar o registro com o ID fornecido
    await prisma.usuario.delete({
        where: {
            id: req.params.id // Acessa o id do usuário que será excluído (vindo da URL)
        },
    })

    // Responde com status 200 (OK) e uma mensagem de confirmação
    res.status(200).json({ message: 'Usuário deletado!' })
})

// Inicia o servidor HTTP na porta 3000
app.listen(3000)
