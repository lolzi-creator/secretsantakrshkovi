-- Update Schema: Remove target_name column (not needed for random picking)
-- Run this in your Supabase SQL Editor

-- First, drop the column if it exists
ALTER TABLE users DROP COLUMN IF EXISTS target_name;

-- Make sure picked_target can be null (already should be, but just in case)
ALTER TABLE users ALTER COLUMN picked_target DROP NOT NULL;

-- The table should now have:
-- id, slug, username, has_picked, picked_target, created_at, updated_at

