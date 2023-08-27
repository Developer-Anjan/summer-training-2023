-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.33 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for node-tutorial
DROP DATABASE IF EXISTS `node-tutorial`;
CREATE DATABASE IF NOT EXISTS `node-tutorial` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `node-tutorial`;

-- Dumping structure for table node-tutorial.candidate
DROP TABLE IF EXISTS `candidate`;
CREATE TABLE IF NOT EXISTS `candidate` (
  `id` varchar(75) NOT NULL,
  `name` varchar(30) NOT NULL,
  `post` int(11) DEFAULT NULL,
  `profile` int(11) DEFAULT NULL,
  `user_id` varchar(75) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `profile` (`profile`),
  KEY `post` (`post`),
  KEY `user` (`user_id`),
  CONSTRAINT `post` FOREIGN KEY (`post`) REFERENCES `post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `profile` FOREIGN KEY (`profile`) REFERENCES `profile` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table node-tutorial.candidate: ~3 rows (approximately)
DELETE FROM `candidate`;
/*!40000 ALTER TABLE `candidate` DISABLE KEYS */;
INSERT INTO `candidate` (`id`, `name`, `post`, `profile`, `user_id`) VALUES
	('099c1bab-4337-46e2-aa5f-1eb22262f8d7', 'Amrit Basumatary', 12, 3, '099c1bab-4337-46e2-aa5f-1eb22262f8d7'),
	('62754871-3216-425e-a34f-5b3ef0157423', 'Saman Boro', 12, 4, '7b57a11e-b121-44bf-b1ab-5070ecab4b91'),
	('7eff8eff-827b-40b6-9acb-116f1d9d755f', 'Subadev Brahma', 1, 5, '7eff8eff-827b-40b6-9acb-116f1d9d755f'),
	('8c69108f-bd7e-4dd2-8875-93b11d4237ca', 'Drubajyoti Baro', 1, 6, '8c69108f-bd7e-4dd2-8875-93b11d4237ca');
/*!40000 ALTER TABLE `candidate` ENABLE KEYS */;

-- Dumping structure for table node-tutorial.post
DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `acronym` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `acronym` (`acronym`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

-- Dumping data for table node-tutorial.post: ~5 rows (approximately)
DELETE FROM `post`;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` (`id`, `name`, `acronym`) VALUES
	(1, 'General Secratary', 'GS'),
	(11, 'Sport Secratary', 'Sport Sec'),
	(12, 'President', 'Prsdnt'),
	(13, 'Vice President', 'VP');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;

-- Dumping structure for table node-tutorial.profile
DROP TABLE IF EXISTS `profile`;
CREATE TABLE IF NOT EXISTS `profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `photo` varchar(150) DEFAULT NULL,
  `tagline` text,
  `semester` int(11) DEFAULT NULL,
  `candidate_id` varchar(75) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `candidate_id` (`candidate_id`),
  CONSTRAINT `candidate_id` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Dumping data for table node-tutorial.profile: ~1 rows (approximately)
DELETE FROM `profile`;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` (`id`, `photo`, `tagline`, `semester`, `candidate_id`) VALUES
	(3, '/1693116615430OIP.jpg', 'Khao piyo moz karo', 3, '099c1bab-4337-46e2-aa5f-1eb22262f8d7'),
	(4, '/1693118441612OIP (1).jpg', 'Jai Ho', 5, '62754871-3216-425e-a34f-5b3ef0157423'),
	(5, '/1693118683963OIP.jpg', 'Thik Hein', 5, '7eff8eff-827b-40b6-9acb-116f1d9d755f'),
	(6, '/1693118752426OIP (1).jpg', 'Main nahi bataunga', 5, '8c69108f-bd7e-4dd2-8875-93b11d4237ca');
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;

-- Dumping structure for table node-tutorial.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(40) NOT NULL DEFAULT '',
  `email` varchar(75) NOT NULL,
  `password` varchar(40) NOT NULL,
  `role` enum('admin','candidate') NOT NULL DEFAULT 'candidate',
  `candidate_id` varchar(75) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `candidate` (`candidate_id`),
  CONSTRAINT `candidate` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table node-tutorial.users: ~4 rows (approximately)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `email`, `password`, `role`, `candidate_id`) VALUES
	('099c1bab-4337-46e2-aa5f-1eb22262f8d7', 'amrit@basumatary.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'candidate', '099c1bab-4337-46e2-aa5f-1eb22262f8d7'),
	('0d9e73aa-04ff-443a-a0b2-662f04294862', 'anjanchoudhury.id@gmail.com', '2481656a94ba52fd208ea3b8f7e1d645', 'admin', NULL),
	('7b57a11e-b121-44bf-b1ab-5070ecab4b91', 'dhrubabaro4@gmail.com', '2481656a94ba52fd208ea3b8f7e1d645', 'candidate', '62754871-3216-425e-a34f-5b3ef0157423'),
	('7eff8eff-827b-40b6-9acb-116f1d9d755f', 'subadev@brahma.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'candidate', '7eff8eff-827b-40b6-9acb-116f1d9d755f'),
	('8c69108f-bd7e-4dd2-8875-93b11d4237ca', 'dhruba@boro.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'candidate', '8c69108f-bd7e-4dd2-8875-93b11d4237ca');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for table node-tutorial.votes
DROP TABLE IF EXISTS `votes`;
CREATE TABLE IF NOT EXISTS `votes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `votes` json NOT NULL,
  `voter_id` varchar(50) NOT NULL,
  `voting_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `voter_id` (`voter_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table node-tutorial.votes: ~0 rows (approximately)
DELETE FROM `votes`;
/*!40000 ALTER TABLE `votes` DISABLE KEYS */;
INSERT INTO `votes` (`id`, `votes`, `voter_id`, `voting_time`) VALUES
	(1, '{"president": "62754871-3216-425e-a34f-5b3ef0157423", "general_secratary": "7eff8eff-827b-40b6-9acb-116f1d9d755f"}', 'UG108P21001', '2023-08-27 13:31:18'),
	(4, '{"president": "099c1bab-4337-46e2-aa5f-1eb22262f8d7", "general_secratary": "7eff8eff-827b-40b6-9acb-116f1d9d755f"}', 'UG108P21002', '2023-08-27 13:41:53');
/*!40000 ALTER TABLE `votes` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
