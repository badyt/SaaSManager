-- Update_License_Subscription.sql

-- Remove the status column from the licenses table
ALTER TABLE licenses
DROP COLUMN status;

-- Add a column to subscriptions for the total number of licenses
ALTER TABLE subscriptions
ADD COLUMN license_count INTEGER NOT NULL;

-- Drop the subscription_users table if it is no longer relevant
DROP TABLE IF EXISTS subscription_users;

-- Drop existing indexes
DROP INDEX IF EXISTS idx_catalog_tool_id;
DROP INDEX IF EXISTS idx_subscriptions_tool_id;
DROP INDEX IF EXISTS idx_subscription_users_user_id;
DROP INDEX IF EXISTS idx_licenses_user_id;
DROP INDEX IF EXISTS idx_usage_logs_user_id;
DROP INDEX IF EXISTS idx_usage_logs_tool_id;
