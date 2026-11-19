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

  item.receita = receita;

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

  const ingredientes = prompt('Ingredientes com quantidades (separados por vírgula):');
  if (!ingredientes) return;

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
  dados.append('ingredientes', ingredientes);
  dados.append('preparo', preparo);
  dados.append('tempo_cozimento', tempoCozimento.trim());
  dados.append('temperatura', temperatura.trim());
  dados.append('equipamento', equipamento.trim());

  fetch('salvar_receita.php', {
    method: 'POST',
    body: dados
  })
    .then(function (resposta) {
      return resposta.text();
    })
    .then(function (mensagem) {
      alert(mensagem);

      if (mensagem.trim() === 'Receita cadastrada com sucesso!') {
        mostrarLista();
      }
    })
    .catch(function () {
      alert('Erro ao cadastrar receita.');
    });
});

// Editar ou excluir receita

listaAdmin.addEventListener('click', function (e) {

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

    const ingredientesAtuais = Array.isArray(receita.ingredientes)
      ? receita.ingredientes.join(', ')
      : receita.ingredientes || '';

    const novosIngredientes = prompt('Ingredientes com quantidades (separados por vírgula):', ingredientesAtuais);
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
    dados.append('ingredientes', novosIngredientes.trim());
    dados.append('preparo', novoModoPreparo.trim());
    dados.append('tempo_cozimento', novoTempoCozimento.trim());
    dados.append('temperatura', novaTemperatura.trim());
    dados.append('equipamento', novoEquipamento.trim());

    fetch('editar_receita.php', {
      method: 'POST',
      body: dados
    })
      .then(function (resposta) {
        return resposta.text();
      })
      .then(function (mensagem) {
        alert(mensagem);

        if (mensagem.trim() === 'Receita atualizada com sucesso!') {
          mostrarLista();
        }
      })
      .catch(function () {
        alert('Erro ao atualizar receita.');
      });
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

