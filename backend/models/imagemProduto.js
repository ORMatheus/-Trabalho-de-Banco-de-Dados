
module.exports = (sequelize, DataTypes) => {
  const ImagensProduto = sequelize.define('imagens_produto', { 
    id_imagem: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_imagem'
    },
    id_produto: {
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
    tableName: 'imagens_produto', 
    timestamps: false
  });

  return ImagensProduto;
};