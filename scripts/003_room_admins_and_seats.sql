-- Migration: Add room_admins table and seat lock/invite columns

-- 1. Create room_admins table
CREATE TABLE IF NOT EXISTS public.room_admins (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id uuid REFERENCES public.voice_rooms(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  appointed_by uuid REFERENCES public.profiles(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE(room_id, user_id)
);

ALTER TABLE public.room_admins ENABLE ROW LEVEL SECURITY;

-- RLS: Anyone authenticated can see admins
CREATE POLICY "admins_select" ON public.room_admins
  FOR SELECT TO authenticated USING (true);

-- RLS: Only room owner can insert admins
CREATE POLICY "admins_insert" ON public.room_admins
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.voice_rooms
      WHERE id = room_id AND owner_id = auth.uid()
    )
  );

-- RLS: Only room owner can remove admins
CREATE POLICY "admins_delete" ON public.room_admins
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.voice_rooms
      WHERE id = room_id AND owner_id = auth.uid()
    )
  );

-- 2. Add columns to room_seats
ALTER TABLE public.room_seats
  ADD COLUMN IF NOT EXISTS is_locked boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS invited_user_id uuid REFERENCES public.profiles(id);
