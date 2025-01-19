-- Insert Catalog Data into Database
INSERT INTO catalog (name, description, default_cost, created_at)
VALUES
    ('Google Workspace', 'Productivity tools by Google', 6.00, CURRENT_TIMESTAMP),
    ('Slack', 'Messaging platform for teams', 7.50, CURRENT_TIMESTAMP),
    ('Microsoft 365', 'Productivity tools by Microsoft', 8.25, CURRENT_TIMESTAMP),
    ('Zoom', 'Video conferencing solution', 14.99, CURRENT_TIMESTAMP),
    ('Dropbox', 'Cloud storage service', 9.99, CURRENT_TIMESTAMP),
    ('Atlassian Jira', 'Project management and issue tracking', 7.00, CURRENT_TIMESTAMP),
    ('Salesforce', 'CRM and customer relationship management', 25.00, CURRENT_TIMESTAMP);
