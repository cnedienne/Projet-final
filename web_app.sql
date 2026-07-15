-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mariadb
-- Generation Time: Jun 24, 2025 at 05:39 PM
-- Server version: 10.9.8-MariaDB-1:10.9.8+maria~ubu2204
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `web_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `characters`
--

CREATE TABLE `characters` (
  `char_id` int(11) NOT NULL,
  `char_name` varchar(255) NOT NULL,
  `char_title` varchar(255) NOT NULL,
  `char_desc` varchar(2056) DEFAULT NULL,
  `char_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `characters`
--

INSERT INTO `characters` (`char_id`, `char_name`, `char_title`, `char_desc`, `char_image`) VALUES
(1, 'ALAN TURING', 'LE PÈRE DE L’INFORMATIQUE ET DE L’INTELLIGENCE ARTIFICIELLE', 'Pionnier incontesté de l’informatique théorique, Alan Turing, né en 1912 et mort en 1954, est le père du concept de la machine universelle, fondement des ordinateurs modernes. Pendant la Seconde Guerre mondiale, il joue un rôle déterminant dans le décryptage des messages codés par la machine Enigma, contribuant à la victoire des Alliés. En 1950, il propose le test de Turing, posant les bases philosophiques de l’intelligence artificielle. Sa vie, marquée par une persécution tragique en raison de son homosexualité, se termine prématurément, mais son héritage reste colossal.', 'char_1.png'),
(2, 'TIM BERNERS-LEE', 'L’INVENTEUR DU WORLD WIDE WEB', 'Né en 1955, Tim Berners-Lee est l’inventeur du World Wide Web, qu’il conçoit en 1989 alors qu’il travaille au CERN. Il développe le HTML, le HTTP, et les URLs, qui vont révolutionner l’accès à l’information à l’échelle mondiale. Contrairement aux logiques commerciales, il choisit de ne pas breveter son invention, la rendant gratuite. Engagé pour un web libre et éthique, il continue de militer pour la décentralisation d’Internet et la protection des données personnelles.', 'char_2.png'),
(3, 'GRACE HOPPER', 'LA MÈRE DU LANGAGE DE PROGRAMMATION', 'Née en 1906 et décédée en 1992, Grace Hopper est une pionnière américaine de la programmation informatique. Amiral de la marine américaine, elle conçoit le premier compilateur et participe activement à la création du langage COBOL, facilitant l’accès à la programmation pour les non-spécialistes. Elle est également célèbre pour avoir popularisé le terme \"bug\" en informatique. Figure rigoureuse et visionnaire, elle laisse un héritage durable dans la science du logiciel.', 'char_3.png'),
(4, 'LINUS TORVALDS', 'LE CRÉATEUR DU NOYAU LINUX', 'Né en 1969, le finlandais Linus Torvalds est le créateur du noyau Linux, développé en 1991. Il publie son travail en open-source, ce qui permet à des milliers de contributeurs de participer à ce projet devenu un pilier de l’infrastructure informatique mondiale (serveurs, mobiles, objets connectés…). Torvalds est également l’initiateur de Git, le gestionnaire de versions incontournable dans le développement moderne. Respecté pour son exigence technique, il incarne l’esprit communautaire du logiciel libre.', 'char_4.png'),
(5, 'ADA LOVELACE', 'LA PREMIÈRE PROGRAMMEUSE DE L’HISTOIRE', 'Née en 1815 et morte en 1852, Ada Lovelace est considérée comme la première programmeuse de l’histoire. Collaboratrice de Charles Babbage, elle travaille sur la machine analytique, une machine mécanique de calcul. Elle rédige un algorithme destiné à être exécuté par cette machine, anticipant des concepts de programmation bien avant leur réalisation. Son intelligence visionnaire et sa capacité à imaginer des usages non purement mathématiques de la machine lui valent une reconnaissance posthume majeure dans l’histoire de l’informatique.', 'char_5.png'),
(6, 'BILL GATES', 'LE VISIONNAIRE DERRIÈRE MICROSOFT', 'Né en 1955, Bill Gates fonde Microsoft en 1975 et devient l’un des artisans de la démocratisation de l’informatique personnelle. Il développe les systèmes MS-DOS puis Windows, imposant un standard mondial. Son flair commercial et sa stratégie d’expansion font de Microsoft un géant technologique. Depuis son retrait progressif de l’entreprise à partir des années 2000, il se consacre à la philanthropie avec la Bill & Melinda Gates Foundation, œuvrant dans la santé mondiale, l’éducation et l’environnement.', 'char_6.png'),
(7, 'STEVE JOBS', 'LE GÉNIE DU DESIGN ET DE L’INNOVATION CHEZ APPLE', 'Né en 1955 et décédé en 2011, Steve Jobs est le cofondateur emblématique d’Apple. Visionnaire du design et de l’innovation, il bouleverse successivement les secteurs de l’informatique (Mac), de la musique (iPod), de la téléphonie (iPhone), et de l’édition numérique (iPad). Son approche unique, alliant expérience utilisateur, simplicité d’usage, et esthétique, en fait une icône mondiale. Sa capacité à créer de nouveaux marchés reste une référence dans l’histoire de la technologie moderne.', 'char_7.png'),
(8, 'DENNIS RITCHIE', 'LE CRÉATEUR DU LANGAGE C ET DU SYSTÈME UNIX', 'Né en 1941 et disparu en 2011, Dennis Ritchie est un ingénieur informatique américain, co-créateur du langage C et du système d’exploitation UNIX. Ces deux créations sont à l’origine de presque tous les systèmes modernes, y compris Linux, macOS et Windows. Le langage C a influencé une multitude d’autres langages (C++, Java, etc.), et reste encore massivement utilisé. Ritchie est un bâtisseur discret mais fondamental de l’infrastructure numérique contemporaine.', 'char_8.png'),
(9, 'MARK ZUCKERBERG', 'L’ARCHITECTE DES RÉSEAUX SOCIAUX MODERNES', 'Né en 1984, Mark Zuckerberg lance Facebook en 2004 depuis sa chambre à Harvard. Ce réseau social, devenu Meta, redéfinit la communication sociale à l’échelle mondiale. Malgré les nombreuses polémiques concernant la vie privée, la désinformation, et la monétisation des données, Zuckerberg poursuit sa vision : construire une plateforme numérique globale et immersive, notamment via le métavers. Il est aujourd’hui une figure-clé de l’économie numérique.', 'char_9.png'),
(10, 'MARGARET HAMILTON', 'LA PROGRAMMEUSE DE L’APOLLO 11', 'Née en 1936, Margaret Hamilton est une mathématicienne et informaticienne américaine qui dirige l’équipe ayant conçu le logiciel embarqué du programme Apollo dans les années 1960. Son code a évité des défaillances critiques lors de l’alunissage d’Apollo 11. Elle formalise pour la première fois le concept d’\"ingénierie logicielle\", insistant sur la rigueur et la vérification dans le développement de logiciels critiques. Elle a pavé la voie à toute l’ingénierie des systèmes embarqués modernes.', 'char_10.png'),
(11, 'ELON MUSK', 'LE PROPULSEUR DE LA TECH DU FUTUR', 'Né en 1971, Elon Musk est un entrepreneur sud-africain devenu américain, à la tête de plusieurs entreprises technologiques majeures. Après le succès de PayPal, il fonde SpaceX (2002), Tesla (2004), puis Neuralink et The Boring Company, avant de racheter Twitter/X en 2022. Musk explore des domaines allant de l’intelligence artificielle à l’exploration spatiale, en passant par l’énergie renouvelable et les interfaces neuronales. Son approche audacieuse et controversée incarne la frontière entre science-fiction et innovation concrète.', 'char_11.png');

