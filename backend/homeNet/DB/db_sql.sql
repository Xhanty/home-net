-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 08-09-2024 a las 15:34:35
-- Versión del servidor: 8.3.0
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `app_home_net`
--
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jwt`
--

DROP TABLE IF EXISTS `jwt`;
CREATE TABLE IF NOT EXISTS `jwt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(999) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `isSessionToken` tinyint(1) NOT NULL DEFAULT '1',
  `description` text COLLATE utf8mb4_spanish2_ci,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_jwt_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `password` varchar(999) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `profilePhoto` text COLLATE utf8mb4_spanish2_ci,
  `rol` int NOT NULL DEFAULT '1',
  `status` int NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `user_name`, `email`, `password`, `name`, `last_name`, `profilePhoto`, `rol`, `status`, `created_at`, `updated_at`) VALUES
(1, 'root', 'root@email.com', '$2y$10$x6tmOPC.M4JIJyi2pqx37ODuch0OQe/H9qdbnXk/a/cly5Q6trZn2', 'Root', 'User', NULL, 1, 1, '2024-09-08 10:31:17', NULL);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `jwt`
--
ALTER TABLE `jwt`
  ADD CONSTRAINT `fk_jwt_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
