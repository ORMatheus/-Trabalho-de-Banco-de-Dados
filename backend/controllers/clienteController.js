// controllers/clienteController.js
const db = require('../models'); 
const bcrypt = require('bcryptjs');
exports.getAllClientes = async (req, res) => {
  try {
    const clientes = await db.Cliente.findAll();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar clientes', details: error.message });
  }
};

exports.getClienteById = async (req, res) => {
  try {
    const cliente = await db.Cliente.findByPk(req.params.id);
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cliente por ID', details: error.message });
  }
};

exports.createCliente = async (req, res) => {
  try {
    // Validação básica
    if (!req.body.Nome || !req.body.Email || !req.body.Hash_Senha) {
      return res.status(400).json({ error: 'Nome, Email e Senha são obrigatórios' });
    }

    const novoCliente = await db.Cliente.create(req.body);
    res.status(201).json(novoCliente);
  } catch (error) {
    // Capturar erro de unicidade (email duplicado)
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'E-mail já cadastrado', details: error.errors[0].message });
    }
    res.status(500).json({ error: 'Erro ao criar cliente', details: error.message });
  }
};

exports.updateCliente = async (req, res) => {
  try {
    const [updatedRows] = await db.Cliente.update(req.body, {
      where: { ID_Cliente: req.params.id }
    });
    if (updatedRows) {
      const clienteAtualizado = await db.Cliente.findByPk(req.params.id);
      res.status(200).json(clienteAtualizado);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
     if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'E-mail já cadastrado para outro usuário', details: error.errors[0].message });
    }
    res.status(500).json({ error: 'Erro ao atualizar cliente', details: error.message });
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    const deletedRows = await db.Cliente.destroy({
      where: { ID_Cliente: req.params.id }
    });
    if (deletedRows) {
      res.status(204).send(); // 204 No Content para deleção bem-sucedida
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar cliente', details: error.message });
  }
};