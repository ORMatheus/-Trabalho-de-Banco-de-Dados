
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

module.exports = {
  // Configurações para o ambiente de desenvolvimento
  development: {
    username: process.env.DB_USER,      // Pega o usuário do .env
    password: process.env.DB_PASSWORD,  // Pega a senha do .env
    database: process.env.DB_NAME,      // Pega o nome do BD do .env
    host: process.env.DB_HOST,          // Pega o host do .env
    port: process.env.DB_PORT,          // Pega a porta do .env
    dialect: 'postgres',                // Define o dialeto do banco de dados como PostgreSQL
    logging: false,                     // Opcional: define se o Sequelize deve logar as queries SQL no console.
                                        // Mude para true se quiser ver as queries geradas.
  },
  
};