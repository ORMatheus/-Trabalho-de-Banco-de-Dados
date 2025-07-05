// script.js
const API_BASE_URL = 'http://localhost:3000/api'; // Certifique-se de que esta é a URL do seu backend Express

// --- Lógica do Menu Mobile (pode ser movida para cá ou mantida no HTML se for só isso) ---
// Já está no HTML, mas se quiser tudo JS, mova para cá e remova do HTML.

// --- Lógica do Formulário de Cadastro de Cliente ---
document.addEventListener('DOMContentLoaded', () => {
    const cadastroForm = document.getElementById('cadastroForm');
    const cadastroMessageDiv = document.getElementById('cadastroMessage');

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Impede o recarregamento da página

            cadastroMessageDiv.textContent = ''; // Limpa mensagens anteriores
            cadastroMessageDiv.className = 'message'; // Reseta classes

            const nome = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('password').value; // Senha em texto puro, em produção usaria hash no frontend
            const telefone = document.getElementById('phone').value;

            // Dados a serem enviados para o backend
            const clienteData = {
                Nome: nome,
                Email: email,
                Hash_Senha: senha, // Em um cenário real, você faria um hash dessa senha no backend.
                Telefone: telefone || null // Envia null se o campo estiver vazio
            };

            try {
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
                cadastroMessageDiv.textContent = `Erro de conexão com o servidor: ${error.message}. Verifique se o backend está rodando.`;
                cadastroMessageDiv.classList.add('error');
                console.error('Erro de rede/conexão:', error);
            }
        });
    }

    // --- Lógica para Carregar Produtos ---
    const productsGrid = document.getElementById('products-grid');
    const loadMoreProductsBtn = document.getElementById('loadMoreProductsBtn');

    let productsLoaded = 0;
    const productsPerLoad = 8; // Quantos produtos carregar por vez

    async function loadProducts() {
        try {
            // Se for a primeira carga ou se o botão "Carregar Mais" foi clicado
            if (productsLoaded === 0) {
                productsGrid.innerHTML = '<p class="col-span-full text-center text-gray-600">Carregando produtos...</p>';
                loadMoreProductsBtn.style.display = 'none'; // Esconde enquanto carrega
            }

            const response = await fetch(`${API_BASE_URL}/produtos?limit=${productsPerLoad}&offset=${productsLoaded}`);
            const produtos = await response.json();

            if (response.ok) {
                if (productsLoaded === 0) { // Se for a primeira carga, limpa a mensagem de carregamento
                    productsGrid.innerHTML = '';
                }

                if (produtos.length === 0 && productsLoaded === 0) {
                    productsGrid.innerHTML = '<p class="col-span-full text-center text-gray-600">Nenhum produto disponível no momento.</p>';
                } else if (produtos.length > 0) {
                    produtos.forEach(produto => {
                        // Construir o card do produto dinamicamente
                        const productCard = `
                            <div class="bg-white rounded-lg shadow-lg overflow-hidden group">
                                <div class="overflow-hidden">
                                    <img src="${produto.imagens && produto.imagens.length > 0 ? produto.imagens[0].URL_Img : 'https://placehold.co/600x750/cccccc/333333?text=Sem+Imagem'}"
                                         alt="${produto.Nome_Produto}" class="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out">
                                </div>
                                <div class="p-6 text-center">
                                    <h3 class="text-xl font-bold mb-2">${produto.Nome_Produto}</h3>
                                    <p class="text-gray-600 mb-4">${produto.Descrição || ''}</p>
                                    <p class="text-gray-900 font-bold text-lg">R$ ${parseFloat(produto.Preço).toFixed(2)}</p>
                                    <p class="text-gray-500 text-sm">Estoque: ${produto.QTD_Estoque}</p>
                                </div>
                            </div>
                        `;
                        productsGrid.insertAdjacentHTML('beforeend', productCard);
                    });
                    productsLoaded += produtos.length;

                    if (produtos.length < productsPerLoad) {
                        loadMoreProductsBtn.style.display = 'none'; // Esconde se não houver mais produtos
                    } else {
                        loadMoreProductsBtn.style.display = 'block'; // Mostra se pode carregar mais
                    }
                } else {
                    // Nenhuma mensagem se não houver mais produtos para carregar, apenas esconde o botão
                    loadMoreProductsBtn.style.display = 'none';
                }
            } else {
                productsGrid.innerHTML = `<p class="col-span-full text-center text-red-500">Erro ao carregar produtos: ${produtos.message || 'Erro desconhecido'}</p>`;
                console.error('Erro na API de produtos:', produtos);
            }
        } catch (error) {
            productsGrid.innerHTML = `<p class="col-span-full text-center text-red-500">Erro de conexão ao carregar produtos: ${error.message}. Verifique se o backend está rodando.</p>`;
            console.error('Erro de rede/conexão:', error);
        }
    }

    // Carrega os primeiros produtos ao carregar a página
    loadProducts();

    // Evento para o botão "Carregar Mais Produtos"
    if (loadMoreProductsBtn) {
        loadMoreProductsBtn.addEventListener('click', loadProducts);
    }
});

// Script para o menu mobile (mantido aqui ou pode ser movido para um arquivo separado)
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

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