-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 02 mars 2026 à 21:22
-- Version du serveur : 10.3.39-MariaDB-0+deb10u1
-- Version de PHP : 8.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestion_patient`
--

-- --------------------------------------------------------

--
-- Structure de la table `chambre`
--

CREATE TABLE `chambre` (
  `id` int(11) NOT NULL,
  `chambre_id` int(11) DEFAULT NULL,
  `etage` int(11) NOT NULL,
  `nombre_lit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `chambre`
--

INSERT INTO `chambre` (`id`, `chambre_id`, `etage`, `nombre_lit`) VALUES
(1, NULL, 1, 2),
(2, NULL, 2, 8),
(3, NULL, 1, 1),
(4, NULL, 1, 2),
(5, NULL, 1, 3),
(6, NULL, 1, 4),
(7, NULL, 2, 1),
(8, NULL, 2, 2),
(9, NULL, 2, 3),
(10, NULL, 2, 4);

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20251116195613', NULL, NULL),
('DoctrineMigrations\\Version20251118143813', '2025-11-18 14:38:30', 2537),
('DoctrineMigrations\\Version20251202131814', NULL, NULL),
('DoctrineMigrations\\Version20251202134454', NULL, NULL),
('DoctrineMigrations\\Version20251202145931', NULL, NULL),
('DoctrineMigrations\\Version20251202152658', NULL, NULL),
('DoctrineMigrations\\Version20251202153828', '2025-12-02 15:38:36', 657);

-- --------------------------------------------------------

--
-- Structure de la table `lit`
--

