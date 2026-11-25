const listaReceitas = document.getElementById('listaReceitas');
const busca = document.getElementById('busca');
const filtro = document.getElementById('filtroCategoria');

let receitasBanco = [];

const parametros = new URLSearchParams(window.location.search);
const categoriaInicial = parametros.get('categoria');
const buscaInicial = parametros.get('busca');

if (buscaInicial) {
  busca.value = buscaInicial;
}

// Cria os cards das receitas
function criarCard(receita) {
  const card = document.createElement('div');
  card.className = 'receita-card';

  card.innerHTML =
    '<div class="foto">' + (receita.imagem ? '<img src="' + receita.imagem + '" alt="Foto da receita" style="width:100%;height:100%;object-fit:cover;">' : receita.emoji) + '</div>' +
    '<div class="info">' +
    '<h3>' + receita.nome + '</h3>' +
    '<div class="meta">⏱ ' + receita.tempo + ' · ★ ' + receita.dificuldade + '</div>' +
    '<a href="detalhe.html?id=' + receita.id + '">Ver receita</a>' +
    '</div>';

  return card;
}

// Mostra as receitas de acordo com a busca e a categoria
function mostrarReceitas() {
  listaReceitas.innerHTML = '';

  const texto = busca.value.toLowerCase().trim();
  const categoria = filtro.value.toLowerCase();

  const receitasFiltradas = receitasBanco.filter(function (receita) {
    const nomeReceita = receita.nome.toLowerCase();
    const categoriaReceita = String(receita.categoria).toLowerCase().trim();

    const combinaTexto = nomeReceita.includes(texto);
    const combinaCategoria =
      categoria === 'todos' || categoriaReceita === categoria;

    return combinaTexto && combinaCategoria;
  });

  if (receitasFiltradas.length === 0) {
    const mensagem = document.createElement('div');

    mensagem.style.gridColumn = '1 / -1';
    mensagem.style.textAlign = 'center';
    mensagem.style.padding = '45px 20px';
    mensagem.style.color = '#8A7A68';

    const titulo = document.createElement('h3');
    titulo.style.marginBottom = '10px';
    titulo.style.color = '#3A2E22';

    const descricao = document.createElement('p');

    if (texto !== '') {
      titulo.textContent = 'Nenhuma receita encontrada';
      descricao.textContent =
        'Não encontramos receitas com esse nome. Tente pesquisar de outra forma.';
    } else if (categoria !== 'todos') {
      titulo.textContent = 'Nenhuma receita nesta categoria';
      descricao.textContent =
        'Ainda não temos receitas por aqui. Volte em breve para conferir as novidades!';
    } else {
      titulo.textContent = 'Nenhuma receita cadastrada';
      descricao.textContent =
        'Ainda não temos receitas disponíveis. Volte em breve!';
    }

    mensagem.appendChild(titulo);
    mensagem.appendChild(descricao);
    listaReceitas.appendChild(mensagem);

    return;
  }

  receitasFiltradas.forEach(function (receita) {
    listaReceitas.appendChild(criarCard(receita));
  });
}

// Carrega as categorias cadastradas no MySQL
function carregarCategorias() {
  return fetch('buscar_categorias.php')
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error('Erro ao buscar categorias.');
      }

      return resposta.json();
    })
    .then(function (categorias) {
      filtro.innerHTML = '';

      const todas = document.createElement('option');
      todas.value = 'todos';
      todas.textContent = 'Todas as categorias';
      filtro.appendChild(todas);

      categorias.forEach(function (categoria) {
        const opcao = document.createElement('option');
        opcao.value = categoria.slug;
        opcao.textContent = categoria.nome;

        filtro.appendChild(opcao);
      });

      if (categoriaInicial) {
        filtro.value = categoriaInicial;
      }
    });
}

// Carrega as receitas cadastradas no MySQL
function carregarReceitas() {
  return fetch('buscar_receitas.php')
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error('Erro ao buscar receitas.');
      }

      return resposta.json();
    })
    .then(function (resultado) {
      receitasBanco = resultado;
    });
}

// Carrega os dados antes de mostrar as receitas
Promise.all([
  carregarCategorias(),
  carregarReceitas()
])
  .then(function () {
    mostrarReceitas();
  })
  .catch(function (erro) {
    console.log('Erro ao carregar dados:', erro);

    listaReceitas.innerHTML = '';

    const mensagem = document.createElement('p');
    mensagem.textContent =
      'Não foi possível carregar as receitas. Tente atualizar a página.';
    mensagem.style.gridColumn = '1 / -1';
    mensagem.style.textAlign = 'center';

    listaReceitas.appendChild(mensagem);
  });

// Atualiza a lista quando o usuário pesquisa ou troca a categoria
busca.addEventListener('input', mostrarReceitas);
filtro.addEventListener('change', mostrarReceitas);
