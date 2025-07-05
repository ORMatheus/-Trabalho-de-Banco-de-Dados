
module.exports = (sequelize, DataTypes) => {
  const Pedido = sequelize.define('pedido', {
    id_pedido: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_pedido'
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id_cliente'
    },
    data_pedido: {
      type: DataTypes.DATE, // TIMESTAMP no SQL, mapeado para DataTypes.DATE no Sequelize
      allowNull: false,
      defaultValue: DataTypes.NOW, 
      field: 'data_pedido'
    },
    status_pedido: {
      type: DataTypes.STRING(20),
      allowNull: false,
      // CHECK (Status_pedido IN ('pendente', 'processando', 'enviado', 'entregue', 'cancelado')) é constraint do BD
      field: 'status_pedido'
    }
  }, {
    tableName: 'pedido', 
    timestamps: false
  });

  
Pedido.associate = (models) => {
  // Relação: Um Pedido PERTENCE A UM Cliente
  Pedido.belongsTo(models.cliente, {
    foreignKey: 'id_cliente',
    as: 'cliente'
  });

  // Relação: Um Pedido TEM UMA Entrega
  Pedido.hasOne(models.entrega, { // Nome do model em Entrega.js
    foreignKey: 'id_pedido', // Chave estrangeira em entrega
    as: 'entrega'
  });

  // Relação Muitos-para-Muitos: Pedido <-> Produto
  Pedido.belongsToMany(models.produto, {
    through: models.item_pedido, // A tabela "ponte"
    foreignKey: 'id_pedido',     // Chave estrangeira em item_pedido
    as: 'produtos'
  });
};

  return Pedido;
};