CREATE TABLE `lit` (
  `id` int(11) NOT NULL,
  `chambre_id` int(11) DEFAULT NULL,
  `disponibilite` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `localite`
--

CREATE TABLE `localite` (
  `id` int(11) NOT NULL,
  `code_postal` int(11) NOT NULL,
  `ville` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `localite`
--

INSERT INTO `localite` (`id`, `code_postal`, `ville`) VALUES
(1, 75001, 'Paris'),
(2, 69001, 'Lyon'),
(3, 13001, 'Marseille'),
(4, 31000, 'Toulouse'),
(5, 6000, 'Nice'),
(6, 44000, 'Nantes'),
(7, 67000, 'Strasbourg'),
(8, 59000, 'Lille'),
(9, 33000, 'Bordeaux'),
(10, 34000, 'Montpellier');

-- --------------------------------------------------------

--
-- Structure de la table `messenger_messages`
--

CREATE TABLE `messenger_messages` (
  `id` bigint(20) NOT NULL,
  `body` longtext NOT NULL,
  `headers` longtext NOT NULL,
  `queue_name` varchar(190) NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `available_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `delivered_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `patient`
--

CREATE TABLE `patient` (
  `id` int(11) NOT NULL,
  `localite_id` int(11) DEFAULT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `sexe` varchar(50) NOT NULL,
  `note` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `patient`
--

INSERT INTO `patient` (`id`, `localite_id`, `nom`, `prenom`, `telephone`, `sexe`, `note`) VALUES
(5, 1, 'seys', 'thyméo', '066526527', 'M', 'il est juste thym '),
(10, 1, 'arabi', 'rayan', '065265658', 'M', 'il est juste très fatigué'),
(11, 2, 'Sbai', 'Aymane', '0645372817', 'M', 'S\'est prit le mur en pleine face'),
(12, 8, 'Martin', 'Lucas', '0600000001', 'M', 'RAS'),
(13, 5, 'Durand', 'Emma', '0600000002', 'F', 'Allergie légère'),
(14, 6, 'Bernard', 'Hugo', '0600000003', 'M', 'Surveillance'),
(15, 10, 'Petit', 'Léa', '0600000004', 'F', 'RAS'),
(16, 5, 'Robert', 'Noah', '0600000005', 'M', 'Antécédents médicaux'),
(17, 2, 'Richard', 'Chloé', '0600000006', 'F', 'RAS'),
(18, 6, 'Moreau', 'Nathan', '0600000007', 'M', 'Diabète'),
(19, 8, 'Simon', 'Manon', '0600000008', 'F', 'RAS'),
(20, 10, 'Laurent', 'Ethan', '0600000009', 'M', 'Asthme'),
(21, 1, 'Lefebvre', 'Camille', '0600000010', 'F', 'RAS'),
(22, 10, 'Garcia', 'Louis', '0600000011', 'M', 'Surveillance post-op'),
(23, 7, 'Roux', 'Sarah', '0600000012', 'F', 'RAS'),
(24, 8, 'Zitoun', 'Wassim', '0785294327', 'M', 'déchirure musculaire');

-- --------------------------------------------------------

--
-- Structure de la table `sejour`
--

CREATE TABLE `sejour` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) DEFAULT NULL,
  `chambre_id` int(11) DEFAULT NULL,
  `date_entree` datetime NOT NULL,
  `date_sortie` datetime NOT NULL,
  `libelle` varchar(50) NOT NULL,
  `statut_du_jour` varchar(50) NOT NULL,
  `arrivee_etat` tinyint(1) NOT NULL DEFAULT 0,
  `sortie_etat` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `sejour`
--

INSERT INTO `sejour` (`id`, `patient_id`, `chambre_id`, `date_entree`, `date_sortie`, `libelle`, `statut_du_jour`, `arrivee_etat`, `sortie_etat`) VALUES
(4, 10, 2, '2025-12-27 05:25:00', '2025-12-31 07:22:00', 'intoxication alimentaire', 'Sorti', 1, 1),
(5, 5, 2, '2025-12-20 08:47:00', '2025-12-24 07:46:00', 'ligaments croisés', 'Absent', 1, 0),
(6, 5, 1, '2025-12-26 12:32:00', '2025-12-30 12:50:00', 'chute du tabouret', 'Présent', 1, 1),
(57, 17, 1, '2025-12-30 20:45:00', '2025-12-31 20:45:00', 'désydratation', 'Sorti', 1, 0),
(58, 15, 2, '2026-01-01 22:51:00', '2026-01-03 20:55:00', 'Problèmes respiratoires', 'Absent', 0, 0),
(59, 19, 4, '2026-01-04 01:56:00', '2026-01-04 10:54:00', 'Douleur d\'estomac', 'Présent', 0, 0),
(60, 12, 9, '2025-12-29 20:51:00', '2026-01-01 21:51:00', 'Torticoli', 'Absent', 0, 0),
(61, 23, 7, '2026-01-17 23:35:00', '2026-01-17 19:40:00', 'Torticoli', 'Absent', 0, 0),
(62, 5, 2, '2026-01-14 04:41:00', '2026-01-18 23:40:00', 'ligaments croisés', 'Présent', 0, 0),
(63, 22, 6, '2026-01-19 23:51:00', '2026-01-20 23:51:00', 'intoxication alimentaire', 'Présent', 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `libelle` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(180) NOT NULL,
  `roles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(255) NOT NULL,
  `service_id` int(11) DEFAULT NULL,
  `localite_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`, `service_id`, `localite_id`) VALUES
(1, 'ayyoub@bts.com', '[\"ROLE_USER\", \"ROLE_ADMIN\"]', '$2y$13$QUbA.F/0hMleTI1AoPg88uWl7UBwtnjyxCNNwxtBMY4PcOBzMXAlu', NULL, NULL),
(2, 'ayyoub@administratif.fr', '[\"ROLE_USER\", \"ROLE_ADMINISTRATIF\"]', '$2y$13$NC73PUA0El.FWmRzuNzqBOosmxNUkfZNi/waR933Ve86W6IpH0c9a', NULL, NULL),
(3, 'admin@cours.fr', '[\"ROLE_USER\", \"ROLE_ADMIN\"]', '$2y$13$1BQ/WPEJ9EVOM1DJF5ZGYuZIQCNkDvthylm9DI.pD3qvubCC9Qym.', NULL, NULL),
(4, 'aymane@infirmier.com', '{\"0\": \"ROLE_USER\", \"2\": \"ROLE_INFIRMIER\"}', '$2y$13$azwi44q06AxqC7Ch1GZTbeHvGLWa58NF3hPeB0yvtaMz0v8b/V27W', NULL, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `chambre`
--
ALTER TABLE `chambre`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_C509E4FF9B177F54` (`chambre_id`);

--
-- Index pour la table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `lit`
--
ALTER TABLE `lit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_5DDB8E9D9B177F54` (`chambre_id`);

--
-- Index pour la table `localite`
--
ALTER TABLE `localite`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `messenger_messages`
--
ALTER TABLE `messenger_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_75EA56E0FB7336F0` (`queue_name`),
  ADD KEY `IDX_75EA56E0E3BD61CE` (`available_at`),
  ADD KEY `IDX_75EA56E016BA31DB` (`delivered_at`);

--
-- Index pour la table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_1ADAD7EB924DD2B5` (`localite_id`);

--
-- Index pour la table `sejour`
--
ALTER TABLE `sejour`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_96F520286B899279` (`patient_id`),
  ADD KEY `IDX_96F520289B177F54` (`chambre_id`);

--
-- Index pour la table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_IDENTIFIER_EMAIL` (`email`),
  ADD KEY `IDX_8D93D649ED5CA9E6` (`service_id`),
  ADD KEY `IDX_8D93D649924DD2B5` (`localite_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `chambre`
--
ALTER TABLE `chambre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `lit`
--
ALTER TABLE `lit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `localite`
--
ALTER TABLE `localite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `messenger_messages`
--
ALTER TABLE `messenger_messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `sejour`
--
ALTER TABLE `sejour`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT pour la table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `chambre`
--
ALTER TABLE `chambre`
  ADD CONSTRAINT `FK_C509E4FF9B177F54` FOREIGN KEY (`chambre_id`) REFERENCES `service` (`id`);

--
-- Contraintes pour la table `lit`
--
ALTER TABLE `lit`
  ADD CONSTRAINT `FK_5DDB8E9D9B177F54` FOREIGN KEY (`chambre_id`) REFERENCES `chambre` (`id`);

--
-- Contraintes pour la table `patient`
--
ALTER TABLE `patient`
  ADD CONSTRAINT `FK_1ADAD7EB924DD2B5` FOREIGN KEY (`localite_id`) REFERENCES `localite` (`id`);

--
-- Contraintes pour la table `sejour`
--
ALTER TABLE `sejour`
  ADD CONSTRAINT `FK_96F520286B899279` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`),
  ADD CONSTRAINT `FK_96F520289B177F54` FOREIGN KEY (`chambre_id`) REFERENCES `chambre` (`id`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_8D93D649924DD2B5` FOREIGN KEY (`localite_id`) REFERENCES `localite` (`id`),
  ADD CONSTRAINT `FK_8D93D649ED5CA9E6` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
