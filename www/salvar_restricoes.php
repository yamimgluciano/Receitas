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

$id = $_SESSION["usuario_id"];

$semLactose = ($_POST["sem_lactose"] ?? "0") === "1" ? 1 : 0;
$vegano = ($_POST["vegano"] ?? "0") === "1" ? 1 : 0;
$vegetariano = ($_POST["vegetariano"] ?? "0") === "1" ? 1 : 0;
$semGluten = ($_POST["sem_gluten"] ?? "0") === "1" ? 1 : 0;

$sql = $conexao->prepare(
    "UPDATE usuarios
     SET sem_lactose = ?, vegano = ?, vegetariano = ?, sem_gluten = ?
     WHERE id = ?"
);

$sql->bind_param(
    "iiiii",
    $semLactose,
    $vegano,
    $vegetariano,
    $semGluten,
    $id
);

if ($sql->execute()) {
    echo json_encode(["sucesso" => true]);
} else {
    echo json_encode(["erro" => "Não foi possível salvar as restrições."]);
}
?>
