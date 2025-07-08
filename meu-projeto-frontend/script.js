// script.js
document.addEventListener('DOMContentLoaded', () => {
    // URL base da sua API. Verifique se a porta é a mesma do seu servidor backend.
    const API_BASE_URL = 'http://localhost:3000'; 
    const productsGrid = document.getElementById('products-grid');

    /**
     * @description Busca os produtos da API e os exibe na página.
     */
    async function loadProducts() {
        if (!productsGrid) return; // Sai da função se o elemento da grade não existir.

        productsGrid.innerHTML = '<p class="col-span-full text-center text-gray-600">A carregar produtos...</p>';

        try {
            // 1. FAZ A REQUISIÇÃO PARA A API DE PRODUTOS
            const response = await fetch(`${API_BASE_URL}/api/produtos`);
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.statusText}`);
            }
            const produtos = await response.json();

            // Limpa a mensagem de "carregando"
            productsGrid.innerHTML = '';

            // 2. VERIFICA SE RETORNOU ALGUM PRODUTO
            if (produtos.length === 0) {
                productsGrid.innerHTML = '<p class="col-span-full text-center text-gray-600">Nenhum produto disponível no momento.</p>';
                return;
            }

            // 3. CRIA O HTML PARA CADA PRODUTO E INSERE NA PÁGINA
            produtos.forEach(produto => {
                // Constrói a URL completa da imagem. O backend armazena o caminho relativo (ex: /uploads/imagem.jpg)
                // e nós adicionamos a base da URL do servidor.
                const imageUrl = produto.imagens && produto.imagens.length > 0 
                    ? `${API_BASE_URL}${produto.imagens[0].URL_Img}`
                    : 'https://placehold.co/600x750/cccccc/333333?text=Sem+Imagem';

                const productCard = `
                    <div class="bg-white rounded-lg shadow-lg overflow-hidden group">
                        <div class="overflow-hidden h-96">
                            <img src="${imageUrl}"
                                 alt="${produto.Nome_Produto}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out">
                        </div>
                        <div class="p-6 text-center">
                            <h3 class="text-xl font-bold mb-2">${produto.Nome_Produto}</h3>
                            <p class="text-gray-600 mb-4">${produto.Descricao || ''}</p>
                            <p class="text-2xl font-bold text-yellow-700">R$ ${Number(produto.Preço).toFixed(2).replace('.', ',')}</p>
                        </div>
                    </div>
                `;
                productsGrid.insertAdjacentHTML('beforeend', productCard);
            });

        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            productsGrid.innerHTML = `<p class="col-span-full text-center text-red-500">Erro de conexão ao carregar produtos. Verifique se o backend está em execução.</p>`;
        }
    }

    // Carrega os produtos assim que a página é carregada
    loadProducts();

    // --- Lógica do Cadastro de Cliente (sem alterações) ---
    const cadastroForm = document.getElementById('cadastroForm');
    const cadastroMessageDiv = document.getElementById('cadastroMessage');

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // ... (o restante do código de cadastro de cliente continua o mesmo)
            const nome = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('password').value;
            const telefone = document.getElementById('phone').value;
            const clienteData = { Nome: nome, Email: email, Hash_Senha: senha, Telefone: telefone };

            try {
                const response = await fetch(`${API_BASE_URL}/api/clientes`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(clienteData),
                });
                const data = await response.json();
                if (response.ok) {
                    cadastroMessageDiv.textContent = `Cadastro realizado com sucesso! Bem-vindo(a), ${data.Nome}!`;
                    cadastroMessageDiv.className = 'message success';
                    cadastroForm.reset();
                } else {
                    cadastroMessageDiv.textContent = `Erro no cadastro: ${data.error || 'Erro desconhecido.'}`;
                    cadastroMessageDiv.className = 'message error';
                }
            } catch (err) {
                cadastroMessageDiv.textContent = 'Erro de conexão com o servidor.';
                cadastroMessageDiv.className = 'message error';
            }
        });
    }
    
    // --- Lógica do Menu Mobile (sem alterações) ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});