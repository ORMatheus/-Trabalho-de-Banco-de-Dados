// server.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./models'); // Importa o objeto db (com sequelize e modelos)

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares ---
// Habilita o CORS para permitir que o frontend (em outra origem) aceda à API
app.use(cors());
// Permite que o Express interprete o corpo das requisições como JSON
app.use(express.json());

// --- Rotas da API ---

// Rota de teste
app.get('/api', (req, res) => {
  res.json({ message: 'Bem-vindo à API da loja Pregai!' });
});

/**
 * Rota para criar um novo cliente.
 * Recebe: { Nome, Email, Hash_Senha (senha em texto puro), Telefone }
 * Retorna: O objeto do cliente criado (sem a senha) ou uma mensagem de erro.
 */
app.post('/api/clientes', async (req, res) => {
  try {
    const { Nome, Email, Hash_Senha, Telefone } = req.body;

    // Validação básica dos dados recebidos
    if (!Nome || !Email || !Hash_Senha) {
      return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
    }

    // Verifica se o cliente já existe
    // CORREÇÃO: Alterado de db.Cliente para db.cliente (minúsculo)
    const clienteExistente = await db.cliente.findOne({ where: { Email: Email } });
    if (clienteExistente) {
      return res.status(409).json({ message: 'Este email já está cadastrado.' });
    }

    // Gera um hash seguro para a senha antes de guardar na base de dados
    const senhaHasheada = await bcrypt.hash(Hash_Senha, 10);

    // Cria o novo cliente na base de dados
    // CORREÇÃO: Alterado de db.Cliente para db.cliente (minúsculo)
    const novoCliente = await db.cliente.create({
      Nome,
      Email,
      Hash_Senha: senhaHasheada, // Guarda a senha com hash
      Telefone
    });

    // Remove a senha do objeto de resposta por segurança
    const clienteParaRetorno = novoCliente.toJSON();
    delete clienteParaRetorno.Hash_Senha;

    // Retorna o cliente criado com status 201 (Created)
    res.status(201).json(clienteParaRetorno);

  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    // Verifica se é um erro de validação do Sequelize
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({ message: 'Erro de validação', errors: messages });
    }
    // Retorna um erro genérico do servidor
    res.status(500).json({ message: 'Ocorreu um erro no servidor ao tentar criar o cliente.' });
  }
});


// --- Inicialização do Servidor ---
async function startServer() {
  try {
    // Testa a conexão com a base de dados
    await db.sequelize.authenticate();
    console.log('Conexão com a base de dados estabelecida com sucesso.');

    // Inicia o servidor Express
    app.listen(PORT, () => {
      console.log(`Servidor a correr na porta ${PORT}`);
      console.log(`Acesse a API em http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Não foi possível conectar à base de dados:', error);
    process.exit(1); // Encerra o processo se não conseguir conectar à base de dados
  }
}

startServer();
