// controllers/clienteController.js
const db = require('../models');
const bcrypt = require('bcryptjs'); // Certifique-se que o bcrypt está importado

// Busca todos os clientes (Já corrigido para não enviar a senha)
exports.getAllClientes = async (req, res) => {
  try {
    const clientes = await db.cliente.findAll({
      attributes: { exclude: ['Hash_Senha'] }
    });
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar clientes', details: error.message });
  }
};

// Busca um cliente por ID (CORRIGIDO)
exports.getClienteById = async (req, res) => {
  try {
    const cliente = await db.cliente.findByPk(req.params.id, {
      // IMPORTANTE: Exclui a senha da resposta
      attributes: { exclude: ['Hash_Senha'] }
    });
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cliente por ID', details: error.message });
  }
};

// Cria um novo cliente (Já estava correto)
exports.createCliente = async (req, res) => {
  // ... seu código de criação existente ...
};

// Atualiza um cliente (CORRIGIDO)
exports.updateCliente = async (req, res) => {
  try {
    const cliente = await db.cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const { Nome, Email, Telefone, Hash_Senha } = req.body;

    // Se uma nova senha foi enviada no formulário, criptografa e atualiza.
    if (Hash_Senha) {
      cliente.Hash_Senha = await bcrypt.hash(Hash_Senha, 10);
    }

    // Atualiza os outros campos
    cliente.Nome = Nome;
    cliente.Email = Email;
    cliente.Telefone = Telefone;
    
    await cliente.save();
    res.status(200).json({ message: 'Cliente atualizado com sucesso!' });

  } catch (error) {
     if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'E-mail já cadastrado para outro usuário' });
    }
    res.status(500).json({ error: 'Erro ao atualizar cliente', details: error.message });
  }
};

// Deleta um cliente
exports.deleteCliente = async (req, res) => {
  // ... seu código de exclusão existente ...
};