// Filtra as receitas mostradas de acordo com a categoria escolhida

const filtro = document.getElementById('filtroCategoria');

filtro.addEventListener('change', function () {
  const categoria = filtro.value;
  const cards = document.querySelectorAll('.receita-card');

  cards.forEach(function (card) {
    if (categoria === 'todos' || card.classList.contains(categoria)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});
