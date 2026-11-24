<?php
$host = "mysql";
$banco = "prog_internet";
$usuario = "root";
$senha = "1234";

$conexao = new mysqli($host, $usuario, $senha, $banco);

if ($conexao->connect_error) {
    die("Erro ao conectar ao banco de dados.");
}

$conexao->set_charset("utf8mb4");
?>