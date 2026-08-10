// Simulação: na primeira tentativa mostra um erro (visual, sem validar
// os dados de verdade). Na segunda tentativa, cria a conta normalmente.

let tentativas = 0;

document.getElementById("criarConta").addEventListener("click", function () {
  tentativas++;

  if (tentativas === 1) {
    document.getElementById("mensagemErro").textContent = "Não foi possível criar a conta. Verifique os dados e tente novamente.";
  } else {
    window.location.href = "index.html";
  }
});
