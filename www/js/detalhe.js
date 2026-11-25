sessaoPronta.then(function () {
const parametros = new URLSearchParams(window.location.search);
const idReceita = parametros.get('id');

const btnFavoritar = document.getElementById('btnFavoritar');
const estrelas = document.querySelectorAll('#estrelas span');
const btnSalvarAvaliacao = document.getElementById('btnSalvarAvaliacao');
const msgAvaliacao = document.getElementById('msgAvaliacao');

let nomeReceita = '';
let notaEscolhida = 0;

function marcarEstrelas(nota) {
  estrelas.forEach(function (estrela) {
    if (Number(estrela.dataset.valor) <= nota) {
      estrela.classList.add('ativa');
    } else {
      estrela.classList.remove('ativa');
    }
  });
}

function carregarFavoritoEAvaliacao() {
  if (!estaLogado()) return;

  // Consultar favorito no banco de dados
  fetch('consultar_favorito.php?receita_id=' + encodeURIComponent(idReceita))
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (resultado) {
      if (resultado.favoritado) {
        btnFavoritar.classList.add('favoritado');
        btnFavoritar.textContent = '♥ Favoritado';
      } else {
        btnFavoritar.classList.remove('favoritado');
        btnFavoritar.textContent = '♡ Favoritar';
      }
    })
    .catch(function () {
      console.log('Erro ao consultar favorito.');
    });

  // Consultar avaliação no banco de dados
  fetch('consultar_avaliacao.php?receita_id=' + encodeURIComponent(idReceita))
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (resultado) {
      notaEscolhida = Number(resultado.nota) || 0;
      marcarEstrelas(notaEscolhida);

      if (notaEscolhida > 0) {
        msgAvaliacao.textContent =
          'Sua avaliação: ' + notaEscolhida + ' estrela(s)';
      } else {
        msgAvaliacao.textContent = '';
      }
    })
    .catch(function () {
      console.log('Erro ao consultar avaliação.');
    });
}

if (idReceita) {
  fetch('buscar_receitas.php')
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (receitas) {
      const receita = receitas.find(function (item) {
        return String(item.id) === String(idReceita);
      });

      if (!receita) {
        document.getElementById('nomeReceita').textContent = 'Receita não encontrada.';
        return;
      }

      nomeReceita = receita.nome;

      document.title = nomeReceita + ' — Receitas em Casa';
      document.getElementById('nomeReceita').textContent = receita.nome;
      if (receita.imagem) {
    document.getElementById('fotoReceita').innerHTML = '<img src="' + receita.imagem + '" style="width:100%;height:100%;object-fit:contain;border-radius:inherit;" alt="Foto da receita">';
} else {
    document.getElementById('fotoReceita').textContent = receita.emoji || '🍽️';
}


      if (ehAdmin()) {
        const foto = document.getElementById('fotoReceita');
        foto.style.position = 'relative';

        const botao = document.createElement('button');
        botao.type = 'button';
        botao.style.cssText = 'position:absolute;top:12px;right:12px;left:auto;width:auto;min-width:0;margin:0;display:flex;align-items:center;gap:6px;background:rgba(255,250,242,0.94);color:#B45C2C;border:1px solid #E0D2BC;border-radius:8px;width:auto;height:auto;padding:8px 14px;font-size:14px;font-weight:500;cursor:pointer;z-index:2;';

        botao.innerHTML = '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4H10L7 8H4A2 2 0 0 0 2 10V18A2 2 0 0 0 4 20H20A2 2 0 0 0 22 18V10A2 2 0 0 0 20 8H17Z"/><circle cx="12" cy="14" r="4"/></svg>' + (receita.imagem ? 'Alterar foto' : 'Adicionar foto');

        botao.title = receita.imagem ? 'Alterar foto' : 'Adicionar foto';
        botao.setAttribute('aria-label', botao.title);
        foto.appendChild(botao);

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/jpeg,image/png,image/webp';
        input.style.display = 'none';
        document.body.appendChild(input);

        botao.onclick = function () {
          input.click();
        };

        input.onchange = function () {
          if (!input.files.length) return;

          const dados = new FormData();
          dados.append('id', receita.id);
          dados.append('imagem', input.files[0]);

          fetch('alterar_imagem.php', {
            method: 'POST',
            body: dados
          })
            .then(resposta => resposta.text())
            .then(function (mensagem) {
              alert(mensagem);

              if (mensagem.trim() === 'Foto atualizada com sucesso!') {
                window.location.reload();
              }
            })
            .catch(function () {
              alert('Erro ao atualizar a foto.');
            });

          input.value = '';
        };
      }

      document.getElementById('metaReceita').textContent =
        '⏱ ' + receita.tempo + ' · 📂 ' + receita.categoria +
        ' · ★ ' + receita.dificuldade;

      // Informações de cozimento
      const metaReceita = document.getElementById('metaReceita');

      const informacoes = document.createElement('div');
      informacoes.style.marginTop = '16px';
      informacoes.style.marginBottom = '24px';
      informacoes.style.fontSize = '15px';
      informacoes.style.lineHeight = '1.8';
      informacoes.style.color = '#8A7A68';

      function adicionarInformacao(titulo, valor) {
        const linha = document.createElement('div');

        const nome = document.createElement('strong');
        nome.textContent = titulo + ': ';
        nome.style.fontWeight = '600';

        const texto = document.createElement('span');
        texto.textContent = valor;

        linha.appendChild(nome);
        linha.appendChild(texto);
        informacoes.appendChild(linha);
      }

      if (receita.tempo_cozimento) {
        adicionarInformacao(
          'Tempo de cozimento',
          receita.tempo_cozimento + ' minutos'
        );
      }

      if (receita.temperatura) {
        adicionarInformacao(
          'Temperatura',
          receita.temperatura + ' °C'
        );
      }

      if (receita.equipamento) {
        const equipamento = receita.equipamento.charAt(0).toUpperCase() +
          receita.equipamento.slice(1);

        adicionarInformacao('Equipamento', equipamento);
      }

      if (informacoes.children.length > 0) {
        metaReceita.insertAdjacentElement('afterend', informacoes);
      }

      // Ingredientes
      const listaIngredientes = document.getElementById('ingredientesReceita');

      receita.ingredientes.forEach(function (ingrediente) {
        const li = document.createElement('li');
        li.textContent = ingrediente.trim();
        listaIngredientes.appendChild(li);
      });

      // Modo de preparo
      const listaPreparo = document.getElementById('preparoReceita');
      const etapas = receita.preparo.split('\n');

      etapas.forEach(function (etapa) {
        if (etapa.trim() !== '') {
          const li = document.createElement('li');
          li.textContent = etapa.trim();
          listaPreparo.appendChild(li);
        }
      });

      carregarFavoritoEAvaliacao();
    })
    .catch(function () {
      document.getElementById('nomeReceita').textContent = 'Erro ao carregar receita.';
    });
} else {
  document.getElementById('nomeReceita').textContent = 'Nenhuma receita selecionada.';
}

