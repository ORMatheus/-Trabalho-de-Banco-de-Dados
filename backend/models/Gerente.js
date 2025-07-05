// models/Gerente.js
module.exports = (sequelize, DataTypes) => {
  const Gerente = sequelize.define('Gerente', {
    ID_Gerente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'ide_gerente'
    },
    Nome_Gerente: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'Nome_Gerente'
    },
    Email_Gerente: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: 'Email_Gerente'
    },
    Hash_Senha_Gerente: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Hash_Senha_Gerente'
    }
  }, {
    tableName: 'gerente', // Nome exato da tabela no seu SQL [cite: 9]
    timestamps: false
  });

  return Gerente;
}