<?php
session_start();
require_once("conecta.php");

header("Content-Type: application/json; charset=utf-8");

if (!isset($_SESSION["usuario_id"])) {
    http_response_code(403);
    echo json_encode([]);
    exit;
}

$sql = "SELECT id, nome FROM ingredientes ORDER BY nome";
$resultado = $conexao->query($sql);

$ingredientes = [];

while ($linha = $resultado->fetch_assoc()) {
    $ingredientes[] = $linha;
}

echo json_encode($ingredientes, JSON_UNESCAPED_UNICODE);
?>