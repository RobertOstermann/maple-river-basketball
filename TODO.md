# Users Table

ALTER TABLE "users"
ADD graduation_year SMALLINT NOT NULL DEFAULT 0;

# Entries Table

ALTER TABLE "entries"
ADD date_created DATE NOT NULL DEFAULT CURRENT_TIMESTAMP;
