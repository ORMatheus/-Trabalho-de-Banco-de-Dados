
module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('cliente', {
    ID_Cliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_cliente' 
    },
    Nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'nome'
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: 'email'
    },
    Hash_Senha: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'hash_senha'
    },
    Telefone: {
      type: DataTypes.STRING(15),
      field: 'telefone'
    }
  }, {
    tableName: 'cliente', 
    timestamps: false 
  });

  
  return Cliente;
};