import { createClient } from "@/lib/supabase/server";
import { JournalEntry } from "@/lib/types";

export async function getJournalEntries(): Promise<JournalEntry[]> {
  const supabase = await createClient();

  if (!supabase) return [];

  const { data, error } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error || !data) return [];

  return data as JournalEntry[];
}

export async function getAllJournalEntries(): Promise<JournalEntry[]> {
  const supabase = await createClient();

  if (!supabase) return [];

  const { data, error } = await supabase
    .from("journal_entries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data as JournalEntry[];
}
