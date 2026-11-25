sessaoPronta.then(function () {

  const btnBuscar = document.getElementById('btnBuscar');
  const btnAddIngrediente = document.getElementById('btnAddIngrediente');
  const listaIngredientes = document.getElementById('listaIngredientes');

  if (!ehAdmin()) {
    btnAddIngrediente.style.display = 'none';
  }

  function carregarIngredientes() {
    fetch('buscar_ingredientes.php')
      .then(resposta => resposta.json())
      .then(function (ingredientes) {
        listaIngredientes.innerHTML = '';

        ingredientes.forEach(function (ingrediente) {
          const label = document.createElement('label');

          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.value = ingrediente.id;

          label.appendChild(checkbox);
          label.appendChild(document.createTextNode(' ' + ingrediente.nome));

          if (ehAdmin()) {
            const botao = document.createElement('button');
            botao.type = 'button';
            botao.className = 'remover';
            botao.dataset.id = ingrediente.id;
            botao.textContent = '✕';

            label.appendChild(botao);
          }

          listaIngredientes.appendChild(label);
        });
      })
      .catch(function () {
        alert('Erro ao carregar ingredientes.');
      });
  }

  carregarIngredientes();

  // Adicionar ingrediente

  btnAddIngrediente.addEventListener('click', function () {
    const nome = prompt('Nome do ingrediente:');
    if (!nome || !nome.trim()) return;

    const dados = new FormData();
    dados.append('acao', 'adicionar');
    dados.append('nome', nome.trim());

    fetch('gerenciar_ingredientes.php', {
      method: 'POST',
      body: dados
    })
      .then(resposta => resposta.text())
      .then(function (mensagem) {
        alert(mensagem);
        carregarIngredientes();
      });
  });

  // Excluir ingrediente

  listaIngredientes.addEventListener('click', function (e) {
    if (e.target.classList.contains('remover')) {

      if (!confirm('Deseja excluir este ingrediente? Ingredientes vinculados a receitas não podem ser excluídos.')) return;

      const dados = new FormData();
      dados.append('acao', 'excluir');
      dados.append('id', e.target.dataset.id);

      fetch('gerenciar_ingredientes.php', {
        method: 'POST',
        body: dados
      })
        .then(resposta => resposta.text())
        .then(function (mensagem) {
          alert(mensagem);
          carregarIngredientes();
        });
    }
  });

  // Buscar receitas pelos ingredientes selecionados

  btnBuscar.addEventListener('click', function () {
    const marcados = listaIngredientes.querySelectorAll('input:checked');

    const disponiveis = Array.from(marcados).map(function (checkbox) {
      return String(checkbox.value);
    });

    const lista = document.getElementById('listaResultado');
    const resultado = document.getElementById('resultado');

    lista.innerHTML = '';
    resultado.textContent = '';

    fetch('buscar_receitas.php')
      .then(resposta => resposta.json())
      .then(function (receitasBanco) {

        const prontas = [];
        const faltando = [];

        receitasBanco.forEach(function (receita) {
          const ingredientes = receita.ingredientes_detalhados || [];

          if (ingredientes.length === 0) return;

          const faltantes = ingredientes.filter(function (item) {
            return !disponiveis.includes(String(item.id));
          });

          const quantidadeDisponivel =
            ingredientes.length - faltantes.length;

          if (faltantes.length === 0) {
            prontas.push(receita);
          } else if (quantidadeDisponivel / ingredientes.length >= 0.4) {
            receita.faltantes = faltantes.map(item => item.nome);
            faltando.push(receita);
          }
        });

        function mostrarReceita(receita, faltaPouco) {
          const card = document.createElement('div');
          card.className = 'receita-card';

          card.innerHTML =
            '<div class="foto">' + (receita.imagem ? '<img src="' + receita.imagem + '" alt="Foto da receita" style="width:100%;height:100%;object-fit:cover;">' : receita.emoji) + '</div>' +
            '<div class="info"><h3>' + receita.nome + '</h3>' +
            '<div class="meta">⏱ ' + receita.tempo +
            ' · ★ ' + receita.dificuldade + '</div>' +
            (faltaPouco
              ? '<p>Falta: ' + receita.faltantes.join(', ') + '</p>'
              : '<p>Você tem todos os ingredientes!</p>') +
            '<a href="detalhe.html?id=' + receita.id +
            '">Ver receita</a></div>';

          lista.appendChild(card);
        }

        resultado.textContent = prontas.length +
          ' receita(s) que você pode preparar agora.';

        if (prontas.length > 0) {
          const titulo = document.createElement('h3');
          titulo.textContent = 'Você pode preparar agora';
          titulo.style.gridColumn = '1 / -1';
          lista.appendChild(titulo);

          prontas.forEach(receita => mostrarReceita(receita, false));
        }

        if (faltando.length > 0) {
          const titulo = document.createElement('h3');
          titulo.textContent = 'Falta pouco';
          titulo.style.gridColumn = '1 / -1';
          lista.appendChild(titulo);

          faltando.sort((a, b) => a.faltantes.length - b.faltantes.length);

          faltando.forEach(receita => mostrarReceita(receita, true));
        }

        if (prontas.length === 0 && faltando.length === 0) {
          resultado.textContent =
            'Nenhuma receita encontrada com esses ingredientes.';
        }

        lista.style.display = 'grid';
      })
      .catch(function () {
        resultado.textContent = 'Erro ao buscar receitas.';
      });
  });
});