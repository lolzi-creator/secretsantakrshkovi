-- Insert Users from data/users.ts
-- Run this in your Supabase SQL Editor after creating the table

INSERT INTO users (slug, username, target_name) VALUES
  ('alice', 'Alice', 'Bob'),
  ('bob', 'Bob', 'Charlie'),
  ('charlie', 'Charlie', 'Diana'),
  ('diana', 'Diana', 'Eve'),
  ('eve', 'Eve', 'Frank'),
  ('frank', 'Frank', 'Grace'),
  ('grace', 'Grace', 'Henry'),
  ('henry', 'Henry', 'Alice')
ON CONFLICT (slug) DO NOTHING;

-- Verify users were inserted
SELECT * FROM users ORDER BY username;

