// Simulação: na primeira tentativa mostra um erro (visual, sem validar
// senha de verdade). Na segunda tentativa, entra normalmente.

let tentativas = 0;

document.getElementById("entrar").addEventListener("click", function () {
  tentativas++;

  if (tentativas === 1) {
    document.getElementById("mensagemErro").textContent = "E-mail ou senha incorretos. Tente novamente.";
  } else {
    window.location.href = "index.html";
  }
});
