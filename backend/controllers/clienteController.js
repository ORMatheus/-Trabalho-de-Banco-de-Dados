const db = require('../models');
const bcrypt = require('bcryptjs'); 

exports.getAllClientes = async (req, res) => {
  
};

exports.getClienteById = async (req, res) => {
  
};

exports.createCliente = async (req, res) => {
  try {
    const { Nome, Email, Hash_Senha, Telefone } = req.body;

    
    if (!Nome || !Email || !Hash_Senha) {
      return res.status(400).json({ error: 'Nome, Email e Senha são obrigatórios' });
    }

    
    const senhaCriptografada = await bcrypt.hash(Hash_Senha, 10); // 10 é o "custo" do hash

    
    const novoCliente = await db.cliente.create({
        Nome,
        Email,
        Hash_Senha: senhaCriptografada, // Salva o hash, não a senha original
        Telefone
    });

    
    const { Hash_Senha: _, ...clienteSemSenha } = novoCliente.get({ plain: true });
    res.status(201).json(clienteSemSenha);

  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'E-mail já cadastrado' });
    }
    console.error('Erro ao criar cliente:', error);
    res.status(500).json({ error: 'Erro ao criar cliente', details: error.message });
  }
};

exports.updateCliente = async (req, res) => {
  
};

exports.deleteCliente = async (req, res) => {
  
};