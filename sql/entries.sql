-- Delete the entries table
DROP TABLE entries;

-- Create the entries table
CREATE TABLE IF NOT EXISTS entries (
    id SERIAL PRIMARY KEY,
    auth_id VARCHAR REFERENCES users (auth_id),
    activity VARCHAR NOT NULL,
    activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
    activity_duration INTEGER NOT NULL
);

-- Insert into the entries table
INSERT INTO "entries" (auth_id, activity, activity_duration)
VALUES (
    'auth0|62422c51b0344000692f3c4c',
    'Game',
    30
);

-- Query the entries table
SELECT *
FROM entries
ORDER BY id;
