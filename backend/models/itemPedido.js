// models/ItemPedido.js
module.exports = (sequelize, DataTypes) => {
  const ItemPedido = sequelize.define('Item_Pedido', { // Use 'Item_Pedido' para o modelo
    ID_Item_Pedido: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_item_pedido'
    },
    ID_Pedido: {
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
      field: 'QTD'
    },
    Preço_unidade: { // Caracter especial no nome da coluna [cite: 7]
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      // CHECK (Preço_unidade >= 0) é constraint do BD
      field: 'Preço_unidade'
    }
  }, {
    tableName: 'item_pedido', // Nome exato da tabela no seu SQL [cite: 7]
    timestamps: false
  });

  return ItemPedido;
};