// models/Entrega.js
module.exports = (sequelize, DataTypes) => {
  const Entrega = sequelize.define('entrega', {
    ID_Entrega: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_entrega'
    },
    ID_Pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // UNIQUE Constraint no SQL
      field: 'id_pedido'
    },
    ID_Entregador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id_entregador'
    },
    Data_Envio: {
      type: DataTypes.DATE, // TIMESTAMP no SQL
      allowNull: false,
      field: 'data_envio'
    },
    Data_Previsão_Entrega: { // Caracter especial no nome da coluna 
      type: DataTypes.DATE, // TIMESTAMP no SQL
      allowNull: false,
      field: 'data_previsao_entrega'
    },
    Data_Entrega_Real: {
      type: DataTypes.DATE, // TIMESTAMP no SQL, pode ser NULL 
      field: 'data_entrega_real'
    },
    Status_Entrega: {
      type: DataTypes.STRING(20),
      allowNull: false,
      // CHECK (Status_Entrega IN ('em trânsito', 'entregue', 'tentativa falha', 'devolvido')) é constraint do BD
      field: 'status_entrega'
    }
  }, {
    tableName: 'entrega', 
    timestamps: false
  });

  return Entrega;
};