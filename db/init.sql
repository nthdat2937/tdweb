-- Drop existing indexes if they exist
drop index if exists profiles_username_idx;
drop index if exists profiles_user_id_idx;

-- Drop existing policies
drop policy if exists "Allow public read-only access" on profiles;
drop policy if exists "Allow authenticated insert access" on profiles;
drop policy if exists "Allow individual update access" on profiles;
drop policy if exists "Enable read access for all users" on profiles;
drop policy if exists "Enable insert for registration" on profiles;
drop policy if exists "Enable update for users based on user_id" on profiles;

-- Recreate table if needed
create table if not exists public.profiles (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users on delete cascade,
    username varchar(24) unique not null,
    email varchar(255) unique not null,
    created_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create policies
create policy "Enable read access for all users" on profiles
    for select using (true);

create policy "Enable insert for registration" on profiles
    for insert with check (true);

create policy "Enable update for users based on user_id" on profiles
    for update using (auth.uid() = user_id);

-- Create indexes
create index if not exists profiles_username_idx on profiles(username);
create index if not exists profiles_user_id_idx on profiles(user_id);
