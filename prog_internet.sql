-- MySQL dump 10.13  Distrib 8.3.0, for Linux (x86_64)
--
-- Host: localhost    Database: prog_internet
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `avaliacoes`
--

DROP TABLE IF EXISTS `avaliacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `receita_id` int NOT NULL,
  `nota` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `avaliacao_unica` (`usuario_id`,`receita_id`),
  KEY `receita_id` (`receita_id`),
  CONSTRAINT `avaliacoes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `avaliacoes_ibfk_2` FOREIGN KEY (`receita_id`) REFERENCES `receitas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `favoritos`
--

DROP TABLE IF EXISTS `favoritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favoritos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `receita_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `favorito_unico` (`usuario_id`,`receita_id`),
  KEY `receita_id` (`receita_id`),
  CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`receita_id`) REFERENCES `receitas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ingredientes`
--

DROP TABLE IF EXISTS `ingredientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `receita_ingredientes`
--

DROP TABLE IF EXISTS `receita_ingredientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receita_ingredientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `receita_id` int NOT NULL,
  `ingrediente_id` int NOT NULL,
  `quantidade` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `receita_id` (`receita_id`,`ingrediente_id`),
  KEY `ingrediente_id` (`ingrediente_id`),
  CONSTRAINT `receita_ingredientes_ibfk_1` FOREIGN KEY (`receita_id`) REFERENCES `receitas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `receita_ingredientes_ibfk_2` FOREIGN KEY (`ingrediente_id`) REFERENCES `ingredientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `receitas`
--

DROP TABLE IF EXISTS `receitas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receitas` (
  `id` int NOT NULL AUTO_INCREMENT,
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
  `equipamento` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `sem_lactose` tinyint(1) NOT NULL DEFAULT '0',
  `vegano` tinyint(1) NOT NULL DEFAULT '0',
  `vegetariano` tinyint(1) NOT NULL DEFAULT '0',
  `sem_gluten` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-25  0:30:25
-- MySQL dump 10.13  Distrib 8.3.0, for Linux (x86_64)
--
-- Host: localhost    Database: prog_internet
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Café','cafe'),(2,'Almoço','almoco'),(3,'Janta','janta'),(4,'Lanche','lanche'),(5,'Sobremesa','sobremesa');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ingredientes`
--

