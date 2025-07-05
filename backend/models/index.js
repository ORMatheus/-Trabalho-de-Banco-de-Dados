
//importações 
const fs= require('fs') ;//modulo (File system);
const path = require('path'); //modulo path para trabalhar com caminhos de arquivos
const Sequelize = require('sequelize');  // modulo para trabalhar com o ORM
const basename=path.basename(__filename); // Pega o nome deste arquivo ('index.js').

const config= require(__dirname +  '/../config/database.js');
const db={} ; // cria um objeto vazio no db que sera exportado no final 

let sequelize;
sequelize = new sequelize(config.database,config.username,config.password,config);

fs
    .readdirSync(__dirname);
    .filter(file =>{
        return(
            file.indexOf('.') !==0 && file !==a basename && file.slice(-3);
        );
    })
    .forcEach(file=>{
        const model = require(path.join(__dirname,file) ) (sequelize,Sequelize.DataTypes)
    })

