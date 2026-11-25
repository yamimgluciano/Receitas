sessaoPronta.then(function () {
// Monta os botões do topo de acordo com o login

const botoesTopo = document.getElementById('botoesTopo');

if (estaLogado()) {
  let html = '<a href="perfil.php" class="entrar">Perfil</a>';

  if (ehAdmin()) {
    html += '<a href="admin.php" class="cadastrar">Admin</a>';
  }

  botoesTopo.innerHTML = html;
} else {
  botoesTopo.innerHTML = '<a href="login.html" class="entrar">Login</a><a href="cadastro.html" class="cadastrar">Cadastro</a>';
}

// Carrega as categorias cadastradas no banco de dados

const categoriasHome = document.getElementById('categoriasHome');

fetch('buscar_categorias.php')
  .then(function (resposta) {
    return resposta.json();
  })
  .then(function (categorias) {
    categoriasHome.innerHTML = '';

    categorias.forEach(function (categoria) {
      const link = document.createElement('a');

      link.href = 'lista.html?categoria=' + encodeURIComponent(categoria.slug);
      link.textContent = categoria.nome;

      categoriasHome.appendChild(link);
    });
  })
  .catch(function () {
    console.log('Erro ao carregar categorias.');
  });

// Mostra as 3 primeiras receitas como destaque

const listaDestaque = document.getElementById('listaDestaque');

fetch('buscar_receitas.php')
  .then(function (resposta) {
    return resposta.json();
  })
  .then(function (receitasBanco) {
    const destaques = receitasBanco.slice(0, 3);

    destaques.forEach(function (receita) {
      const card = document.createElement('div');
      card.className = 'receita-card';

      card.innerHTML =
        '<div class="foto">' + (receita.imagem ? '<img src="' + receita.imagem + '" alt="Foto da receita" style="width:100%;height:100%;object-fit:cover;">' : receita.emoji) + '</div>' +
        '<div class="info">' +
        '<h3>' + receita.nome + '</h3>' +
        '<div class="meta">⏱ ' + receita.tempo + ' · ★ ' + receita.dificuldade + '</div>' +
        '<a href="detalhe.html?id=' + receita.id + '">Ver receita</a>' +
        '</div>';

      listaDestaque.appendChild(card);
    });
  });

// Busca: ao apertar Enter, vai para a lista de receitas

const buscaHome = document.getElementById('buscaHome');

buscaHome.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    window.location.href = 'lista.html?busca=' + encodeURIComponent(buscaHome.value);
  }
});

});
