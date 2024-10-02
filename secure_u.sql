-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2024 at 09:02 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `secure_u`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `user_name` varchar(50) DEFAULT 'NA',
  `employ_id` int(11) DEFAULT NULL,
  `employ_photo` text DEFAULT 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  `user_university_name` varchar(100) DEFAULT NULL,
  `user_student_id_number` varchar(20) DEFAULT NULL,
  `user_role` varchar(20) NOT NULL,
  `user_contact_number` varchar(20) DEFAULT NULL,
  `user_registered_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_emergency_contact_number_1` varchar(20) DEFAULT NULL,
  `user_emergency_name_1` varchar(50) DEFAULT NULL,
  `user_emergency_relationship_1` varchar(20) DEFAULT NULL,
  `user_emergency_contact_number_2` varchar(20) DEFAULT NULL,
  `user_emergency_name_2` varchar(50) DEFAULT NULL,
  `user_emergency_relationship_2` varchar(20) DEFAULT NULL,
  `user_email_id` varchar(50) DEFAULT NULL,
  `user_password_hashcode` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`user_id`, `first_name`, `last_name`, `user_name`, `employ_id`, `employ_photo`, `user_university_name`, `user_student_id_number`, `user_role`, `user_contact_number`, `user_registered_date`, `user_emergency_contact_number_1`, `user_emergency_name_1`, `user_emergency_relationship_1`, `user_emergency_contact_number_2`, `user_emergency_name_2`, `user_emergency_relationship_2`, `user_email_id`, `user_password_hashcode`) VALUES
