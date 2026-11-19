<?php
session_start();
require_once("conecta.php");

header("Content-Type: application/json; charset=utf-8");

if (!isset($_SESSION["usuario_id"])) {
    echo json_encode(["nota" => 0]);
    exit;
}

$usuarioId = (int) $_SESSION["usuario_id"];
$receitaId = filter_input(INPUT_GET, "receita_id", FILTER_VALIDATE_INT);

if (!$receitaId) {
    echo json_encode(["nota" => 0]);
    exit;
}

$sql = $conexao->prepare(
    "SELECT nota FROM avaliacoes
     WHERE usuario_id = ? AND receita_id = ?
     LIMIT 1"
);

$sql->bind_param("ii", $usuarioId, $receitaId);
$sql->execute();

$resultado = $sql->get_result();
$avaliacao = $resultado->fetch_assoc();

echo json_encode([
    "nota" => $avaliacao ? (int) $avaliacao["nota"] : 0
]);
?>
