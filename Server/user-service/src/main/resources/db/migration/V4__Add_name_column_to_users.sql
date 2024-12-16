-- V4__Add_name_column_to_users.sql
-- Add a 'name' column to the 'users' table with a default value and NOT NULL constraint

ALTER TABLE users
ADD COLUMN name VARCHAR(255) DEFAULT 'Unknown' NOT NULL;
