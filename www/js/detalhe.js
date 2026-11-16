
const parametros = new URLSearchParams(window.location.search);
const idReceita = parametros.get('id');

const btnFavoritar = document.getElementById('btnFavoritar');
const estrelas = document.querySelectorAll('#estrelas span');
const btnSalvarAvaliacao = document.getElementById('btnSalvarAvaliacao');
const msgAvaliacao = document.getElementById('msgAvaliacao');

let nomeReceita = '';
let notaEscolhida = 0;

function marcarEstrelas(nota) {
  estrelas.forEach(function (estrela) {
    if (Number(estrela.dataset.valor) <= nota) {
      estrela.classList.add('ativa');
    } else {
      estrela.classList.remove('ativa');
    }
  });
}

function carregarFavoritoEAvaliacao() {
  if (!estaLogado()) return;

  if (getFavoritos().includes(nomeReceita)) {
    btnFavoritar.classList.add('favoritado');
    btnFavoritar.textContent = '♥ Favoritado';
  }

  const avaliacoesSalvas = getAvaliacoes();

  if (avaliacoesSalvas[nomeReceita]) {
    notaEscolhida = avaliacoesSalvas[nomeReceita];
    marcarEstrelas(notaEscolhida);
    msgAvaliacao.textContent = 'Sua avaliação: ' + notaEscolhida + ' estrela(s)';
  }
}

if (idReceita) {
  fetch('buscar_receitas.php')
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (receitas) {
      const receita = receitas.find(function (item) {
        return String(item.id) === String(idReceita);
      });

      if (!receita) {
        document.getElementById('nomeReceita').textContent = 'Receita não encontrada.';
        return;
      }

      nomeReceita = receita.nome;

      document.title = nomeReceita + ' — Receitas em Casa';
      document.getElementById('nomeReceita').textContent = receita.nome;
      document.getElementById('fotoReceita').textContent = receita.emoji || '🍽️';

      document.getElementById('metaReceita').textContent =
        '⏱ ' + receita.tempo + ' · 📂 ' + receita.categoria +
        ' · ★ ' + receita.dificuldade;

      const listaIngredientes = document.getElementById('ingredientesReceita');

      receita.ingredientes.forEach(function (ingrediente) {
        const li = document.createElement('li');
        li.textContent = ingrediente.trim();
        listaIngredientes.appendChild(li);
      });

      const listaPreparo = document.getElementById('preparoReceita');
      const etapas = receita.preparo.split('\n');

      etapas.forEach(function (etapa) {
        if (etapa.trim() !== '') {
          const li = document.createElement('li');
          li.textContent = etapa.trim();
          listaPreparo.appendChild(li);
        }
      });

      carregarFavoritoEAvaliacao();
    })
    .catch(function () {
      document.getElementById('nomeReceita').textContent = 'Erro ao carregar receita.';
    });
} else {
  document.getElementById('nomeReceita').textContent = 'Nenhuma receita selecionada.';
}

btnFavoritar.addEventListener('click', function () {
  if (!estaLogado()) {
    window.location.href = 'login.html';
    return;
  }

  if (!nomeReceita) return;

  alternarFavorito(nomeReceita);

  if (btnFavoritar.classList.contains('favoritado')) {
    btnFavoritar.classList.remove('favoritado');
    btnFavoritar.textContent = '♡ Favoritar';
  } else {
    btnFavoritar.classList.add('favoritado');
    btnFavoritar.textContent = '♥ Favoritado';
  }
});

estrelas.forEach(function (estrela) {
  estrela.addEventListener('click', function () {
    if (!estaLogado()) {
      window.location.href = 'login.html';
      return;
    }

    notaEscolhida = Number(estrela.dataset.valor);
    marcarEstrelas(notaEscolhida);
  });
});

btnSalvarAvaliacao.addEventListener('click', function () {
  if (!estaLogado()) {
    window.location.href = 'login.html';
    return;
  }

  if (!nomeReceita) return;

  if (notaEscolhida === 0) {
    msgAvaliacao.textContent = 'Escolha uma nota antes de salvar.';
    return;
  }

  salvarAvaliacao(nomeReceita, notaEscolhida);
  msgAvaliacao.textContent = 'Avaliação salva! Você deu ' + notaEscolhida + ' estrela(s).';
});
