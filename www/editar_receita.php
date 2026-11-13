
<?php
session_start();
require_once("conecta.php");

if (!isset($_SESSION["tipo"]) || $_SESSION["tipo"] != "admin") {
    exit("Acesso negado.");
}

if (isset($_POST["editar"])) {
    $id = filter_var($_POST["id"] ?? 0, FILTER_VALIDATE_INT);
    $nome = trim($_POST["nome"] ?? "");
    $tempo = filter_var($_POST["tempo"] ?? 0, FILTER_VALIDATE_INT);
    $dificuldade = trim($_POST["dificuldade"] ?? "");
    $categoria = trim($_POST["categoria"] ?? "");
    $ingredientes = trim($_POST["ingredientes"] ?? "");
    $preparo = trim($_POST["preparo"] ?? "");

    if ($id === false || $id <= 0 || $nome == "" ||
        $tempo === false || $tempo <= 0 ||
        $dificuldade == "" || $categoria == "" ||
        $ingredientes == "" || $preparo == "") {
        exit("Preencha todos os campos corretamente.");
    }

    $nome = mysqli_real_escape_string($conexao, $nome);
    $dificuldade = mysqli_real_escape_string($conexao, $dificuldade);
    $categoria = mysqli_real_escape_string($conexao, $categoria);
    $ingredientes = mysqli_real_escape_string($conexao, $ingredientes);
    $preparo = mysqli_real_escape_string($conexao, $preparo);

    $sql = "UPDATE receitas SET
            nome = '$nome',
            tempo = $tempo,
            dificuldade = '$dificuldade',
            categoria = '$categoria',
            ingredientes = '$ingredientes',
            preparo = '$preparo'
            WHERE id = $id";

    if (mysqli_query($conexao, $sql)) {
        echo "Receita atualizada com sucesso!";
    } else {
        echo "Erro ao atualizar receita.";
    }
}
?>