<?php
session_start();
require_once("conecta.php");

header("Content-Type: application/json; charset=utf-8");

if (!isset($_SESSION["usuario_id"])) {
    http_response_code(401);
    echo json_encode(["erro" => "Usuário não está logado."]);
    exit;
}

$usuarioId = (int) $_SESSION["usuario_id"];

$sql = $conexao->prepare(
    "SELECT receita_id FROM favoritos WHERE usuario_id = ?"
);

$sql->bind_param("i", $usuarioId);
$sql->execute();

$resultado = $sql->get_result();
$favoritos = [];

while ($linha = $resultado->fetch_assoc()) {
    $favoritos[] = (int) $linha["receita_id"];
}

echo json_encode($favoritos);
?>
