<?php
session_start();
require_once("conecta.php");
require_once("ingredientes_funcoes.php");
require_once("upload_imagem.php");

if (!isset($_SESSION["tipo"]) || $_SESSION["tipo"] != "admin") {
    exit("Acesso negado.");
}

if (isset($_POST["editar"])) {
    $id = filter_var($_POST["id"] ?? 0, FILTER_VALIDATE_INT);
    $nome = trim($_POST["nome"] ?? "");
    $tempo = filter_var($_POST["tempo"] ?? 0, FILTER_VALIDATE_INT);
    $dificuldade = trim($_POST["dificuldade"] ?? "");
    $categoria = trim($_POST["categoria"] ?? "");
    $preparo = trim($_POST["preparo"] ?? "");

    $ingredientes = json_decode($_POST["ingredientes"] ?? "", true);

    $tempoCozimento = trim($_POST["tempo_cozimento"] ?? "");
    $temperatura = trim($_POST["temperatura"] ?? "");
    $equipamento = trim($_POST["equipamento"] ?? "");

    if (!$id || $id <= 0 || $nome == "" ||
        !$tempo || $tempo <= 0 ||
        $dificuldade == "" || $categoria == "" ||
        empty($ingredientes) || !is_array($ingredientes) ||
        $preparo == "") {
        exit("Preencha todos os campos corretamente.");
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
        $imagem = uploadImagem();
        $sql = $conexao->prepare(
            "UPDATE receitas SET
                nome = ?,
                tempo = ?,
                dificuldade = ?,
                categoria = ?,
                ingredientes = ?,
                preparo = ?,
                tempo_cozimento = ?,
                temperatura = ?,
                equipamento = ?,
                imagem = COALESCE(?, imagem)
            WHERE id = ?"
        );

        $sql->bind_param(
    "sissssiissi",
    $nome,
    $tempo,
    $dificuldade,
    $categoria,
    $textoIngredientes,
    $preparo,
    $tempoCozimento,
    $temperatura,
    $equipamento,
    $imagem,
    $id
);

        $sql->execute();

        salvarIngredientes($conexao, $id, $ingredientes);

        $conexao->commit();

        echo "Receita atualizada com sucesso!";

    } catch (Exception $erro) {
        $conexao->rollback();
        echo "Erro ao atualizar receita.";
    }
}
?>