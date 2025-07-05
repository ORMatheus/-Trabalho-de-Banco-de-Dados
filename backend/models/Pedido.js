
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
      defaultValue: DataTypes.NOW, // CURRENT_TIMESTAMP no SQL [cite: 6]
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

  return Pedido;
};