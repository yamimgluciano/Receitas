<?php
session_start();
require_once("conecta.php");

if (!isset($_SESSION["tipo"]) || $_SESSION["tipo"] != "admin") {
    exit("Acesso negado.");
}

if (isset($_POST["excluir"])) {
    $id = filter_var($_POST["id"] ?? 0, FILTER_VALIDATE_INT);

    if ($id === false || $id <= 0) {
        exit("Receita inválida.");
    }

    $sql = "DELETE FROM receitas WHERE id = $id";

    if (mysqli_query($conexao, $sql)) {
        if (mysqli_affected_rows($conexao) > 0) {
            echo "Receita excluída com sucesso!";
        } else {
            echo "Nenhuma receita foi excluída.";
        }
    } else {
        echo "Erro ao excluir receita.";
    }
}
?>
