# Receitas em Casa

## Sobre o projeto

O Receitas em Casa é um sistema web desenvolvido para a disciplina de Projeto Integrador II. A ideia surgiu da necessidade de facilitar a rotina de jovens e estudantes que moram sozinhos, ajudando na escolha de receitas simples e no aproveitamento dos ingredientes que já possuem em casa.

## Funcionalidades

- Cadastro e login de usuários;
- Busca e filtragem de receitas;
- Sugestões de receitas com os ingredientes disponíveis em casa;
- Consulta de ingredientes e modo de preparo;
- Favoritos e avaliações;
- Painel administrativo;
- Cadastro, edição e exclusão de receitas;
- Gerenciamento de categorias e ingredientes;
- Upload e alteração de fotos das receitas.

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- PHP
- MySQL
- Docker
- phpMyAdmin
- Git e GitHub

## Como executar o projeto

1. Baixe ou clone o repositório.
2. Abra a pasta do projeto no VS Code.
3. Inicie o Docker.
4. Execute no terminal:

   ```bash
   docker compose up -d
   ```

5. Acesse o phpMyAdmin em http://localhost:8081.
6. Selecione o banco `prog_internet` e importe o arquivo `prog_internet.sql`.
7. Acesse o site em http://localhost:8080.

## Acesso administrativo

O sistema possui dois tipos de usuários: usuário comum e administrador.

O login e a senha do administrador serão encaminhados separadamente ao professor.

## Banco de dados

O arquivo `prog_internet.sql` contém a estrutura e os dados necessários para o funcionamento do sistema.

As fotos das receitas ficam na pasta `www/imagens/receitas` e seus caminhos são armazenados no banco de dados.

## Informações acadêmicas

Instituição: IFRS

Disciplina: Projeto Integrador II

Turma: Info-4

Ano: 2026
