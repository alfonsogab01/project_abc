-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 28, 2018 at 05:43 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `abc1`
--

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `messageID` int(11) NOT NULL,
  `recipient` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `subject` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `body` text COLLATE utf8_unicode_ci NOT NULL,
  `sender` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `isMessage` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`messageID`, `recipient`, `subject`, `body`, `sender`, `isMessage`) VALUES
(3, 'Gabo', 'Test', 'TEst\r\ntest\r\ntest', 'admin', b'0'),
(4, 'dan', '1', '2', 'admin', NULL),
(5, 'admin', 'Hi\'s', 'Hello', 'admin', NULL),
(7, 'admin', 'test', 'message test, admin will be able to see this message in his/her message tab!', 'Alfonso', NULL),
(8, 'admin', 'Hello', 'Test test', 'admin', NULL),
(9, 'admin', 'Test subject1', 'Hope this works\nI would like to finish this project \nas soon as possible \nand Iwill do my best to do \nit. Thank you Lord!', 'admin', NULL),
(24, 'Danilo', 'Thank you sir!', 'Sir maraming salamat po sa tulong po ninyo sa amin. Thank you sir\nsa knowledge na inyo pong ishinare po sa amin. God Bless sir!!!!!!!!!!!\ntest\ntest\ntest', 'Alfonso', NULL),
(25, 'Alfonso', 'You\'re Welcome', 'walang anuman! Pasado na!', 'Danilo', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(1) UNSIGNED NOT NULL,
  `userName` varchar(32) NOT NULL,
  `userFirstName` varchar(64) NOT NULL,
  `userLastName` varchar(64) NOT NULL,
  `userPassword` char(60) NOT NULL,
  `userAdmin` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `userName`, `userFirstName`, `userLastName`, `userPassword`, `userAdmin`) VALUES
(1, 'admin', 'admin', 'admin', '$2a$10$lqm5rIvcBVqW6JOa/CEBqupJ3INFV5BOYdZ29p49ArtREngYZlEV.', b'1'),
(3, 'user1', 'Rom', 'Vill', '$2a$10$lqm5rIvcBVqW6JOa/CEBqupJ3INFV5BOYdZ29p49ArtREngYZlEV.', b'0'),
(4, 'user2', 'Test', 'Lang', '$2a$10$lqm5rIvcBVqW6JOa/CEBqupJ3INFV5BOYdZ29p49ArtREngYZlEV.', b'0'),
(12, 'user3', 'Maddy', 'Lim', '$2a$10$lqm5rIvcBVqW6JOa/CEBqupJ3INFV5BOYdZ29p49ArtREngYZlEV.', b'0'),
(13, 'user4', 'Maddy', 'Lao', '$2a$10$lqm5rIvcBVqW6JOa/CEBqupJ3INFV5BOYdZ29p49ArtREngYZlEV.', b'0'),
(14, 'user5', 'Fe', 'Pog', '$2a$10$lqm5rIvcBVqW6JOa/CEBqupJ3INFV5BOYdZ29p49ArtREngYZlEV.', b'0'),
(15, 'user6', 'Dan', 'Dan', '$2a$10$lqm5rIvcBVqW6JOa/CEBqupJ3INFV5BOYdZ29p49ArtREngYZlEV.', b'0'),
(17, 'user7', 'Hahaha', 'Ida', '$2a$10$lqm5rIvcBVqW6JOa/CEBqupJ3INFV5BOYdZ29p49ArtREngYZlEV.', b'0'),
(21, 'user10', 'Huhuhu', 'Wha', '$2a$10$lqm5rIvcBVqW6JOa/CEBqupJ3INFV5BOYdZ29p49ArtREngYZlEV.', b'0'),
(22, 'user11', 'Bom', 'Bom', '$2a$10$lqm5rIvcBVqW6JOa/CEBqupJ3INFV5BOYdZ29p49ArtREngYZlEV.', b'0'),
(23, 'Alfonso_Gab', 'Alfonso', 'Tabeta', '$2a$10$nl0Ao.mh2gJN0fxuM4CYjuk/4xuEdonHgPNjF.10o8hIP9jsZ/udu', b'0'),
(24, 'Sir Dan', 'Danilo', 'Madrigalejos', '$2a$10$UNDHXPGeimox539hMdZqvulSCl7IVF/c6Q.9rDHPzKY1V0Kg9O6bS', b'0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`messageID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `userName_UNIQUE` (`userName`),
  ADD KEY `idx_user_common` (`userName`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `messageID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(1) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
