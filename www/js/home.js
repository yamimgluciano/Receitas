// Monta os botões do topo de acordo com o login (simulado)

const botoesTopo = document.getElementById('botoesTopo');

if (estaLogado()) {
  let html = '<a href="perfil.html" class="entrar">Perfil</a>';
  if (ehAdmin()) {
    html += '<a href="admin.html" class="cadastrar">Admin</a>';
  }
  botoesTopo.innerHTML = html;
} else {
  botoesTopo.innerHTML = '<a href="login.html" class="entrar">Login</a><a href="cadastro.html" class="cadastrar">Cadastro</a>';
}

// Mostra as 3 primeiras receitas como destaque, com botão de salvar,
// e conecta a busca da home com a lista completa

const listaDestaque = document.getElementById('listaDestaque');
const destaques = receitas.slice(0, 3);

destaques.forEach(function (receita) {
  const favoritado = getFavoritos().includes(receita.nome);

  const card = document.createElement('div');
  card.className = 'receita-card';
  card.innerHTML =
    '<div class="foto">' + receita.emoji + '</div>' +
    '<div class="info">' +
    '<h3>' + receita.nome + '</h3>' +
    '<div class="meta">⏱ ' + receita.tempo + ' · ★ ' + receita.dificuldade + '</div>' +
    '<a href="detalhe.html">Ver receita</a>' +
    '<button type="button" class="fav-card' + (favoritado ? ' favoritado' : '') + '" data-nome="' + receita.nome + '">' + (favoritado ? '♥' : '♡') + ' salvar</button>' +
    '</div>';

  listaDestaque.appendChild(card);
});

listaDestaque.addEventListener('click', function (e) {
  if (e.target.classList.contains('fav-card')) {
    if (!estaLogado()) {
      window.location.href = 'login.html';
      return;
    }
    const nome = e.target.dataset.nome;
    alternarFavorito(nome);

    if (e.target.classList.contains('favoritado')) {
      e.target.classList.remove('favoritado');
      e.target.textContent = '♡ salvar';
    } else {
      e.target.classList.add('favoritado');
      e.target.textContent = '♥ salvar';
    }
  }
});

// busca: ao apertar Enter, vai pra lista de receitas já filtrada
const buscaHome = document.getElementById('buscaHome');

buscaHome.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    window.location.href = 'lista.html?busca=' + encodeURIComponent(buscaHome.value);
  }
});
