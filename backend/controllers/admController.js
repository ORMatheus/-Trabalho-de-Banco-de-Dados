const db= require('../models');
const bcrypt = require('bcryptjs');

exports.createAdm= async(req, res) => {
    try{
        const {Nome_admin, Email_Admin, Hash_senha_Admin} = req.body;

        if(!Nome_admin || !Email_Admin || !Hash_senha_Admin){
            return res.status(400).json({ message: 'Nome, Email e Senha são obrigatórios.' });
        }
        const senhaCriptografada = await bcrypt.hash(Hash_Senha_Admin, 10);

        const novoAdm = await db.adm.create({
            Nome_Admin,
            Email_Admin,
            Hash_Senha_Admin: senhaCriptografada,
        });
        const { Hash_Senha_Admin: _, ...admSemSenha } = novoAdm.get({ plain: true });
        res.status(201).json(admSemSenha);
    }catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Este email já está cadastrado.' });
        }
        console.error('Erro ao criar ADM:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
};