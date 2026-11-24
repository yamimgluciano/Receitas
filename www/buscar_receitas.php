<?php
require_once("conecta.php");

$sql = "SELECT * FROM receitas ORDER BY id";
$resultado = $conexao->query($sql);

$receitas = [];

while ($linha = $resultado->fetch_assoc()) {
    $id = (int)$linha["id"];

    $sqlIngredientes = "SELECT i.id, i.nome, ri.quantidade
                        FROM receita_ingredientes ri
                        INNER JOIN ingredientes i
                        ON ri.ingrediente_id = i.id
                        WHERE ri.receita_id = $id
                        ORDER BY ri.id";

    $resultadoIngredientes = $conexao->query($sqlIngredientes);

    $ingredientes = [];
    $ingredientesDetalhados = [];

    while ($item = $resultadoIngredientes->fetch_assoc()) {
        $ingredientes[] = trim($item["quantidade"] . " " . $item["nome"]);
        $ingredientesDetalhados[] = $item;
    }

    $linha["tempo"] = $linha["tempo"] . "min";

    $linha["ingredientes"] = count($ingredientes) > 0
        ? $ingredientes
        : explode(",", $linha["ingredientes"]);

    $linha["ingredientes_detalhados"] = $ingredientesDetalhados;

    $receitas[] = $linha;
}

header("Content-Type: application/json; charset=utf-8");
echo json_encode($receitas, JSON_UNESCAPED_UNICODE);
?>