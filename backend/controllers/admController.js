
const db = require('../models');
const bcrypt = require('bcryptjs');


exports.getAllAdms = async (req, res) => {
    try {
        const adms = await db.adm.findAll({
            attributes: { exclude: ['Hash_Senha_Admin'] }
        });
        res.status(200).json(adms);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar administradores.' });
    }
};


exports.getAdmById = async (req, res) => {
    try {
        const adm = await db.adm.findByPk(req.params.id, {
            
            attributes: { exclude: ['Hash_Senha_Admin'] }
        });
        if (adm) {
            res.status(200).json(adm);
        } else {
            res.status(404).json({ message: 'Administrador não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar administrador.' });
    }
};


exports.createAdm = async (req, res) => {
    try {
        const { Nome_Admin, Email_Admin, Hash_Senha_Admin } = req.body;
        if (!Nome_Admin || !Email_Admin || !Hash_Senha_Admin) {
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
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Este email já está cadastrado.' });
        }
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
};


exports.updateAdm = async (req, res) => {
    try {
        const adm = await db.adm.findByPk(req.params.id);
        if (!adm) {
            return res.status(404).json({ message: 'Administrador não encontrado.' });
        }
        const { Nome_Admin, Email_Admin, Hash_Senha_Admin } = req.body;
        if (Hash_Senha_Admin) {
            adm.Hash_Senha_Admin = await bcrypt.hash(Hash_Senha_Admin, 10);
        }
        adm.Nome_Admin = Nome_Admin;
        adm.Email_Admin = Email_Admin;
        await adm.save();
        res.status(200).json({ message: 'Administrador atualizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar administrador.' });
    }
};


exports.deleteAdm = async (req, res) => {
    try {
        const adm = await db.adm.findByPk(req.params.id);
        if (!adm) {
            return res.status(404).json({ message: 'Administrador não encontrado.' });
        }
        await adm.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir administrador.' });
    }
};