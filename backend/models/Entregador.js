
module.exports = (sequelize, DataTypes) => {
  const Entregador = sequelize.define('entregador', {
    id_entregador: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_entregador'
    },
    nome_entregador: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'nome_entregador'
    },
    telefone_entregador: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
      field: 'telefone_entregador'
    }
  }, {
    tableName: 'entregador', 
  });


Entregador.associate = (models) => {
  Entregador.hasMany(models.entrega, {
    foreignKey: 'id_entregador', // Chave estrangeira em entrega
    as: 'entregas'
  });
};

  return Entregador;
}