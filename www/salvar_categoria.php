<?php
session_start();
require_once("conecta.php");

header("Content-Type: application/json; charset=utf-8");

if (!isset($_SESSION["tipo"]) || $_SESSION["tipo"] != "admin") {
    echo json_encode(["erro" => "Acesso negado."]);
    exit;
}

$nome = trim($_POST["nome"] ?? "");

if ($_SERVER["REQUEST_METHOD"] != "POST" || $nome == "") {
    echo json_encode(["erro" => "Informe o nome da categoria."]);
    exit;
}

$nome = mb_substr($nome, 0, 100);

$slug = mb_strtolower($nome, "UTF-8");
$slug = iconv("UTF-8", "ASCII//TRANSLIT//IGNORE", $slug);
$slug = strtolower($slug);
$slug = preg_replace("/[^a-z0-9]+/", "", $slug);

if ($slug == "") {
    echo json_encode(["erro" => "Nome de categoria inválido."]);
    exit;
}

$sql = $conexao->prepare(
    "SELECT id FROM categorias WHERE slug = ? LIMIT 1"
);
$sql->bind_param("s", $slug);
$sql->execute();

$resultado = $sql->get_result();

if ($resultado->num_rows > 0) {
    echo json_encode(["erro" => "Essa categoria já existe."]);
    exit;
}

$sql = $conexao->prepare(
    "INSERT INTO categorias (nome, slug) VALUES (?, ?)"
);
$sql->bind_param("ss", $nome, $slug);

if ($sql->execute()) {
    echo json_encode([
        "sucesso" => true,
        "nome" => $nome,
        "slug" => $slug
    ]);
} else {
    echo json_encode(["erro" => "Não foi possível salvar a categoria."]);
}
?>
