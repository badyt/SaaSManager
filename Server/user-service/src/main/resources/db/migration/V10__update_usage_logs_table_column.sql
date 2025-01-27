-- update usage_logs table, remove tool id and add subscription id instead.

-- Remove the tool_id column from the licenses table
ALTER TABLE usage_logs
DROP COLUMN tool_id;

-- Add a column to usage_logs that indicates to the subscription id
ALTER TABLE usage_logs
ADD COLUMN subscription_id INTEGER REFERENCES subscriptions(subscription_id) ON DELETE CASCADE;
