// models/ADM.js
module.exports = (sequelize, DataTypes) => {
  const ADM = sequelize.define('adm', {
    ID_Admin: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_admin'
    },
    Nome_Admin: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'nome_admin'
    },
    Email_Admin: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: 'email_admin'
    },
    Hash_Senha_Admin: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'hash_senha_admin'
    }
  }, {
    tableName: 'adm', // Nome exato da tabela no seu SQL 
    timestamps: false
  });

  return ADM;
}   