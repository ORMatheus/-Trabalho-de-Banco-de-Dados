// models/Entregador.js
module.exports = (sequelize, DataTypes) => {
  const Entregador = sequelize.define('entregador', {
    ID_Entregador: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_entregador'
    },
    Nome_Entregador: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'nome_entregador'
    },
    Telefone_Entregador: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
      field: 'telefone_entregador'
    }
  }, {
    tableName: 'entregador', // Nome exato da tabela no seu SQL
    timestamps: false
  });

  return Entregador;
}