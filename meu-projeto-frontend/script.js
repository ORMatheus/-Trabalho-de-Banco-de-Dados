// script.js
// Define a URL base da sua API. Altere se o seu backend estiver a correr noutra porta ou endereço.
const API_BASE_URL = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica do Formulário de Cadastro de Cliente ---
    const cadastroForm = document.getElementById('cadastroForm');
    const cadastroMessageDiv = document.getElementById('cadastroMessage');

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Impede o recarregamento da página

            // Limpa mensagens anteriores e reseta as classes de estilo
            cadastroMessageDiv.textContent = '';
            cadastroMessageDiv.className = 'message'; 

            // Pega os valores dos campos do formulário
            const nome = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('password').value;
            const telefone = document.getElementById('phone').value;

            // Validação simples no frontend
            if (!nome || !email || !senha) {
                cadastroMessageDiv.textContent = 'Por favor, preencha os campos de nome, email e senha.';
                cadastroMessageDiv.classList.add('error');
                return;
            }

            // Dados a serem enviados para o backend
            const clienteData = {
                Nome: nome,
                Email: email,
                Hash_Senha: senha, // O backend irá gerar o hash seguro desta senha
                Telefone: telefone || null // Envia null se o campo estiver vazio
            };

            try {
                // Faz a requisição POST para a API
                const response = await fetch(`${API_BASE_URL}/clientes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(clienteData),
                });

                const data = await response.json(); // Pega a resposta JSON do backend

                if (response.ok) { // Status 200-299 indica sucesso
                    cadastroMessageDiv.textContent = `Cadastro realizado com sucesso! Bem-vindo(a), ${data.Nome}!`;
                    cadastroMessageDiv.classList.add('success');
                    cadastroForm.reset(); // Limpa o formulário
                } else { // Erros do servidor (4xx, 5xx)
                    cadastroMessageDiv.textContent = `Erro no cadastro: ${data.message || 'Erro desconhecido.'}`;
                    cadastroMessageDiv.classList.add('error');
                    console.error('Erro na API de cadastro:', data);
                }
            } catch (error) {
                // Erros de rede, CORS, etc.
                cadastroMessageDiv.textContent = `Erro de conexão com o servidor. Verifique se o backend está a correr na porta 3000.`;
                cadastroMessageDiv.classList.add('error');
                console.error('Erro de rede/conexão:', error);
            }
        });
    }

    // --- Lógica para Carregar Produtos (do seu script original) ---
    const productsGrid = document.getElementById('products-grid');
    const loadMoreProductsBtn = document.getElementById('loadMoreProductsBtn');

    let productsLoaded = 0;
    const productsPerLoad = 4; // Alterado para 4 para corresponder ao layout

    async function loadProducts() {
        if (!productsGrid) return; // Não faz nada se a grelha de produtos não existir

        try {
            if (productsLoaded === 0) {
                productsGrid.innerHTML = '<p class="col-span-full text-center text-gray-600">A carregar produtos...</p>';
                if(loadMoreProductsBtn) loadMoreProductsBtn.style.display = 'none';
            }

            // Simulação de carregamento de produtos, já que a rota de produtos não foi implementada no backend fornecido
            // Substitua isto pela sua chamada de API real quando tiver a rota de produtos
            const produtos = [
                { Nome_Produto: "Moletom 'Atos 1:8'", Descrição: "Receba o poder do Espírito Santo.", Preço: "159.90", QTD_Estoque: 20, imagens: [{ URL_Img: "https://placehold.co/600x750/f9fafb/374151?text=Moletom+Atos+1%3A8" }] },
                { Nome_Produto: "Camiseta 'Pedra Angular'", Descrição: "Ele é a rocha inabalável, nosso fundamento.", Preço: "89.90", QTD_Estoque: 35, imagens: [{ URL_Img: "https://placehold.co/600x750/111827/e5e7eb?text=Pedra+Angular" }] },
                { Nome_Produto: "Camiseta 'Sol da Justiça'", Descrição: "O astro que traz cura em suas asas.", Preço: "89.90", QTD_Estoque: 40, imagens: [{ URL_Img: "https://placehold.co/600x750/fefce8/f97316?text=Sol+da+Justiça" }] },
                { Nome_Produto: "Camiseta 'Grow in Grace'", Descrição: "Cresça na graça e no conhecimento.", Preço: "89.90", QTD_Estoque: 50, imagens: [{ URL_Img: "https://placehold.co/600x750/e0f2fe/0ea5e9?text=Grow+in+Grace" }] },
            ];
            
            if (productsLoaded === 0) {
                productsGrid.innerHTML = '';
            }

            if (produtos.length > 0) {
                produtos.forEach(produto => {
                    const productCard = `
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden group">
                            <div class="overflow-hidden">
                                <img src="${produto.imagens && produto.imagens.length > 0 ? produto.imagens[0].URL_Img : 'https://placehold.co/600x750/cccccc/333333?text=Sem+Imagem'}"
                                     alt="${produto.Nome_Produto}" class="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out">
                            </div>
                            <div class="p-6 text-center">
                                <h3 class="text-xl font-bold mb-2">${produto.Nome_Produto}</h3>
                                <p class="text-gray-600 mb-4">${produto.Descrição || ''}</p>
                            </div>
                        </div>
                    `;
                    productsGrid.insertAdjacentHTML('beforeend', productCard);
                });
            } else if (productsLoaded === 0) {
                 productsGrid.innerHTML = '<p class="col-span-full text-center text-gray-600">Nenhum produto disponível no momento.</p>';
            }

        } catch (error) {
            if(productsGrid) productsGrid.innerHTML = `<p class="col-span-full text-center text-red-500">Erro de conexão ao carregar produtos.</p>`;
            console.error('Erro ao carregar produtos:', error);
        }
    }

    // Carrega os produtos ao carregar a página
    loadProducts();
    
    // --- Lógica do Menu Mobile ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        const navLinks = document.querySelectorAll('#mobile-menu a, header nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            });
        });
    }
});
