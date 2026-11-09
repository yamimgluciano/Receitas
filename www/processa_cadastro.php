<?php
require_once("conecta.php");

$nome = trim($_POST["nome"] ?? "");
$email = trim($_POST["email"] ?? "");
$senha = $_POST["senha"] ?? "";

if ($nome == "" || $email == "" || $senha == "") {
    die("Preencha todos os campos.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("E-mail inválido.");
}

$consulta = $conexao->prepare("SELECT id FROM usuarios WHERE email = ?");
$consulta->bind_param("s", $email);
$consulta->execute();

if ($consulta->get_result()->num_rows > 0) {
    die("Este e-mail já está cadastrado.");
}

$senhaSegura = password_hash($senha, PASSWORD_DEFAULT);
$tipo = "usuario";

$sql = $conexao->prepare("INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)");
$sql->bind_param("ssss", $nome, $email, $senhaSegura, $tipo);

if ($sql->execute()) {
    echo "Cadastro realizado com sucesso!";
} else {
    echo "Erro ao cadastrar usuário.";
}
?>