<?php session_start(); if (!isset($_SESSION["usuario_id"])) { header("Location: login.html"); exit; } ?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Perfil — Receitas em Casa</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

  <div class="card">
    <a href="index.html" class="voltar" style="display: block; margin-bottom: 12px;">← Voltar</a>

    <h1 id="nomePerfil">👤 Carregando...</h1>
<p class="subtitle" id="emailPerfil"></p>

    <button type="button" id="btnEditarPerfil">Editar perfil</button>

    <h3 style="font-family: 'Fraunces', serif; font-size: 16px; margin: 24px 0 10px; text-align: left;">Alterar restrições</h3>
    <div class="checkboxes">
  <label><input type="checkbox" id="semLactose"> Sem lactose</label>
  <label><input type="checkbox" id="vegano"> Vegano</label>
  <label><input type="checkbox" id="vegetariano"> Vegetariano</label>
  <label><input type="checkbox" id="semGluten"> Sem glúten</label>
</div>

    <a href="favoritos.html" class="link" style="display: block; margin-bottom: 10px;">Ver favoritos</a>
    <button type="button" id="btnSair" style="background: none; border: none; color: #A8402A; padding: 0; font-size: 14px; cursor: pointer;">Sair da conta</button>
  </div>

  <script src="js/favoritos-helper.js?v=99"></script>
  <script src="js/perfil.js?v=99"></script>

</body>
</html>
