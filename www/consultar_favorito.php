<?php
session_start();
require_once("conecta.php");

header("Content-Type: application/json; charset=utf-8");

if (!isset($_SESSION["usuario_id"])) {
    echo json_encode(["favoritado" => false]);
    exit;
}

$usuarioId = (int) $_SESSION["usuario_id"];
$receitaId = filter_input(INPUT_GET, "receita_id", FILTER_VALIDATE_INT);

if (!$receitaId || $receitaId <= 0) {
    echo json_encode(["erro" => "Receita inválida."]);
    exit;
}

$sql = $conexao->prepare(
    "SELECT id FROM favoritos WHERE usuario_id = ? AND receita_id = ?"
);

$sql->bind_param("ii", $usuarioId, $receitaId);
$sql->execute();

$resultado = $sql->get_result();

echo json_encode([
    "favoritado" => $resultado->num_rows > 0
]);
?>