LOCK TABLES `ingredientes` WRITE;
/*!40000 ALTER TABLE `ingredientes` DISABLE KEYS */;
INSERT INTO `ingredientes` VALUES (23,'Abobrinha'),(10,'Achocolatado'),(11,'Açúcar'),(21,'Água'),(28,'Alface'),(5,'Alho'),(2,'Arroz'),(15,'Aveia'),(14,'Banana'),(22,'Batata'),(9,'Cebola'),(19,'Cenoura'),(18,'Creme de leite'),(20,'Ervilha'),(12,'Farinha'),(29,'Fermento em pó'),(4,'Frango'),(8,'Leite'),(30,'Leite condensado'),(3,'Macarrão'),(31,'Manteiga'),(17,'Molho de tomate'),(13,'Óleo'),(1,'Ovo'),(26,'Pão de forma'),(25,'Polvilho doce'),(6,'Queijo'),(27,'Requeijão'),(16,'Sal'),(32,'Suco concentrado de maracujá'),(24,'Tapioca'),(7,'Tomate');
/*!40000 ALTER TABLE `ingredientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `receitas`
--

LOCK TABLES `receitas` WRITE;
/*!40000 ALTER TABLE `receitas` DISABLE KEYS */;
INSERT INTO `receitas` VALUES (4,'Brownie de Caneca','','1 ovo,    3 colheres de açúcar,   3 colheres de  achocolatado,   1 colher de  farinha,    2 colheres de óleo','misture tudo',20,'sobremesa','imagens/receitas/receita_6b0624dbc6236.jpg','Fácil','🍽️',20,170,'air fryer'),(5,'Panqueca de banana','Panqueca simples e rápida.','2 colheres de sopa de Aveia, 1 Banana, 1 Ovo','Amasse a banana e misture com o ovo e a aveia. Cozinhe dos dois lados em fogo baixo.',10,'cafe','imagens/receitas/receita_6b061a816f221.webp','Fácil','🥞',5,NULL,'Frigideira'),(6,'Omelete de queijo','Uma opção prática para o café da manhã.','1 colher de chá de Óleo, 2 unidades de Ovo, 2 fatias de Queijo, 1 pitada de Sal','Bata os ovos com o sal. Coloque na frigideira untada, acrescente o queijo e cozinhe até firmar.',10,'cafe','imagens/receitas/receita_6b061face1785.jpg','Fácil','🍳',5,NULL,'Frigideira'),(7,'Macarrão ao alho e óleo','Macarrão simples e econômico.','2 litros de Água, 3 dentes de Alho, 200 g de Macarrão, 2 colheres de sopa de Óleo, 1 pitada de Sal','Cozinhe o macarrão em água com sal. Doure o alho no óleo e misture ao macarrão escorrido.',20,'almoco','imagens/receitas/receita_6b06200fba6fa.webp','Fácil','🍝',12,NULL,'Fogão'),(8,'Estrogonofe de frango','Frango com molho cremoso.','1/2 unidade de Cebola, 1 caixa de Creme de leite, 300 g de Frango, 3 colheres de sopa de Molho de tomate, 1 colher de sopa de Óleo, 1 pitada de Sal','Refogue a cebola e o frango no óleo até cozinhar completamente. Acrescente o molho de tomate, o sal e o creme de leite. Misture e aqueça.',30,'almoco','imagens/receitas/receita_6b0620a405eb8.webp','Fácil','🍗',20,NULL,'Fogão'),(9,'Arroz com legumes','Arroz colorido e fácil de preparar.','2 xícaras de Água, 1 dente de Alho, 1 xícara de Arroz, 1 unidade de Cenoura, 1/2 xícara de Ervilha, 1 colher de sopa de Óleo, 1 pitada de Sal','Refogue o alho e os legumes no óleo. Acrescente o arroz, a água e o sal. Cozinhe até a água secar.',30,'almoco','imagens/receitas/receita_6b0620e6e1e98.webp','Fácil','🍚',20,NULL,'Fogão'),(10,'Sopa de legumes','Sopa simples para dias frios.','1 unidade de Abobrinha, 1 litro de Água, 2 unidades de Batata, 1/2 unidade de Cebola, 1 unidade de Cenoura, 1 colher de sopa de Óleo, 1 colher de chá de Sal','Corte os legumes. Refogue a cebola no óleo, adicione os legumes, a água e o sal. Cozinhe até ficarem macios.',40,'janta','imagens/receitas/receita_6b062114ddde4.webp','Fácil','🍲',30,NULL,'Fogão'),(11,'Crepioca','Uma refeição rápida e leve.','1 Ovo, 2 fatias de Queijo, 1 pitada de Sal, 2 colheres de sopa de Tapioca','Misture o ovo com a tapioca e o sal. Coloque na frigideira, doure dos dois lados e recheie com queijo.',10,'janta','imagens/receitas/receita_6b062146a212e.jpg','Fácil','🥙',5,NULL,'Frigideira'),(12,'Pão de queijo de frigideira','Lanche rápido com queijo.','1 colher de sopa de Leite, 1 Ovo, 2 colheres de sopa de Polvilho doce, 3 colheres de sopa de Queijo','Misture todos os ingredientes. Coloque em uma frigideira antiaderente e doure dos dois lados.',10,'lanche','imagens/receitas/receita_6b0621835cc53.webp','Fácil','🧀',5,NULL,'Frigideira'),(13,'Sanduíche natural','Sanduíche fresco e prático.','2 folhas de Alface, 1/2 unidade de Cenoura, 2 fatias de Pão de forma, 2 colheres de sopa de Requeijão, 1/2 unidade de Tomate','Misture a cenoura ralada com o requeijão. Recheie o pão com a mistura, o tomate e a alface lavados.',10,'lanche','imagens/receitas/receita_6b0621c9e520a.webp','Fácil','🥪',NULL,NULL,NULL),(14,'Bolo de banana','Bolo caseiro e econômico.','1/2 xícara de Açúcar, 3 unidades de Banana, 1 e 1/2 xícara de Farinha, 1 colher de sopa de Fermento em pó, 1/4 de xícara de Óleo, 2 unidades de Ovo','Amasse as bananas e misture com os ovos, o açúcar e o óleo. Adicione a farinha e o fermento. Asse em forma untada.',45,'lanche','imagens/receitas/receita_6b062222e35e0.jpg','Fácil','🍰',30,180,'Forno'),(15,'Brigadeiro','Doce tradicional brasileiro.','3 colheres de sopa de Achocolatado, 1 caixa de Leite condensado, 1 colher de sopa de Manteiga','Misture os ingredientes em uma panela. Cozinhe em fogo baixo, mexendo até desgrudar do fundo. Deixe esfriar.',20,'sobremesa','imagens/receitas/receita_6b0622b062313.webp','Fácil','🍫',12,NULL,'Fogão'),(16,'Mousse de maracujá','Sobremesa cremosa e refrescante.','1 caixa de Creme de leite, 1 caixa de Leite condensado, 200 ml de Suco concentrado de maracujá','Bata todos os ingredientes no liquidificador e leve à geladeira por pelo menos duas horas.',130,'sobremesa','imagens/receitas/receita_6b06232672425.webp','Fácil','🥭',NULL,NULL,'Liquidificador');
/*!40000 ALTER TABLE `receitas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `receita_ingredientes`
--

LOCK TABLES `receita_ingredientes` WRITE;
/*!40000 ALTER TABLE `receita_ingredientes` DISABLE KEYS */;
INSERT INTO `receita_ingredientes` VALUES (1,4,10,'3 colheres de'),(2,4,11,'3 colheres de'),(3,4,12,'1 colher de'),(4,4,13,'2 colheres de'),(5,4,1,'1'),(11,6,13,'1 colher de chá de'),(12,6,1,'2 unidades de'),(13,6,6,'2 fatias de'),(14,6,16,'1 pitada de'),(15,7,21,'2 litros de'),(16,7,5,'3 dentes de'),(17,7,3,'200 g de'),(18,7,13,'2 colheres de sopa de'),(19,7,16,'1 pitada de'),(20,8,9,'1/2 unidade de'),(21,8,18,'1 caixa de'),(22,8,4,'300 g de'),(23,8,17,'3 colheres de sopa de'),(24,8,13,'1 colher de sopa de'),(25,8,16,'1 pitada de'),(26,9,21,'2 xícaras de'),(27,9,5,'1 dente de'),(28,9,2,'1 xícara de'),(29,9,19,'1 unidade de'),(30,9,20,'1/2 xícara de'),(31,9,13,'1 colher de sopa de'),(32,9,16,'1 pitada de'),(33,10,23,'1 unidade de'),(34,10,21,'1 litro de'),(35,10,22,'2 unidades de'),(36,10,9,'1/2 unidade de'),(37,10,19,'1 unidade de'),(38,10,13,'1 colher de sopa de'),(39,10,16,'1 colher de chá de'),(40,11,1,'1'),(41,11,6,'2 fatias de'),(42,11,16,'1 pitada de'),(43,11,24,'2 colheres de sopa de'),(44,12,8,'1 colher de sopa de'),(45,12,1,'1'),(46,12,25,'2 colheres de sopa de'),(47,12,6,'3 colheres de sopa de'),(48,13,28,'2 folhas de'),(49,13,19,'1/2 unidade de'),(50,13,26,'2 fatias de'),(51,13,27,'2 colheres de sopa de'),(52,13,7,'1/2 unidade de'),(53,14,11,'1/2 xícara de'),(54,14,14,'3 unidades de'),(55,14,12,'1 e 1/2 xícara de'),(56,14,29,'1 colher de sopa de'),(57,14,13,'1/4 de xícara de'),(58,14,1,'2 unidades de'),(59,15,10,'3 colheres de sopa de'),(60,15,30,'1 caixa de'),(61,15,31,'1 colher de sopa de'),(62,16,18,'1 caixa de'),(63,16,30,'1 caixa de'),(64,16,32,'200 ml de'),(71,5,15,'2 colheres de sopa de'),(72,5,14,'1'),(73,5,1,'1');
/*!40000 ALTER TABLE `receita_ingredientes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-25  0:30:25
-- MySQL dump 10.13  Distrib 8.3.0, for Linux (x86_64)
--
-- Host: localhost    Database: prog_internet
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `usuarios`
--
-- WHERE:  id=1

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'yasmim','yasmimluciano01@gmail.com','$2y$10$.7SW0Jq.9n7xPBoQLX.sPeQ/shsrivzUFiGOxC3IhM/TUwc8AJ17i','admin',0,0,0,0);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-25  0:46:47
