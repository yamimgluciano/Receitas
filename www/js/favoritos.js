
if (!estaLogado()) {
  window.location.href = 'login.html';
}

const listaFavoritos = document.getElementById('listaFavoritos');

function mostrarFavoritos() {
  listaFavoritos.innerHTML = '';
  const favoritos = getFavoritos();

  if (favoritos.length === 0) {
    listaFavoritos.innerHTML = '<p>Você ainda não salvou nenhuma receita.</p>';
    return;
  }

  fetch('buscar_receitas.php')
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (receitasBanco) {
      let total = 0;

      favoritos.forEach(function (nome) {
        const receita = receitasBanco.find(function (item) {
          return item.nome === nome;
        });

        if (!receita) return;

        total++;

        const card = document.createElement('div');
        card.className = 'receita-card';

        card.innerHTML =
          '<div class="foto">' + receita.emoji + '</div>' +
          '<div class="info">' +
          '<h3>♥ ' + receita.nome + '</h3>' +
          '<div class="meta">⏱ ' + receita.tempo + ' · ★ ' + receita.dificuldade + '</div>' +
          '<a href="detalhe.html?id=' + receita.id + '">Ver receita</a>' +
          '<button type="button" class="remover" data-nome="' + receita.nome + '">✕ remover</button>' +
          '</div>';

        listaFavoritos.appendChild(card);
      });

      if (total === 0) {
        listaFavoritos.innerHTML = '<p>Nenhuma receita favorita encontrada no banco de dados.</p>';
      }
    })
    .catch(function () {
      listaFavoritos.innerHTML = '<p>Erro ao carregar favoritos.</p>';
    });
}

mostrarFavoritos();

listaFavoritos.addEventListener('click', function (e) {
  if (e.target.classList.contains('remover')) {
    alternarFavorito(e.target.dataset.nome);
    mostrarFavoritos();
  }
});
