-- Chhattisgarh Travel Planner — Supabase schema
-- Run this in your Supabase project at: Dashboard -> SQL Editor -> New query

create table if not exists public.itineraries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  starting_district text,
  days integer,
  pace text,
  budget text,
  group_type text,
  interests text[],
  itinerary jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.itineraries enable row level security;

drop policy if exists "itineraries_public_insert" on public.itineraries;
create policy "itineraries_public_insert"
  on public.itineraries
  for insert
  with check (true);

drop policy if exists "itineraries_public_select" on public.itineraries;
create policy "itineraries_public_select"
  on public.itineraries
  for select
  using (true);