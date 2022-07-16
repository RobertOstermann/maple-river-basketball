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

ALTER TABLE entries
ADD date_created DATE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Insert into the entries table
-- INSERT INTO "entries" (auth_id, activity_type, activity_duration)
-- VALUES (
--     'testuser',
--     0,
--     30
-- );

-- Query the entries table
SELECT *
FROM entries
WHERE auth_id = 'auth0|624e0e86bee286006a6bff9d'
ORDER BY id;

SELECT
    entries.*,
    users.first_name,
    users.last_name
FROM entries
LEFT JOIN users ON users.auth_id = entries.auth_id
ORDER BY entries.auth_id ASC,
    entries.activity_date DESC,
    entries.activity_duration DESC;
