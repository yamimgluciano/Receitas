
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

  fetch('consultar_favorito.php?receita_id=' + encodeURIComponent(idReceita))
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (resultado) {
      if (resultado.favoritado) {
        btnFavoritar.classList.add('favoritado');
        btnFavoritar.textContent = '♥ Favoritado';
      } else {
        btnFavoritar.classList.remove('favoritado');
        btnFavoritar.textContent = '♡ Favoritar';
      }
    })
    .catch(function () {
      console.log('Erro ao consultar favorito.');
    });


 
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

  if (!idReceita || notaEscolhida === 0) {
    msgAvaliacao.textContent = 'Escolha uma nota antes de salvar.';
    return;
  }

  const dados = new FormData();
  dados.append('receita_id', idReceita);
  dados.append('nota', notaEscolhida);

  btnSalvarAvaliacao.disabled = true;

  fetch('salvar_avaliacao.php', {
    method: 'POST',
    body: dados
  })
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (resultado) {
      if (!resultado.sucesso) {
        throw new Error(resultado.erro || 'Erro ao salvar.');
      }

      msgAvaliacao.textContent =
        'Avaliação salva! Você deu ' + notaEscolhida + ' estrela(s).';
    })
    .catch(function () {
      msgAvaliacao.textContent = 'Não foi possível salvar a avaliação.';
    })
    .finally(function () {
      btnSalvarAvaliacao.disabled = false;
    });
});



btnFavoritar.addEventListener('click', function () {
  if (!estaLogado()) {
    window.location.href = 'login.html';
    return;
  }

  if (!idReceita) return;

  const dados = new FormData();
  dados.append('receita_id', idReceita);

  btnFavoritar.disabled = true;

  fetch('alternar_favorito.php', {
    method: 'POST',
    body: dados
  })
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (resultado) {
      if (!resultado.sucesso) {
        throw new Error(resultado.erro || 'Erro ao salvar favorito.');
      }

      if (resultado.favoritado) {
        btnFavoritar.classList.add('favoritado');
        btnFavoritar.textContent = '♥ Favoritado';
      } else {
        btnFavoritar.classList.remove('favoritado');
        btnFavoritar.textContent = '♡ Favoritar';
      }
    })
    .catch(function () {
      alert('Não foi possível salvar o favorito.');
    })
    .finally(function () {
      btnFavoritar.disabled = false;
    });
});

