// models/Pedido.js
module.exports = (sequelize, DataTypes) => {
  const Pedido = sequelize.define('Pedido', {
    ID_Pedido: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_pedido'
    },
    ID_Cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id_cliente'
    },
    Data_Pedido: {
      type: DataTypes.DATE, // TIMESTAMP no SQL, mapeado para DataTypes.DATE no Sequelize
      allowNull: false,
      defaultValue: DataTypes.NOW, // CURRENT_TIMESTAMP no SQL [cite: 6]
      field: 'Data_Pedido'
    },
    Status_pedido: {
      type: DataTypes.STRING(20),
      allowNull: false,
      // CHECK (Status_pedido IN ('pendente', 'processando', 'enviado', 'entregue', 'cancelado')) é constraint do BD
      field: 'Status_pedido'
    }
  }, {
    tableName: 'pedido', // Nome exato da tabela no seu SQL [cite: 6]
    timestamps: false
  });

  return Pedido;
};