// models/ImagensProduto.js
module.exports = (sequelize, DataTypes) => {
  const ImagensProduto = sequelize.define('imagens_produto', { // Use 'Imagens_Produto' para o modelo
    ID_Imagem: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_imagem'
    },
    ID_Produto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id_produto'
    },
    URL_Img: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'url_imagem'
    }
  }, {
    tableName: 'imagens_produto', // Nome exato da tabela no seu SQL [cite: 5]
    timestamps: false
  });

  return ImagensProduto;
};