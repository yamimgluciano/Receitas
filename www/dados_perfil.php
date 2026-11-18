<?php
session_start();
require_once("conecta.php");

header("Content-Type: application/json; charset=utf-8");

if (!isset($_SESSION["usuario_id"])) {
    echo json_encode(["erro" => "Usuário não está logado."]);
    exit;
}

$id = $_SESSION["usuario_id"];

$sql = $conexao->prepare("SELECT nome, email, tipo, sem_lactose, vegano, vegetariano, sem_gluten FROM usuarios WHERE id = ?");
$sql->bind_param("i", $id);
$sql->execute();

$resultado = $sql->get_result();

if ($resultado->num_rows == 1) {
    $usuario = $resultado->fetch_assoc();
    echo json_encode($usuario, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["erro" => "Usuário não encontrado."]);
}
?>
