-- Delete the activity_types table
-- DROP TABLE activity_types;

-- Create the activity_types table
CREATE TABLE IF NOT EXISTS activity_types (
    id SERIAL PRIMARY KEY,
    activity_id SMALLINT UNIQUE NOT NULL,
    activity_text VARCHAR NOT NULL
);

-- Insert into the activity_types table
INSERT INTO activity_types (activity_id, activity_text)
VALUES
(0, 'Game'),
(1, 'Shooting'),
(2, 'Skills (camp, ball handling, drills, etc)'),
(3, 'Community Service'),
(4, 'Weight Room');

-- Query the activity_types table
SELECT *
FROM activity_types;
