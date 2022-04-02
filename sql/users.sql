-- Delete the users table
DROP TABLE users;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    auth_id VARCHAR(30) UNIQUE NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30)
);

-- Insert into the users table
INSERT INTO "users" (auth_id, first_name, last_name)
VALUES ('auth0|62422c51b0344000692f3c4c',
    'Robbie',
    'Ostermann');

-- Query the users table
SELECT *
FROM users
ORDER BY id;
