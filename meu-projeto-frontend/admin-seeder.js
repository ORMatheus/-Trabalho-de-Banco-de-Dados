// admin-seeder.js
document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://localhost:3000/api';
    const seedMessageDiv = document.getElementById('seedMessage');

    const handleSeedClick = async (modelName, data) => {
        seedMessageDiv.innerHTML = '';
        seedMessageDiv.className = '';

        try {
            const response = await fetch(`${API_BASE_URL}/${modelName}/seed`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message);

            seedMessageDiv.className = 'message success';
            seedMessageDiv.textContent = `Sucesso! ${modelName.charAt(0).toUpperCase() + modelName.slice(1)} de teste adicionado.`;

        } catch (error) {
            seedMessageDiv.className = 'message error';
            seedMessageDiv.textContent = `Erro: ${error.message}`;
        }
    };

    document.getElementById('seedCliente').addEventListener('click', () => {
        handleSeedClick('clientes', {
            Nome: `Cliente Teste ${Date.now()}`,
            Email: `cliente${Date.now()}@teste.com`,
            Hash_Senha: 'senha123'
        });
    });

    document.getElementById('seedProduto').addEventListener('click', () => {
        handleSeedClick('produtos', {
            nome_produto: 'Camiseta Teste',
            descricao: 'Uma camiseta de algodão para teste.',
            preco: 59.90,
            qtd_estoque: 100,
            status: 'ativo',
            cor: 'Preto',
            tamanho: 'M',
            imagem: 'placeholder' // O backend vai ignorar isso, mas podemos enviar
        });
    });

    document.getElementById('seedAdm').addEventListener('click', () => {
        handleSeedClick('adms', {
            Nome_Admin: `Admin Teste ${Date.now()}`,
            Email_Admin: `admin${Date.now()}@teste.com`,
            Hash_Senha_Admin: 'senha123'
        });
    });

    document.getElementById('seedGerente').addEventListener('click', () => {
        handleSeedClick('gerentes', {
            Nome_Gerente: `Gerente Teste ${Date.now()}`,
            Email_Gerente: `gerente${Date.now()}@teste.com`,
            Hash_Senha_Gerente: 'senha123'
        });
    });

    document.getElementById('seedEntregador').addEventListener('click', () => {
        handleSeedClick('entregadores', {
            Nome_Entregador: `Entregador Teste ${Date.now()}`,
            Telefone_Entregador: `${Date.now()}`.slice(-9)
        });
    });
});
