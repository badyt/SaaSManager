-- V4__Add_description_column_to_teams.sql
-- Add a 'description' column to the 'teams' table with a default value and NOT NULL constraint

ALTER TABLE teams
ADD COLUMN description VARCHAR(255) DEFAULT 'Default Team' NOT NULL;