-- Add a column to track allocated licenses count in the subscriptions table
ALTER TABLE subscriptions
ADD COLUMN allocated_licenses INTEGER NOT NULL DEFAULT 0;
