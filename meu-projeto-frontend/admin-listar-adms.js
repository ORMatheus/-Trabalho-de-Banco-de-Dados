// admin-listar-adms.js
document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://localhost:3000/api';
    const tbody = document.getElementById('lista-adms');

    async function carregarAdms() {
        try {
            const response = await fetch(`${API_BASE_URL}/adms`);
            const adms = await response.json();
            tbody.innerHTML = '';

            adms.forEach(adm => {
                const tr = document.createElement('tr');
                tr.className = 'border-b hover:bg-gray-50';
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
            tbody.innerHTML = '<tr><td colspan="4" class="text-center text-red-500 py-4">Erro ao carregar administradores.</td></tr>';
        }
    }

    // Lógica para o botão de exclusão
    tbody.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btn-excluir')) {
            const id = e.target.dataset.id;
            if (confirm(`Tem certeza que deseja excluir o administrador com ID ${id}?`)) {
                // ... (lógica de exclusão)
            }
        }
    });

    carregarAdms();
});