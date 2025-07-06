// models/Gerente.js
module.exports = (sequelize, DataTypes) => {
  const Gerente = sequelize.define('gerente', {
    ID_Gerente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_gerente'
    },
    Nome_Gerente: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'nome_gerente'
    },
    Email_Gerente: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: 'email_gerente'
    },
    Hash_Senha_Gerente: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'hash_senha_gerente'
    }
  }, {
    tableName: 'gerente', // Nome exato da tabela no seu SQL [cite: 9]
    timestamps: false
  });

  return Gerente;
}