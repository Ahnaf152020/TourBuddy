-- Create database if not exists
CREATE DATABASE IF NOT EXISTS test_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE test_db;

-- Drop table if it exists
DROP TABLE IF EXISTS tour_guides;

-- Create the 'tour_guides' table with nullable phone field and password field
CREATE TABLE tour_guides (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) DEFAULT NULL,  -- Make phone field nullable
    password VARCHAR(255) NOT NULL,  -- Add password field to store hashed passwords
    experience  DEFAULT INT NOT NULL,
    location VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
