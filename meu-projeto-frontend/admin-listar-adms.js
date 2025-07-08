// admin-listar-adms.js
document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://localhost:3000/api';
    const tbody = document.getElementById('lista-adms');

    async function carregarAdms() {
        try {
            const response = await fetch(`${API_BASE_URL}/adms`);
            const adms = await response.json();

            tbody.innerHTML = ''; // Limpa a tabela antes de preencher

            adms.forEach(adm => {
                const tr = document.createElement('tr');
                tr.className = 'border-b';
                tr.innerHTML = `
                    <td class="py-2 px-4">${adm.ID_Admin}</td>
                    <td class="py-2 px-4">${adm.Nome_Admin}</td>
                    <td class="py-2 px-4">${adm.Email_Admin}</td>
                    <td class="py-2 px-4">
                        <a href="#" class="text-blue-500 hover:underline">Editar</a>
                        <button data-id="${adm.ID_Admin}" class="text-red-500 hover:underline ml-4 btn-excluir">Excluir</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center text-red-500 py-4">Erro ao carregar administradores.</td></tr>';
        }
    }
    tbody.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-excluir')) {
        const id = e.target.dataset.id;
        
        if (confirm(`Tem certeza que deseja excluir o administrador com ID ${id}?`)) {
            try {
                const response = await fetch(`${API_BASE_URL}/adms/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Remove a linha da tabela para feedback visual imediato
                    e.target.closest('tr').remove();
                } else {
                    alert('Erro ao excluir o administrador.');
                }
            } catch (error) {
                alert('Erro de conexão ao tentar excluir.');
            }
        }
    }
});

    carregarAdms();
});