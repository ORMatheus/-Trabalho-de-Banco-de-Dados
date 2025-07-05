// models/ADM.js
module.exports = (sequelize, DataTypes) => {
  const ADM = sequelize.define('ADM', {
    ID_Admin: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_admin'
    },
    Nome_Admin: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'Nome_Admin'
    },
    Email_Admin: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: 'Email_Admin'
    },
    Hash_Senha_Admin: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Hash_Senha_Admin'
    }
  }, {
    tableName: 'adm', // Nome exato da tabela no seu SQL [cite: 8]
    timestamps: false
  });

  return ADM;
}   