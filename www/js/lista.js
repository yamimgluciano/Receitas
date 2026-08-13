// Monta os cards de receita na tela e permite filtrar por texto,
// categoria, e favoritar/desfavoritar cada uma

const listaReceitas = document.getElementById('listaReceitas');
const busca = document.getElementById('busca');
const filtro = document.getElementById('filtroCategoria');

function criarCard(receita) {
  const favoritado = getFavoritos().includes(receita.nome);

  const card = document.createElement('div');
  card.className = 'receita-card ' + receita.categoria;
  card.innerHTML =
    '<div class="foto">' + receita.emoji + '</div>' +
    '<div class="info">' +
    '<h3>' + receita.nome + '</h3>' +
    '<div class="meta">⏱ ' + receita.tempo + ' · ★ ' + receita.dificuldade + '</div>' +
    '<a href="detalhe.html">Ver receita</a>' +
    '<button type="button" class="fav-card' + (favoritado ? ' favoritado' : '') + '" data-nome="' + receita.nome + '">' + (favoritado ? '♥' : '♡') + ' salvar</button>' +
    '</div>';

  return card;
}

function mostrarReceitas() {
  listaReceitas.innerHTML = '';
  receitas.forEach(function (receita) {
    listaReceitas.appendChild(criarCard(receita));
  });
}

function aplicarFiltros() {
  const texto = busca.value.toLowerCase();
  const categoria = filtro.value;
  const cards = document.querySelectorAll('.receita-card');

  cards.forEach(function (card) {
    const nome = card.querySelector('h3').textContent.toLowerCase();
    const combinaCategoria = categoria === 'todos' || card.classList.contains(categoria);
    const combinaTexto = nome.includes(texto);

    if (combinaCategoria && combinaTexto) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

mostrarReceitas();

busca.addEventListener('input', aplicarFiltros);
filtro.addEventListener('change', aplicarFiltros);

// botão de salvar/favoritar em cada card
listaReceitas.addEventListener('click', function (e) {
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

// se a pessoa veio da home com categoria ou busca escolhida, aplica direto
const parametros = new URLSearchParams(window.location.search);

if (parametros.get('categoria')) {
  filtro.value = parametros.get('categoria');
}
if (parametros.get('busca')) {
  busca.value = parametros.get('busca');
}

aplicarFiltros();