// Avaliação por estrelas

estrelas.forEach(function (estrela) {
  estrela.addEventListener('click', function () {
    if (!estaLogado()) {
      window.location.href = 'login.html';
      return;
    }

    notaEscolhida = Number(estrela.dataset.valor);
    marcarEstrelas(notaEscolhida);
  });
});

btnSalvarAvaliacao.addEventListener('click', function () {
  if (!estaLogado()) {
    window.location.href = 'login.html';
    return;
  }

  if (!idReceita || notaEscolhida === 0) {
    msgAvaliacao.textContent = 'Escolha uma nota antes de salvar.';
    return;
  }

  const dados = new FormData();
  dados.append('receita_id', idReceita);
  dados.append('nota', notaEscolhida);

  btnSalvarAvaliacao.disabled = true;

  fetch('salvar_avaliacao.php', {
    method: 'POST',
    body: dados
  })
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (resultado) {
      if (!resultado.sucesso) {
        throw new Error(resultado.erro || 'Erro ao salvar.');
      }

      msgAvaliacao.textContent =
        'Avaliação salva! Você deu ' + notaEscolhida + ' estrela(s).';
    })
    .catch(function () {
      msgAvaliacao.textContent = 'Não foi possível salvar a avaliação.';
    })
    .finally(function () {
      btnSalvarAvaliacao.disabled = false;
    });
});

// Favoritar receita

btnFavoritar.addEventListener('click', function () {
  if (!estaLogado()) {
    window.location.href = 'login.html';
    return;
  }

  if (!idReceita) return;

  const dados = new FormData();
  dados.append('receita_id', idReceita);

  btnFavoritar.disabled = true;

  fetch('alternar_favorito.php', {
    method: 'POST',
    body: dados
  })
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (resultado) {
      if (!resultado.sucesso) {
        throw new Error(resultado.erro || 'Erro ao salvar favorito.');
      }

      if (resultado.favoritado) {
        btnFavoritar.classList.add('favoritado');
        btnFavoritar.textContent = '♥ Favoritado';
      } else {
        btnFavoritar.classList.remove('favoritado');
        btnFavoritar.textContent = '♡ Favoritar';
      }
    })
    .catch(function () {
      alert('Não foi possível salvar o favorito.');
    })
    .finally(function () {
      btnFavoritar.disabled = false;
    });
});

});
