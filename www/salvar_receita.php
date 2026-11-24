<?php
session_start();
require_once("conecta.php");
require_once("ingredientes_funcoes.php");

if (!isset($_SESSION["tipo"]) || $_SESSION["tipo"] != "admin") {
    exit("Acesso negado.");
}

if (isset($_POST["cadastrar"])) {
    $nome = trim($_POST["nome"] ?? "");
    $tempo = filter_var($_POST["tempo"] ?? 0, FILTER_VALIDATE_INT);
    $dificuldade = trim($_POST["dificuldade"] ?? "");
    $categoria = trim($_POST["categoria"] ?? "");
    $preparo = trim($_POST["preparo"] ?? "");

    $ingredientes = json_decode($_POST["ingredientes"] ?? "", true);

    $tempoCozimento = trim($_POST["tempo_cozimento"] ?? "");
    $temperatura = trim($_POST["temperatura"] ?? "");
    $equipamento = trim($_POST["equipamento"] ?? "");

    if ($nome == "" || !$tempo || $tempo <= 0 ||
        $dificuldade == "" || $categoria == "" ||
        empty($ingredientes) || !is_array($ingredientes) ||
        $preparo == "") {
        exit("Preencha todos os campos.");
    }

    if (($tempoCozimento != "" && !ctype_digit($tempoCozimento)) ||
        ($temperatura != "" && !ctype_digit($temperatura))) {
        exit("Informe valores numéricos.");
    }

    $lista = [];

    foreach ($ingredientes as $item) {
        if (empty(trim($item["nome"] ?? "")) ||
            empty(trim($item["quantidade"] ?? ""))) {
            exit("Preencha os ingredientes e as quantidades.");
        }

        $lista[] = trim($item["quantidade"] . " " . $item["nome"]);
    }

    $textoIngredientes = implode(", ", $lista);

    $tempoCozimento = $tempoCozimento === "" ? null : (int)$tempoCozimento;
    $temperatura = $temperatura === "" ? null : (int)$temperatura;
    $equipamento = $equipamento === "" ? null : $equipamento;

    $conexao->begin_transaction();

    try {
        $sql = $conexao->prepare(
            "INSERT INTO receitas
            (nome, descricao, ingredientes, preparo, tempo,
             categoria, imagem, dificuldade, emoji,
             tempo_cozimento, temperatura, equipamento)
            VALUES (?, '', ?, ?, ?, ?, '', ?, '🍽️', ?, ?, ?)"
        );

        $sql->bind_param(
            "sssissiis",
            $nome,
            $textoIngredientes,
            $preparo,
            $tempo,
            $categoria,
            $dificuldade,
            $tempoCozimento,
            $temperatura,
            $equipamento
        );

        $sql->execute();

        $receitaId = $conexao->insert_id;

        salvarIngredientes($conexao, $receitaId, $ingredientes);

        $conexao->commit();

        echo "Receita cadastrada com sucesso!";

    } catch (Exception $erro) {
        $conexao->rollback();
        echo "Erro ao cadastrar receita.";
    }
}
?>