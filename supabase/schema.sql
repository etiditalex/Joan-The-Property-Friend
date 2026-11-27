-- Joan Property Friend. Run this in the Supabase SQL editor.
-- Desk logins live in Authentication, not in these tables.
-- Create the first user under Authentication → Users (email and password, confirmed).
-- Further admins and managers are created from the desk Team page.

create table if not exists properties (
  id text primary key,
  type text not null,
  type_label text not null,
  area text not null,
  title text not null,
  place text not null,
  price bigint not null,
  status text not null default 'Available',
  beds integer,
  baths integer,
  size text default '',
  extra text default '',
  summary text default '',
  description text default '',
  points jsonb not null default '[]'::jsonb,
  image text not null,
  gallery jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists posts (
  slug text primary key,
  title text not null,
  date text not null,
  excerpt text default '',
  image text not null,
  blocks jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text default '',
  kind text default '',
  location text default '',
  budget text default '',
  note text default '',
  created_at timestamptz not null default now()
);

alter table properties enable row level security;
alter table posts enable row level security;
alter table enquiries enable row level security;

drop policy if exists "public read properties" on properties;
create policy "public read properties" on properties for select using (true);

drop policy if exists "public read posts" on posts;
create policy "public read posts" on posts for select using (true);

-- Writes use the service role key, which bypasses these policies.
