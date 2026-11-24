sessaoPronta.then(function () {
if (!estaLogado()) {
  window.location.href = 'login.html';
}

const btnEditarPerfil = document.getElementById('btnEditarPerfil');
const nomePerfil = document.getElementById('nomePerfil');
const emailPerfil = document.getElementById('emailPerfil');


const camposRestricoes = {
  semLactose: 'sem_lactose',
  vegano: 'vegano',
  vegetariano: 'vegetariano',
  semGluten: 'sem_gluten'
};

const checkboxes = document.querySelectorAll('.checkboxes input');

checkboxes.forEach(function (checkbox) {
  checkbox.disabled = true;
});

// Carrega as restrições salvas no banco
fetch('dados_perfil.php')
  .then(function (resposta) {
    return resposta.json();
  })
  .then(function (usuario) {
    if (usuario.erro) return;

    Object.keys(camposRestricoes).forEach(function (id) {
      const checkbox = document.getElementById(id);
      checkbox.checked = Number(usuario[camposRestricoes[id]]) === 1;
      checkbox.disabled = false;
    });
  })
  .catch(function () {
    alert('Não foi possível carregar as restrições.');
  });

// Salva as alterações no MySQL
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener('change', function () {
    const dados = new FormData();

    Object.keys(camposRestricoes).forEach(function (id) {
      const campo = document.getElementById(id);
      dados.append(camposRestricoes[id], campo.checked ? '1' : '0');
    });

    checkboxes.forEach(function (campo) {
      campo.disabled = true;
    });

    fetch('salvar_restricoes.php', {
      method: 'POST',
      body: dados
    })
      .then(function (resposta) {
        return resposta.json();
      })
      .then(function (resultado) {
        if (resultado.erro || !resultado.sucesso) {
          throw new Error('Erro ao salvar');
        }
      })
      .catch(function () {
        alert('Não foi possível salvar. Atualize a página e tente novamente.');
      })
      .finally(function () {
        checkboxes.forEach(function (campo) {
          campo.disabled = false;
        });
      });
  });
});


// Busca os dados do usuário logado
fetch('dados_perfil.php')
  .then(function (resposta) {
    return resposta.json();
  })
  .then(function (usuario) {
    if (usuario.erro) {
      window.location.href = 'login.html';
      return;
    }

    nomePerfil.textContent = '👤 ' + usuario.nome;
    emailPerfil.textContent = usuario.email;
  })
  .catch(function () {
    nomePerfil.textContent = 'Erro ao carregar perfil.';
  });

 // Editar perfil
btnEditarPerfil.addEventListener('click', function () {
  const nomeAtual = nomePerfil.textContent.replace('👤 ', '');
  const novoNome = prompt('Nome:', nomeAtual);

  if (novoNome === null) return;

  const novoEmail = prompt('E-mail:', emailPerfil.textContent);

  if (novoEmail === null) return;

  const dados = new FormData();
  dados.append('nome', novoNome.trim());
  dados.append('email', novoEmail.trim());

  btnEditarPerfil.disabled = true;

  fetch('atualizar_perfil.php', {
    method: 'POST',
    body: dados
  })
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (resultado) {
      if (!resultado.sucesso) {
        alert(resultado.erro || 'Não foi possível atualizar o perfil.');
        return;
      }

      nomePerfil.textContent = '👤 ' + resultado.nome;
      emailPerfil.textContent = resultado.email;

      alert('Perfil atualizado com sucesso!');
    })
    .catch(function () {
      alert('Erro ao atualizar o perfil.');
    })
    .finally(function () {
      btnEditarPerfil.disabled = false;
    });
});


const btnSair = document.getElementById('btnSair');

if (btnSair) {
  btnSair.addEventListener('click', function () {
    fetch('logout.php', {
      method: 'POST'
    })
      .then(function (resposta) {
        return resposta.json();
      })
      .then(function (resultado) {
        if (resultado.sucesso) {
          localStorage.removeItem('logado');
          localStorage.removeItem('admin');

          window.location.href = 'index.html';
        } else {
          alert('Não foi possível sair da conta.');
        }
      })
      .catch(function () {
        alert('Erro ao sair da conta.');
      });
  });
}

});
