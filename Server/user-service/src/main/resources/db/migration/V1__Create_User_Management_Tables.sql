-- Create the Roles table
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

-- Create the Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active',
    role_id INTEGER REFERENCES roles(role_id) ON DELETE SET NULL -- Allows setting to NULL if role is deleted
);

-- Create the Teams table
CREATE TABLE teams (
    team_id SERIAL PRIMARY KEY,
    team_name VARCHAR(100) NOT NULL,
    created_by INTEGER REFERENCES users(user_id) ON DELETE SET NULL -- Sets creator to NULL if user is deleted
);

-- Create the UserTeams join table for the many-to-many relationship
CREATE TABLE user_teams (
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE, -- Deletes entries in user_teams if user is deleted
    team_id INTEGER REFERENCES teams(team_id) ON DELETE CASCADE, -- Deletes entries in user_teams if team is deleted
    PRIMARY KEY (user_id, team_id)
);

-- Optional: Indexes on foreign keys for performance
CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_teams_created_by ON teams(created_by);
CREATE INDEX idx_user_teams_user_id ON user_teams(user_id);
CREATE INDEX idx_user_teams_team_id ON user_teams(team_id);
