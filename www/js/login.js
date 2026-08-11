// Simulação de login: qualquer e-mail/senha funciona como usuário comum
// (com um erro na primeira tentativa, só pra parecer real). O login
// admin@receitas.com / admin123 entra direto como administrador.

let tentativas = 0;

document.getElementById('entrar').addEventListener('click', function () {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  if (email === 'admin@receitas.com' && senha === 'admin123') {
    localStorage.setItem('logado', 'true');
    localStorage.setItem('admin', 'true');
    window.location.href = 'index.html';
    return;
  }

  tentativas++;

  if (tentativas === 1) {
    document.getElementById('mensagemErro').textContent = 'E-mail ou senha incorretos. Tente novamente.';
  } else {
    localStorage.setItem('logado', 'true');
    localStorage.setItem('admin', 'false');
    window.location.href = 'index.html';
  }
});
