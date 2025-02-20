INSERT INTO users (user_id, email, password, created_at, status, role_id, name)
VALUES
    (1, 'admin@example.com', '$2a$10$4UHRurjFv3EYDCejXJrbhOx96sGmIUN2zTIrGLL.cEHFOgT5jW116', '2025-02-14 20:54:00.508361', 'active', 2, 'admin'),
    (2, 'user@example.com', '$2a$10$TG2JUpjIZTVhgvqOrpLS8eM/lDYw3qaWnUu18GpQ1CdMl04f4NqcW', '2025-02-14 20:54:21.817986', 'active', 1, 'user'),
    (3, 'sara@example.com', '$2a$10$aIC0/0fZ7oSW3DRwxaRBaOYANBpghCmGVSFJ.ff4bn.A9olbhHqfq', '2025-02-14 20:55:06.367263', 'active', 1, 'sara'),
    (4, 'alex@example.com', '$2a$10$T3vqfSg0mviVlTZ83.GQi.9swQ5ZBAYKCo/lxOXtfpeCm4pLy1bcy', '2025-02-14 20:54:48.832724', 'active', 1, 'alex'),
    (5, 'maya@example.com', '$2a$10$5I/6FzIZ5sNSsVaq5P8TL.MkZF.LFOtrL0RfrugZIzc6o3Y6lMahS', '2025-02-14 20:55:26.051565', 'active', 1, 'maya'),
    (6, 'messi@example.com', '$2a$10$/OSYvoxrmXrTZDKCmS6pYeaXzVYOIvJTYl4fp/J1qupMN6Ru4Dk9q', '2025-02-14 20:56:11.227207', 'active', 2, 'messi'),
    (7, 'rachel@example.com', '$2a$10$4x43708syOvcA7fqX1g.v.5CAvB7jyApXYnxwe793cXC3rXyqBBxS', '2025-02-14 20:56:42.725071', 'active', 1, 'rachel'),
    (8, 'joey@example.com', '$2a$10$tAyvJ8nV3SCnCMbaZS2Io.DCSehg6TtIALvPobrflQVQgyxUnKkym', '2025-02-14 20:57:54.742203', 'active', 1, 'joey'),
    (9, 'umtiti@example.com', '$2a$10$N2aSQVm.yB25bPa.sSj31egDKAZR9Cdx8a9l09CgVdsbDzaXuq/uK', '2025-02-14 20:58:16.619975', 'active', 1, 'umtiti'),
    (10, 'raphina@example.com', '$2a$10$u8rsG74FwCJFjQGb/e3nre0RTQ33mttoce49UwBLUiwE2mLFhnsl2', '2025-02-14 20:59:08.005868', 'active', 1, 'raphina');

INSERT INTO teams (team_id, team_name, created_by, description)
VALUES
    (1, 'Fullstack Development', 1, 'Fullstack Development Team'),
    (2, 'Devops', 1, 'Devops Team');

INSERT INTO user_teams(user_id, team_id)
VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 1),
    (6, 2),
    (7, 2),
    (8, 2),
    (9, 2),
    (10, 2);

INSERT INTO subscriptions(subscription_id, tool_id, renewal_date, cost, created_at, license_count, allocated_licenses)
VALUES
    (1, 1, '2025-08-21', 60.00, '2025-01-21 18:46:07.179346', 10, 10),
    (2, 4, '2025-08-21', 149.90, '2025-01-22 18:49:50.036414', 10,10),
    (3, 2, '2025-08-21', 75.00, '2025-01-22 18:52:50.036414', 10,5);

