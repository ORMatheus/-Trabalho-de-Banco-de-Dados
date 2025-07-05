// backend/controllers/produtoController.js
const db = require('../models');

// Obter todos os produtos (com paginação opcional)
exports.getAllProdutos = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 4; // Padrão de 4 produtos por carga
    const offset = parseInt(req.query.offset) || 0;

    const { count, rows: produtos } = await db.Produto.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [['ID_Produto', 'ASC']], // Ordem para garantir consistência
      include: [
        { model: db.AtributosProduto, as: 'atributos', attributes: ['Tipo_Atributo', 'Valor_Atributo'] },
        { model: db.ImagensProduto, as: 'imagens', attributes: ['URL_Img'] }
      ]
    });
    res.status(200).json(produtos); // Retorna apenas os produtos, o count pode ser útil para paginação avançada
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar produtos', error: error.message });
  }
};

// Obter produto por ID
exports.getProdutoById = async (req, res) => {
  try {
    const produto = await db.Produto.findByPk(req.params.id, {
      include: [
        { model: db.AtributosProduto, as: 'atributos' },
        { model: db.ImagensProduto, as: 'imagens' }
      ]
    });
    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar produto por ID:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar produto', error: error.message });
  }
};

// Criar um novo produto (com atributos e imagens aninhados)
exports.createProduto = async (req, res) => {
  try {
    const { Nome_Produto, Descrição, Preço, QTD_Estoque, Status, atributos, imagens } = req.body;

    const novoProduto = await db.Produto.create({
      Nome_Produto, Descrição, Preço, QTD_Estoque, Status
    });

    if (atributos && Array.isArray(atributos) && atributos.length > 0) {
      const atributosComId = atributos.map(attr => ({ ...attr, ID_Produto: novoProduto.ID_Produto }));
      await db.AtributosProduto.bulkCreate(atributosComId);
    }
    if (imagens && Array.isArray(imagens) && imagens.length > 0) {
      const imagensComId = imagens.map(img => ({ ...img, ID_Produto: novoProduto.ID_Produto }));
      await db.ImagensProduto.bulkCreate(imagensComId);
    }

    const produtoCompleto = await db.Produto.findByPk(novoProduto.ID_Produto, {
      include: [
        { model: db.AtributosProduto, as: 'atributos' },
        { model: db.ImagensProduto, as: 'imagens' }
      ]
    });

    res.status(201).json(produtoCompleto);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao criar produto', error: error.message });
  }
};

// Atualizar um produto existente
exports.updateProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nome_Produto, Descrição, Preço, QTD_Estoque, Status } = req.body;

    const produto = await db.Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    produto.Nome_Produto = Nome_Produto || produto.Nome_Produto;
    produto.Descrição = Descrição || produto.Descrição;
    produto.Preço = Preço || produto.Preço;
    produto.QTD_Estoque = QTD_Estoque || produto.QTD_Estoque;
    produto.Status = Status || produto.Status;

    await produto.save();

    res.status(200).json({ message: 'Produto atualizado com sucesso', produto: produto.toJSON() });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao atualizar produto', error: error.message });
  }
};

// Deletar um produto
exports.deleteProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await db.Produto.destroy({
      where: { ID_Produto: id }
    });
    if (deletedRows) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao deletar produto', error: error.message });
  }
};