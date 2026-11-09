document.getElementById("entrar").addEventListener("click", function () {
    let email = document.getElementById("email").value.trim();
    let senha = document.getElementById("senha").value;
    let mensagem = document.getElementById("mensagemErro");

    if (email == "" || senha == "") {
        mensagem.textContent = "Preencha todos os campos.";
        return;
    }

    let dados = new FormData();
    dados.append("email", email);
    dados.append("senha", senha);

    fetch("processa_login.php", {
        method: "POST",
        body: dados
    })
    .then(resposta => resposta.text())
    .then(resultado => {
        if (resultado.trim() == "Login realizado com sucesso!usuario" ||
    resultado.trim() == "Login realizado com sucesso!admin") {

    localStorage.setItem("logado", "true");

    if (resultado.trim() == "Login realizado com sucesso!admin") {
        localStorage.setItem("admin", "true");
    } else {
        localStorage.setItem("admin", "false");
    }

    window.location.href = "index.html";
        } else {
            mensagem.textContent = resultado;
        }
    })
    .catch(() => {
        mensagem.textContent = "Erro ao realizar login.";
    });
});