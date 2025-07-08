// admin-form-script.js
document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://localhost:3000/api';
    const form = document.getElementById('form');
    const formMessageDiv = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            formMessageDiv.textContent = '';
            formMessageDiv.className = '';

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // O endpoint é definido no 'action' do formulário
            const endpoint = form.getAttribute('action');

            try {
                const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (response.ok) {
                    formMessageDiv.textContent = `Cadastro realizado com sucesso!`;
                    formMessageDiv.className = 'message success';
                    form.reset();
                } else {
                    formMessageDiv.textContent = `Erro: ${result.message || 'Ocorreu um erro.'}`;
                    formMessageDiv.className = 'message error';
                }
            } catch (error) {
                formMessageDiv.textContent = 'Erro de conexão com o servidor.';
                formMessageDiv.className = 'message error';
                console.error('Erro de rede:', error);
            }
        });
    }
});