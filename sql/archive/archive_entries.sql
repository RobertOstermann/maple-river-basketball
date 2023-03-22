-- Delete the entries table
-- DROP TABLE entries;

-- Create the entries table
CREATE TABLE IF NOT EXISTS archive_entries (
    id SERIAL PRIMARY KEY,
    auth_id VARCHAR REFERENCES users (auth_id),
    activity_type SMALLINT NOT NULL CHECK (activity_type >= 0) REFERENCES activity_types (activity_id),
    activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
    activity_duration INTEGER NOT NULL CHECK (activity_duration >= 0),
    date_created DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Copy from entries table
INSERT INTO archive_entries
SELECT * FROM entries;

-- Query the archive entries table
SELECT
    archive_entries.*,
    users.first_name,
    users.last_name
FROM archive_entries
LEFT JOIN users ON users.auth_id = archive_entries.auth_id
ORDER BY archive_entries.auth_id ASC,
    archive_entries.activity_date DESC,
    archive_entries.activity_duration DESC;
