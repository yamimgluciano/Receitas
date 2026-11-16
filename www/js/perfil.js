if (!estaLogado()) {
  window.location.href = 'login.html';
}

const btnEditarPerfil = document.getElementById('btnEditarPerfil');
const nomePerfil = document.getElementById('nomePerfil');
const emailPerfil = document.getElementById('emailPerfil');

// Busca os dados do usuário logado
fetch('dados_perfil.php')
  .then(function (resposta) {
    return resposta.json();
  })
  .then(function (usuario) {
    if (usuario.erro) {
      window.location.href = 'login.html';
      return;
    }

    nomePerfil.textContent = '👤 ' + usuario.nome;
    emailPerfil.textContent = usuario.email;
  })
  .catch(function () {
    nomePerfil.textContent = 'Erro ao carregar perfil.';
  });

// Editar perfil
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
