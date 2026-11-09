<?php
require_once("conecta.php");

$sql = "SELECT * FROM receitas ORDER BY id";
$resultado = $conexao->query($sql);

$receitas = [];

while ($linha = $resultado->fetch_assoc()) {
    $linha["tempo"] = $linha["tempo"] . "min";
    $linha["ingredientes"] = explode(",", $linha["ingredientes"]);
    $receitas[] = $linha;
}

header("Content-Type: application/json; charset=utf-8");
echo json_encode($receitas, JSON_UNESCAPED_UNICODE);
?>