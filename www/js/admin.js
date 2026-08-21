// Só acessa essa página quem estiver logado E for administrador
if (!estaLogado()) {
  window.location.href = 'login.html';
} else if (!ehAdmin()) {
  alert('Acesso restrito ao administrador.');
  window.location.href = 'index.html';
}

// Lista e gerenciamento das receitas do administrador

const listaAdmin = document.getElementById('listaAdmin');
const filtroAdmin = document.getElementById('filtroAdmin');

function criarItemAdmin(receita) {
  const item = document.createElement('div');
  item.className = 'item-admin ' + receita.categoria;
  item.innerHTML =
    '<span>' +
    '<span class="nome-receita">' + receita.nome + '</span><br>' +
    '<small class="meta">⏱ ' + receita.tempo + ' · ★ ' + receita.dificuldade + ' · 📂 ' + receita.categoria + '</small>' +
    '</span>' +
    '<span><a href="#" class="editar">Editar</a> <a href="#" class="excluir">✕</a></span>';
  return item;
}

function mostrarLista() {
  listaAdmin.innerHTML = '';
  receitas.forEach(function (receita) {
    listaAdmin.appendChild(criarItemAdmin(receita));
  });
  document.getElementById('totalReceitas').textContent = receitas.length;
}

mostrarLista();

filtroAdmin.addEventListener('change', function () {
  const categoria = filtroAdmin.value;
  document.querySelectorAll('.item-admin').forEach(function (item) {
    if (categoria === 'todos' || item.classList.contains(categoria)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
});

// Adicionar nova receita

document.getElementById('btnAddReceita').addEventListener('click', function () {
  const nome = prompt('Nome da receita:');
  if (!nome) return;

  const tempo = prompt('Tempo de preparo (ex: 20min):', '20min') || '20min';
  const dificuldade = prompt('Dificuldade (Fácil, Médio ou Difícil):', 'Fácil') || 'Fácil';
  const categoria = prompt('Categoria (cafe, almoco, janta, lanche ou sobremesa):', 'almoco') || 'almoco';
  const ingredientesTexto = prompt('Ingredientes (separados por vírgula):', '') || '';
  const modoPreparo = prompt('Modo de preparo:', '') || '';

  const novaReceita = {
    nome: nome,
    tempo: tempo,
    dificuldade: dificuldade,
    categoria: categoria,
    emoji: '🍽️',
    ingredientes: ingredientesTexto.split(',').map(function (i) { return i.trim(); }).filter(function (i) { return i; }),
    modoPreparo: modoPreparo
  };

  listaAdmin.appendChild(criarItemAdmin(novaReceita));
  document.getElementById('totalReceitas').textContent = document.querySelectorAll('.item-admin').length;
});

// Editar ou excluir receita

listaAdmin.addEventListener('click', function (e) {
  if (e.target.classList.contains('editar')) {
    e.preventDefault();
    const item = e.target.closest('.item-admin');
    const nomeSpan = item.querySelector('.nome-receita');
    const metaSpan = item.querySelector('.meta');

    const novoNome = prompt('Nome da receita:', nomeSpan.textContent);
    if (novoNome === null) return;

    const novoTempo = prompt('Tempo de preparo:') || '20min';
    const novaDificuldade = prompt('Dificuldade (Fácil, Médio ou Difícil):') || 'Fácil';
    const novaCategoria = prompt('Categoria (cafe, almoco, janta, lanche ou sobremesa):') || 'almoco';
    const novosIngredientes = prompt('Ingredientes (separados por vírgula):') || '';
    const novoModoPreparo = prompt('Modo de preparo:') || '';

    nomeSpan.textContent = novoNome;
    metaSpan.textContent = '⏱ ' + novoTempo + ' · ★ ' + novaDificuldade + ' · 📂 ' + novaCategoria;

    item.className = 'item-admin ' + novaCategoria;
    item.dataset.ingredientes = novosIngredientes;
    item.dataset.modoPreparo = novoModoPreparo;
  }

  if (e.target.classList.contains('excluir')) {
    e.preventDefault();
    e.target.closest('.item-admin').remove();
    document.getElementById('totalReceitas').textContent = document.querySelectorAll('.item-admin').length;
  }
});

// Gerenciar categorias

const btnAddCategoria = document.getElementById('btnAddCategoria');
const btnRemCategoria = document.getElementById('btnRemCategoria');
const categoriasAdmin = document.getElementById('categoriasAdmin');

btnAddCategoria.addEventListener('click', function () {
  const nome = prompt('Nome da nova categoria:');
  if (!nome) return;

  const slug = nome.toLowerCase().replace(/\s+/g, '');

  const novoBotao = document.createElement('button');
  novoBotao.type = 'button';
  novoBotao.textContent = nome;
  categoriasAdmin.insertBefore(novoBotao, btnAddCategoria);

  const novaOpcao = document.createElement('option');
  novaOpcao.value = slug;
  novaOpcao.textContent = nome;
  filtroAdmin.appendChild(novaOpcao);
});

btnRemCategoria.addEventListener('click', function () {
  const botoes = categoriasAdmin.querySelectorAll('button');
  const ultima = botoes[botoes.length - 3];
  if (ultima) {
    ultima.remove();
  }
});
