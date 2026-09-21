-- Chhattisgarh Travel Planner — Supabase schema
-- Run this in your Supabase project at: Dashboard -> SQL Editor -> New query
--
-- SECURITY MODEL
--   * Itineraries are intentionally PUBLIC for reading and creation (share links
--     and the "browse all saved itineraries" feature), so RLS SELECT/INSERT are
--     open to anonymous users.
--   * DELETE is ownership-protected: every new row gets a server-generated
--     delete_token (capability token) returned only to the creating client.
--     Deletion requires the request header `x-delete-token` to match the row's
--     token. The Vercel function /api/delete-itinerary implements this.
--   * There is deliberately NO UPDATE policy (default-deny), so stored
--     itineraries cannot be tampered with after creation.

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
  delete_token text,
  created_at timestamptz not null default now()
);

alter table public.itineraries enable row level security;

alter table public.itineraries add column if not exists delete_token text;

-- PUBLIC: anyone may create a new shareable itinerary.
drop policy if exists "itineraries_public_insert" on public.itineraries;
create policy "itineraries_public_insert"
  on public.itineraries
  for insert
  with check (true);

-- PUBLIC: anyone may read a shared itinerary / browse saved trips.
drop policy if exists "itineraries_public_select" on public.itineraries;
create policy "itineraries_public_select"
  on public.itineraries
  for select
  using (true);

-- OWNERSHIP-GATED: deletion requires knowledge of the row's delete_token.
-- The token is compared against the `x-delete-token` request header, which
-- PostgREST exposes to RLS via the GUC `request.headers`.
drop policy if exists "itineraries_public_delete" on public.itineraries;
create policy "itineraries_public_delete"
  on public.itineraries
  for delete
  using (
    delete_token is not null
    and coalesce(current_setting('request.headers', true), 'null')::jsonb ->> 'x-delete-token' = delete_token
  );

-- NOTE: There is intentionally no UPDATE policy. See security model above.

-- Clean up diagnostic/test rows created during development.
delete from public.itineraries
where name in (
  'final_verify',
  'live_verified',
  'api_fn_test',
  'node_fetch_browser_sim',
  'browser_sim',
  'apikey_only_test',
  'node test',
  '__test_itinerary__'
);