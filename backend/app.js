// app.js
const db = require('./models'); 

async function run() {
  try {
    
    await db.sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso via Sequelize.');



    console.log('\n--- Demonstração de Operações CRUD ---');

    
  const novoCliente = await db.Cliente.create({
  Nome: 'Teste Cliente ORM 2',
  Email: 'testeNewemail@email.com',
  Hash_Senha: 'senhaORMsegura',
  Telefone: '9988776655'
});
    console.log('Cliente criado:', novoCliente.toJSON());

    // READ: Buscar um cliente pelo ID_Cliente
    const clienteEncontrado = await db.Cliente.findByPk(novoCliente.ID_Cliente);
    if (clienteEncontrado) {
      console.log('Cliente encontrado:', clienteEncontrado.toJSON());
    } else {
      console.log('Cliente não encontrado.');
    }

    // UPDATE: Atualizar o telefone do cliente
    if (clienteEncontrado) {
      clienteEncontrado.Telefone = '11122233344';
      await clienteEncontrado.save(); // Salva as mudanças no banco de dados
      console.log('Cliente atualizado:', clienteEncontrado.toJSON());
    }

    // READ: Buscar todos os produtos
    const produtos = await db.Produto.findAll({ limit: 3 }); 
    console.log('Alguns produtos:', produtos.map(p => p.toJSON()));

    

    console.log('\n--- Exemplo de Consultas Complexas com Associações ---');

    // Consulta 1 (Exemplo Aluno A): Trazer todos os pedidos de um cliente, incluindo seus itens e os produtos associados
    const clienteComPedidos = await db.Cliente.findByPk(1, { // Busca o cliente com ID_Cliente = 1
      include: [{
        model: db.Pedido,
        as: 'pedidos', // Alias definido na associação em models/index.js
        include: [{
          model: db.ItemPedido,
          as: 'itensPedido', // Alias definido na associação
          include: [{
            model: db.Produto,
            as: 'produto', // Alias definido na associação
            attributes: ['Nome_Produto', 'Preço'] // Seleciona apenas alguns atributos do produto
          }]
        }]
      }]
    });
    console.log('Cliente (ID 1) com seus pedidos e itens:', JSON.stringify(clienteComPedidos, null, 2));


    // Consulta 2 (Exemplo Aluno B): Encontrar produtos com estoque abaixo de 50, ordenados pelo nome
    const produtosBaixoEstoque = await db.Produto.findAll({
      where: {
        QTD_Estoque: {
          [db.Sequelize.Op.lt]: 50 
        }
      },
      order: [['Nome_Produto', 'ASC']] 
    });
    console.log('\nProdutos com menos de 50 unidades em estoque:', produtosBaixoEstoque.map(p => p.toJSON()));

    
    const clientesComContagemEnderecos = await db.Cliente.findAll({
        attributes: ['ID_Cliente', 'Nome',
            [db.sequelize.fn('COUNT', db.sequelize.col('enderecos.ID_Endereço')), 'total_enderecos']
        ],
        include: [{
            model: db.Endereco,
            as: 'enderecos',
            attributes: [] 
        }],
        group: ['Cliente.ID_Cliente', 'Cliente.Nome'], // Agrupa pelo cliente
        order: [[db.sequelize.fn('COUNT', db.sequelize.col('enderecos.ID_Endereço')), 'DESC']]
    });
    console.log('\nContagem de endereços por cliente:', clientesComContagemEnderecos.map(c => c.toJSON()));


  } catch (error) {
    console.error('Erro na execução do ORM:', error);
  } finally {
    
    await db.sequelize.close();
    console.log('\nConexão com o banco de dados fechada.');
  }
}

run();