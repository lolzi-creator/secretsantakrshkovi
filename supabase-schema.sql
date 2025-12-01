-- Secret Santa Users Table
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  username TEXT NOT NULL,
  target_name TEXT NOT NULL,
  has_picked BOOLEAN DEFAULT FALSE,
  picked_target TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_slug ON users(slug);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read (for the app)
CREATE POLICY "Allow public read access" ON users
  FOR SELECT
  USING (true);

-- Create policy to allow updates (for saving picked targets)
CREATE POLICY "Allow public update access" ON users
  FOR UPDATE
  USING (true);

-- Create a function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Example: Insert some users (adjust as needed)
-- INSERT INTO users (slug, username, target_name) VALUES
--   ('alice', 'Alice', 'Bob'),
--   ('bob', 'Bob', 'Charlie'),
--   ('charlie', 'Charlie', 'Diana');

