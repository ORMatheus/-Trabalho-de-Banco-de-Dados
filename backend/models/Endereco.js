// models/Endereco.js
module.exports = (sequelize, DataTypes) => { // <-- Isso é uma função sendo exportada
  const Endereco = sequelize.define('Endereco', {
    ID_Endereço: { // Note o uso de 'ç' aqui - certifique-se de que corresponde ao SQL
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'Id_endereco' // Mapeia para a coluna no BD
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
    Número: { // Note o uso de 'ú' aqui
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
      field: 'CEP'
    }
  }, {
    tableName: 'endereco', // IMPORTANTE: O nome da tabela deve ser EXATO como no seu SQL
    timestamps: false // Você não tem colunas createdAt/updatedAt no SQL
  });

  // Opcional: Se houver associações específicas para este modelo, podem ser definidas aqui
  // Endereco.associate = (models) => {
  //   Endereco.belongsTo(models.Cliente, { foreignKey: 'ID_Cliente', as: 'cliente' });
  // };

  return Endereco;
};