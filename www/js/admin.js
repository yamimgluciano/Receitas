sessaoPronta.then(function () {
  function salvarDadosReceita(dados, destino, mensagemSucesso) {
    fetch(destino, {
        method: 'POST',
        body: dados
    })
    .then(resposta => resposta.text())
    .then(function (mensagem) {
        alert(mensagem);

        if (mensagem.trim() === mensagemSucesso) {
            mostrarLista();
        }
    })
    .catch(function () {
        alert('Erro ao salvar receita.');
    });
}
function informarIngredientes(atuais = []) {
  const ingredientes = [];

  do {
    const anterior = atuais[ingredientes.length];

    const nome = prompt('Nome do ingrediente:', anterior?.nome || '');
    if (nome === null) return null;

if (!nome.trim()) {
  return ingredientes.length > 0 ? ingredientes : null;
}

    const quantidade = prompt(
      'Quantidade (ex.: 2 colheres de):',
      anterior?.quantidade || ''
    );

    if (quantidade === null || !quantidade.trim()) return null;

    ingredientes.push({
      nome: nome.trim(),
      quantidade: quantidade.trim()
    });

  } while (confirm('Deseja adicionar outro ingrediente?'));

  return ingredientes;
}

// Lista e gerenciamento das receitas do administrador

const listaAdmin = document.getElementById('listaAdmin');
const filtroAdmin = document.getElementById('filtroAdmin');

function criarItemAdmin(receita) {
  const item = document.createElement('div');
  item.className = 'item-admin ' + receita.categoria;
  item.dataset.id = receita.id;

  item.receita = receita;

  item.innerHTML =
    '<span>' +
    '<span class="nome-receita">' + receita.nome + '</span><br>' +
    '<small class="meta">⏱ ' + receita.tempo + ' · ★ ' + receita.dificuldade + ' · 📂 ' + receita.categoria + '</small>' +
    '</span>' +
    '<span><a href="#" class="editar">Editar</a> <a href="#" class="alterar-foto" style="display:inline-flex;align-items:center;gap:4px;color:#B45C2C"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4H10L7 8H4A2 2 0 0 0 2 10V18A2 2 0 0 0 4 20H20A2 2 0 0 0 22 18V10A2 2 0 0 0 20 8H17Z"/><circle cx="12" cy="14" r="4"/></svg> Foto</a> <a href="#" class="excluir" style="font-weight:700;color:#B45C2C">✕</a></span>';

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

      filtroAdmin.dispatchEvent(new Event('change'));
    })
    .catch(function () {
      alert('Erro ao carregar as receitas.');
    });
}

mostrarLista();

// Filtrar receitas por categoria

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

  const tempo = prompt('Tempo de preparo (em minutos):', '20');
  if (!tempo) return;

  const dificuldade = prompt('Dificuldade (Fácil, Médio ou Difícil):', 'Fácil');
  if (!dificuldade) return;

  const categoria = prompt(
    'Categoria (escolha uma das categorias cadastradas):\n' +
    Array.from(filtroAdmin.options)
      .filter(function (opcao) {
        return opcao.value !== 'todos';
      })
      .map(function (opcao) {
        return opcao.value;
      })
      .join(', '),
    'almoco'
  );
  if (!categoria) return;

  const categoriaValida = Array.from(filtroAdmin.options).some(function (opcao) {
    return opcao.value === categoria.trim() && opcao.value !== 'todos';
  });

  if (!categoriaValida) {
    alert('Escolha uma categoria cadastrada.');
    return;
  }

 const ingredientes = informarIngredientes();  if (!ingredientes) return;

  const preparo = prompt('Modo de preparo:');
  if (!preparo) return;

  const tempoCozimento = prompt('Tempo de cozimento (em minutos, se houver):', '');
  if (tempoCozimento === null) return;

  const temperatura = prompt('Temperatura (em °C, se houver):', '');
  if (temperatura === null) return;

  const equipamento = prompt('Equipamento (forno, air fryer, fogão, micro-ondas etc.):', '');
  if (equipamento === null) return;

  const dados = new FormData();
  dados.append('cadastrar', '1');
  dados.append('nome', nome);
  dados.append('tempo', tempo);
  dados.append('dificuldade', dificuldade);
  dados.append('categoria', categoria.trim());
  dados.append('ingredientes', JSON.stringify(ingredientes));
  dados.append('preparo', preparo);
  dados.append('tempo_cozimento', tempoCozimento.trim());
  dados.append('temperatura', temperatura.trim());
  dados.append('equipamento', equipamento.trim());

  salvarDadosReceita(
  dados,
  'salvar_receita.php',
  'Receita cadastrada com sucesso!'
);
});

