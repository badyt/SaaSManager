-- Create the Catalog table
CREATE TABLE catalog (
    tool_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    default_cost DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Subscriptions table
CREATE TABLE subscriptions (
    subscription_id SERIAL PRIMARY KEY,
    tool_id INTEGER REFERENCES catalog(tool_id) ON DELETE CASCADE,
    renewal_date DATE,
    cost DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Subscription Users table
CREATE TABLE subscription_users (
    id SERIAL PRIMARY KEY,
    subscription_id INTEGER REFERENCES subscriptions(subscription_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    allocated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Licenses table
CREATE TABLE licenses (
    license_id SERIAL PRIMARY KEY,
    subscription_id INTEGER REFERENCES subscriptions(subscription_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    allocated_at TIMESTAMP,
    status VARCHAR(50) CHECK (status IN ('allocated', 'unallocated')),
    last_used_at TIMESTAMP
);

-- Create the Usage Logs table
CREATE TABLE usage_logs (
    log_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    tool_id INTEGER REFERENCES catalog(tool_id) ON DELETE CASCADE,
    activity_date TIMESTAMP,
    activity_type VARCHAR(255)
);

-- Create indexes for performance
CREATE INDEX idx_catalog_tool_id ON catalog(tool_id);
CREATE INDEX idx_subscriptions_tool_id ON subscriptions(tool_id);
CREATE INDEX idx_subscription_users_user_id ON subscription_users(user_id);
CREATE INDEX idx_licenses_user_id ON licenses(user_id);
CREATE INDEX idx_usage_logs_user_id ON usage_logs(user_id);
CREATE INDEX idx_usage_logs_tool_id ON usage_logs(tool_id);

