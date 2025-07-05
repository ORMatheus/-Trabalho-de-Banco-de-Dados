// models/Entrega.js
module.exports = (sequelize, DataTypes) => {
  const Entrega = sequelize.define('Entrega', {
    ID_Entrega: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_entrega'
    },
    ID_Pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // UNIQUE Constraint no SQL [cite: 11]
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
      field: 'Data_Envio'
    },
    Data_Previsão_Entrega: { // Caracter especial no nome da coluna [cite: 11]
      type: DataTypes.DATE, // TIMESTAMP no SQL
      allowNull: false,
      field: 'Data_Previsão_Entrega'
    },
    Data_Entrega_Real: {
      type: DataTypes.DATE, // TIMESTAMP no SQL, pode ser NULL [cite: 11]
      field: 'Data_Entrega_Real'
    },
    Status_Entrega: {
      type: DataTypes.STRING(20),
      allowNull: false,
      // CHECK (Status_Entrega IN ('em trânsito', 'entregue', 'tentativa falha', 'devolvido')) é constraint do BD
      field: 'Status_Entrega'
    }
  }, {
    tableName: 'entrega', // Nome exato da tabela no seu SQL [cite: 11]
    timestamps: false
  });

  return Entrega;
};