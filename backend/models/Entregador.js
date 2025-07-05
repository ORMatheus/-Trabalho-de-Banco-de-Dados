// models/Entregador.js
module.exports = (sequelize, DataTypes) => {
  const Entregador = sequelize.define('Entregador', {
    ID_Entregador: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_entregador'
    },
    Nome_Entregador: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'Nome_Entregador'
    },
    Telefone_Entregador: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
      field: 'Telefone_Entregador'
    }
  }, {
    tableName: 'entregador', // Nome exato da tabela no seu SQL [cite: 10]
    timestamps: false
  });

  return Entregador;
}