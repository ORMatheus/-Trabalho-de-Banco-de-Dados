
const db = require('../models');
const bcrypt = require('bcryptjs');

exports.createGerente = async (req, res) => {
    try {
        const { Nome_Gerente, Email_Gerente, Hash_Senha_Gerente } = req.body;

        if (!Nome_Gerente || !Email_Gerente || !Hash_Senha_Gerente) {
            return res.status(400).json({ message: 'Nome, Email e Senha são obrigatórios.' });
        }

        const senhaCriptografada = await bcrypt.hash(Hash_Senha_Gerente, 10);

        const novoGerente = await db.gerente.create({
            Nome_Gerente,
            Email_Gerente,
            Hash_Senha_Gerente: senhaCriptografada,
        });

        const { Hash_Senha_Gerente: _, ...gerenteSemSenha } = novoGerente.get({ plain: true });
        res.status(201).json(gerenteSemSenha);

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Este email já está cadastrado.' });
        }
        console.error('Erro ao criar Gerente:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
};