INSERT INTO licenses(license_id, subscription_id, user_id, allocated_at, last_used_at)
VALUES
    (1, 1, 1, '2025-01-23 17:49:10.686494', '2025-01-23 17:49:10.686494'),
    (2, 1, 2, '2025-01-23 17:49:10.686494', '2025-01-29 17:57:39.838726'),
    (3, 1, 3, '2025-01-23 17:49:10.686494', '2025-01-29 17:57:46.727414'),
    (4, 1, 4, '2025-01-23 17:49:10.686494', '2025-01-29 17:57:42.493634'),
    (5, 1, 5, '2025-01-23 17:49:10.686494', '2025-01-29 17:57:16.843126'),
    (6, 1, 6, '2025-01-23 17:49:10.686494', '2025-01-23 17:49:10.686494'),
    (7, 1, 7, '2025-01-23 17:49:10.686494', '2025-01-23 17:49:10.686494'),
    (8, 1, 8, '2025-01-23 17:49:10.686494', '2025-01-23 17:49:10.686494'),
    (9, 1, 9, '2025-01-23 17:49:10.686494', '2025-01-29 17:57:49.312229'),
    (10, 1, 10, '2025-01-23 17:49:10.686494', '2025-01-29 17:57:54.000556'),
    (11, 2, 1, '2025-01-23 17:49:10.686494', '2025-01-29 17:57:51.742903'),
    (12, 2, 2, '2025-01-23 17:49:10.686494', '2025-01-29 17:57:30.557771'),
    (13, 2, 3, '2025-01-23 17:49:10.686494', '2025-01-23 17:49:10.686494'),
    (14, 2, 4, '2025-01-23 17:49:10.686494', '2025-01-23 17:49:10.686494'),
    (15, 2, 5, '2025-01-23 17:49:10.686494', '2025-01-29 17:57:37.695431'),
    (16, 2, 6, '2025-01-23 17:49:10.686494', '2025-01-23 17:49:10.686494'),
    (17, 2, 7, '2025-01-23 17:49:10.686494', '2025-01-23 17:49:10.686494'),
    (18, 2, 8, '2025-01-23 17:49:10.686494', '2025-01-23 17:49:10.686494'),
    (19, 2, 9, '2025-01-23 17:49:10.686494', '2025-01-23 17:49:10.686494'),
    (20, 2, 10, '2025-01-23 17:49:10.686494', '2025-01-29 17:57:24.135705'),
    (21, 3, 1, '2025-01-23 17:49:10.686494', '2025-01-23 17:49:10.686494'),
    (22, 3, 2, '2025-01-23 17:49:10.686494', '2025-01-29 17:57:26.820262'),
    (23, 3, 3, '2025-01-23 17:49:10.686494', '2025-01-23 17:49:10.686494'),
    (24, 3, 4, '2025-01-23 17:49:10.686494', '2025-01-23 17:49:10.686494'),
    (25, 3, 5, '2025-01-23 17:49:10.686494', '2025-01-23 17:49:10.686494');

INSERT INTO usage_logs(log_id, activity_date, activity_type, license_id)
VALUES
    (1, '2025-01-28 16:32:34.416899', 'used', 5),
    (2, '2025-01-29 17:57:08.467367', 'used', 5),
    (3, '2025-01-29 17:57:11.912917', 'used', 5),
    (4, '2025-01-29 17:57:14.266189', 'used', 5),
    (5, '2025-01-29 17:57:16.843126', 'used', 5),
    (6, '2025-01-29 17:57:18.62113', 'used', 2),
    (7, '2025-01-29 17:57:21.227549', 'used', 11),
    (8, '2025-01-29 17:57:24.135705', 'used', 20),
    (9, '2025-01-29 17:57:26.820262', 'used', 22),
    (10, '2025-01-29 17:57:30.557771', 'used', 12),
    (11, '2025-01-29 17:57:33.417376', 'used', 11),
    (12, '2025-01-29 17:57:35.717973', 'used', 11),
    (13, '2025-01-29 17:57:37.695431', 'used', 15),
    (14, '2025-01-29 17:57:39.838726', 'used', 2),
    (15, '2025-01-29 17:57:42.493634', 'used', 4),
    (16, '2025-01-29 17:57:44.509964', 'used', 3),
    (17, '2025-01-29 17:57:46.727414', 'used', 3),
    (18, '2025-01-29 17:57:49.312229', 'used', 9),
    (19, '2025-01-29 17:57:51.742903', 'used', 11),
    (20, '2025-01-29 17:57:54.000556', 'used', 10);
