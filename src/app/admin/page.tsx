import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { getCurrentAdmin } from "@/lib/admin";
import { PortfolioItem } from "@/lib/types";
import { JournalEntry } from "@/lib/types";

export default async function AdminPage() {
  const { supabase, user, isAdmin } = await getCurrentAdmin();

  if (!supabase) {
    return (
      <main className="min-h-screen bg-black px-5 py-16 text-white">
        <div className="mx-auto max-w-3xl rounded-lg border border-white/10 bg-zinc-950 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-red-400">
            Setup required
          </p>
          <h1 className="mt-4 text-3xl font-semibold">Supabase is not configured.</h1>
          <p className="mt-4 leading-7 text-zinc-400">
            Copy <code>.env.example</code> to <code>.env.local</code>, add your Supabase URL and anon key,
            run the SQL in <code>supabase/schema.sql</code>, then restart the dev server.
          </p>
          <Link href="/" className="mt-6 inline-flex rounded-full bg-red-500 px-5 py-3 text-sm font-semibold">
            Back home
          </Link>
        </div>
      </main>
    );
  }

  if (!user) redirect("/admin/login");

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-black px-5 py-16 text-white">
        <div className="mx-auto max-w-3xl rounded-lg border border-white/10 bg-zinc-950 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-red-400">
            Access denied
          </p>
          <h1 className="mt-4 text-3xl font-semibold">This account is not an admin.</h1>
          <p className="mt-4 leading-7 text-zinc-400">
            Add this user to <code>public.admin_profiles</code> with the role <code>admin</code>, then sign in again.
          </p>
          <div className="mt-6">
            <SignOutButton />
          </div>
        </div>
      </main>
    );
  }

  const { data: portfolioItems } = await supabase
    .from("portfolio_items")
    .select("*")
    .order("project_date", { ascending: false });

  const { data: journalEntries } = await supabase
    .from("journal_entries")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-black px-5 py-8 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-sm text-zinc-400 hover:text-white">
            Back to site
          </Link>
          <SignOutButton />
        </div>
        <AdminDashboard
          initialItems={(portfolioItems ?? []) as PortfolioItem[]}
          initialJournalEntries={(journalEntries ?? []) as JournalEntry[]}
        />
      </div>
    </main>
  );
}
