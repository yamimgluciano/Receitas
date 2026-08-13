// Só acessa essa página quem estiver "logado" (simulado)
if (!estaLogado()) {
  window.location.href = 'login.html';
}

// Monta a lista de favoritos a partir do que está salvo no localStorage

const listaFavoritos = document.getElementById('listaFavoritos');

function mostrarFavoritos() {
  listaFavoritos.innerHTML = '';
  const favoritos = getFavoritos();

  if (favoritos.length === 0) {
    listaFavoritos.innerHTML = '<p>Você ainda não salvou nenhuma receita.</p>';
    return;
  }

  favoritos.forEach(function (nome) {
    let receita = null;
    for (let i = 0; i < receitas.length; i++) {
      if (receitas[i].nome === nome) {
        receita = receitas[i];
      }
    }
    if (!receita) return;

    const card = document.createElement('div');
    card.className = 'receita-card';
    card.innerHTML =
      '<div class="foto">' + receita.emoji + '</div>' +
      '<div class="info">' +
      '<h3>♥ ' + receita.nome + '</h3>' +
      '<div class="meta">⏱ ' + receita.tempo + ' · ★ ' + receita.dificuldade + '</div>' +
      '<a href="detalhe.html">Ver receita</a>' +
      '<button type="button" class="remover" data-nome="' + receita.nome + '">✕ remover</button>' +
      '</div>';
    listaFavoritos.appendChild(card);
  });
}

mostrarFavoritos();

listaFavoritos.addEventListener('click', function (e) {
  if (e.target.classList.contains('remover')) {
    alternarFavorito(e.target.dataset.nome);
    mostrarFavoritos();
  }
});
