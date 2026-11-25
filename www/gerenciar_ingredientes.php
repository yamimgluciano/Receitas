<?php
session_start();
require_once("conecta.php");

if (!isset($_SESSION["tipo"]) || $_SESSION["tipo"] != "admin") {
    exit("Acesso negado.");
}

$acao = $_POST["acao"] ?? "";

if ($acao == "adicionar") {
    $nome = trim($_POST["nome"] ?? "");

    if ($nome == "") {
        exit("Informe o nome do ingrediente.");
    }

    $sql = $conexao->prepare(
        "INSERT IGNORE INTO ingredientes (nome) VALUES (?)"
    );

    $sql->bind_param("s", $nome);
    $sql->execute();

    if ($sql->affected_rows > 0) {
        echo "Ingrediente cadastrado com sucesso!";
    } else {
        echo "Esse ingrediente já existe.";
    }
}

if ($acao == "excluir") {
    $id = (int)($_POST["id"] ?? 0);

    $sql = $conexao->prepare(
        "DELETE FROM ingredientes
         WHERE id = ?
         AND NOT EXISTS (
             SELECT 1 FROM receita_ingredientes
             WHERE ingrediente_id = ?
         )"
    );

    $sql->bind_param("ii", $id, $id);
    $sql->execute();

    if ($sql->affected_rows > 0) {
        echo "Ingrediente excluído com sucesso!";
    } else {
        echo "Não é possível excluir este ingrediente, pois ele está vinculado a uma ou mais receitas.";
    }
}
?>