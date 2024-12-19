document.getElementById('forgot-password-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  const email = document.getElementById('email').value;

  fetch('http://localhost:8081/api/usuarios/esqueceu-senha', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email }) // Envia o e-mail no corpo da requisição
  })
    .then(response => response.json())
    .then(data => {
      const messageElement = document.getElementById('message');
      messageElement.style.display = 'block'; // Exibe o feedback

      if (data.message) {
        messageElement.classList.remove('alert-danger');
        messageElement.classList.add('alert-success');
        messageElement.textContent = data.message;
      }
    })
    .catch(error => {
      console.error('Erro ao enviar a requisição:', error);
      const messageElement = document.getElementById('message');
      messageElement.style.display = 'block'; // Exibe o feedback

      messageElement.classList.remove('alert-success');
      messageElement.classList.add('alert-danger');
      messageElement.textContent = 'Ocorreu um erro. Tente novamente mais tarde.';
    });
});
