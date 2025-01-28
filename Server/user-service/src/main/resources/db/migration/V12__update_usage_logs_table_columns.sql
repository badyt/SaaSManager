-- update usage_logs table, remove user and subscription id and put license id instead.

-- Remove the user_id column from the licenses table
ALTER TABLE usage_logs
DROP COLUMN user_id;

-- Remove the subscription_id column from the licenses table
ALTER TABLE usage_logs
DROP COLUMN subscription_id;

-- Add a column to usage_logs that indicates to the subscription id
ALTER TABLE usage_logs
ADD COLUMN license_id INTEGER REFERENCES licenses(license_id) ON DELETE CASCADE;
