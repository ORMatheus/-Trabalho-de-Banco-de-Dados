// admin-editar-cliente.js
document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://localhost:3000/api';
    const form = document.getElementById('form-editar');
    const formMessage = document.getElementById('formMessage');
    const params = new URLSearchParams(window.location.search);
    const clienteId = params.get('id');

    if (!clienteId) {
        window.location.href = 'admin-listar-clientes.html';
        return;
    }

    // Carrega os dados do cliente no formulário
    async function carregarDadosCliente() {
        try {
            const response = await fetch(`${API_BASE_URL}/clientes/${clienteId}`);
            if (!response.ok) throw new Error('Falha ao buscar dados do cliente.');
            
            const cliente = await response.json();
            
            document.getElementById('nome').value = cliente.Nome;
            document.getElementById('email').value = cliente.Email;
            document.getElementById('telefone').value = cliente.Telefone || '';
        } catch (error) {
            formMessage.textContent = error.message;
            formMessage.className = 'message error';
        }
    }

    // Envia o formulário com as alterações
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Não envia o campo da senha se estiver vazio
        if (!data.Hash_Senha) {
            delete data.Hash_Senha;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/clientes/${clienteId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                formMessage.textContent = result.message;
                formMessage.className = 'message success';
            } else {
                formMessage.textContent = `Erro: ${result.error}`;
                formMessage.className = 'message error';
            }
        } catch (error) {
            formMessage.textContent = 'Erro de conexão ao salvar.';
            formMessage.className = 'message error';
        }
    });

    carregarDadosCliente();
});