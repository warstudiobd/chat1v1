-- Seed demo voice rooms (using a dummy owner_id that will work if profiles exist)
-- First, let's check what profiles exist and create rooms for them

-- Insert demo voice rooms only if there are profiles to own them
DO $$
DECLARE
  first_user_id uuid;
BEGIN
  -- Try to get a real user ID from existing profiles
  SELECT id INTO first_user_id FROM public.profiles LIMIT 1;

  -- If no users exist, we'll skip room creation
  IF first_user_id IS NOT NULL THEN
    -- Insert demo voice rooms
    INSERT INTO public.voice_rooms (name, owner_id, category, max_seats, viewer_count, is_live)
    VALUES
      ('Chill Vibes Only', first_user_id, 'Chill', 8, 42, true),
      ('Late Night Music', first_user_id, 'Music', 8, 128, true),
      ('Gaming Squad', first_user_id, 'Gaming', 6, 23, true),
      ('Study Together', first_user_id, 'Study', 4, 15, true),
      ('Party Room', first_user_id, 'Party', 8, 67, true),
      ('Open Chat', first_user_id, 'Chat', 8, 89, true),
      ('Dating Lounge', first_user_id, 'Dating', 4, 31, false),
      ('Music Producers', first_user_id, 'Music', 6, 52, true)
    ON CONFLICT DO NOTHING;
  END IF;
END $$;
