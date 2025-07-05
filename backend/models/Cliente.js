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
  // Relação: Um Cliente TEM MUITOS Endereços
  Cliente.hasMany(models.endereco, {
    foreignKey: 'ID_Cliente', // Chave estrangeira em Endereco
    as: 'enderecos'
  });

  // Relação: Um Cliente TEM MUITOS Pedidos
  Cliente.hasMany(models.pedido, { // 'pedido' será o nome do model em Pedido.js
    foreignKey: 'ID_Cliente', // Chave estrangeira em Pedido
    as: 'pedidos'
  });
};


  return Cliente;
};


