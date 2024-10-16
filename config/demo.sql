-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 11 Okt 2024 pada 03.18
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `demo`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','employee','manager') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `picture` varchar(200) NOT NULL,
  `full_name` varchar(150) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `date_of_birth` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `nik` varchar(100) NOT NULL,
  `npwp` varchar(100) NOT NULL,
  `religion` varchar(100) NOT NULL,
  `marital_status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `created_at`, `picture`, `full_name`, `phone`, `date_of_birth`, `address`, `nik`, `npwp`, `religion`, `marital_status`) VALUES
(1, 'admin', 'admin@gmail.com', '$2a$10$1AyAY4hfLVOu7Tj2zpwYf.VEmliYKtAqGdKaqlWWwi6lauuz4O7hq', 'admin', '2024-10-09 07:38:16', '1728549058658-763628943.jpg', 'Fitri Hy', '081234567890', '', 'Jl. Merdeka No.100, Bintaro Sektor 9, Tangerang Selatan, Banten, 15229', '', '', '', ''),
(2, 'manager', 'manager@gmail.com', '$2a$10$wdsrAmbdIfakbS6XK7owNuxK/q6jQc9p5GNzln6mnoP/o0L/OlZ82', 'manager', '2024-10-09 10:27:21', '', '', '', '', '', '', '', '', ''),
(3, 'employee', 'employee@gmail.com', '$2a$10$2lMjEGwy6rI.t4/SxJi/hevYe1DucKQmzh83KrRQDXpYWZkSHtd1y', 'employee', '2024-10-09 10:28:29', '1728606894602-843498408.jpg', 'Jhon Doe', '085959595959', 'Jakarta, 12-10-2000', 'Jl, Merdeka Selatan No.50, Jakarta Selatan', '55000052569595148', '8888000000232225236', 'Islam', 'Sudah Kawin');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
