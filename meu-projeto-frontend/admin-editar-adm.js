// admin-listar-adms.js
document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://localhost:3000/api';
    const tbody = document.getElementById('lista-adms');

    // Função para carregar os administradores na tabela
    async function carregarAdms() {
        try {
            const response = await fetch(`${API_BASE_URL}/adms`);
            if (!response.ok) {
                throw new Error('Falha ao carregar a lista de administradores.');
            }
            const adms = await response.json();

            tbody.innerHTML = ''; // Limpa a tabela antes de preencher

            if (adms.length === 0) {
                tbody.innerHTML = '<tr><td colspan="4" class="text-center py-4">Nenhum administrador encontrado.</td></tr>';
                return;
            }

            adms.forEach(adm => {
                const tr = document.createElement('tr');
                tr.className = 'border-b hover:bg-gray-50';
                
                // PONTO CRÍTICO DA CORREÇÃO:
                // A linha abaixo cria o link de "Editar" corretamente, incluindo o ID do administrador na URL.
                tr.innerHTML = `
                    <td class="py-3 px-4">${adm.ID_Admin}</td>
                    <td class="py-3 px-4">${adm.Nome_Admin}</td>
                    <td class="py-3 px-4">${adm.Email_Admin}</td>
                    <td class="py-3 px-4">
                        <a href="admin-editar-adm.html?id=${adm.ID_Admin}" class="text-blue-600 hover:text-blue-800 font-semibold">Editar</a>
                        <button data-id="${adm.ID_Admin}" class="text-red-600 hover:text-red-800 font-semibold ml-4 btn-excluir">Excluir</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            tbody.innerHTML = `<tr><td colspan="4" class="text-center text-red-500 py-4">${error.message}</td></tr>`;
        }
    }

    // Lógica para o botão de exclusão
    tbody.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btn-excluir')) {
            const id = e.target.dataset.id;
            
            if (confirm(`Tem certeza que deseja excluir o administrador com ID ${id}?`)) {
                try {
                    const response = await fetch(`${API_BASE_URL}/adms/${id}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        // Recarrega a lista para refletir a exclusão
                        carregarAdms();
                    } else {
                        const result = await response.json();
                        alert(`Erro ao excluir: ${result.message}`);
                    }
                } catch (error) {
                    alert('Erro de conexão ao tentar excluir.');
                }
            }
        }
    });

    // Carrega a lista de administradores ao abrir a página
    carregarAdms();
});