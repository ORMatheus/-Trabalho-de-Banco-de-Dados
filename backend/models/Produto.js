// models/Produto.js
module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('produto', {
    ID_Produto: {
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
   Descricao: { // Caracter especial no nome da coluna 
      type: DataTypes.TEXT,
      field: 'descricao'
    },
    Preço: { // Caracter especial no nome da coluna 
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
    tableName: 'produto', // Nome exato da tabela no seu SQL [cite: 3]
    timestamps: false
  });

  Produto.associate = (models) => {
  // Relação Muitos-para-Muitos: Produto <-> Pedido
  Produto.belongsToMany(models.pedido, {
    through: models.item_pedido,      // Através da tabela item_pedido
    foreignKey: 'ID_Produto',
    as: 'pedidos'
  });
  // Um Produto TEM MUITOS Atributos
  Produto.hasMany(models.atributos_produto, {
    foreignKey: 'ID_Produto',
    as: 'atributos'
  });
  // Um Produto TEM MUITAS Imagens
  Produto.hasMany(models.imagens_produto, {
    foreignKey: 'ID_Produto',
    as: 'imagens'
  });
};

  return Produto;
};