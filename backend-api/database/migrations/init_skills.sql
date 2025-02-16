CREATE TABLE skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    guide_id INT NOT NULL,
    years_of_experience INT NOT NULL,
    language_proficiency VARCHAR(255) NOT NULL,
    FOREIGN KEY (guide_id) REFERENCES tour_guides(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
