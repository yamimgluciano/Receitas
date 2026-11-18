<?php
session_start();
require_once("conecta.php");

header("Content-Type: application/json; charset=utf-8");

if (!isset($_SESSION["usuario_id"])) {
    echo json_encode(["erro" => "Usuário não está logado."]);
    exit;
}

$usuarioId = (int) $_SESSION["usuario_id"];
$receitaId = filter_input(INPUT_POST, "receita_id", FILTER_VALIDATE_INT);
$nota = filter_input(INPUT_POST, "nota", FILTER_VALIDATE_INT);

if ($_SERVER["REQUEST_METHOD"] !== "POST" ||
    !$receitaId || !$nota || $nota < 1 || $nota > 5) {
    echo json_encode(["erro" => "Dados inválidos."]);
    exit;
}

$sql = $conexao->prepare(
    "INSERT INTO avaliacoes (usuario_id, receita_id, nota)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE nota = VALUES(nota)"
);

$sql->bind_param("iii", $usuarioId, $receitaId, $nota);

if ($sql->execute()) {
    echo json_encode(["sucesso" => true]);
} else {
    echo json_encode(["erro" => "Não foi possível salvar a avaliação."]);
}
?>
