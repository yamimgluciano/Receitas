<?php
session_start();
require_once("conecta.php");

$email = trim($_POST["email"] ?? "");
$senha = $_POST["senha"] ?? "";

if ($email == "" || $senha == "") {
    die("Preencha todos os campos.");
}

$sql = $conexao->prepare("SELECT id, nome, senha, tipo FROM usuarios WHERE email = ?");
$sql->bind_param("s", $email);
$sql->execute();

$resultado = $sql->get_result();

if ($resultado->num_rows == 0) {
    die("E-mail não cadastrado. Realize seu cadastro.");
}

$usuario = $resultado->fetch_assoc();

if (!password_verify($senha, $usuario["senha"])) {
    die("Senha incorreta.");
}

session_regenerate_id(true);

$_SESSION["usuario_id"] = $usuario["id"];
$_SESSION["nome"] = $usuario["nome"];
$_SESSION["tipo"] = $usuario["tipo"];

session_write_close();

echo "Login realizado com sucesso!" . $usuario["tipo"];
?>
