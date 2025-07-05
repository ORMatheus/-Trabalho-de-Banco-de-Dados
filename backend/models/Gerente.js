
module.exports = (sequelize, DataTypes) => {
  const Gerente = sequelize.define('gerente', {
    id_gerente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_gerente'
    },
    nome_gerente: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'nome_gerente'
    },
    email_gerente: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: 'email_gerente'
    },
    hash_senha_gerente: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'hash_senha_gerente'
    }
  }, {
    tableName: 'gerente', 
    timestamps: false
  });

  return Gerente;
}