(19, 'tester', 'adminu', 'testeradmin', NULL, 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', NULL, NULL, 'security', NULL, '2024-09-25 05:19:08', NULL, NULL, NULL, NULL, NULL, NULL, 'testeradmin@gmail.com', '$2a$10$CwTycUXWue0Thq9StjUM0uG8BnUfbEgXpwGSWmzmOTa7NZl7gLMK2'),
(20, 'rajesh', 'kumars', 'NA', NULL, 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', NULL, NULL, 'security', NULL, '2024-09-25 21:01:02', NULL, NULL, NULL, NULL, NULL, NULL, 'rajesh@gmail.com', '$2a$10$CwTycUXWue0Thq9StjUM0uG8BnUfbEgXpwGSWmzmOTa7NZl7gLMK2'),
(21, 'ashoks', 'kumars', 'NA', NULL, 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', NULL, NULL, 'security', NULL, '2024-09-26 00:20:25', NULL, NULL, NULL, NULL, NULL, NULL, 'asokh@gmail.com', '$2a$10$CwTycUXWue0Thq9StjUM0uG8BnUfbEgXpwGSWmzmOTa7NZl7gLMK2');

-- --------------------------------------------------------

--
-- Table structure for table `incidents`
--

CREATE TABLE `incidents` (
  `incident_id` int(11) NOT NULL,
  `alert_id` int(11) NOT NULL,
  `security_officer_id` int(11) DEFAULT NULL,
  `incident_type` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `action_taken` text DEFAULT NULL,
  `resolved` tinyint(1) DEFAULT 0,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `location_id` int(11) NOT NULL,
  `location_name` varchar(100) DEFAULT NULL,
  `building` varchar(50) DEFAULT NULL,
  `floor` varchar(10) DEFAULT NULL,
  `room` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `log_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `action` varchar(50) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `details` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `news_id` int(11) NOT NULL,
  `news_type` varchar(10) NOT NULL DEFAULT 'IMAGE',
  `poll_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]',
  `users_engaged` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]' CHECK (json_valid(`users_engaged`)),
  `user_id` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_profile_pic` varchar(500) NOT NULL,
  `news_image` varchar(1000) NOT NULL,
  `news_title` text NOT NULL,
  `short_description` varchar(300) NOT NULL,
  `long_description` text NOT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`news_id`, `news_type`, `poll_data`, `users_engaged`, `user_id`, `user_name`, `user_profile_pic`, `news_image`, `news_title`, `short_description`, `long_description`, `time_stamp`) VALUES
(24, 'IMAGE', '[]', '[]', 18, '', '', 'uploads\\1727282274054.jpg', 'sssdd', '', 'assssasa', '2024-09-25 21:02:07'),
(25, 'IMAGE', '[]', '[]', 18, 'null', '', 'uploads\\1727295310508.jpg', 'new article', 'hjjhjkkjkj', 'nbvvmnbmb,', '2024-09-25 20:50:51'),
(26, 'IMAGE', '[]', '[]', 19, '', '', 'uploads\\1727295415296.jpg', 'mmmmb ', '', ' mmbmb', '2024-09-25 21:02:04'),
(27, 'IMAGE', '[]', '[]', 19, 'null', '', 'http://localhost:3001/uploads\\1727297601938.jpg', 'jvhbnnbbn', 'bhmbmbn', 'nbnbn bnbnbbnvnbnbnbnb', '2024-09-25 20:53:21'),
(28, 'IMAGE', '[]', '[]', 19, 'null', '', 'uploads\\1727297799352.jpg', 'mnnmmn mn mn', 'n nnmmn', 'nbvvvvvvvvvbn vvvvvvvvvvvvvvvvvvvvvvvvvvv', '2024-09-25 20:56:39'),
(29, 'IMAGE', '[]', '[]', 19, '', '', 'uploads\\1727298297914.jpg', 'hghghghg', '', '4556677676', '2024-09-25 21:04:58'),
(30, 'IMAGE', '[]', '[]', 20, '', '', 'uploads\\1727310833411.jpg', 'my new post', '', 'jjkkjkjkjk', '2024-09-26 00:33:54'),
(31, 'IMAGE', '[]', '[]', 21, 'null', '', 'uploads\\1727311227044.jpg', 'new article submitting form web', 'dadsaaaaaaaaaaaaaaaaaaaaaaa', 'aaaddddddddddddddddddddddddddddddddddddddddddddd', '2024-09-26 00:40:27');

-- --------------------------------------------------------

--
-- Table structure for table `safe_zones`
--

CREATE TABLE `safe_zones` (
  `zone_id` int(11) NOT NULL,
  `zone_name` varchar(50) NOT NULL,
  `zone_img` text NOT NULL,
  `number_of_incidents` int(5) NOT NULL,
  `note` text NOT NULL,
  `safe_times` varchar(50) NOT NULL,
  `danger_time` varchar(50) NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `safe_zones`
--

INSERT INTO `safe_zones` (`zone_id`, `zone_name`, `zone_img`, `number_of_incidents`, `note`, `safe_times`, `danger_time`, `last_updated`) VALUES
(18, 'testing safezone 2', 'uploads\\1727298520982.jpg', 20, 'nvvnnvbnbnbn', '', '', '2024-09-25 21:08:40'),
(19, 'ZIM', 'uploads\\1727310658751.jpg', 5, 'zim hjjjkkjlklk', '', '', '2024-09-26 00:30:58');

-- --------------------------------------------------------

--
-- Table structure for table `securityalerts`
--

CREATE TABLE `securityalerts` (
  `alert_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(200) NOT NULL,
  `incident_mode` int(11) NOT NULL,
  `alert_type` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(20) DEFAULT 'open',
  `assigned_to` int(11) DEFAULT NULL,
  `latitude` text DEFAULT NULL,
  `longitude` text DEFAULT NULL,
  `incident_image` varchar(500) NOT NULL,
  `alert_date_time` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `securityalerts`
--

INSERT INTO `securityalerts` (`alert_id`, `user_id`, `user_name`, `incident_mode`, `alert_type`, `description`, `location`, `timestamp`, `status`, `assigned_to`, `latitude`, `longitude`, `incident_image`, `alert_date_time`) VALUES
(75, 18, '', 1, '', 'SOS', NULL, '2024-09-25 17:59:01', 'open', NULL, '37.4220936', '-122.083922', '', ''),
(76, 18, '', 0, '', 'hggvhhhh', NULL, '2024-09-25 17:59:55', 'open', NULL, '37.4220936', '-122.083922', '', '2024-09-25T17:59:25.309Z'),
(77, 18, '', 2, '', 'Medical Emergency', NULL, '2024-09-25 18:00:11', 'ASSIGNED', 19, '37.4220936', '-122.083922', '', ''),
(78, 18, '', 1, '', 'SOS', NULL, '2024-09-25 18:16:18', 'open', NULL, '37.4220936', '-122.083922', '', ''),
(79, 19, '', 1, '', 'SOS', NULL, '2024-09-25 19:46:04', 'ASSIGNED', 18, '37.4220936', '-122.083922', '', ''),
(80, 19, '', 0, '', 'hgvgvvn', NULL, '2024-09-25 19:48:24', 'ASSIGNED', 20, '37.4220936', '-122.083922', '', '2024-09-25T19:47:55.146Z'),
(81, 19, '', 2, '', 'Medical Emergency', NULL, '2024-09-25 19:48:42', 'ASSIGNED', 19, '37.4220936', '-122.083922', '', ''),
(82, 19, '', 1, '', 'SOS', NULL, '2024-09-25 21:34:53', 'open', NULL, '37.4220936', '-122.083922', '', ''),
(83, 19, '', 0, '', 'bbnmnmn', NULL, '2024-09-25 21:35:24', 'open', NULL, '37.4220936', '-122.083922', '', '2024-09-25T21:34:00.000Z'),
(84, 19, '', 2, '', 'Medical Emergency', NULL, '2024-09-25 21:35:36', 'open', NULL, '37.4220936', '-122.083922', '', ''),
(85, 20, '', 1, '', 'SOS', NULL, '2024-09-26 00:16:23', 'ASSIGNED', 20, '37.4220936', '-122.083922', '', ''),
(86, 20, '', 0, '', 'theft', NULL, '2024-09-26 00:23:06', 'ASSIGNED', 21, '37.4220936', '-122.083922', '', '2024-09-25T23:21:00.000Z'),
(87, 20, '', 2, '', 'Medical Emergency', NULL, '2024-09-26 00:27:11', 'ASSIGNED', 21, '37.4220936', '-122.083922', '', ''),
(88, 19, '', 1, '', 'SOS', NULL, '2024-09-27 03:21:34', 'open', NULL, '37.4220936', '-122.083922', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_type` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_university_name` varchar(200) NOT NULL,
  `user_student_id` varchar(30) NOT NULL,
  `user_profile_pic` text NOT NULL,
  `user_employe_id` varchar(200) NOT NULL,
  `user_mobile_number` varchar(20) NOT NULL,
  `user_academic_program` varchar(200) NOT NULL,
  `user_emergency_contact_name` varchar(50) NOT NULL,
  `user_emergency_contact_relationship` varchar(20) NOT NULL,
  `user_emergency_contact_number` varchar(20) NOT NULL,
  `user_blood_group` varchar(10) NOT NULL,
  `user_medical_condition` varchar(200) NOT NULL,
  `user_special_requirement` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_type`, `user_name`, `user_email`, `user_password`, `user_university_name`, `user_student_id`, `user_profile_pic`, `user_employe_id`, `user_mobile_number`, `user_academic_program`, `user_emergency_contact_name`, `user_emergency_contact_relationship`, `user_emergency_contact_number`, `user_blood_group`, `user_medical_condition`, `user_special_requirement`) VALUES
(18, 0, 'testing', 'testing@gmail.com', '123456', 'gdgsgfs', '12333', 'uploads\\1727280069955.jpg', '', '2222222', '2333', '667777', 'vbbbbbn', 'gghhjhjhjjh', 'Gggggg', 'Ttttttt', '22222222'),
(19, 0, 'suresh', 'suresh@gmail.com', '123456', '1fffdfd', '4436', 'uploads\\1727294990498.jpg', '', '333434dsds', '334366', 'fdsdf', 'br', '2222222', 'Ab+', '223', '22222'),
(20, 0, 'Ramesh', 'Rameshk@gmail.com', '123456', 'my university', '1234', 'uploads\\1727309514854.jpg', '', '1234456', 'yyuuu', 'praveen', '1', '44355554', 'B+', 'good', 'all goood'),
(21, 0, 'testingnew', 'testnew@gmail.com', '123456', '', '', '', '', '', '', '', '', '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`news_id`);

--
-- Indexes for table `safe_zones`
--
ALTER TABLE `safe_zones`
  ADD PRIMARY KEY (`zone_id`);

--
-- Indexes for table `securityalerts`
--
ALTER TABLE `securityalerts`
  ADD PRIMARY KEY (`alert_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`user_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `news_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `safe_zones`
--
ALTER TABLE `safe_zones`
  MODIFY `zone_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `securityalerts`
--
ALTER TABLE `securityalerts`
  MODIFY `alert_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
