<?php
session_start();
require_once("conecta.php");

header("Content-Type: application/json; charset=utf-8");

if (!isset($_SESSION["tipo"]) || $_SESSION["tipo"] != "admin") {
    echo json_encode(["erro" => "Acesso negado."]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    echo json_encode(["erro" => "Requisição inválida."]);
    exit;
}

$slug = trim($_POST["slug"] ?? "");

if ($slug == "") {
    echo json_encode(["erro" => "Categoria não informada."]);
    exit;
}

// Verifica se a categoria existe
$sql = $conexao->prepare(
    "SELECT id FROM categorias WHERE slug = ?"
);
$sql->bind_param("s", $slug);
$sql->execute();

$resultado = $sql->get_result();

if ($resultado->num_rows == 0) {
    echo json_encode(["erro" => "Categoria não encontrada."]);
    exit;
}

// Verifica se existem receitas nessa categoria
$sql = $conexao->prepare(
    "SELECT COUNT(*) AS total FROM receitas WHERE categoria = ?"
);
$sql->bind_param("s", $slug);
$sql->execute();

$resultado = $sql->get_result();
$dados = $resultado->fetch_assoc();

if ($dados["total"] > 0) {
    echo json_encode([
        "erro" => "Não é possível excluir esta categoria porque existem receitas cadastradas nela."
    ]);
    exit;
}

// Exclui a categoria
$sql = $conexao->prepare(
    "DELETE FROM categorias WHERE slug = ?"
);
$sql->bind_param("s", $slug);

if ($sql->execute()) {
    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Categoria excluída com sucesso!"
    ]);
} else {
    echo json_encode(["erro" => "Não foi possível excluir a categoria."]);
}
?>
