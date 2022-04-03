-- Delete the users table
DROP TABLE users;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    auth_id VARCHAR UNIQUE NOT NULL,
    email VARCHAR NOT NULL,
    first_name VARCHAR,
    last_name VARCHAR,
    permission VARCHAR NOT NULL
);

-- Insert into the users table
INSERT INTO "users" (auth_id, email, permission, first_name, last_name)
VALUES (
    'auth0|62422c51b0344000692f3c4d',
    'test@gmail.com',
    'coach',
    'test',
    'user'
);

-- Query the users table
SELECT *
FROM users
ORDER BY id;
