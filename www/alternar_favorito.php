<?php
session_start();
require_once("conecta.php");

header("Content-Type: application/json; charset=utf-8");

if (!isset($_SESSION["usuario_id"])) {
    echo json_encode(["erro" => "Usuário não está logado."]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["erro" => "Requisição inválida."]);
    exit;
}

$usuarioId = (int) $_SESSION["usuario_id"];
$receitaId = filter_input(INPUT_POST, "receita_id", FILTER_VALIDATE_INT);

if (!$receitaId || $receitaId <= 0) {
    echo json_encode(["erro" => "Receita inválida."]);
    exit;
}

// Verifica se a receita já está nos favoritos
$sql = $conexao->prepare(
    "SELECT id FROM favoritos WHERE usuario_id = ? AND receita_id = ?"
);
$sql->bind_param("ii", $usuarioId, $receitaId);
$sql->execute();

$resultado = $sql->get_result();

if ($resultado->num_rows > 0) {
    // Remove dos favoritos
    $sql = $conexao->prepare(
        "DELETE FROM favoritos WHERE usuario_id = ? AND receita_id = ?"
    );
    $favoritado = false;
} else {
    // Adiciona aos favoritos
    $sql = $conexao->prepare(
        "INSERT INTO favoritos (usuario_id, receita_id) VALUES (?, ?)"
    );
    $favoritado = true;
}

$sql->bind_param("ii", $usuarioId, $receitaId);

if ($sql->execute()) {
    echo json_encode(["sucesso" => true, "favoritado" => $favoritado]);
} else {
    echo json_encode(["erro" => "Não foi possível atualizar os favoritos."]);
}
