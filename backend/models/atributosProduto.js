// models/AtributosProduto.js
module.exports = (sequelize, DataTypes) => {
  const Atributos_Produto = sequelize.define('atributos_produto', {
    ID_Atributo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_atributo'
    },
    ID_Produto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id_produto'
    },
    Tipo_Atributo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'tipo_atributo'
    },
    Valor_Atributo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'valor_atributo'
    }
  }, {
    tableName: 'atributos_produto', 
    timestamps: false
  });

  return Atributos_Produto;
};