INSERT INTO `users` (`name`, `email`, `password`, `created_at`, `updated_at`) VALUES
('Anan', 'anan55@gmail.com', '$2y$10$aOVO4CdHlNV5pP8UkFs98..JD9DsdO6jh8Wonrxfthu...', '2025-02-01 14:30:28', '2025-02-01 14:30:28'),
('Ratin', 'Ratin55@gmail.com', '$2y$10$nlWCS7XFNUl9uPlSLfDBH.OBUQmYvKiKi4iZVusveen...', '2025-02-01 15:11:59', '2025-02-01 15:11:59'),
('Ratin', 'Ratin550@gmail.com', '$2y$10$rs5SyhNjYLhoBs23aOjMve6c98wvNhpRGaOWUKPhKoK...', '2025-02-02 02:21:47', '2025-02-02 02:21:47');

/*
INSERT INTO `tourguides` (`name`, `email`, `password`, `phone`, `experience_years`, `specialization`, `rating`, `created_at`, `updated_at`) VALUES
('John Doe', 'johndoe@example.com', '$2y$10$abcd1234hash', '123-456-7890', 5, 'Historical Tours', 4.8, '2025-02-01 10:00:00', '2025-02-01 10:00:00'),
('Emma Smith', 'emmasmith@example.com', '$2y$10$xyz5678hash', '987-654-3210', 8, 'Adventure Tours', 4.9, '2025-02-01 11:00:00', '2025-02-01 11:00:00'),
('Liam Brown', 'liambrown@example.com', '$2y$10$efg3456hash', '555-123-4567', 6, 'Cultural Tours', 4.7, '2025-02-01 12:00:00', '2025-02-01 12:00:00');
*/

USE test_db;

-- Insert sample tour guide data with password field
INSERT INTO tour_guides (name, email, password, phone, experience, language, location) VALUES
('John Doe', 'johndoe@example.com', '$2y$10$examplehashedpassword1', '1234567890', 5, 'English, Spanish', 'New York'),
('Alice Smith', 'alice.smith@example.com', '$2y$10$examplehashedpassword2', '0987654321', 8, 'English, French', 'Los Angeles'),
('Michael Johnson', 'michael.johnson@example.com', '$2y$10$examplehashedpassword3', '1122334455', 10, 'English, German', 'Chicago'),
('Emma Brown', 'emma.brown@example.com', '$2y$10$examplehashedpassword4', '5566778899', 3, 'English', 'San Francisco'),
('David Williams', 'david.williams@example.com', '$2y$10$examplehashedpassword5', '6677889900', 7, 'English, Italian', 'Miami');

