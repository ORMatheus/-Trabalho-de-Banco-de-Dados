// server.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares ---
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// --- Configuração do Multer ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// --- Rotas da API ---

// Rota de Cadastro de Cliente
app.post('/api/clientes', async (req, res) => {
    try {
        const { Nome, Email, Hash_Senha, Telefone } = req.body;
        if (!Nome || !Email || !Hash_Senha) {
            return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
        }
        const clienteExistente = await db.cliente.findOne({ where: { Email: Email } });
        if (clienteExistente) {
            return res.status(409).json({ message: 'Este email já está cadastrado.' });
        }
        const senhaHasheada = await bcrypt.hash(Hash_Senha, 10);
        const novoCliente = await db.cliente.create({
            Nome,
            Email,
            Hash_Senha: senhaHasheada,
            Telefone
        });
        const clienteParaRetorno = novoCliente.toJSON();
        delete clienteParaRetorno.Hash_Senha;
        res.status(201).json(clienteParaRetorno);
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Rota de Cadastro de Produto
app.post('/api/produtos', upload.single('imagem'), async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const { nome_produto, descricao, preco, qtd_estoque, cor, tamanho } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: 'A imagem do produto é obrigatória.' });
        }
        const novoProduto = await db.produto.create({
            nome_produto,
            descricao,
            preco,
            qtd_estoque
        }, { transaction: t });
        await db.atributos_produto.create({
            id_produto: novoProduto.id_produto,
            tipo_atributo: 'Cor',
            valor_atributo: cor
        }, { transaction: t });
        await db.atributos_produto.create({
            id_produto: novoProduto.id_produto,
            tipo_atributo: 'Tamanho',
            valor_atributo: tamanho
        }, { transaction: t });
        const imageUrl = `/uploads/${req.file.filename}`;
        await db.imagens_produto.create({
            id_produto: novoProduto.id_produto,
            url_imagem: imageUrl
        }, { transaction: t });
        await t.commit();
        res.status(201).json(novoProduto);
    } catch (error) {
        await t.rollback();
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao criar o produto.' });
    }
});

// NOVA Rota para Buscar todos os Produtos
app.get('/api/produtos', async (req, res) => {
    try {
        const produtos = await db.produto.findAll({
            include: [
                {
                    model: db.imagens_produto,
                    as: 'imagens',
                    attributes: ['url_imagem']
                },
                {
                    model: db.atributos_produto,
                    as: 'atributos',
                    attributes: ['tipo_atributo', 'valor_atributo']
                }
            ],
            order: [['id_produto', 'DESC']] // Mostra os mais recentes primeiro
        });
        res.status(200).json(produtos);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao buscar os produtos.' });
    }
});


// --- Inicialização do Servidor ---
async function startServer() {
    try {
        await db.sequelize.authenticate();
        console.log('Conexão com a base de dados estabelecida com sucesso.');
        app.listen(PORT, () => {
            console.log(`Servidor a correr na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Não foi possível conectar à base de dados:', error);
        process.exit(1);
    }
}

startServer();
