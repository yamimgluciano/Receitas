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
  item.dataset.id = receita.id;
  item.innerHTML =
    '<span>' +
    '<span class="nome-receita">' + receita.nome + '</span><br>' +
    '<small class="meta">⏱ ' + receita.tempo + ' · ★ ' + receita.dificuldade + ' · 📂 ' + receita.categoria + '</small>' +
    '</span>' +
    '<span><a href="#" class="editar">Editar</a> <a href="#" class="excluir">✕</a></span>';
  return item;
}


function mostrarLista() {
  fetch('buscar_receitas.php')
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (receitasBanco) {
      listaAdmin.innerHTML = '';

      receitasBanco.forEach(function (receita) {
        listaAdmin.appendChild(criarItemAdmin(receita));
      });

      document.getElementById('totalReceitas').textContent = receitasBanco.length;
    });
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


// Adicionar nova receita

document.getElementById('btnAddReceita').addEventListener('click', function () {
  const nome = prompt('Nome da receita:');
  if (!nome) return;

  const tempo = prompt('Tempo de preparo (em minutos):', '20');
  if (!tempo) return;

  const dificuldade = prompt('Dificuldade (Fácil, Médio ou Difícil):', 'Fácil');
  if (!dificuldade) return;

  const categoria = prompt('Categoria (cafe, almoco, janta, lanche ou sobremesa):', 'almoco');
  if (!categoria) return;

  const ingredientes = prompt('Ingredientes (separados por vírgula):');
  if (!ingredientes) return;

  const preparo = prompt('Modo de preparo:');
  if (!preparo) return;

  const dados = new FormData();
  dados.append('cadastrar', '1');
  dados.append('nome', nome);
  dados.append('tempo', tempo);
  dados.append('dificuldade', dificuldade);
  dados.append('categoria', categoria);
  dados.append('ingredientes', ingredientes);
  dados.append('preparo', preparo);

  fetch('salvar_receita.php', {
    method: 'POST',
    body: dados
  })
  .then(function (resposta) {
    return resposta.text();
  })
  .then(function (mensagem) {
    alert(mensagem);

    if (mensagem === 'Receita cadastrada com sucesso!') {
      location.reload();
    }
  });
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

  const item = e.target.closest('.item-admin');
  const id = item.dataset.id;
  alert('ID da receita: ' + id);

  if (confirm('Deseja realmente excluir esta receita?')) {
    const dados = new FormData();
    dados.append('excluir', '1');
    dados.append('id', id);

    fetch('excluir_receita.php', {
      method: 'POST',
      body: dados
    })
    .then(function (resposta) {
      return resposta.text();
    })
    .then(function (mensagem) {
      alert(mensagem);

      if (mensagem === 'Receita excluída com sucesso!') {
        mostrarLista();
      }
    });
  }
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
