<?php
session_start();
require_once("conecta.php");

header("Content-Type: application/json; charset=utf-8");

if (!isset($_SESSION["usuario_id"])) {
    http_response_code(401);
    echo json_encode(["erro" => "Usuário não está logado."]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["erro" => "Requisição inválida."]);
    exit;
}

$id = (int) $_SESSION["usuario_id"];
$nome = trim($_POST["nome"] ?? "");
$email = trim($_POST["email"] ?? "");

if ($nome === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["erro" => "Preencha um nome e um e-mail válido."]);
    exit;
}

if (strlen($nome) > 100 || strlen($email) > 150) {
    echo json_encode(["erro" => "Nome ou e-mail muito longo."]);
    exit;
}

// Verifica se o e-mail já pertence a outro usuário
$sql = $conexao->prepare(
    "SELECT id FROM usuarios WHERE email = ? AND id <> ?"
);
$sql->bind_param("si", $email, $id);
$sql->execute();

if ($sql->get_result()->num_rows > 0) {
    echo json_encode(["erro" => "Este e-mail já está cadastrado."]);
    exit;
}

// Atualiza os dados do usuário logado
$sql = $conexao->prepare(
    "UPDATE usuarios SET nome = ?, email = ? WHERE id = ?"
);
$sql->bind_param("ssi", $nome, $email, $id);

if ($sql->execute()) {
    $_SESSION["nome"] = $nome;

    echo json_encode([
        "sucesso" => true,
        "nome" => $nome,
        "email" => $email
    ], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["erro" => "Não foi possível atualizar o perfil."]);
}
?>
