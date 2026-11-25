<?php

function uploadImagem() {
    if (!isset($_FILES["imagem"]) ||
        $_FILES["imagem"]["error"] == UPLOAD_ERR_NO_FILE) {
        return null;
    }

    $arquivo = $_FILES["imagem"];

    if ($arquivo["error"] != UPLOAD_ERR_OK) {
        throw new Exception("Erro no envio da imagem.");
    }

    if ($arquivo["size"] > 5 * 1024 * 1024) {
        throw new Exception("A imagem deve ter até 5 MB.");
    }

    $tipos = [
        "image/jpeg" => "jpg",
        "image/png" => "png",
        "image/webp" => "webp"
    ];

    $tipo = mime_content_type($arquivo["tmp_name"]);

    if (!isset($tipos[$tipo])) {
        throw new Exception("Formato de imagem inválido.");
    }

    $nome = uniqid("receita_") . "." . $tipos[$tipo];

    $caminho = "imagens/receitas/" . $nome;

    if (!move_uploaded_file(
        $arquivo["tmp_name"],
        __DIR__ . "/" . $caminho
    )) {
        throw new Exception("Erro ao salvar a imagem.");
    }

    return $caminho;
}
?>