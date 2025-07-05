// models/Produto.js
module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('Produto', {
    ID_Produto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_produto'
    },
    Nome_Produto: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'Nome_Produto'
    },
   Descrição: { // Caracter especial no nome da coluna [cite: 3]
      type: DataTypes.TEXT,
      field: 'Descrição'
    },
    Preço: { // Caracter especial no nome da coluna [cite: 3]
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      // CHECK (Preço >= 0) é uma constraint do BD, não é replicada no ORM, mas o BD a enforces
      field: 'Preço'
    },
    QTD_Estoque: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // CHECK (QTD_Estoque >= 0) é uma constraint do BD
      field: 'QTD_Estoque'
    },
    Status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      // CHECK (Status IN ('ativo', 'inativo', 'esgotado')) é uma constraint do BD
      field: 'Status'
    }
  }, {
    tableName: 'produto', // Nome exato da tabela no seu SQL [cite: 3]
    timestamps: false
  });

  return Produto;
};