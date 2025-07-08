// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./models');


// Importa os ficheiros de rotas
const produtoRoutes = require('./routes/produtoRoutes');
const clienteRoutes = require('./routes/clienteRoutes'); 
const entregadorRoutes = require('./routes/entregadorRoutes');
const gerenteRoutes = require('./routes/gerenteRoutes');
const admRoutes = require('./routes/admRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares ---
app.use(cors());
app.use(express.json());
// Serve os ficheiros da pasta 'public' de forma estática para que as imagens possam ser acedidas

app.use(express.static(path.join(__dirname, 'public'))); //


// --- Associações dos Modelos (Centralizado para garantir a ordem) ---
// É uma boa prática garantir que as associações são definidas antes de o servidor começar a ouvir.
const { cliente, endereco, pedido, produto, item_pedido, imagens_produto, atributos_produto, entrega, entregador } = db;

if (cliente && pedido && endereco) {
    cliente.hasMany(pedido, { foreignKey: 'id_cliente', as: 'pedidos' });
    cliente.hasMany(endereco, { foreignKey: 'id_cliente', as: 'enderecos' });
    pedido.belongsTo(cliente, { foreignKey: 'id_cliente', as: 'cliente' });
    endereco.belongsTo(cliente, { foreignKey: 'id_cliente', as: 'cliente' });
}
if (pedido && item_pedido && entrega) {
    pedido.hasMany(item_pedido, { foreignKey: 'id_pedido', as: 'itensPedido' });
    pedido.hasOne(entrega, { foreignKey: 'id_pedido', as: 'entrega' });
    item_pedido.belongsTo(pedido, { foreignKey: 'id_pedido', as: 'pedido' });
    entrega.belongsTo(pedido, { foreignKey: 'id_pedido', as: 'pedido' });
}
if (produto && item_pedido && imagens_produto && atributos_produto) {
    produto.hasMany(item_pedido, { foreignKey: 'id_produto', as: 'itensPedido' });
    produto.hasMany(imagens_produto, { foreignKey: 'id_produto', as: 'imagens' });
    produto.hasMany(atributos_produto, { foreignKey: 'id_produto', as: 'atributos' });
    item_pedido.belongsTo(produto, { foreignKey: 'id_produto', as: 'produto' });
    imagens_produto.belongsTo(produto, { foreignKey: 'id_produto', as: 'produto' });
    atributos_produto.belongsTo(produto, { foreignKey: 'id_produto', as: 'produto' });
}
if (entrega && entregador) {
    entrega.belongsTo(entregador, { foreignKey: 'id_entregador', as: 'entregador' });
    entregador.hasMany(entrega, { foreignKey: 'id_entregador', as: 'entregas' });
}


// --- Rotas da API ---
// Qualquer requisição que comece com '/api/produtos' será gerida pelo 'produtoRoutes'
app.use('/api/produtos', produtoRoutes);

// Qualquer requisição que comece com '/api/clientes' será gerida pelo 'clienteRoutes'
// (É recomendado criar um controller e uma rota para clientes também)
app.use('/api/clientes', clienteRoutes);
app.use('/api/adms', admRoutes);
app.use('/api/gerentes', gerenteRoutes); 
app.use('/api/entregadores', entregadorRoutes);


// --- Inicialização do Servidor ---
async function startServer() {
    try {
        await db.sequelize.authenticate();
        console.log('Conexão com a base de dados estabelecida com sucesso.');
        app.listen(PORT, () => {
            console.log(`Servidor a correr na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Não foi possível conectar à base de dados:', error);
        process.exit(1);
    }
}

startServer();
