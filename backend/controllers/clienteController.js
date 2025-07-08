
const db = require('../models');
const bcrypt = require('bcryptjs'); 


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


exports.getClienteById = async (req, res) => {
  try {
    const cliente = await db.cliente.findByPk(req.params.id, {
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


exports.createCliente = async (req, res) => {
  try {
    const { Nome, Email, Hash_Senha, Telefone } = req.body;

    // Validação de entrada
    if (!Nome || !Email || !Hash_Senha) {
      return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
    }

    // Verifica se o cliente já existe
    const clienteExistente = await db.cliente.findOne({ where: { Email: Email } });
    if (clienteExistente) {
      return res.status(409).json({ message: 'Este email já está cadastrado.' });
    }

    // Criptografa a senha antes de guardar
    const senhaHasheada = await bcrypt.hash(Hash_Senha, 10);

    // Cria o novo cliente no banco de dados
    const novoCliente = await db.cliente.create({
      Nome,
      Email,
      Hash_Senha: senhaHasheada,
      Telefone
    });

    // Retorna o cliente criado (sem a senha)
    const clienteParaRetorno = novoCliente.toJSON();
    delete clienteParaRetorno.Hash_Senha;

    res.status(201).json(clienteParaRetorno);

  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(500).json({ message: 'Ocorreu um erro no servidor ao criar o cliente.' });
  }
};


exports.updateCliente = async (req, res) => {
  try {
    const cliente = await db.cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const { Nome, Email, Telefone, Hash_Senha } = req.body;

    if (Hash_Senha) {
      cliente.Hash_Senha = await bcrypt.hash(Hash_Senha, 10);
    }

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


exports.deleteCliente = async (req, res) => {
    try {
        const deletedRows = await db.cliente.destroy({
            where: { ID_Cliente: req.params.id }
        });

        if (deletedRows > 0) {
            res.status(204).send(); 
        } else {
            res.status(404).json({ message: 'Cliente não encontrado' });
        }
    } catch (error) {
      
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(409).json({ 
                message: 'Não é possível deletar este cliente pois ele possui registros associados (como pedidos ou endereços).',
                details: error.parent.detail 
            });
        }
        
        
        console.error('Erro ao deletar cliente:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao deletar cliente.' });
    }
};
