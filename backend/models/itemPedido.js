
module.exports = (sequelize, DataTypes) => {
  const ItemPedido = sequelize.define('item_pedido', { 
    id_item_pedido: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_item_pedido'
    },
    id_Pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id_pedido'
    },
    ID_Produto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id_produto'
    },
    QTD: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // CHECK (QTD > 0) é constraint do BD
      field: 'qtd'
    },
    preço_unidade: { 
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      // CHECK (Preço_unidade >= 0) é constraint do BD
      field: 'preco_unidade'
    }
  }, {
    tableName: 'item_pedido', 
    timestamps: false
  });

  ItemPedido.associate = (models) => {
    // Um ItemPedido PERTENCE A UM Pedido
    ItemPedido.belongsTo(models.pedido, { 
        foreignKey: 'id_pedido', 
        as: 'pedido' });

    // Um ItemPedido PERTENCE A UM Produto
    ItemPedido.belongsTo(models.produto, { 
        foreignKey: 'id_produto', 
        as: 'produto' });
};

  return ItemPedido;
};