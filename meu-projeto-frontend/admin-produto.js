// admin-produto.js
document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://localhost:3000/api'; // Verifique se a porta está correta
    const produtoForm = document.getElementById('produtoForm');
    const formMessageDiv = document.getElementById('formMessage');

    if (produtoForm) {
        produtoForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            formMessageDiv.textContent = '';
            formMessageDiv.className = '';

            const formData = new FormData(produtoForm);

            try {
                const response = await fetch(`${API_BASE_URL}/produtos`, {
                    method: 'POST',
                    body: formData, // Com FormData, o browser define o Content-Type como multipart/form-data
                });

                const result = await response.json();

                if (response.ok) {
                    formMessageDiv.textContent = `Produto "${formData.get('nome_produto')}" cadastrado com sucesso!`;
                    formMessageDiv.className = 'message success';
                    produtoForm.reset();
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