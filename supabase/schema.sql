create extension if not exists "pgcrypto";

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where user_id = auth.uid()
      and role = 'admin'
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  role text not null,
  short_description text not null,
  description text not null,
  tools text[] not null default '{}',
  project_date date,
  thumbnail_url text,
  cover_url text,
  gallery_urls text[] not null default '{}',
  video_url text,
  document_url text,
  writing_content text,
  external_links jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$
declare
  constraint_name text;
begin
  select conname into constraint_name
  from pg_constraint
  where conrelid = 'public.portfolio_items'::regclass
    and contype = 'c'
    and pg_get_constraintdef(oid) ilike '%category%'
  limit 1;

  if constraint_name is not null then
    execute format('alter table public.portfolio_items drop constraint %I', constraint_name);
  end if;
end $$;

alter table public.portfolio_items
add constraint portfolio_items_category_check
check (
  category in (
    'Web Development',
    'Student Film Work',
    'Content Ideas',
    'Interface Design',
    'Writing',
    'Photography',
    'Academic Work',
    'Competition Entry'
  )
);

create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null check (
    category in (
      'Behind the Scenes',
      'Development Log',
      'AI Experiment',
      'Photography',
      'Learning Note',
      'Technology & Creativity',
      'Project Update'
    )
  ),
  excerpt text not null,
  content text not null,
  cover_url text,
  published_at date,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists portfolio_items_category_idx on public.portfolio_items (category);
create index if not exists portfolio_items_project_date_idx on public.portfolio_items (project_date desc);
create index if not exists journal_entries_category_idx on public.journal_entries (category);
create index if not exists journal_entries_published_at_idx on public.journal_entries (published_at desc);
create index if not exists journal_entries_is_published_idx on public.journal_entries (is_published);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_portfolio_items_updated_at on public.portfolio_items;
create trigger set_portfolio_items_updated_at
before update on public.portfolio_items
for each row execute function public.set_updated_at();

drop trigger if exists set_journal_entries_updated_at on public.journal_entries;
create trigger set_journal_entries_updated_at
before update on public.journal_entries
for each row execute function public.set_updated_at();

alter table public.admin_profiles enable row level security;
alter table public.portfolio_items enable row level security;
alter table public.journal_entries enable row level security;

drop policy if exists "Admins can read their admin profile" on public.admin_profiles;
create policy "Admins can read their admin profile"
on public.admin_profiles for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Public can read portfolio items" on public.portfolio_items;
create policy "Public can read portfolio items"
on public.portfolio_items for select
using (true);

drop policy if exists "Admins can insert portfolio items" on public.portfolio_items;
drop policy if exists "Authenticated admins can insert portfolio items" on public.portfolio_items;
create policy "Admins can insert portfolio items"
on public.portfolio_items for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update portfolio items" on public.portfolio_items;
drop policy if exists "Authenticated admins can update portfolio items" on public.portfolio_items;
create policy "Admins can update portfolio items"
on public.portfolio_items for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete portfolio items" on public.portfolio_items;
drop policy if exists "Authenticated admins can delete portfolio items" on public.portfolio_items;
create policy "Admins can delete portfolio items"
on public.portfolio_items for delete
to authenticated
using (public.is_admin());

drop policy if exists "Public can read published journal entries" on public.journal_entries;
create policy "Public can read published journal entries"
on public.journal_entries for select
using (is_published = true or public.is_admin());

drop policy if exists "Admins can insert journal entries" on public.journal_entries;
create policy "Admins can insert journal entries"
on public.journal_entries for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update journal entries" on public.journal_entries;
create policy "Admins can update journal entries"
on public.journal_entries for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete journal entries" on public.journal_entries;
create policy "Admins can delete journal entries"
on public.journal_entries for delete
to authenticated
using (public.is_admin());

insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can read portfolio assets" on storage.objects;
create policy "Public can read portfolio assets"
on storage.objects for select
using (bucket_id = 'portfolio-assets');

drop policy if exists "Admins can upload portfolio assets" on storage.objects;
drop policy if exists "Authenticated admins can upload portfolio assets" on storage.objects;
create policy "Admins can upload portfolio assets"
on storage.objects for insert
to authenticated
with check (bucket_id = 'portfolio-assets' and public.is_admin());

drop policy if exists "Admins can update portfolio assets" on storage.objects;
drop policy if exists "Authenticated admins can update portfolio assets" on storage.objects;
create policy "Admins can update portfolio assets"
on storage.objects for update
to authenticated
using (bucket_id = 'portfolio-assets' and public.is_admin())
with check (bucket_id = 'portfolio-assets' and public.is_admin());

drop policy if exists "Admins can delete portfolio assets" on storage.objects;
drop policy if exists "Authenticated admins can delete portfolio assets" on storage.objects;
create policy "Admins can delete portfolio assets"
on storage.objects for delete
to authenticated
using (bucket_id = 'portfolio-assets' and public.is_admin());
