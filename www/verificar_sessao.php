<?php
session_start();

header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: no-store");

$logado = isset($_SESSION["usuario_id"]);

echo json_encode([
    "logado" => $logado,
    "admin" => $logado && ($_SESSION["tipo"] ?? "") === "admin",
    "nome" => $_SESSION["nome"] ?? ""
]);
?>
