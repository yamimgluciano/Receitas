-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Tempo de geração: 24/11/2026 às 19:23
-- Versão do servidor: 8.3.0
-- Versão do PHP: 8.3.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `prog_internet`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `avaliacoes`
--

CREATE TABLE `avaliacoes` (
  `id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `receita_id` int NOT NULL,
  `nota` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `avaliacoes`
--

INSERT INTO `avaliacoes` (`id`, `usuario_id`, `receita_id`, `nota`) VALUES
(2, 1, 4, 5),
(7, 4, 4, 5),
(8, 5, 4, 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `categorias`
--

CREATE TABLE `categorias` (
  `id` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `categorias`
--

INSERT INTO `categorias` (`id`, `nome`, `slug`) VALUES
(1, 'Café', 'cafe'),
(2, 'Almoço', 'almoco'),
(3, 'Janta', 'janta'),
(4, 'Lanche', 'lanche'),
(5, 'Sobremesa', 'sobremesa');

-- --------------------------------------------------------

--
-- Estrutura para tabela `favoritos`
--

CREATE TABLE `favoritos` (
  `id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `receita_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `favoritos`
--

INSERT INTO `favoritos` (`id`, `usuario_id`, `receita_id`) VALUES
(9, 1, 4),
(10, 4, 4),
(12, 5, 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `ingredientes`
--

CREATE TABLE `ingredientes` (
  `id` int NOT NULL,
  `nome` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `ingredientes`
--

INSERT INTO `ingredientes` (`id`, `nome`) VALUES
(23, 'Abobrinha'),
(10, 'Achocolatado'),
(11, 'Açúcar'),
(21, 'Água'),
(28, 'Alface'),
(5, 'Alho'),
(2, 'Arroz'),
(15, 'Aveia'),
(14, 'Banana'),
(22, 'Batata'),
(9, 'Cebola'),
(19, 'Cenoura'),
(18, 'Creme de leite'),
(20, 'Ervilha'),
(12, 'Farinha'),
(29, 'Fermento em pó'),
(4, 'Frango'),
(8, 'Leite'),
(30, 'Leite condensado'),
(3, 'Macarrão'),
(31, 'Manteiga'),
(17, 'Molho de tomate'),
(13, 'Óleo'),
(1, 'Ovo'),
(26, 'Pão de forma'),
(25, 'Polvilho doce'),
(6, 'Queijo'),
(27, 'Requeijão'),
(16, 'Sal'),
(32, 'Suco concentrado de maracujá'),
(24, 'Tapioca'),
(7, 'Tomate');

-- --------------------------------------------------------

--
-- Estrutura para tabela `receitas`
--

CREATE TABLE `receitas` (
  `id` int NOT NULL,
  `nome` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `descricao` text NOT NULL,
  `ingredientes` text NOT NULL,
  `preparo` text NOT NULL,
  `tempo` int NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `imagem` varchar(255) NOT NULL,
  `dificuldade` varchar(20) NOT NULL,
  `emoji` varchar(20) NOT NULL,
  `tempo_cozimento` int DEFAULT NULL,
  `temperatura` int DEFAULT NULL,
  `equipamento` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `receitas`
--

INSERT INTO `receitas` (`id`, `nome`, `descricao`, `ingredientes`, `preparo`, `tempo`, `categoria`, `imagem`, `dificuldade`, `emoji`, `tempo_cozimento`, `temperatura`, `equipamento`) VALUES
(4, 'Brownie de Caneca', '', '1 ovo,    3 colheres de açúcar,   3 colheres de  achocolatado,   1 colher de  farinha,    2 colheres de óleo', 'misture tudo', 20, 'sobremesa', '', 'Fácil', '🍽️', 20, 170, 'air fryer'),
(5, 'Panqueca de banana', 'Panqueca simples e rápida.', '2 colheres de sopa de Aveia, 1 Banana, 1 Ovo', 'Amasse a banana e misture com o ovo e a aveia. Cozinhe dos dois lados em fogo baixo.', 10, 'cafe', '', 'Fácil', '🥞', 5, NULL, 'Frigideira'),
(6, 'Omelete de queijo', 'Uma opção prática para o café da manhã.', '1 colher de chá de Óleo, 2 unidades de Ovo, 2 fatias de Queijo, 1 pitada de Sal', 'Bata os ovos com o sal. Coloque na frigideira untada, acrescente o queijo e cozinhe até firmar.', 10, 'cafe', '', 'Fácil', '🍳', 5, NULL, 'Frigideira'),
(7, 'Macarrão ao alho e óleo', 'Macarrão simples e econômico.', '2 litros de Água, 3 dentes de Alho, 200 g de Macarrão, 2 colheres de sopa de Óleo, 1 pitada de Sal', 'Cozinhe o macarrão em água com sal. Doure o alho no óleo e misture ao macarrão escorrido.', 20, 'almoco', '', 'Fácil', '🍝', 12, NULL, 'Fogão'),
(8, 'Estrogonofe de frango', 'Frango com molho cremoso.', '1/2 unidade de Cebola, 1 caixa de Creme de leite, 300 g de Frango, 3 colheres de sopa de Molho de tomate, 1 colher de sopa de Óleo, 1 pitada de Sal', 'Refogue a cebola e o frango no óleo até cozinhar completamente. Acrescente o molho de tomate, o sal e o creme de leite. Misture e aqueça.', 30, 'almoco', '', 'Fácil', '🍗', 20, NULL, 'Fogão'),
(9, 'Arroz com legumes', 'Arroz colorido e fácil de preparar.', '2 xícaras de Água, 1 dente de Alho, 1 xícara de Arroz, 1 unidade de Cenoura, 1/2 xícara de Ervilha, 1 colher de sopa de Óleo, 1 pitada de Sal', 'Refogue o alho e os legumes no óleo. Acrescente o arroz, a água e o sal. Cozinhe até a água secar.', 30, 'almoco', '', 'Fácil', '🍚', 20, NULL, 'Fogão'),
(10, 'Sopa de legumes', 'Sopa simples para dias frios.', '1 unidade de Abobrinha, 1 litro de Água, 2 unidades de Batata, 1/2 unidade de Cebola, 1 unidade de Cenoura, 1 colher de sopa de Óleo, 1 colher de chá de Sal', 'Corte os legumes. Refogue a cebola no óleo, adicione os legumes, a água e o sal. Cozinhe até ficarem macios.', 40, 'janta', '', 'Fácil', '🍲', 30, NULL, 'Fogão'),
(11, 'Crepioca', 'Uma refeição rápida e leve.', '1 Ovo, 2 fatias de Queijo, 1 pitada de Sal, 2 colheres de sopa de Tapioca', 'Misture o ovo com a tapioca e o sal. Coloque na frigideira, doure dos dois lados e recheie com queijo.', 10, 'janta', '', 'Fácil', '🥙', 5, NULL, 'Frigideira'),
(12, 'Pão de queijo de frigideira', 'Lanche rápido com queijo.', '1 colher de sopa de Leite, 1 Ovo, 2 colheres de sopa de Polvilho doce, 3 colheres de sopa de Queijo', 'Misture todos os ingredientes. Coloque em uma frigideira antiaderente e doure dos dois lados.', 10, 'lanche', '', 'Fácil', '🧀', 5, NULL, 'Frigideira'),
(13, 'Sanduíche natural', 'Sanduíche fresco e prático.', '2 folhas de Alface, 1/2 unidade de Cenoura, 2 fatias de Pão de forma, 2 colheres de sopa de Requeijão, 1/2 unidade de Tomate', 'Misture a cenoura ralada com o requeijão. Recheie o pão com a mistura, o tomate e a alface lavados.', 10, 'lanche', '', 'Fácil', '🥪', NULL, NULL, NULL),
(14, 'Bolo de banana', 'Bolo caseiro e econômico.', '1/2 xícara de Açúcar, 3 unidades de Banana, 1 e 1/2 xícara de Farinha, 1 colher de sopa de Fermento em pó, 1/4 de xícara de Óleo, 2 unidades de Ovo', 'Amasse as bananas e misture com os ovos, o açúcar e o óleo. Adicione a farinha e o fermento. Asse em forma untada.', 45, 'lanche', '', 'Fácil', '🍰', 30, 180, 'Forno'),
(15, 'Brigadeiro', 'Doce tradicional brasileiro.', '3 colheres de sopa de Achocolatado, 1 caixa de Leite condensado, 1 colher de sopa de Manteiga', 'Misture os ingredientes em uma panela. Cozinhe em fogo baixo, mexendo até desgrudar do fundo. Deixe esfriar.', 20, 'sobremesa', '', 'Fácil', '🍫', 12, NULL, 'Fogão'),
(16, 'Mousse de maracujá', 'Sobremesa cremosa e refrescante.', '1 caixa de Creme de leite, 1 caixa de Leite condensado, 200 ml de Suco concentrado de maracujá', 'Bata todos os ingredientes no liquidificador e leve à geladeira por pelo menos duas horas.', 130, 'sobremesa', '', 'Fácil', '🥭', NULL, NULL, 'Liquidificador');

-- --------------------------------------------------------

--
-- Estrutura para tabela `receita_ingredientes`
--

CREATE TABLE `receita_ingredientes` (
  `id` int NOT NULL,
  `receita_id` int NOT NULL,
  `ingrediente_id` int NOT NULL,
  `quantidade` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `receita_ingredientes`
--

INSERT INTO `receita_ingredientes` (`id`, `receita_id`, `ingrediente_id`, `quantidade`) VALUES
(1, 4, 10, '3 colheres de'),
(2, 4, 11, '3 colheres de'),
(3, 4, 12, '1 colher de'),
(4, 4, 13, '2 colheres de'),
(5, 4, 1, '1'),
(8, 5, 15, '2 colheres de sopa de'),
(9, 5, 14, '1'),
(10, 5, 1, '1'),
(11, 6, 13, '1 colher de chá de'),
(12, 6, 1, '2 unidades de'),
(13, 6, 6, '2 fatias de'),
(14, 6, 16, '1 pitada de'),
(15, 7, 21, '2 litros de'),
(16, 7, 5, '3 dentes de'),
(17, 7, 3, '200 g de'),
(18, 7, 13, '2 colheres de sopa de'),
(19, 7, 16, '1 pitada de'),
(20, 8, 9, '1/2 unidade de'),
(21, 8, 18, '1 caixa de'),
(22, 8, 4, '300 g de'),
(23, 8, 17, '3 colheres de sopa de'),
(24, 8, 13, '1 colher de sopa de'),
(25, 8, 16, '1 pitada de'),
(26, 9, 21, '2 xícaras de'),
(27, 9, 5, '1 dente de'),
(28, 9, 2, '1 xícara de'),
(29, 9, 19, '1 unidade de'),
(30, 9, 20, '1/2 xícara de'),
(31, 9, 13, '1 colher de sopa de'),
(32, 9, 16, '1 pitada de'),
(33, 10, 23, '1 unidade de'),
(34, 10, 21, '1 litro de'),
(35, 10, 22, '2 unidades de'),
(36, 10, 9, '1/2 unidade de'),
(37, 10, 19, '1 unidade de'),
(38, 10, 13, '1 colher de sopa de'),
(39, 10, 16, '1 colher de chá de'),
(40, 11, 1, '1'),
(41, 11, 6, '2 fatias de'),
(42, 11, 16, '1 pitada de'),
(43, 11, 24, '2 colheres de sopa de'),
(44, 12, 8, '1 colher de sopa de'),
(45, 12, 1, '1'),
(46, 12, 25, '2 colheres de sopa de'),
(47, 12, 6, '3 colheres de sopa de'),
(48, 13, 28, '2 folhas de'),
(49, 13, 19, '1/2 unidade de'),
(50, 13, 26, '2 fatias de'),
(51, 13, 27, '2 colheres de sopa de'),
(52, 13, 7, '1/2 unidade de'),
(53, 14, 11, '1/2 xícara de'),
(54, 14, 14, '3 unidades de'),
(55, 14, 12, '1 e 1/2 xícara de'),
(56, 14, 29, '1 colher de sopa de'),
(57, 14, 13, '1/4 de xícara de'),
(58, 14, 1, '2 unidades de'),
(59, 15, 10, '3 colheres de sopa de'),
(60, 15, 30, '1 caixa de'),
(61, 15, 31, '1 colher de sopa de'),
(62, 16, 18, '1 caixa de'),
(63, 16, 30, '1 caixa de'),
(64, 16, 32, '200 ml de');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `sem_lactose` tinyint(1) NOT NULL DEFAULT '0',
  `vegano` tinyint(1) NOT NULL DEFAULT '0',
  `vegetariano` tinyint(1) NOT NULL DEFAULT '0',
  `sem_gluten` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`, `tipo`, `sem_lactose`, `vegano`, `vegetariano`, `sem_gluten`) VALUES
