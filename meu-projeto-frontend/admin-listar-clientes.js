// admin-listar-clientes.js
document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://localhost:3000/api';
    const tbody = document.getElementById('lista-clientes');

    async function carregarClientes() {
        try {
            // Chama a API para buscar todos os clientes
            const response = await fetch(`${API_BASE_URL}/clientes`);
            if (!response.ok) {
                throw new Error('Falha ao carregar a lista de clientes.');
            }
            const clientes = await response.json();

            tbody.innerHTML = ''; // Limpa a tabela antes de preencher

            if (clientes.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4">Nenhum cliente encontrado.</td></tr>';
                return;
            }

            // Para cada cliente retornado, cria uma linha na tabela
            clientes.forEach(cliente => {
                const tr = document.createElement('tr');
                tr.className = 'border-b hover:bg-gray-50';
                
                tr.innerHTML = `
                    <td class="py-3 px-4">${cliente.ID_Cliente}</td>
                    <td class="py-3 px-4">${cliente.Nome}</td>
                    <td class="py-3 px-4">${cliente.Email}</td>
                    <td class="py-3 px-4">${cliente.Telefone || 'N/A'}</td>
                    <td class="py-3 px-4">
                        <a href="admin-editar-cliente.html?id=${cliente.ID_Cliente}" class="text-blue-600 hover:text-blue-800 font-semibold">Editar</a>
                        <button data-id="${cliente.ID_Cliente}" class="text-red-600 hover:text-red-800 font-semibold ml-4 btn-excluir">Excluir</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            tbody.innerHTML = `<tr><td colspan="5" class="text-center text-red-500 py-4">${error.message}</td></tr>`;
        }
    }

    // Lógica para o botão de exclusão (será implementada no futuro)
    tbody.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btn-excluir')) {
            const id = e.target.dataset.id;
            alert(`Funcionalidade de Excluir Cliente (ID: ${id}) a ser implementada.`);
            // A lógica de exclusão real será adicionada quando você pedir o CRUD completo de clientes.
        }
    });

    // Carrega a lista de clientes ao abrir a página
    carregarClientes();
});