-- --------------------------------------------------------

--
-- Table structure for table `character_traits`
--

CREATE TABLE `character_traits` (
  `character_id` int(11) NOT NULL,
  `trait_id` int(11) NOT NULL,
  `weight` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `character_traits`
--

INSERT INTO `character_traits` (`character_id`, `trait_id`, `weight`) VALUES
(1, 1, 0.95),
(1, 2, 0.6),
(1, 3, 0),
(1, 4, 0),
(1, 5, 0.85),
(1, 6, 0),
(1, 7, 0),
(2, 1, 0.8),
(2, 2, 0.9),
(2, 3, 0),
(2, 4, 0.75),
(2, 5, 0),
(2, 6, 0.7),
(2, 7, 0),
(3, 1, 0.85),
(3, 2, 0.75),
(3, 3, 0),
(3, 4, 0.9),
(3, 5, 0),
(3, 6, 0),
(3, 7, 0.8),
(4, 1, 0.85),
(4, 2, 0.6),
(4, 3, 0),
(4, 4, 0),
(4, 5, 0.9),
(4, 6, 0.8),
(4, 7, 0),
(5, 1, 0.75),
(5, 2, 0.95),
(5, 3, 0),
(5, 4, 0),
(5, 5, 0.85),
(5, 6, 0),
(5, 7, 0),
(6, 1, 0.8),
(6, 2, 0.85),
(6, 3, 0),
(6, 4, 0.7),
(6, 5, 0),
(6, 6, 0.8),
(6, 7, 0.85),
(7, 1, 0),
(7, 2, 1),
(7, 3, 0.75),
(7, 4, 0),
(7, 5, 0.8),
(7, 6, 0.9),
(7, 7, 0),
(8, 1, 0.95),
(8, 2, 0.65),
(8, 3, 0),
(8, 4, 0),
(8, 5, 0.85),
(8, 6, 0),
(8, 7, 0),
(9, 1, 0.7),
(9, 2, 0.85),
(9, 3, 0),
(9, 4, 0),
(9, 5, 0.8),
(9, 6, 0.9),
(9, 7, 0),
(10, 1, 0.95),
(10, 2, 0),
(10, 3, 0.9),
(10, 4, 0.8),
(10, 5, 0),
(10, 6, 0),
(10, 7, 0.85),
(11, 1, 0),
(11, 2, 1),
(11, 3, 0.8),
(11, 4, 0),
(11, 5, 0.95),
(11, 6, 0.95),
(11, 7, 0);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` int(11) NOT NULL,
  `question_text` varchar(1028) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `question_text`) VALUES
(1, 'Quand j’ai une tâche à accomplir, je m’assure toujours qu’elle soit faite dans les moindres détails, même si cela prend plus de temps.'),
(2, 'Je relis systématiquement un travail avant de le rendre, même sous pression.'),
(3, 'Je suis à l’aise avec les procédures strictes et je les suis avec précision.'),
(4, 'Je cherche souvent des manières originales de résoudre un problème.'),
(5, 'Je préfère improviser plutôt que de suivre un plan strict.'),
(6, 'On me considère souvent comme quelqu’un qui pense en dehors des sentiers battus '),
(7, 'Quand une échéance approche, je garde mon calme et j’organise mes priorités.'),
(8, 'Je suis facilement déstabilisé(e) lorsqu’on me donne plusieurs tâches à faire en même temps.'),
(9, 'Dans une situation d’urgence, je suis capable de rester efficace.'),
(10, 'Je préfère travailler en équipe plutôt que seul(e).'),
(11, 'Je prends en compte les idées des autres, même si je ne suis pas d’accord au départ.'),
(12, 'Il m’est facile d’adapter ma façon de travailler selon les membres de l’équipe.'),
(13, 'Je peux avancer efficacement sur un projet sans supervision directe.'),
(14, 'Je prends facilement des initiatives sans qu’on me le demande.'),
(15, 'Je me sens perdu(e) s’il n’y a pas d’instructions précises.'),
(16, 'Je m’adapte rapidement quand les priorités changent soudainement.'),
(17, 'Les changements fréquents dans mon environnement de travail me perturbent. '),
(18, 'Je suis à l’aise dans des situations nouvelles ou imprévues.'),
(19, 'Je planifie mes journées ou semaines à l’avance pour mieux gérer mon temps.'),
(20, 'Je préfère avoir une vision claire du déroulement d’un projet avant de me lancer.');

-- --------------------------------------------------------

--
-- Table structure for table `question_traits`
--

CREATE TABLE `question_traits` (
  `question_id` int(11) NOT NULL,
  `trait_id` int(11) NOT NULL,
  `weight` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `question_traits`
--

INSERT INTO `question_traits` (`question_id`, `trait_id`, `weight`) VALUES
(1, 1, 0.45),
(2, 1, 0.35),
(3, 1, 0.2),
(4, 2, 0.45),
(5, 2, 0.3),
(6, 2, 0.25),
(7, 3, 0.4),
(8, 3, 0.2),
(9, 3, 0.4),
(10, 4, 0.4),
(11, 4, 0.35),
(12, 4, 0.25),
(13, 5, 0.4),
(14, 5, 0.4),
(15, 5, 0.2),
(16, 6, 0.4),
(17, 6, 0.2),
(18, 6, 0.4),
(19, 7, 0.55),
(20, 7, 0.45);

-- --------------------------------------------------------

--
-- Table structure for table `traits`
--

CREATE TABLE `traits` (
  `trait_id` int(11) NOT NULL,
  `trait_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `traits`
--

INSERT INTO `traits` (`trait_id`, `trait_name`) VALUES
(1, 'RIGUEUR'),
(2, 'CRÉATIVITÉ'),
(3, 'Courage'),
(4, 'TRAVAIL EN ÉQUIPE'),
(5, 'AUTONOMIE'),
(6, 'ADAPTABILITÉ'),
(7, 'ORGANISATION');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`) VALUES
('rapidcode', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8');

-- --------------------------------------------------------

--
-- Table structure for table `user_cookies`
--

CREATE TABLE `user_cookies` (
  `cookie_id` varchar(225) NOT NULL,
  `answers` text NOT NULL,
  `stored_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `characters`
--
ALTER TABLE `characters`
  ADD PRIMARY KEY (`char_id`);

--
-- Indexes for table `character_traits`
--
ALTER TABLE `character_traits`
  ADD PRIMARY KEY (`character_id`,`trait_id`),
  ADD KEY `trait_id` (`trait_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`);

--
-- Indexes for table `question_traits`
--
ALTER TABLE `question_traits`
  ADD PRIMARY KEY (`question_id`,`trait_id`),
  ADD KEY `trait_id` (`trait_id`);

--
-- Indexes for table `traits`
--
ALTER TABLE `traits`
  ADD PRIMARY KEY (`trait_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `user_cookies`
--
ALTER TABLE `user_cookies`
  ADD PRIMARY KEY (`cookie_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `characters`
--
ALTER TABLE `characters`
  MODIFY `char_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `traits`
--
ALTER TABLE `traits`
  MODIFY `trait_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `character_traits`
--
ALTER TABLE `character_traits`
  ADD CONSTRAINT `character_traits_ibfk_1` FOREIGN KEY (`character_id`) REFERENCES `characters` (`char_id`),
  ADD CONSTRAINT `character_traits_ibfk_2` FOREIGN KEY (`trait_id`) REFERENCES `traits` (`trait_id`);

--
-- Constraints for table `question_traits`
--
ALTER TABLE `question_traits`
  ADD CONSTRAINT `question_traits_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`),
  ADD CONSTRAINT `question_traits_ibfk_2` FOREIGN KEY (`trait_id`) REFERENCES `traits` (`trait_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
