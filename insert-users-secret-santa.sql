-- Insert Users for Secret Santa
-- Run this in your Supabase SQL Editor
-- NO target_name needed - will be picked randomly!

INSERT INTO users (slug, username) VALUES
  ('metodij', 'metodij'),
  ('eleonora', 'eleonora'),
  ('nikola', 'nikola'),
  ('julija', 'julija'),
  ('marija', 'Marija'),
  ('trajce', 'Trajce'),
  ('elizabeta', 'Elizabeta'),
  ('gjorgi', 'Gjorgi'),
  ('ace', 'Ace'),
  ('desi', 'Desi'),
  ('mihail', 'Mihail'),
  ('emili', 'Emili'),
  ('anamia', 'AnaMia'),
  ('kire', 'Kire'),
  ('jovan', 'Jovan'),
  ('cece', 'Cece'),
  ('mare', 'Mare'),
  ('miki', 'Miki')
ON CONFLICT (slug) DO UPDATE 
SET username = EXCLUDED.username;

-- Verify users were inserted
SELECT slug, username, has_picked, picked_target FROM users ORDER BY username;

