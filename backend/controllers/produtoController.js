
const db = require('../models');

/**
 * @description Cria um novo produto com imagem e atributos.
 * @route POST /api/produtos
 */
exports.createProduto = async (req, res) => {
    // A transação garante que todas as operações sejam bem-sucedidas, ou nenhuma será.
    const t = await db.sequelize.transaction();
    try {
        
        const { nome_produto, descricao, preco, qtd_estoque, status, cor, tamanho } = req.body;

        // O middleware 'multer' processou a imagem e a colocou em req.file
        if (!req.file) {
            return res.status(400).json({ message: 'A imagem do produto é obrigatória.' });
        }

        
        const novoProduto = await db.produto.create({
            Nome_Produto: nome_produto,
            Descricao: descricao,
            Preço: preco,
            QTD_Estoque: qtd_estoque,
             Status: 'ativo'
        }, { transaction: t });

        
        if (cor) {
            await db.atributos_produto.create({
                ID_Produto: novoProduto.ID_Produto,
                Tipo_Atributo: 'Cor',
                Valor_Atributo: cor
            }, { transaction: t });
        }
        if (tamanho) {
            await db.atributos_produto.create({
                ID_Produto: novoProduto.ID_Produto,
                Tipo_Atributo: 'Tamanho',
                Valor_Atributo: tamanho
            }, { transaction: t });
        }

        // 3. Guarda o caminho da imagem na tabela 'imagens_produto'
        const imageUrl = `/uploads/${req.file.filename}`;
        await db.imagens_produto.create({
            ID_Produto: novoProduto.ID_Produto,
            URL_Img: imageUrl
        }, { transaction: t });
        
        
        await t.commit();
        res.status(201).json(novoProduto);

    } catch (error) {
        
        await t.rollback();
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao criar o produto.' });
    }
};

/**
 * @description Busca todos os produtos com suas imagens e atributos.
 * @route GET /api/produtos
 */
exports.getAllProdutos = async (req, res) => {
    try {
        const produtos = await db.produto.findAll({
            include: [
                { model: db.imagens_produto, as: 'imagens', attributes: ['URL_Img'] },
                { model: db.atributos_produto, as: 'atributos', attributes: ['Tipo_Atributo', 'Valor_Atributo'] }
            ],
            order: [['ID_Produto', 'DESC']] // Mostra os mais recentes primeiro
        });
        res.status(200).json(produtos);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao buscar os produtos.' });
    }
};
