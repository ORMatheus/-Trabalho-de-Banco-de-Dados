
module.exports = (sequelize, DataTypes) => {
  const Entrega = sequelize.define('entrega', {
    id_entrega: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_entrega'
    },
    id_pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      field: 'id_pedido'
    },
    id_entregador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id_entregador'
    },
    data_envio: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'data_envio'
    },
    data_previsão_Entrega: { 
      type: DataTypes.DATE, 
      allowNull: false,
      field: 'data_previsao_entrega'
    },
    data_entrega_real: {
      type: DataTypes.DATE,
      field: 'data_entrega_real'
    },
    status_entrega: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'status_entrega'
    }
  }, {
    tableName: 'entrega', 
    timestamps: false
  });


  
Entrega.associate = (models) => {
  Entrega.belongsTo(models.pedido, {
    foreignKey: 'id_pedido', // Chave estrangeira nesta tabela
    as: 'pedido'
  });
  Entrega.belongsTo(models.entregador, { // Nome do model em Entregador.js
    foreignKey: 'id_entregador', // Chave estrangeira nesta tabela
    as: 'entregador'
  });
};
  return Entrega;
};