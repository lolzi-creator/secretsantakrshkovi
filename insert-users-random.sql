-- Insert Users for Random Secret Santa
-- Run this in your Supabase SQL Editor
-- NO target_name needed - will be picked randomly!

INSERT INTO users (slug, username) VALUES
  ('alice', 'Alice'),
  ('bob', 'Bob'),
  ('charlie', 'Charlie'),
  ('diana', 'Diana'),
  ('eve', 'Eve'),
  ('frank', 'Frank'),
  ('grace', 'Grace'),
  ('henry', 'Henry')
ON CONFLICT (slug) DO NOTHING;

-- Verify users were inserted
SELECT slug, username, has_picked, picked_target FROM users ORDER BY username;

