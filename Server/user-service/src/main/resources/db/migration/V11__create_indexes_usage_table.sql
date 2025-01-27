-- create indexes on user and subscription id.
CREATE INDEX idx_usage_logs_user_id ON usage_logs(user_id);
CREATE INDEX idx_usage_logs_subscription_id ON usage_logs(subscription_id);