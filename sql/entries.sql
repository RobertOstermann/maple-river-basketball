-- Delete the entries table
-- DROP TABLE entries;

-- Create the entries table
CREATE TABLE IF NOT EXISTS entries (
    id SERIAL PRIMARY KEY,
    auth_id VARCHAR REFERENCES users (auth_id),
    activity_type SMALLINT NOT NULL CHECK (activity_type >= 0),
    activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
    activity_duration INTEGER NOT NULL CHECK (activity_duration >= 0)
);

-- Insert into the entries table
INSERT INTO "entries" (auth_id, activity_type, activity_duration)
VALUES (
    'testuser',
    0,
    30
);

-- Query the entries table
SELECT *
FROM entries
ORDER BY id;
