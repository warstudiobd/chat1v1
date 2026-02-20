-- Create profiles table for LotChat users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  phone text,
  gender text default 'other',
  bio text default '',
  country text default '',
  diamonds integer default 10000,
  beans integer default 0,
  level integer default 1,
  xp integer default 0,
  role text default 'user' check (role in ('user', 'host', 'vip', 'svip', 'moderator', 'admin')),
  is_online boolean default false,
  is_banned boolean default false,
  anti_kick boolean default false,
  vip_expiry timestamptz,
  svip_expiry timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- Users can read all profiles (for discovery)
create policy "profiles_select_all" on public.profiles for select using (true);

-- Users can only insert/update/delete their own profile
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_delete_own" on public.profiles for delete using (auth.uid() = id);
