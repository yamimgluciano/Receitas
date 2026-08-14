// Favoritar e avaliar exigem estar logado

const nomeReceita = 'Frango ao Curry';
const btnFavoritar = document.getElementById('btnFavoritar');

if (estaLogado() && getFavoritos().includes(nomeReceita)) {
  btnFavoritar.classList.add('favoritado');
  btnFavoritar.textContent = '♥ Favoritado';
}

btnFavoritar.addEventListener('click', function () {
  if (!estaLogado()) {
    window.location.href = 'login.html';
    return;
  }

  alternarFavorito(nomeReceita);

  if (btnFavoritar.classList.contains('favoritado')) {
    btnFavoritar.classList.remove('favoritado');
    btnFavoritar.textContent = '♡ Favoritar';
  } else {
    btnFavoritar.classList.add('favoritado');
    btnFavoritar.textContent = '♥ Favoritado';
  }
});

// Avaliação por estrelas

const estrelas = document.querySelectorAll('#estrelas span');
const btnSalvarAvaliacao = document.getElementById('btnSalvarAvaliacao');
const msgAvaliacao = document.getElementById('msgAvaliacao');
let notaEscolhida = 0;

function marcarEstrelas(nota) {
  estrelas.forEach(function (e) {
    if (e.dataset.valor <= nota) {
      e.classList.add('ativa');
    } else {
      e.classList.remove('ativa');
    }
  });
}

if (estaLogado()) {
  const avaliacoesSalvas = getAvaliacoes();
  if (avaliacoesSalvas[nomeReceita]) {
    notaEscolhida = avaliacoesSalvas[nomeReceita];
    marcarEstrelas(notaEscolhida);
    msgAvaliacao.textContent = 'Sua avaliação: ' + notaEscolhida + ' estrela(s)';
  }
}

estrelas.forEach(function (estrela) {
  estrela.addEventListener('click', function () {
    if (!estaLogado()) {
      window.location.href = 'login.html';
      return;
    }
    notaEscolhida = estrela.dataset.valor;
    marcarEstrelas(notaEscolhida);
  });
});

btnSalvarAvaliacao.addEventListener('click', function () {
  if (!estaLogado()) {
    window.location.href = 'login.html';
    return;
  }
  if (notaEscolhida === 0) {
    msgAvaliacao.textContent = 'Escolha uma nota antes de salvar.';
    return;
  }
  salvarAvaliacao(nomeReceita, notaEscolhida);
  msgAvaliacao.textContent = 'Avaliação salva! Você deu ' + notaEscolhida + ' estrela(s).';
});
