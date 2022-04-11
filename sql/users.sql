-- Delete the users table
-- DROP TABLE users;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    auth_id VARCHAR UNIQUE NOT NULL,
    permission_level SMALLINT NOT NULL CHECK (permission_level >= 0),
    email VARCHAR NOT NULL,
    first_name VARCHAR,
    last_name VARCHAR
);

-- Insert into the users table
INSERT INTO "users" (auth_id, permission_level, email, first_name, last_name)
VALUES (
    'testuser',
    1,
    'test@gmail.com',
    'test',
    'user'
);

-- Query the users table
SELECT *
FROM users
ORDER BY id;
