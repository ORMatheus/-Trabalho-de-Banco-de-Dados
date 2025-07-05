// models/AtributosProduto.js
module.exports = (sequelize, DataTypes) => {
  const AtributosProduto = sequelize.define('atributosproduto', { // Use 'Atributos_Produto' para o modelo
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
      field: 'Tipo_Atributo'
    },
    Valor_Atributo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'Valor_Atributo'
    }
  }, {
    tableName: 'atributos_produto', // Nome exato da tabela no seu SQL [cite: 4]
    timestamps: false
  });

  return AtributosProduto;
};