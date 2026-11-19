<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require_once("conecta.php");

if (!isset($_SESSION["tipo"]) || $_SESSION["tipo"] != "admin") {
    exit("Acesso negado.");
}

if (isset($_POST["cadastrar"])) {
    $nome = trim($_POST["nome"] ?? "");
    $tempo = filter_var($_POST["tempo"] ?? 0, FILTER_VALIDATE_INT);
    $dificuldade = $_POST["dificuldade"] ?? "";
    $categoria = $_POST["categoria"] ?? "";
    $ingredientes = trim($_POST["ingredientes"] ?? "");
    $preparo = trim($_POST["preparo"] ?? "");

    $tempoCozimento = trim($_POST["tempo_cozimento"] ?? "");
    $temperatura = trim($_POST["temperatura"] ?? "");
    $equipamento = trim($_POST["equipamento"] ?? "");

    if ($nome == "" || $tempo === false || $tempo <= 0 ||
        $dificuldade == "" || $categoria == "" ||
        $ingredientes == "" || $preparo == "") {
        exit("Preencha todos os campos.");
    }

    if (($tempoCozimento != "" && (!ctype_digit($tempoCozimento))) ||
        ($temperatura != "" && (!ctype_digit($temperatura)))) {
        exit("Tempo de cozimento e temperatura devem ser números.");
    }

    $nome = mysqli_real_escape_string($conexao, $nome);
    $dificuldade = mysqli_real_escape_string($conexao, $dificuldade);
    $categoria = mysqli_real_escape_string($conexao, $categoria);
    $ingredientes = mysqli_real_escape_string($conexao, $ingredientes);
    $preparo = mysqli_real_escape_string($conexao, $preparo);
    $equipamento = mysqli_real_escape_string($conexao, $equipamento);

    $tempoCozimento = $tempoCozimento === "" ? "NULL" : (int)$tempoCozimento;
    $temperatura = $temperatura === "" ? "NULL" : (int)$temperatura;
    $equipamento = $equipamento === "" ? "NULL" : "'$equipamento'";

    $sql = "INSERT INTO receitas
            (nome, descricao, ingredientes, preparo, tempo, categoria, imagem, dificuldade, emoji,
             tempo_cozimento, temperatura, equipamento)
            VALUES ('$nome', '', '$ingredientes', '$preparo', $tempo, '$categoria', '', '$dificuldade', '🍽️',
                    $tempoCozimento, $temperatura, $equipamento)";

    if (mysqli_query($conexao, $sql)) {
        echo "Receita cadastrada com sucesso!";
    } else {
        echo "Erro ao cadastrar receita.";
    }
}
?>
