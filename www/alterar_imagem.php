<?php
session_start();

require_once("conecta.php");
require_once("upload_imagem.php");

if (!isset($_SESSION["tipo"]) || $_SESSION["tipo"] != "admin") {
    exit("Acesso negado.");
}

$id = (int)($_POST["id"] ?? 0);

if ($id <= 0) {
    exit("Receita inválida.");
}

try {
    $imagem = uploadImagem();

    if ($imagem === null) {
        exit("Selecione uma imagem.");
    }

    $sql = $conexao->prepare(
        "UPDATE receitas SET imagem = ? WHERE id = ?"
    );

    $sql->bind_param("si", $imagem, $id);
    $sql->execute();

    if ($sql->affected_rows > 0) {
        echo "Foto atualizada com sucesso!";
    } else {
        echo "Receita não encontrada.";
    }

} catch (Exception $erro) {
    echo "Erro ao atualizar a foto.";
}
?>