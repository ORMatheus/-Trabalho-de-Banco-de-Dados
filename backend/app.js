// app.js
const db = require('./models'); // Importa o objeto db que contém Sequelize e os modelos

async function run() {
  try {
    // 1. Testar a Conexão com o Banco de Dados
    await db.sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso via Sequelize.');

    // 2. IMPORTANTE: Não use db.sequelize.sync()!
    // Como você já criou suas tabelas na Fase 5, não queremos que o Sequelize as altere.
    // O requisito é claro: "o código ORM não pode alterar o esquema do Banco de dados projetado/criado nas fases 4 e 5."

    console.log('\n--- Demonstração de Operações CRUD ---');

    // CREATE: Criar um novo cliente
    // Note que o ID_Cliente será gerado automaticamente pelo SERIAL
      const novoCliente = await db.Cliente.create({
        Nome: "Teste Cliente ORM",
        Email: `teste.orm${Date.now()}@email.com`, // Adiciona um timestamp para torná-lo único
        Hash_Senha: "senhaORMsegura",
        Telefone: "9988776655",
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
    const produtos = await db.Produto.findAll({ limit: 3 }); // Limita para não mostrar todos se houver muitos
    console.log('Alguns produtos:', produtos.map(p => p.toJSON()));

    // DELETE: (Cuidado ao executar, pois removerá dados!)
    // const clienteParaDeletar = await db.Cliente.findByPk(novoCliente.ID_Cliente);
    // if (clienteParaDeletar) {
    //   await clienteParaDeletar.destroy();
    //   console.log('Cliente deletado com sucesso:', novoCliente.ID_Cliente);
    // }

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
          [db.Sequelize.Op.lt]: 50 // Operador "less than" (menor que)
        }
      },
      order: [['Nome_Produto', 'ASC']] // Ordena pelo nome do produto ascendente
    });
    console.log('\nProdutos com menos de 50 unidades em estoque:', produtosBaixoEstoque.map(p => p.toJSON()));

    // Consulta 3 (Exemplo Aluno C): Contar quantos endereços cada cliente possui
    const clientesComContagemEnderecos = await db.Cliente.findAll({
        attributes: ['ID_Cliente', 'Nome',
            [db.sequelize.fn('COUNT', db.sequelize.col('enderecos.ID_Endereço')), 'total_enderecos'] // Conta os endereços
        ],
        include: [{
            model: db.Endereco,
            as: 'enderecos',
            attributes: [] // Não precisamos dos atributos do endereço aqui, apenas para a contagem
        }],
        group: ['Cliente.ID_Cliente', 'Cliente.Nome'], // Agrupa pelo cliente
        order: [[db.sequelize.fn('COUNT', db.sequelize.col('enderecos.ID_Endereço')), 'DESC']] // Ordena pela contagem
    });
    console.log('\nContagem de endereços por cliente:', clientesComContagemEnderecos.map(c => c.toJSON()));


  } catch (error) {
    console.error('Erro na execução do ORM:', error);
  } finally {
    // É importante fechar a conexão do banco de dados quando terminar de usá-la
    await db.sequelize.close();
    console.log('\nConexão com o banco de dados fechada.');
  }
}

run();