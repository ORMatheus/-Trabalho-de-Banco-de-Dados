// models/AtributosProduto.js
module.exports = (sequelize, DataTypes) => {
  const Atributos_Produto = sequelize.define('atributos_produto', { // Use 'Atributos_Produto' para o modelo
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
      field: 'tipo_Atributo'
    },
    Valor_Atributo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'valor_atributo'
    }
  }, {
    tableName: 'atributos_produto', // Nome exato da tabela no seu SQL [cite: 4]
    timestamps: false
  });

  Atributos_Produto.associate = (models) => {
  // Um Atributo PERTENCE A UM Produto
  Atributos_Produto.belongsTo(models.produto, {
    foreignKey: 'ID_Produto',
    as: 'produto'
  });
};
  return Atributos_Produto;
};