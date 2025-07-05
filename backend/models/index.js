// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database'); // Importa as configurações do banco de dados

// Define o ambiente (desenvolvimento por padrão)
const env = process.env.NODE_ENV || 'development';

// Cria uma nova instância do Sequelize, conectando ao banco de dados
const sequelize = new Sequelize(config[env]);

const db = {}; // Objeto para armazenar os modelos e a instância do Sequelize

db.sequelize = sequelize; // Adiciona a instância do Sequelize
db.Sequelize = Sequelize; // Adiciona a classe Sequelize

// --- Importação dos Modelos ---
// Para cada tabela SQL que você criou, você precisará de um modelo Sequelize.
// Certifique-se de que o nome do arquivo corresponde ao nome do modelo (ex: Cliente.js para o modelo Cliente).
// Passe a instância do Sequelize e DataTypes para cada modelo.

db.Cliente = require('./cliente')(sequelize, DataTypes); // 'cliente' com 'c' minúsculo
db.Endereco = require('./endereco')(sequelize, DataTypes);
db.Produto = require('./produto')(sequelize, DataTypes);
db.AtributosProduto = require('./atributosProduto')(sequelize, DataTypes);
db.ImagensProduto = require('./imagemProduto')(sequelize, DataTypes);
db.Pedido = require('./pedido')(sequelize, DataTypes);
db.ItemPedido = require('./itemPedido')(sequelize, DataTypes);
db.Adm = require('./adm')(sequelize, DataTypes);
db.Gerente = require('./gerente')(sequelize, DataTypes);
db.Entregador = require('./entregador')(sequelize, DataTypes);
db.Entrega = require('./entrega')(sequelize, DataTypes);

// --- Definição das Associações (Relacionamentos) ---
// Mapeie os relacionamentos que você definiu no seu modelo lógico (Fase 3 e 4).
// Use foreignKey para especificar a coluna que é a chave estrangeira.
// Use 'as' para definir um alias para o relacionamento, tornando-o mais legível.

// Cliente e Endereço (1:N)
db.Cliente.hasMany(db.Endereco, { foreignKey: 'id_cliente', as: 'enderecos' });
db.Endereco.belongsTo(db.Cliente, { foreignKey: 'id_cliente', as: 'cliente' });

// Produto e Atributos_Produto (1:N)
db.Produto.hasMany(db.AtributosProduto, { foreignKey: 'id_produto', as: 'atributos' });
db.AtributosProduto.belongsTo(db.Produto, { foreignKey: 'id_produto', as: 'produto' });

// Produto e Imagens_Produto (1:N)
db.Produto.hasMany(db.ImagensProduto, { foreignKey: 'id_produto', as: 'imagens' });
db.ImagensProduto.belongsTo(db.Produto, { foreignKey: 'id_produto', as: 'produto' });

// Cliente e Pedido (1:N)
db.Cliente.hasMany(db.Pedido, { foreignKey: 'id_cliente', as: 'pedidos' });
db.Pedido.belongsTo(db.Cliente, { foreignKey: 'id_cliente', as: 'cliente' });

// Pedido e Item_Pedido (1:N)
db.Pedido.hasMany(db.ItemPedido, { foreignKey: 'id_pedido', as: 'itensPedido' });
db.ItemPedido.belongsTo(db.Pedido, { foreignKey: 'id_pedido', as: 'pedido' });

// Produto e Item_Pedido (1:N - ou N:M através de Item_Pedido)
// O Item_Pedido é a tabela de junção para um relacionamento N:M entre Pedido e Produto.
db.Produto.hasMany(db.ItemPedido, { foreignKey: 'id_produto', as: 'itensPedidoProduto' });
db.ItemPedido.belongsTo(db.Produto, { foreignKey: 'id_produto', as: 'produto' });

// Pedido e Entrega (1:1 - ID_Pedido em Entrega é UNIQUE)
db.Pedido.hasOne(db.Entrega, { foreignKey: 'id_pedido', as: 'entrega' });
db.Entrega.belongsTo(db.Pedido, { foreignKey: 'id_pedido', as: 'pedido' });

// Entregador e Entrega (1:N)
db.Entregador.hasMany(db.Entrega, { foreignKey: 'id_entregador', as: 'entregas' });
db.Entrega.belongsTo(db.Entregador, { foreignKey: 'id_entregador', as: 'entregador' });


// Exporte o objeto db, que contém a instância do Sequelize e todos os modelos
module.exports = db;