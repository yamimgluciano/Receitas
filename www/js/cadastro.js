document.getElementById("criarConta").addEventListener("click", function () {
    let nome = document.getElementById("nome").value.trim();
    let email = document.getElementById("email").value.trim();
    let senha = document.getElementById("senha").value;
    let confirmar = document.getElementById("confirmarSenha").value;
    let mensagem = document.getElementById("mensagemErro");

    if (nome == "" || email == "" || senha == "" || confirmar == "") {
        mensagem.textContent = "Preencha todos os campos.";
        return;
    }

    if (senha != confirmar) {
        mensagem.textContent = "As senhas não são iguais.";
        return;
    }

    let dados = new FormData();
    dados.append("nome", nome);
    dados.append("email", email);
    dados.append("senha", senha);

    fetch("processa_cadastro.php", {
        method: "POST",
        body: dados
    })
    .then(resposta => resposta.text())
    .then(resultado => {
        if (resultado.trim() == "Cadastro realizado com sucesso!") {
            window.location.href = "login.html";
        } else {
            mensagem.textContent = resultado;
        }
    })
    .catch(() => {
        mensagem.textContent = "Erro ao realizar cadastro.";
    });
});