// models/Endereco.js
module.exports = (sequelize, DataTypes) => { // <-- Isso é uma função sendo exportada
  const Endereco = sequelize.define('endereco', {
    ID_Endereço: { // Note o uso de 'ç' aqui - certifique-se de que corresponde ao SQL
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_endereco' // Mapeia para a coluna no BD
    },
    ID_Cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id_cliente'
    },
    Rua: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'rua'
    },
    Numero: { 
      type: DataTypes.STRING(10),
      allowNull: false,
      field: 'numero'
    },
    Bairro: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'bairro'
    },
    Cidade: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'cidade'
    },
    Estado: {
      type: DataTypes.STRING(2),
      allowNull: false,
      field: 'estado'
    },
    CEP: {
      type: DataTypes.STRING(10),
      allowNull: false,
      field: 'cep'
    }
  }, {
    tableName: 'endereco', 
    timestamps: false // Você não tem colunas createdAt/updatedAt no SQL
  });


  return Endereco;
};