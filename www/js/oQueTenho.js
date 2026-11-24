sessaoPronta.then(function () {
  
const btnBuscar = document.getElementById('btnBuscar');
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

getIngredientesExtras().forEach(function (nome) {
  listaIngredientes.appendChild(criarLabelIngrediente(nome));
});

btnAddIngrediente.addEventListener('click', function () {
  const nome = prompt('Nome do ingrediente:');
  if (!nome || !nome.trim()) return;

  const extras = getIngredientesExtras();

  if (extras.some(function (item) {
    return item.toLowerCase() === nome.trim().toLowerCase();
  })) {
    alert('Esse ingrediente já foi adicionado.');
    return;
  }

  extras.push(nome.trim());
  salvarIngredientesExtras(extras);
  listaIngredientes.appendChild(criarLabelIngrediente(nome.trim()));
});

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
    nomes.push(checkbox.value.trim().toLowerCase());
  });

  return nomes;
}

btnBuscar.addEventListener('click', function () {
  const disponiveis = ingredientesMarcados();
  const lista = document.getElementById('listaResultado');
  const resultado = document.getElementById('resultado');

  lista.innerHTML = '';
  resultado.textContent = '';

  fetch('buscar_receitas.php')
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (receitasBanco) {
      const prontas = [];
      const faltando = [];

      receitasBanco.forEach(function (receita) {
        const ingredientes = receita.ingredientes.map(function (nome) {
          return nome.trim().toLowerCase();
        }).filter(function (nome) {
          return nome !== '';
        });

        const faltantes = ingredientes.filter(function (nome) {
          return !disponiveis.includes(nome);
        });

        const quantidadeDisponivel = ingredientes.length - faltantes.length;

        if (ingredientes.length > 0 && faltantes.length === 0) {
          prontas.push(receita);
        } else if (quantidadeDisponivel / ingredientes.length >= 0.6) {
  receita.faltantes = faltantes;
  faltando.push(receita);
}
      });

      function mostrarReceita(receita, faltaPouco) {
        const card = document.createElement('div');
        card.className = 'receita-card';

        card.innerHTML =
          '<div class="foto">' + receita.emoji + '</div>' +
          '<div class="info">' +
          '<h3>' + receita.nome + '</h3>' +
          '<div class="meta">⏱ ' + receita.tempo + ' · ★ ' + receita.dificuldade + '</div>' +
          (faltaPouco
            ? '<p>Falta: ' + receita.faltantes.join(', ') + '</p>'
            : '<p>Você tem todos os ingredientes!</p>') +
          '<a href="detalhe.html?id=' + receita.id + '">Ver receita</a>' +
          '</div>';

        lista.appendChild(card);
      }

      resultado.textContent = prontas.length + ' receita(s) que você pode preparar agora.';

      if (prontas.length > 0) {
        const titulo = document.createElement('h3');
        titulo.textContent = 'Você pode preparar agora';
        titulo.style.gridColumn = '1 / -1';
        lista.appendChild(titulo);

        prontas.forEach(function (receita) {
          mostrarReceita(receita, false);
        });
      }

      if (faltando.length > 0) {
        const titulo = document.createElement('h3');
        titulo.textContent = 'Falta pouco';
        titulo.style.gridColumn = '1 / -1';
        lista.appendChild(titulo);

        faltando.sort(function (a, b) {
          return a.faltantes.length - b.faltantes.length;
        });

        faltando.forEach(function (receita) {
          mostrarReceita(receita, true);
        });
      }

      if (prontas.length === 0 && faltando.length === 0) {
        resultado.textContent = 'Nenhuma receita encontrada com esses ingredientes.';
      }

      lista.style.display = 'grid';
    })
    .catch(function () {
      resultado.textContent = 'Erro ao buscar receitas.';
    });
});

});
