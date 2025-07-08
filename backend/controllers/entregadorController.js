const db = require('../models');

exports.createEntregador = async (req, res) => {
    try {
        const { Nome_Entregador, Telefone_Entregador } = req.body;

        if (!Nome_Entregador || !Telefone_Entregador) {
            return res.status(400).json({ message: 'Nome e Telefone são obrigatórios.' });
        }

        const novoEntregador = await db.entregador.create({
            Nome_Entregador,
            Telefone_Entregador,
        });

        res.status(201).json(novoEntregador);

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Este telefone já está cadastrado.' });
        }
        console.error('Erro ao criar Entregador:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
};