// Editar ou excluir receita

listaAdmin.addEventListener('click', function (e) {
  if (e.target.closest('.alterar-foto')) {
    e.preventDefault();

    const item = e.target.closest('.item-admin');
    const input = document.createElement('input');

    input.type = 'file';
    input.accept = 'image/jpeg,image/png,image/webp';
    input.style.display = 'none';

    document.body.appendChild(input);

    input.onchange = function () {
      if (!input.files.length) return;

      const dados = new FormData();
      dados.append('id', item.dataset.id);
      dados.append('imagem', input.files[0]);

      fetch('alterar_imagem.php', {
        method: 'POST',
        body: dados
      })
        .then(resposta => resposta.text())
        .then(function (mensagem) {
          alert(mensagem);
          mostrarLista();
        })
        .catch(function () {
          alert('Erro ao atualizar a foto.');
        });

      input.remove();
    };

    input.oncancel = function () {
      input.remove();
    };

    input.click();
    return;
  }


  if (e.target.classList.contains('editar')) {
    e.preventDefault();

    const item = e.target.closest('.item-admin');
    const receita = item.receita;

    const novoNome = prompt('Nome da receita:', receita.nome);
    if (novoNome === null) return;

    const tempoAtual = String(receita.tempo).replace(/\D/g, '');
    const novoTempo = prompt('Tempo de preparo (em minutos):', tempoAtual);
    if (novoTempo === null) return;

    const novaDificuldade = prompt('Dificuldade (Fácil, Médio ou Difícil):', receita.dificuldade);
    if (novaDificuldade === null) return;

    const novaCategoria = prompt(
      'Categoria (escolha uma das categorias cadastradas):\n' +
      Array.from(filtroAdmin.options)
        .filter(function (opcao) {
          return opcao.value !== 'todos';
        })
        .map(function (opcao) {
          return opcao.value;
        })
        .join(', '),
      receita.categoria
    );
    if (novaCategoria === null) return;

    const categoriaValida = Array.from(filtroAdmin.options).some(function (opcao) {
      return opcao.value === novaCategoria.trim() && opcao.value !== 'todos';
    });

    if (!categoriaValida) {
      alert('Escolha uma categoria cadastrada.');
      return;
    }

    const novosIngredientes = informarIngredientes(
  receita.ingredientes_detalhados || []
);
    if (novosIngredientes === null) return;

    const novoModoPreparo = prompt('Modo de preparo:', receita.preparo || '');
    if (novoModoPreparo === null) return;

    const novoTempoCozimento = prompt(
      'Tempo de cozimento (em minutos, se houver):',
      receita.tempo_cozimento ?? ''
    );
    if (novoTempoCozimento === null) return;

    const novaTemperatura = prompt(
      'Temperatura (em °C, se houver):',
      receita.temperatura ?? ''
    );
    if (novaTemperatura === null) return;

    const novoEquipamento = prompt(
      'Equipamento (forno, air fryer, fogão, micro-ondas etc.):',
      receita.equipamento || ''
    );
    if (novoEquipamento === null) return;

    const dados = new FormData();
    dados.append('editar', '1');
    dados.append('id', receita.id);
    dados.append('nome', novoNome.trim());
    dados.append('tempo', novoTempo.trim());
    dados.append('dificuldade', novaDificuldade.trim());
    dados.append('categoria', novaCategoria.trim());
    dados.append('ingredientes', JSON.stringify(novosIngredientes));
    dados.append('preparo', novoModoPreparo.trim());
    dados.append('tempo_cozimento', novoTempoCozimento.trim());
    dados.append('temperatura', novaTemperatura.trim());
    dados.append('equipamento', novoEquipamento.trim());

    salvarDadosReceita(
  dados,
  'editar_receita.php',
  'Receita atualizada com sucesso!'
);
  }

  if (e.target.classList.contains('excluir')) {
    e.preventDefault();

    const item = e.target.closest('.item-admin');
    const id = item.dataset.id;

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

          if (mensagem.trim() === 'Receita excluída com sucesso!') {
            mostrarLista();
          }
        })
        .catch(function () {
          alert('Erro ao excluir receita.');
        });
    }
  }
});

