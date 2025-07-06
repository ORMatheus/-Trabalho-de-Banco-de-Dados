'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
// Aponta para o ficheiro de configuração da base de dados que você já tem
const config = require(__dirname + '/../config/database.js').development;
const db = {};

let sequelize;
// Cria a instância do Sequelize usando as configurações do seu ficheiro
sequelize = new Sequelize(config.database, config.username, config.password, config);

// Lê todos os ficheiros na pasta 'models'
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    // Importa cada modelo e o inicializa com a instância do sequelize
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Associa os modelos se houver um método 'associate' definido neles
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
