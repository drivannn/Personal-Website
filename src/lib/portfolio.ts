import { createClient } from "@/lib/supabase/server";
import { PortfolioItem } from "@/lib/types";

const selectFields = "*";

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const supabase = await createClient();

  if (!supabase) return [];

  const { data, error } = await supabase
    .from("portfolio_items")
    .select(selectFields)
    .order("project_date", { ascending: false });

  if (error || !data) return [];

  return data as PortfolioItem[];
}

export async function getPortfolioItem(slug: string): Promise<PortfolioItem | null> {
  const supabase = await createClient();

  if (!supabase) return null;

  const { data, error } = await supabase
    .from("portfolio_items")
    .select(selectFields)
    .eq("slug", slug)
    .single();

  if (error || !data) return null;

  return data as PortfolioItem;
}
