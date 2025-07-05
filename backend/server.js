// server.js
const express = require('express');
const cors = require('cors');

const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Rotas da API ---

// Rota de teste inicial
app.get('/api', (req, res) => {
  res.json({ message: 'Bem-vindo à API da loja Pregai!' });
});

// Importação dos roteadores de cada entidade
const clienteRoutes = require('./routes/clienteRoutes');
// const produtoRoutes = require('./routes/produtoRoutes'); // Exemplo para quando criar
// const pedidoRoutes = require('./routes/pedidoRoutes');   // Exemplo para quando criar

// Delegação das rotas para os seus respectivos roteadores
app.use('/api/clientes', clienteRoutes);
// app.use('/api/produtos', produtoRoutes); // Exemplo para quando criar
// app.use('/api/pedidos', pedidoRoutes);   // Exemplo para quando criar


// --- Inicialização do Servidor ---
async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log('Conexão com a base de dados estabelecida com sucesso.');

    app.listen(PORT, () => {
      console.log(`Servidor a correr na porta ${PORT}`);
      console.log(`Acesse a API em http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Não foi possível conectar à base de dados:', error);
    process.exit(1);
  }
}

startServer();