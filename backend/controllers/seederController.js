// controllers/seederController.js
const db = require('../models');
const bcrypt = require('bcrypt');

// Função genérica para criar um registo de teste
const seedModel = (modelName, data) => async (req, res) => {
    try {
        // Se houver uma senha, faz o hash
        const passwordFields = ['Hash_Senha', 'Hash_Senha_Admin', 'Hash_Senha_Gerente'];
        for (const field of passwordFields) {
            if (data[field]) {
                data[field] = await bcrypt.hash(data[field], 10);
            }
        }
        
        const record = await db[modelName].create(data);
        res.status(201).json(record);
    } catch (error) {
        console.error(`Erro ao semear ${modelName}:`, error);
        res.status(500).json({ message: `Erro ao criar ${modelName} de teste.` });
    }
};

// Exporta uma função de seed para cada modelo
exports.seedCliente = seedModel('cliente', {
    Nome: `Cliente Teste`,
    Email: `cliente${Date.now()}@teste.com`,
    Hash_Senha: 'senha123',
    Telefone: '999998888'
});

exports.seedAdm = seedModel('adm', {
    Nome_Admin: `Admin Teste`,
    Email_Admin: `admin${Date.now()}@teste.com`,
    Hash_Senha_Admin: 'senha123'
});

exports.seedGerente = seedModel('gerente', {
    Nome_Gerente: `Gerente Teste`,
    Email_Gerente: `gerente${Date.now()}@teste.com`,
    Hash_Senha_Gerente: 'senha123'
});

exports.seedEntregador = seedModel('entregador', {
    Nome_Entregador: `Entregador Teste`,
    Telefone_Entregador: `${Date.now()}`.slice(-9)
});

// O produto é mais complexo, por isso tem a sua própria função
exports.seedProduto = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const novoProduto = await db.produto.create({
            Nome_Produto: 'Produto Teste Semeado',
            Descricao: 'Descrição do produto semeado.',
            Preço: 49.99,
            QTD_Estoque: 50,
            Status: 'ativo'
        }, { transaction: t });

        await db.imagens_produto.create({
            ID_Produto: novoProduto.ID_Produto,
            URL_Img: '/uploads/placeholder.jpg' // Um placeholder
        }, { transaction: t });

        await t.commit();
        res.status(201).json(novoProduto);
    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: 'Erro ao semear produto.' });
    }
};
