-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    email VARCHAR(30)
);

-- Delete the users table
-- DROP TABLE users;

-- Insert into the users table
INSERT INTO "users" (first_name, email)
VALUES
('admin', 'admin@example.com'),
('coach', 'coach@example.com'),
('player', 'player@example.com');

-- Query the users table
SELECT *
FROM users
ORDER BY id;
