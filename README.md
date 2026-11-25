# Receitas em Casa

Sistema web desenvolvido na disciplina de Projeto Integrador II, voltado principalmente para jovens e estudantes que moram sozinhos. O sistema permite consultar receitas, filtrar por categorias e encontrar sugestões de refeições com os ingredientes disponíveis em casa.

## Tecnologias

HTML, CSS, JavaScript, PHP, MySQL, Docker e phpMyAdmin.

## Funcionalidades

**Usuário**

- Cadastro, login e logout
- Busca e filtragem de receitas
- Sugestões de receitas a partir dos ingredientes disponíveis
- Consulta de ingredientes, modo de preparo e tempo de cozimento
- Receitas favoritas
- Avaliação de receitas

**Administrador (acesso restrito)**

- Painel administrativo
- Cadastro, edição e exclusão de receitas
- Gerenciamento de categorias e ingredientes
- Upload e alteração de fotos das receitas

## Como executar

Requisito: ter o [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e em execução.

```bash
git clone https://github.com/yamimgluciano/Receitas.git
cd Receitas
docker compose up -d
```

| Serviço | Endereço |
|---|---|
| Site | http://localhost:8080 |
| phpMyAdmin | http://localhost:8081 |

**Arquivo inicial:** `www/index.html`

Após importar o banco de dados, acesse a página inicial do sistema em http://localhost:8080.

No phpMyAdmin, selecione o banco `prog_internet` e importe o arquivo `prog_internet.sql`.

Para encerrar os serviços:

```bash
docker compose down
```

## Estrutura

- `www/`: arquivos do sistema
- `www/imagens/receitas/`: fotos das receitas
- `docker-compose.yml`: configuração do ambiente
- `prog_internet.sql`: estrutura e dados do banco de dados

## Imagens das receitas

- A inclusão de fotos é opcional.
- As fotos podem ser adicionadas ou alteradas pelo botão da câmera.
- Formatos aceitos: JPG, JPEG, PNG e WEBP.
- Limite de tamanho definido no código: 5 MB por imagem.
- Receitas sem foto exibem um emoji.

## Observações

- As imagens são armazenadas em arquivos e seus caminhos são registrados no banco de dados.
  
## Acesso administrativo

Credenciais para teste do sistema:

- E-mail: yasmimluciano01@gmail.com
- Senha: 4848

As credenciais são destinadas apenas ao ambiente de desenvolvimento e avaliação do projeto.
**Desenvolvido por Yasmim Gomes Luciano — Projeto Integrador II — IFRS — Info-4 — 2026.**
