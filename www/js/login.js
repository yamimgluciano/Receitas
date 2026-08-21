// Login simulado. Qualquer e-mail e senha entram como usuário comum.
// O acesso de administrador usa credenciais específicas.
// admin@receitas.com / admin123

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