// Gerenciar categorias

const btnAddCategoria = document.getElementById('btnAddCategoria');
const btnRemCategoria = document.getElementById('btnRemCategoria');
const categoriasAdmin = document.getElementById('categoriasAdmin');

function carregarCategorias() {
  fetch('buscar_categorias.php')
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (categorias) {
      // Atualiza o filtro do administrador
      filtroAdmin.innerHTML = '<option value="todos">Todas as categorias</option>';

      categorias.forEach(function (categoria) {
        const opcao = document.createElement('option');
        opcao.value = categoria.slug;
        opcao.textContent = categoria.nome;
        filtroAdmin.appendChild(opcao);
      });

      // Remove os botões antigos, mantendo os controles
      categoriasAdmin.querySelectorAll('button').forEach(function (botao) {
        if (botao !== btnAddCategoria && botao !== btnRemCategoria) {
          botao.remove();
        }
      });

      // Mostra as categorias cadastradas
      categorias.forEach(function (categoria) {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.textContent = categoria.nome;
        botao.dataset.slug = categoria.slug;

        categoriasAdmin.insertBefore(botao, btnAddCategoria);
      });
    })
    .catch(function () {
      alert('Erro ao carregar categorias.');
    });
}

carregarCategorias();

// Adicionar categoria no MySQL
btnAddCategoria.addEventListener('click', function () {
  const nome = prompt('Nome da nova categoria:');
  if (!nome || !nome.trim()) return;

  const dados = new FormData();
  dados.append('nome', nome.trim());

  fetch('salvar_categoria.php', {
    method: 'POST',
    body: dados
  })
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (resultado) {
      if (!resultado.sucesso) {
        alert(resultado.erro || 'Erro ao cadastrar categoria.');
        return;
      }

      alert('Categoria cadastrada com sucesso!');
      carregarCategorias();
    })
    .catch(function () {
      alert('Erro ao cadastrar categoria.');
    });
});


// Excluir categoria do banco de dados
btnRemCategoria.addEventListener('click', function () {
  const nome = prompt('Digite o nome da categoria que deseja excluir:');
  if (!nome || !nome.trim()) return;

  const opcoes = Array.from(filtroAdmin.options);

  const categoria = opcoes.find(function (opcao) {
    return opcao.value !== 'todos' &&
      opcao.textContent.toLowerCase() === nome.trim().toLowerCase();
  });

  if (!categoria) {
    alert('Categoria não encontrada.');
    return;
  }

  if (!confirm('Deseja realmente excluir a categoria "' + categoria.textContent + '"?')) {
    return;
  }

  const dados = new FormData();
  dados.append('slug', categoria.value);

  fetch('excluir_categoria.php', {
    method: 'POST',
    body: dados
  })
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (resultado) {
      if (!resultado.sucesso) {
        alert(resultado.erro || 'Não foi possível excluir a categoria.');
        return;
      }

      alert('Categoria excluída com sucesso!');
      carregarCategorias();
    })
    .catch(function () {
      alert('Erro ao excluir categoria.');
    });
});


});