(1, 'yasmim', 'yasmimluciano01@gmail.com', '$2y$10$.7SW0Jq.9n7xPBoQLX.sPeQ/shsrivzUFiGOxC3IhM/TUwc8AJ17i', 'admin', 0, 0, 0, 0),
(2, 'Ana Carolina', 'anacarol@gmail.com', '$2y$10$GSUTd4IPttI8/l/Rq78OdODPtKzpC1RgFObZETg9JardrgJs0LDjC', 'usuario', 0, 1, 0, 0),
(4, 'Giovanna', 'gih@gmail.com', '$2y$10$TV86ImHLq5qKYMwcNolE3OW03GsYguH0w0mzMUuZjJ0Vhfc2PMrdy', 'usuario', 0, 0, 0, 0),
(5, 'Patricia', 'pgomes@gmail.com', '$2y$10$wWWN.sqYLvfNqdcLPNobb.sQAC1wLcBRZZG1YBctcAF/7Y7IPKLOi', 'usuario', 0, 0, 1, 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `avaliacoes`
--
ALTER TABLE `avaliacoes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `avaliacao_unica` (`usuario_id`,`receita_id`),
  ADD KEY `receita_id` (`receita_id`);

--
-- Índices de tabela `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Índices de tabela `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `favorito_unico` (`usuario_id`,`receita_id`),
  ADD KEY `receita_id` (`receita_id`);

--
-- Índices de tabela `ingredientes`
--
ALTER TABLE `ingredientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome` (`nome`);

--
-- Índices de tabela `receitas`
--
ALTER TABLE `receitas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `receita_ingredientes`
--
ALTER TABLE `receita_ingredientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `receita_id` (`receita_id`,`ingrediente_id`),
  ADD KEY `ingrediente_id` (`ingrediente_id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `avaliacoes`
--
ALTER TABLE `avaliacoes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `ingredientes`
--
ALTER TABLE `ingredientes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de tabela `receitas`
--
ALTER TABLE `receitas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `receita_ingredientes`
--
ALTER TABLE `receita_ingredientes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `avaliacoes`
--
ALTER TABLE `avaliacoes`
  ADD CONSTRAINT `avaliacoes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `avaliacoes_ibfk_2` FOREIGN KEY (`receita_id`) REFERENCES `receitas` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`receita_id`) REFERENCES `receitas` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `receita_ingredientes`
--
ALTER TABLE `receita_ingredientes`
  ADD CONSTRAINT `receita_ingredientes_ibfk_1` FOREIGN KEY (`receita_id`) REFERENCES `receitas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `receita_ingredientes_ibfk_2` FOREIGN KEY (`ingrediente_id`) REFERENCES `ingredientes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
