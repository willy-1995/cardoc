-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 22. Jan 2026 um 13:26
-- Server-Version: 10.4.32-MariaDB
-- PHP-Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `cardoc`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `trips`
--

CREATE TABLE `trips` (
  `id` int(10) UNSIGNED NOT NULL,
  `vehicle_id` int(10) UNSIGNED NOT NULL,
  `driver` varchar(100) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `start_km` int(10) UNSIGNED NOT NULL,
  `end_km` int(10) UNSIGNED NOT NULL,
  `distance_km` int(10) UNSIGNED NOT NULL,
  `start_location` varchar(255) NOT NULL,
  `end_location` varchar(255) NOT NULL,
  `purpose` varchar(255) NOT NULL,
  `trip_type` enum('business','private','commute') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `hash` char(64) NOT NULL,
  `canceled` tinyint(1) NOT NULL DEFAULT 0,
  `canceled_at` datetime DEFAULT NULL,
  `canceled_by` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `trips`
--

INSERT INTO `trips` (`id`, `vehicle_id`, `driver`, `start_time`, `end_time`, `start_km`, `end_km`, `distance_km`, `start_location`, `end_location`, `purpose`, `trip_type`, `created_at`, `hash`, `canceled`, `canceled_at`, `canceled_by`) VALUES
(5, 10, 'Max Mustermann', '2026-01-08 13:30:00', '2026-01-08 19:30:00', 100, 200, 100, 'A', 'B', 'Probefahrt', 'business', '2026-01-07 23:50:06', '', 1, '2026-01-08 01:31:04', '0000-00-00 00:00:00'),
(6, 10, 'Max Mustermann', '2026-01-09 15:30:00', '2026-01-09 18:30:00', 200, 400, 200, 'A', 'B', 'Probefahrt', 'business', '2026-01-08 00:46:58', '', 1, '2026-01-08 01:47:24', '0000-00-00 00:00:00'),
(7, 10, 'Max Mustermann', '2026-01-12 10:00:00', '2026-01-12 11:00:00', 400, 500, 100, 'A', 'B', 'Probe', 'business', '2026-01-08 00:53:00', '', 1, '2026-01-08 01:53:10', '0000-00-00 00:00:00'),
(8, 10, 'MM', '2026-01-15 11:00:00', '2026-01-15 12:00:00', 500, 600, 100, 'A', 'B', 'Zweck', 'business', '2026-01-08 00:57:27', '', 1, '2026-01-08 01:57:31', 'beispieluser'),
(10, 9, 'MM', '2026-01-09 10:00:00', '2026-01-09 11:00:00', 0, 100, 100, 'A', 'B', 'Probe', 'business', '2026-01-09 00:46:23', '', 0, NULL, NULL),
(11, 9, 'MM', '2026-01-09 12:00:00', '2026-01-09 13:00:00', 100, 200, 100, 'B', 'A', 'Probe', '', '2026-01-09 00:47:51', '', 1, '2026-01-09 01:48:10', 'mustermann'),
(12, 9, 'MM', '2026-01-12 10:00:00', '2026-01-09 12:00:00', 100, 200, 100, 'A', 'C', 'Probe', 'business', '2026-01-09 00:56:22', '', 1, '2026-01-09 01:56:42', 'mustermann'),
(13, 11, 'Max Mustermann', '2026-01-12 10:00:00', '2006-01-12 11:00:00', 0, 200, 200, 'A', 'B', 'Überführung', '', '2026-01-12 20:30:08', '', 0, NULL, NULL),
(14, 12, 'tester', '2026-01-13 10:00:00', '2026-01-13 11:00:00', 0, 100, 100, 'A', 'B', 'Probe', 'business', '2026-01-13 17:31:41', '', 0, NULL, NULL),
(15, 12, 'tester', '2026-01-15 10:00:00', '2026-01-15 11:00:00', 100, 200, 100, 'B', 'A', 'Probe', '', '2026-01-21 16:52:24', '', 0, NULL, NULL),
(16, 12, '', '2025-12-24 10:00:00', '2026-01-24 11:00:00', 200, 300, 100, 'A', 'A', 'Probefahrt', 'private', '2026-01-21 16:53:45', '', 1, '2026-01-21 17:54:07', 'test'),
(17, 12, 'tester', '2025-12-17 10:00:00', '2025-12-17 11:00:00', 200, 250, 50, 'A', 'A', 'Probefahrt', 'private', '2026-01-21 16:56:18', '', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`, `deleted_at`) VALUES
(5, 'Max Mustermann', 'muster@beispiel.de', '$2y$10$dXCYokfsm1Q3PZfvmcgk0.J0r2zzSJvfMCkSohpo0jSIpcqhfKBqG', '2025-12-31 14:58:53', NULL),
(6, 'beispieluser', 'beispiel@muster.de', '$2y$10$PLXLudKKdc6PR/nhIAMtge4WqWtFubzKhzGAaBkfCH7npbQ.pecqq', '2026-01-07 01:23:05', NULL),
(8, 'test', 'test@test.de', '$2y$10$yzO/6pWI8zYMtYcK161xR.CWX6zdm/p1ms6uqH66PA1AHWCwNt8he', '2026-01-13 17:27:55', NULL),
(9, 'Nutzer', 'nutzer@nutzer.de', '$2y$10$5jOCvsbO.kUWzdQp.CymFeDjFgDT.boe7sm1ZHxplSzg8rEDeo2N.', '2026-01-21 19:46:47', NULL),
(10, 'weitererNutzer', 'weitererNutzer@nutzer.de', '$2y$10$Eo99Ae6YSw1DmHK6nKIWrOhjzroz3Dd7qIqtaH7Bo27BG5/tyhjzq', '2026-01-21 19:49:24', NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(10) UNSIGNED NOT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `model` varchar(255) NOT NULL,
  `license_plate` varchar(255) NOT NULL,
  `details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`details`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `vehicles`
--

INSERT INTO `vehicles` (`id`, `brand`, `model`, `license_plate`, `details`, `created_at`, `user_id`) VALUES
(9, 'BMW', '316i', 'BN-CW500', NULL, '2025-12-31 15:01:08', 5),
(10, 'VW', 'Golf 4', 'BN-AA100', NULL, '2026-01-07 01:26:21', 6),
(11, 'Honda', 'Civic', 'BN-KL1000', NULL, '2026-01-12 20:03:01', 5),
(12, 'VW', 'Golf IV', 'BN-AA0000', NULL, '2026-01-13 17:29:10', 8);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `trips`
--
ALTER TABLE `trips`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_trips_vehicle` (`vehicle_id`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indizes für die Tabelle `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vehicles_user` (`user_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `trips`
--
ALTER TABLE `trips`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT für Tabelle `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `trips`
--
ALTER TABLE `trips`
  ADD CONSTRAINT `fk_trips_vehicle` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `fk_vehicles_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
