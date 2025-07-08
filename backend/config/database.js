
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

module.exports = {
  // Configurações para o ambiente de desenvolvimento
  development: {
    username: process.env.DB_USER,      
    password: process.env.DB_PASSWORD,  
    database: process.env.DB_NAME,      
    host: process.env.DB_HOST,          
    port: process.env.DB_PORT,          
    dialect: 'postgres',                
    logging: false,                     
                                        
  },
  
};