
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
      field: 'tipo_Atributo'
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

 
Atributos_Produto.associate = (models) => {
  Atributos_Produto.belongsTo(models.produto, {
    foreignKey: 'id_produto', // Chave estrangeira nesta tabela
    as: 'produto'
  });
};

  return Atributos_Produto;
};