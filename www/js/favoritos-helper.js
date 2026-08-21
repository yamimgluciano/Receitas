// Funções para guardar os favoritos no navegador

function getFavoritos() {
  const dados = localStorage.getItem('favoritos');
  if (dados) {
    return JSON.parse(dados);
  }
  return [];
}

function alternarFavorito(nome) {
  let favoritos = getFavoritos();

  if (favoritos.includes(nome)) {
    const novaLista = [];
    for (let i = 0; i < favoritos.length; i++) {
      if (favoritos[i] !== nome) {
        novaLista.push(favoritos[i]);
      }
    }
    favoritos = novaLista;
  } else {
    favoritos.push(nome);
  }

  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  return favoritos;
}

// Funções para guardar a avaliação (nota em estrelas) de cada receita

function getAvaliacoes() {
  const dados = localStorage.getItem('avaliacoes');
  if (dados) {
    return JSON.parse(dados);
  }
  return {};
}

function salvarAvaliacao(nome, nota) {
  const avaliacoes = getAvaliacoes();
  avaliacoes[nome] = nota;
  localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
}

// Verificação de login

function estaLogado() {
  return localStorage.getItem('logado') === 'true';
}

function ehAdmin() {
  return localStorage.getItem('admin') === 'true';
}

// Guardar os ingredientes extras adicionados pelo admin

function getIngredientesExtras() {
  const dados = localStorage.getItem('ingredientesExtras');
  if (dados) {
    return JSON.parse(dados);
  }
  return [];
}

function salvarIngredientesExtras(lista) {
  localStorage.setItem('ingredientesExtras', JSON.stringify(lista));
}
