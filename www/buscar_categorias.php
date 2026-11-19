<?php
require_once("conecta.php");

header("Content-Type: application/json; charset=utf-8");

$sql = "SELECT id, nome, slug FROM categorias ORDER BY id";
$resultado = mysqli_query($conexao, $sql);

$categorias = [];

if ($resultado) {
    while ($categoria = mysqli_fetch_assoc($resultado)) {
        $categorias[] = $categoria;
    }
}

echo json_encode($categorias, JSON_UNESCAPED_UNICODE);
?>
