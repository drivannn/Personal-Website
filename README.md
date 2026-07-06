# Dityo Rivandayu Portfolio

A full-stack personal portfolio website for Dityo Rivandayu built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- Public pages: Home, About, Portfolio, Journal, Contact
- Supabase Auth protected admin dashboard
- Admin-only CRUD for portfolio items
- Admin-only CRUD for journal entries
- Thumbnail, gallery, and journal cover uploads through Supabase Storage
- Video links, document links, writing content, tools, roles, dates, and external links
- Loading states, empty states, form validation, and error handling
- Public portfolio fallback data when Supabase is not configured

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase Postgres
- Supabase Storage
- React Hook Form + Zod
- Lucide React icons

## Local Setup

Install dependencies:

```bash
npm install
```

Create environment variables:

```bash
cp .env.example .env.local
```

Fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Supabase Setup

1. Create a Supabase project.
2. Open Project Settings, then API.
3. Copy the Project URL into `NEXT_PUBLIC_SUPABASE_URL`.
4. Copy the `anon public` key into `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Open the SQL Editor.
6. Run the full SQL file in `supabase/schema.sql`.
7. Go to Authentication, then Users.
8. Create your admin user with email and password.
9. Copy that user's UUID.
10. Run this SQL, replacing the UUID:

```sql
insert into public.admin_profiles (user_id, role)
values ('PASTE_AUTH_USER_UUID_HERE', 'admin')
on conflict (user_id) do update set role = 'admin';
```

11. Restart the dev server after adding `.env.local`.
12. Visit `/admin/login` and sign in with the admin user.

## Supabase Tables

The schema creates:

- `public.admin_profiles`
- `public.portfolio_items`
- `public.journal_entries`
- `storage.buckets` entry for `portfolio-assets`

Row Level Security is enabled. Public visitors can read portfolio items and published journal entries. Only users listed in `admin_profiles` with role `admin` can create, edit, delete, or upload admin-managed content.

## Admin Dashboard

Visit:

```text
/admin
```

If you are not logged in, you will be redirected to:

```text
/admin/login
```

Use the Supabase Auth email and password for the admin account that was added to `public.admin_profiles`.

## Editable Content

Portfolio items support:

- title
- slug
- category
- role
- short description
- full description
- tools
- date
- thumbnail upload or URL
- gallery uploads or URLs
- video link
- document link
- writing content
- GitHub, YouTube, Google Drive, live website, and other external links

Journal entries support:

- title
- slug
- category
- excerpt
- content
- cover upload or URL
- publish date
- draft/published status

## Notes

- Public pages use Supabase data when environment variables are configured.
- If Supabase is not configured or the portfolio database is empty, the public portfolio displays sample data.
- Journal entries appear publicly only when `is_published` is enabled.
- Admin CRUD requires Supabase environment variables, an authenticated user, and an admin profile row.
