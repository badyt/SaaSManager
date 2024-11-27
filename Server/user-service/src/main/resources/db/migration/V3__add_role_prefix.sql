-- Update role names to include the ROLE_ prefix

UPDATE roles
SET role_name = CONCAT('ROLE_', role_name)
WHERE role_name NOT LIKE 'ROLE_%';