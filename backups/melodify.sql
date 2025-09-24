-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th9 24, 2025 lúc 04:05 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `melodify`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `artist_followers`
--

CREATE TABLE `artist_followers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `artist_id` bigint(20) UNSIGNED NOT NULL,
  `follower_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Nhạc trẻ', 'Là dòng nhạc phổ biến hướng đến giới trẻ, thường mang giai điệu tươi mới, dễ nghe, dễ nhớ và phản ánh những cảm xúc gần gũi trong tình yêu, tình bạn, cuộc sống hàng ngày.', '2025-09-24 06:23:36', '2025-09-24 06:25:11'),
(2, 'Pop', 'Thể loại nhạc đại chúng, giai điệu bắt tai, ca từ gần gũi, có tính giải trí cao.', '2025-09-24 06:24:22', '2025-09-24 06:24:22'),
(3, 'R&B', 'Âm nhạc có nguồn gốc từ nhạc Blues và Jazz, thường có giai điệu ngọt ngào, tinh tế, tập trung vào giọng hát và cảm xúc.', '2025-09-24 06:24:34', '2025-09-24 06:24:34'),
(4, 'Ballad', 'Thể loại nhạc có giai điệu chậm rãi, trữ tình, thường chú trọng vào ca từ sâu lắng, dễ chạm đến cảm xúc người nghe, đặc biệt là trong những bài hát về tình yêu và tâm sự.', '2025-09-24 06:25:22', '2025-09-24 06:25:22');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_01_05_064341_create_category_tables', 1),
(5, '2025_01_05_100915_add_follower_and_description_to_users_table', 1),
(6, '2025_01_05_101157_create_request_to_artist_table', 1),
(7, '2025_01_06_014249_create_songs_table', 1),
(8, '2025_01_06_223316_create_artist_followers_table', 1),
(9, '2025_01_06_235418_create_user_song_loves_table', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `request_to_artist`
--

CREATE TABLE `request_to_artist` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `description` text NOT NULL,
  `state` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `request_to_artist`
--

INSERT INTO `request_to_artist` (`id`, `user_id`, `description`, `state`, `created_at`, `updated_at`) VALUES
(1, 3, 'sjeoelk', 'rejected', '2025-09-24 06:39:53', '2025-09-24 06:40:09'),
(2, 3, '222', 'approved', '2025-09-24 06:40:39', '2025-09-24 06:40:44');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('9iFKPGxS2UTxZVHZFUMkuTd2wg7ErnjiW37iQz7V', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiQUs5U00yTlNlMU5YNUhNTnFhajFndDJ6QTJTcW5QdHVMNlhESVkyNiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czozOiJ1cmwiO2E6MDp7fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1758722552),
('Nlk06hhJUWDYPfbxpPQ9nbMuDn8CmZkDLoftjNmA', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiZGRSTTA2dHBNWDQxeEltMGJ1RUhMVzJRVVRSNVNnNG1FMW9EeXhaeSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTQ6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi91c2Vycy9yZXF1ZXN0LXRvLWJlLWFydGlzdCI7fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1758721431),
('ysL0BsQezwpcSMbF5Sw5dBJUILwa9xgLGduPmKb2', 3, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiZ25ZaE42dlVuSVNBc1Q2YTBVZk5LbWFMWFhGQjZQMjZEQWM5ZHFiRCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wcm9maWxlIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6Mzt9', 1758721287);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `songs`
--

CREATE TABLE `songs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `duration` int(11) NOT NULL COMMENT 'Duration in seconds',
  `image` varchar(255) DEFAULT NULL COMMENT 'Path to the song image',
  `audio` varchar(255) NOT NULL COMMENT 'Path to the song audio file',
  `love_count` int(11) NOT NULL DEFAULT 0 COMMENT 'Number of people who love this song',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `songs`
--

INSERT INTO `songs` (`id`, `title`, `duration`, `image`, `audio`, `love_count`, `created_at`, `updated_at`) VALUES
(1, 'Chúng Ta Của Tương Lai', 326, 'http://127.0.0.1:8000/storage/images/Hy7xHUOrwpqN5nnsF8qLMHk2V3Fm3A97Dra35W4g.png', 'http://127.0.0.1:8000/storage/audios/chung-ta-cua-tuong-lai.mp3', 0, '2025-09-24 06:31:09', '2025-09-24 06:31:09');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `song_artist`
--

CREATE TABLE `song_artist` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `song_id` bigint(20) UNSIGNED NOT NULL,
  `artist_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `song_artist`
--

INSERT INTO `song_artist` (`id`, `song_id`, `artist_id`, `created_at`, `updated_at`) VALUES
(1, 1, 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `song_genre`
--

CREATE TABLE `song_genre` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `song_id` bigint(20) UNSIGNED NOT NULL,
  `genre_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `song_genre`
--

INSERT INTO `song_genre` (`id`, `song_id`, `genre_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, NULL),
(2, 1, 2, NULL, NULL),
(3, 1, 3, NULL, NULL),
(4, 1, 4, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `follower` int(11) NOT NULL DEFAULT 0,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `email_verified_at`, `birth_date`, `gender`, `nationality`, `avatar`, `password`, `remember_token`, `created_at`, `updated_at`, `follower`, `description`) VALUES
(1, 'DUONG MINH TIEN', 'okay7290@gmail.com', 'admin', NULL, NULL, NULL, NULL, NULL, '$2y$12$D1mdcJVnL9VVdRkkXxSd1.pVzNCQZmGRrb8I6yIYpCWfPQ91w8EU2', NULL, '2025-09-24 06:03:03', '2025-09-24 06:03:03', 0, NULL),
(2, 'Sơn Tùng MTP', 'partners@mtpentertainment.com', 'artist', NULL, '1994-07-05', 'male', 'vn', 'http://127.0.0.1:8000/storage/avatars/TpedohpAT7J8QctG83VkyR4lqRP8V6yZBimSE5Ma.webp', '$2y$12$dJiHzQQZ5gXrMTpJr39Zg.k8Xx4fQsF.UrG7KezobY5kjMOybwqci', NULL, '2025-09-24 06:04:42', '2025-09-24 06:33:23', 0, NULL),
(3, 'user2', 'user2@gmail.com', 'user', NULL, NULL, NULL, NULL, NULL, '$2y$12$oF1LqGGWfd1tYmnoFBr1jeWH/d5rtifAjqxq8sAd61hkZoYBIKPcC', NULL, '2025-09-24 06:39:37', '2025-09-24 06:43:51', 0, '222');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_song_loves`
--

CREATE TABLE `user_song_loves` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `song_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `artist_followers`
--
ALTER TABLE `artist_followers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `artist_followers_artist_id_foreign` (`artist_id`),
  ADD KEY `artist_followers_follower_id_foreign` (`follower_id`);

--
-- Chỉ mục cho bảng `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Chỉ mục cho bảng `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Chỉ mục cho bảng `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Chỉ mục cho bảng `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Chỉ mục cho bảng `request_to_artist`
--
ALTER TABLE `request_to_artist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `request_to_artist_user_id_foreign` (`user_id`);

--
-- Chỉ mục cho bảng `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Chỉ mục cho bảng `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `song_artist`
--
ALTER TABLE `song_artist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `song_artist_song_id_foreign` (`song_id`),
  ADD KEY `song_artist_artist_id_foreign` (`artist_id`);

--
-- Chỉ mục cho bảng `song_genre`
--
ALTER TABLE `song_genre`
  ADD PRIMARY KEY (`id`),
  ADD KEY `song_genre_song_id_foreign` (`song_id`),
  ADD KEY `song_genre_genre_id_foreign` (`genre_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Chỉ mục cho bảng `user_song_loves`
--
ALTER TABLE `user_song_loves`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_song_loves_user_id_song_id_unique` (`user_id`,`song_id`),
  ADD KEY `user_song_loves_song_id_foreign` (`song_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `artist_followers`
--
ALTER TABLE `artist_followers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `request_to_artist`
--
ALTER TABLE `request_to_artist`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `songs`
--
ALTER TABLE `songs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `song_artist`
--
ALTER TABLE `song_artist`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `song_genre`
--
ALTER TABLE `song_genre`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `user_song_loves`
--
ALTER TABLE `user_song_loves`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `artist_followers`
--
ALTER TABLE `artist_followers`
  ADD CONSTRAINT `artist_followers_artist_id_foreign` FOREIGN KEY (`artist_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `artist_followers_follower_id_foreign` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `request_to_artist`
--
ALTER TABLE `request_to_artist`
  ADD CONSTRAINT `request_to_artist_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `song_artist`
--
ALTER TABLE `song_artist`
  ADD CONSTRAINT `song_artist_artist_id_foreign` FOREIGN KEY (`artist_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `song_artist_song_id_foreign` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `song_genre`
--
ALTER TABLE `song_genre`
  ADD CONSTRAINT `song_genre_genre_id_foreign` FOREIGN KEY (`genre_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `song_genre_song_id_foreign` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `user_song_loves`
--
ALTER TABLE `user_song_loves`
  ADD CONSTRAINT `user_song_loves_song_id_foreign` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_song_loves_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
