<?php

function salvarIngredientes($conexao, $receitaId, $ingredientes) {
    $stmt = $conexao->prepare(
        "DELETE FROM receita_ingredientes WHERE receita_id = ?"
    );
    $stmt->bind_param("i", $receitaId);
    $stmt->execute();

    foreach ($ingredientes as $item) {
        $nome = trim($item["nome"]);
        $quantidade = trim($item["quantidade"]);

        $stmt = $conexao->prepare(
            "INSERT INTO ingredientes (nome) VALUES (?)
             ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)"
        );
        $stmt->bind_param("s", $nome);
        $stmt->execute();

        $ingredienteId = $conexao->insert_id;

        $stmt = $conexao->prepare(
            "INSERT INTO receita_ingredientes
             (receita_id, ingrediente_id, quantidade)
             VALUES (?, ?, ?)"
        );

        $stmt->bind_param(
            "iis", $receitaId, $ingredienteId, $quantidade
        );

        $stmt->execute();
    }
}
?>
