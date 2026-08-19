// Só acessa essa página quem estiver logado
if (!estaLogado()) {
  window.location.href = 'login.html';
}

// Editar perfil
const btnEditarPerfil = document.getElementById('btnEditarPerfil');
const nomePerfil = document.getElementById('nomePerfil');
const emailPerfil = document.getElementById('emailPerfil');

btnEditarPerfil.addEventListener('click', function () {
  const nomeAtual = nomePerfil.textContent.replace('👤 ', '');
  const novoNome = prompt('Nome:', nomeAtual);
  const novoEmail = prompt('E-mail:', emailPerfil.textContent);

  if (novoNome) {
    nomePerfil.textContent = '👤 ' + novoNome;
  }
  if (novoEmail) {
    emailPerfil.textContent = novoEmail;
  }
});

// Sair da conta
document.getElementById('btnSair').addEventListener('click', function () {
  localStorage.removeItem('logado');
  localStorage.removeItem('admin');
  window.location.href = 'index.html';
});
