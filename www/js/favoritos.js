sessaoPronta.then(function () {
if (!estaLogado()) {
  window.location.href = 'login.html';
}

const listaFavoritos = document.getElementById('listaFavoritos');

function mostrarFavoritos() {
  listaFavoritos.innerHTML = '<p>Carregando favoritos...</p>';

  Promise.all([
    fetch('listar_favoritos.php').then(function (resposta) {
      if (!resposta.ok) throw new Error('Erro ao buscar favoritos.');
      return resposta.json();
    }),
    fetch('buscar_receitas.php').then(function (resposta) {
      if (!resposta.ok) throw new Error('Erro ao buscar receitas.');
      return resposta.json();
    })
  ])
    .then(function (resultados) {
      const favoritos = resultados[0];
      const receitasBanco = resultados[1];

      if (!Array.isArray(favoritos) || !Array.isArray(receitasBanco)) {
        throw new Error('Dados inválidos.');
      }

      listaFavoritos.innerHTML = '';
      let total = 0;

      favoritos.forEach(function (id) {
        const receita = receitasBanco.find(function (item) {
          return Number(item.id) === Number(id);
        });

        if (!receita) return;

        total++;

        const card = document.createElement('div');
        card.className = 'receita-card';

        const foto = document.createElement('div');
        foto.className = 'foto';
        if (receita.imagem) {
    foto.innerHTML = '<img src="' + receita.imagem + '" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" alt="Foto da receita">';
} else {
    foto.textContent = receita.emoji || '🍽️';
}

        const info = document.createElement('div');
        info.className = 'info';

        const titulo = document.createElement('h3');
        titulo.textContent = '♥ ' + receita.nome;

        const meta = document.createElement('div');
        meta.className = 'meta';
        meta.textContent = '⏱ ' + receita.tempo + ' · ★ ' + receita.dificuldade;

        const link = document.createElement('a');
        link.href = 'detalhe.html?id=' + receita.id;
        link.textContent = 'Ver receita';

        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'remover';
        botao.dataset.id = receita.id;
        botao.textContent = '✕ remover';

        info.appendChild(titulo);
        info.appendChild(meta);
        info.appendChild(link);
        info.appendChild(botao);

        card.appendChild(foto);
        card.appendChild(info);
        listaFavoritos.appendChild(card);
      });

      if (total === 0) {
        listaFavoritos.innerHTML = '<p>Você ainda não salvou nenhuma receita.</p>';
      }
    })
    .catch(function () {
      listaFavoritos.innerHTML = '<p>Erro ao carregar favoritos.</p>';
    });
}

mostrarFavoritos();

listaFavoritos.addEventListener('click', function (e) {
  if (!e.target.classList.contains('remover')) return;

  const botao = e.target;
  const dados = new FormData();
  dados.append('receita_id', botao.dataset.id);

  botao.disabled = true;

  fetch('alternar_favorito.php', {
    method: 'POST',
    body: dados
  })
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (resultado) {
      if (!resultado.sucesso || resultado.favoritado) {
        throw new Error('Não foi possível remover.');
      }

      mostrarFavoritos();
    })
    .catch(function () {
      alert('Erro ao remover favorito.');
      botao.disabled = false;
    });
});

});
