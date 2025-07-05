
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
  Produto.belongsToMany(models.pedido, { 
    through: models.item_pedido, 
    foreignKey: 'id_produto', 
    as: 'pedidos'
  });
};

  return Produto;
};