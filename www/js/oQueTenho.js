// Só acessa essa página quem estiver logado
if (!estaLogado()) {
  window.location.href = 'login.html';
}

// Compara os ingredientes marcados com os ingredientes de cada receita
// e mostra só as receitas em que TODOS os ingredientes estão disponíveis

const btnBuscar = document.getElementById('btnBuscar');

// Adiciona um novo ingrediente à lista de checkboxes (salvo no navegador)
// Só o administrador pode adicionar ou excluir ingredientes
const btnAddIngrediente = document.getElementById('btnAddIngrediente');
const listaIngredientes = document.getElementById('listaIngredientes');

if (!ehAdmin()) {
  btnAddIngrediente.style.display = 'none';
}

function criarLabelIngrediente(nome) {
  const label = document.createElement('label');
  let html = '<input type="checkbox" value="' + nome + '" checked> ' + nome;
  if (ehAdmin()) {
    html += ' <button type="button" class="remover" data-nome="' + nome + '">✕</button>';
  }
  label.innerHTML = html;
  return label;
}

// mostra os ingredientes extras que já foram salvos antes
getIngredientesExtras().forEach(function (nome) {
  listaIngredientes.appendChild(criarLabelIngrediente(nome));
});

btnAddIngrediente.addEventListener('click', function () {
  const nome = prompt('Nome do ingrediente:');
  if (!nome) return;

  const extras = getIngredientesExtras();
  extras.push(nome);
  salvarIngredientesExtras(extras);

  listaIngredientes.appendChild(criarLabelIngrediente(nome));
});

// excluir um ingrediente extra
listaIngredientes.addEventListener('click', function (e) {
  if (e.target.classList.contains('remover')) {
    const nome = e.target.dataset.nome;
    const extras = getIngredientesExtras().filter(function (item) {
      return item !== nome;
    });
    salvarIngredientesExtras(extras);
    e.target.closest('label').remove();
  }
});


function ingredientesMarcados() {
  const marcados = document.querySelectorAll('.checkboxes input:checked');
  const nomes = [];
  marcados.forEach(function (checkbox) {
    nomes.push(checkbox.value);
  });
  return nomes;
}

function temTodosIngredientes(receita, disponiveis) {
  for (let i = 0; i < receita.ingredientes.length; i++) {
    if (!disponiveis.includes(receita.ingredientes[i])) {
      return false;
    }
  }
  return true;
}

btnBuscar.addEventListener('click', function () {
  const disponiveis = ingredientesMarcados();
  const lista = document.getElementById('listaResultado');
  lista.innerHTML = '';
  let total = 0;

  for (let i = 0; i < receitas.length; i++) {
    const receita = receitas[i];

    if (temTodosIngredientes(receita, disponiveis)) {
      total++;

      const card = document.createElement('div');
      card.className = 'receita-card';
      card.innerHTML =
        '<div class="foto">' + receita.emoji + '</div>' +
        '<div class="info">' +
        '<h3>' + receita.nome + '</h3>' +
        '<div class="meta">⏱ ' + receita.tempo + ' · ★ ' + receita.dificuldade + '</div>' +
        '<a href="detalhe.html">Ver receita</a>' +
        '</div>';
      lista.appendChild(card);
    }
  }

  document.getElementById('resultado').textContent = total + ' receita(s) encontrada(s)';
  lista.style.display = 'grid';
});
