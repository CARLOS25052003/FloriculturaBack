document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value; // Alterado para 'password'


  const alertContainer = document.getElementById('alert-container');

  // Função para mostrar alertas
  function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible custom-alert fade show`;
    alert.role = 'alert';
    alert.innerHTML = `
      <strong>${type === 'success' ? 'Sucesso!' : 'Erro!'}</strong> ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    alertContainer.appendChild(alert);

    setTimeout(() => {
      alert.classList.add('hide');
      setTimeout(() => alert.remove(), 500);
    }, 5000);
  }

  // Verificação dos campos
  if (!email || !password) {  // Alterado de 'senha' para 'password'
    showAlert('Por favor, preencha todos os campos!', 'danger');
    return; // Impede o envio se os campos estiverem vazios
  }

  const loginData = {
    email: email,
    senha: password // Alterado para 'senha'
  };

  fetch('http://localhost:8081/api/usuarios/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status);
      }
      return response.json();  // Tenta parsear como JSON
    })
    .then(data => {
      if (data.message === 'Login realizado com sucesso!') {
        showAlert('Login realizado com sucesso!', 'success');
        setTimeout(() => {
          window.location.href = '/index.html';
        }, 2000);
      } else {
        showAlert('Erro: ' + data.message, 'danger');
      }
    })
    .catch(error => {
      console.error('Erro ao enviar os dados:', error);
      showAlert('Erro ao realizar o login, senha ou email incorretos!', 'danger');
    });

});
