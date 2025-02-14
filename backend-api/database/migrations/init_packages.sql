CREATE TABLE package (
    id INT AUTO_INCREMENT PRIMARY KEY,
    price DECIMAL(10, 2) NOT NULL,  -- Assuming price is a decimal value (e.g., 199.99)
    description TEXT NOT NULL,      -- For the package description
    duration INT NOT NULL,          -- Assuming duration is in days
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
