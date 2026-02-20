-- Friendships / Follow system
create table if not exists public.friendships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  friend_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'blocked')),
  created_at timestamptz not null default now(),
  unique(user_id, friend_id)
);
alter table public.friendships enable row level security;
create policy "friendships_select" on public.friendships for select using (auth.uid() = user_id or auth.uid() = friend_id);
create policy "friendships_insert" on public.friendships for insert with check (auth.uid() = user_id);
create policy "friendships_update" on public.friendships for update using (auth.uid() = user_id or auth.uid() = friend_id);
create policy "friendships_delete" on public.friendships for delete using (auth.uid() = user_id);

-- User follows
create table if not exists public.user_follows (
  follower_id uuid not null references auth.users(id) on delete cascade,
  following_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id)
);
alter table public.user_follows enable row level security;
create policy "follows_select" on public.user_follows for select using (true);
create policy "follows_insert" on public.user_follows for insert with check (auth.uid() = follower_id);
create policy "follows_delete" on public.user_follows for delete using (auth.uid() = follower_id);

-- Messages (1-on-1 chat)
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references auth.users(id) on delete cascade,
  receiver_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  msg_type text not null default 'text' check (msg_type in ('text', 'image', 'voice', 'gift', 'system')),
  gift_type text,
  diamond_cost integer default 0,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.messages enable row level security;
create policy "messages_select" on public.messages for select using (auth.uid() = sender_id or auth.uid() = receiver_id);
create policy "messages_insert" on public.messages for insert with check (auth.uid() = sender_id);
create policy "messages_update" on public.messages for update using (auth.uid() = receiver_id);

-- Voice rooms
create table if not exists public.voice_rooms (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text default '',
  cover_url text,
  category text not null default 'chat' check (category in ('chat', 'music', 'gaming', 'dating', 'party')),
  max_seats integer not null default 8,
  is_live boolean not null default false,
  viewer_count integer not null default 0,
  created_at timestamptz not null default now()
);
alter table public.voice_rooms enable row level security;
create policy "rooms_select" on public.voice_rooms for select using (true);
create policy "rooms_insert" on public.voice_rooms for insert with check (auth.uid() = owner_id);
create policy "rooms_update" on public.voice_rooms for update using (auth.uid() = owner_id);
create policy "rooms_delete" on public.voice_rooms for delete using (auth.uid() = owner_id);

-- Room seats
create table if not exists public.room_seats (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.voice_rooms(id) on delete cascade,
  seat_number integer not null,
  user_id uuid references auth.users(id) on delete set null,
  is_muted boolean not null default false,
  joined_at timestamptz default now(),
  unique(room_id, seat_number)
);
alter table public.room_seats enable row level security;
create policy "seats_select" on public.room_seats for select using (true);
create policy "seats_insert" on public.room_seats for insert with check (true);
create policy "seats_update" on public.room_seats for update using (true);
create policy "seats_delete" on public.room_seats for delete using (true);

-- Gifts sent (transaction log)
create table if not exists public.gifts_sent (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references auth.users(id) on delete cascade,
  receiver_id uuid not null references auth.users(id) on delete cascade,
  room_id uuid references public.voice_rooms(id) on delete set null,
  gift_type text not null,
  gift_name text not null,
  diamond_cost integer not null,
  created_at timestamptz not null default now()
);
alter table public.gifts_sent enable row level security;
create policy "gifts_select" on public.gifts_sent for select using (auth.uid() = sender_id or auth.uid() = receiver_id);
create policy "gifts_insert" on public.gifts_sent for insert with check (auth.uid() = sender_id);

-- Transactions (diamond/bean movements)
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tx_type text not null check (tx_type in ('purchase', 'gift_sent', 'gift_received', 'game_bet', 'game_win', 'withdrawal', 'bonus')),
  amount integer not null,
  currency text not null default 'diamonds' check (currency in ('diamonds', 'beans')),
  description text,
  ref_id uuid,
  created_at timestamptz not null default now()
);
alter table public.transactions enable row level security;
create policy "transactions_select" on public.transactions for select using (auth.uid() = user_id);
create policy "transactions_insert" on public.transactions for insert with check (auth.uid() = user_id);

-- Notifications
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  notif_type text not null check (notif_type in ('friend_request', 'message', 'gift', 'follow', 'system', 'room_invite')),
  title text not null,
  body text,
  from_user_id uuid references auth.users(id) on delete set null,
  ref_id uuid,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.notifications enable row level security;
create policy "notifs_select" on public.notifications for select using (auth.uid() = user_id);
create policy "notifs_insert" on public.notifications for insert with check (true);
create policy "notifs_update" on public.notifications for update using (auth.uid() = user_id);

-- Indexes for performance
create index if not exists idx_messages_sender on public.messages(sender_id, created_at desc);
create index if not exists idx_messages_receiver on public.messages(receiver_id, created_at desc);
create index if not exists idx_friendships_user on public.friendships(user_id, status);
create index if not exists idx_friendships_friend on public.friendships(friend_id, status);
create index if not exists idx_rooms_live on public.voice_rooms(is_live, viewer_count desc);
create index if not exists idx_notifications_user on public.notifications(user_id, is_read, created_at desc);
create index if not exists idx_gifts_receiver on public.gifts_sent(receiver_id, created_at desc);
create index if not exists idx_transactions_user on public.transactions(user_id, created_at desc);
