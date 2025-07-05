const { FOREIGNKEYS } = require("sequelize/lib/query-types");

module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('cliente', {
    id_cliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_cliente' // Garante que o nome da coluna no BD seja respeitado
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'nome'
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: 'email'
    },
    hash_senha: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'hash_senha'
    },
    telefone: {
      type: DataTypes.STRING(15),
      field: 'telefone'
    }
  }, {
    tableName: 'cliente', 
    timestamps: false 
  });


  Cliente.associate = (models) => {
    // Um Cliente TEM MUITOS Pedidos
    Cliente.hasMany(models.pedido, { 
      foreignKey: 'ID_Cliente', 
      as: 'pedidos' 
    });
  };

  return Cliente;
};


