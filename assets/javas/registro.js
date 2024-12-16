document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); // Previne o envio tradicional do formulário

  // Obtém os dados do formulário
  const nomeCompleto = document.getElementById('full_name').value;
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('password').value;
  const confirmSenha = document.getElementById('confirm_password').value;

  const alertContainer = document.getElementById('alert-container');

  // Função para exibir alertas na tela
  function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible custom-alert fade show`;
    alert.role = 'alert';
    alert.innerHTML = `
      <strong>${type === 'success' ? 'Sucesso!' : 'Erro!'}</strong> ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    alertContainer.appendChild(alert);

    // Remove o alerta automaticamente após 5 segundos
    setTimeout(() => {
      alert.classList.add('hide');
      setTimeout(() => alert.remove(), 500);
    }, 5000);
  }

  // Validação das senhas
  if (senha !== confirmSenha) {
    showAlert('As senhas não coincidem!', 'danger');
    return;
  }
  if (senha.length < 5){
    showAlert('A senha deve ter pelo menos 5 caracteres!', 'danger');
    return;
  }

  // Dados do usuário
  const usuarioData = {
    nomeCompleto: nomeCompleto,
    username: username,
    email: email,
    senha: senha
  };

  // Envia os dados para o backend
  fetch('http://localhost:8081/api/usuarios/registrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(usuarioData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Usuario registrado com sucesso!') {
        showAlert('Cadastro realizado com sucesso!', 'success');
        setTimeout(() => {
          window.location.href = '../pages/login.html';
        }, 2000);
      } else {
        showAlert('Erro: ' + data.message, 'danger');
      }
    })
    .catch(error => {
      console.error('Erro ao enviar os dados:', error);
      showAlert('Erro ao registrar usuário. Tente novamente mais tarde.', 'danger');
    });
});
