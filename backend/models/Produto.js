
module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('produto', {
    id_produto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_produto'
    },
    Nome_Produto: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'nome_produto'
    },
   Descricao: {
      type: DataTypes.TEXT,
      field: 'descricao'
    },
    Preço: { 
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      // CHECK (Preço >= 0) é uma constraint do BD, não é replicada no ORM, mas o BD a enforces
      field: 'preço'
    },
    QTD_Estoque: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // CHECK (QTD_Estoque >= 0) é uma constraint do BD
      field: 'qtd_estoque'
    },
    Status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      // CHECK (Status IN ('ativo', 'inativo', 'esgotado')) é uma constraint do BD
      field: 'status'
    }
  }, {
    tableName: 'produto', 
    timestamps: false
  });


Produto.associate = (models) => {
  // Relação Muitos-para-Muitos: Produto <-> Pedido
  Produto.belongsToMany(models.pedido, {
    through: models.item_pedido,      // A tabela "ponte"
    foreignKey: 'id_produto',         // Chave estrangeira em item_pedido
    as: 'pedidos'
  });

  // Relação: Um Produto TEM MUITAS Imagens
  Produto.hasMany(models.imagens_produto, { // Nome do model em ImagemProduto.js
    foreignKey: 'id_produto',         // Chave estrangeira em imagens_produto
    as: 'imagens'
  });

  // Relação: Um Produto TEM MUITOS Atributos
  Produto.hasMany(models.atributos_produto, { // Nome do model em atributosProduto.js
    foreignKey: 'id_produto',            // Chave estrangeira em atributos_produto
    as: 'atributos'
  });
};

  return Produto;
};