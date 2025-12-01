-- Reset all users - Setzt alle User zurück auf "nicht gezogen"
-- Run this in your Supabase SQL Editor

UPDATE users 
SET 
  has_picked = FALSE,
  picked_target = NULL,
  updated_at = TIMEZONE('utc'::text, NOW())
WHERE has_picked = TRUE;

-- Verify reset
SELECT slug, username, has_picked, picked_target FROM users ORDER BY username;

