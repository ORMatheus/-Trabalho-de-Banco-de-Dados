// admin-editar-adm.js
document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://localhost:3000/api';
    const form = document.getElementById('form-editar');
    const formMessage = document.getElementById('formMessage');
    const params = new URLSearchParams(window.location.search);
    const admId = params.get('id');

    if (!admId) {
        window.location.href = 'admin-listar-adms.html';
        return;
    }

    // 1. Carregar dados existentes no formulário
    async function carregarDadosAdm() {
        try {
            const response = await fetch(`${API_BASE_URL}/adms/${admId}`);
            const adm = await response.json();
            document.getElementById('nome').value = adm.Nome_Admin;
            document.getElementById('email').value = adm.Email_Admin;
        } catch (error) {
            formMessage.textContent = 'Erro ao carregar dados do administrador.';
            formMessage.className = 'message error';
        }
    }

    // 2. Lógica de envio do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Não enviar a senha se o campo estiver vazio
        if (!data.Hash_Senha_Admin) {
            delete data.Hash_Senha_Admin;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/adms/${admId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                formMessage.textContent = result.message;
                formMessage.className = 'message success';
            } else {
                formMessage.textContent = `Erro: ${result.message}`;
                formMessage.className = 'message error';
            }
        } catch (error) {
            formMessage.textContent = 'Erro de conexão ao salvar.';
            formMessage.className = 'message error';
        }
    });

     <td class="py-2 px-4">
        <a href="admin-editar-adm.html?id=${adm.ID_Admin}" class="text-blue-500 hover:underline">Editar</a>
        ... // botão de excluir
    </td>
    carregarDadosAdm();
});