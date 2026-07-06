"use client";

import { Edit, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { JournalForm } from "@/components/admin/journal-form";
import { PortfolioForm } from "@/components/admin/portfolio-form";
import { createClient } from "@/lib/supabase/client";
import { JournalEntry, PortfolioItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function AdminDashboard({
  initialItems,
  initialJournalEntries,
}: {
  initialItems: PortfolioItem[];
  initialJournalEntries: JournalEntry[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [journalEntries, setJournalEntries] = useState(initialJournalEntries);
  const [activeSection, setActiveSection] = useState<"portfolio" | "journal">("portfolio");
  const [editingItem, setEditingItem] = useState<PortfolioItem | undefined>();
  const [editingJournalEntry, setEditingJournalEntry] = useState<JournalEntry | undefined>();
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function refresh() {
    setIsAdding(false);
    setEditingItem(undefined);
    setEditingJournalEntry(undefined);
    setMessage(null);

    const supabase = createClient();
    const [portfolioResult, journalResult] = await Promise.all([
      supabase.from("portfolio_items").select("*").order("project_date", { ascending: false }),
      supabase.from("journal_entries").select("*").order("created_at", { ascending: false }),
    ]);

    if (portfolioResult.error || journalResult.error) {
      setMessage(portfolioResult.error?.message ?? journalResult.error?.message ?? "Unable to refresh content.");
      return;
    }

    setItems((portfolioResult.data ?? []) as PortfolioItem[]);
    setJournalEntries((journalResult.data ?? []) as JournalEntry[]);
    router.refresh();
  }

  async function deleteItem(item: PortfolioItem) {
    const confirmed = window.confirm(`Delete "${item.title}"?`);
    if (!confirmed) return;

    const supabase = createClient();
    const { error } = await supabase.from("portfolio_items").delete().eq("id", item.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setItems((current) => current.filter((project) => project.id !== item.id));
  }

  async function deleteJournalEntry(entry: JournalEntry) {
    const confirmed = window.confirm(`Delete "${entry.title}"?`);
    if (!confirmed) return;

    const supabase = createClient();
    const { error } = await supabase.from("journal_entries").delete().eq("id", entry.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setJournalEntries((current) => current.filter((journalEntry) => journalEntry.id !== entry.id));
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Content Manager</h1>
          <p className="mt-2 text-sm text-zinc-500">Create, edit, delete, and upload portfolio and journal assets.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setIsAdding(true);
            setEditingItem(undefined);
            setEditingJournalEntry(undefined);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white hover:bg-red-400"
        >
          <Plus size={18} /> Add {activeSection === "portfolio" ? "portfolio item" : "journal entry"}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          ["portfolio", "Portfolio"],
          ["journal", "Journal"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setActiveSection(value as "portfolio" | "journal");
              setIsAdding(false);
              setEditingItem(undefined);
              setEditingJournalEntry(undefined);
            }}
            className={`rounded-full border border-white/10 px-5 py-2 text-sm font-semibold ${
              activeSection === value ? "bg-red-500 text-white" : "text-zinc-300 hover:bg-white/10"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {message ? <p className="rounded-md bg-red-500/10 p-3 text-sm text-red-200">{message}</p> : null}

      {activeSection === "portfolio" && (isAdding || editingItem) ? (
        <PortfolioForm
          item={editingItem}
          onSaved={refresh}
          onCancel={() => {
            setIsAdding(false);
            setEditingItem(undefined);
          }}
        />
      ) : null}

      {activeSection === "journal" && (isAdding || editingJournalEntry) ? (
        <JournalForm
          entry={editingJournalEntry}
          onSaved={refresh}
          onCancel={() => {
            setIsAdding(false);
            setEditingJournalEntry(undefined);
          }}
        />
      ) : null}

      {activeSection === "portfolio" && items.length ? (
        <div className="overflow-hidden rounded-lg border border-white/10">
          <div className="grid grid-cols-[1fr_auto] gap-4 bg-zinc-900 px-4 py-3 text-sm font-semibold text-zinc-300 md:grid-cols-[1.3fr_0.8fr_0.7fr_auto]">
            <span>Project</span>
            <span className="hidden md:block">Category</span>
            <span className="hidden md:block">Date</span>
            <span>Actions</span>
          </div>
          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-[1fr_auto] gap-4 border-t border-white/10 bg-zinc-950 px-4 py-4 md:grid-cols-[1.3fr_0.8fr_0.7fr_auto]">
              <div>
                <p className="font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-sm text-zinc-500">{item.role}</p>
              </div>
              <p className="hidden text-sm text-zinc-400 md:block">{item.category}</p>
              <p className="hidden text-sm text-zinc-400 md:block">{formatDate(item.project_date)}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(item);
                    setIsAdding(false);
                    setEditingJournalEntry(undefined);
                  }}
                  className="rounded-md border border-white/10 p-2 text-zinc-300 hover:text-white"
                  title="Edit"
                >
                  <Edit size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => deleteItem(item)}
                  className="rounded-md border border-white/10 p-2 text-red-300 hover:text-red-200"
                  title="Delete"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {activeSection === "portfolio" && !items.length ? (
        <EmptyState title="No portfolio items in Supabase yet" />
      ) : null}

      {activeSection === "journal" && journalEntries.length ? (
        <div className="overflow-hidden rounded-lg border border-white/10">
          <div className="grid grid-cols-[1fr_auto] gap-4 bg-zinc-900 px-4 py-3 text-sm font-semibold text-zinc-300 md:grid-cols-[1.3fr_0.8fr_0.7fr_auto]">
            <span>Entry</span>
            <span className="hidden md:block">Category</span>
            <span className="hidden md:block">Status</span>
            <span>Actions</span>
          </div>
          {journalEntries.map((entry) => (
            <div key={entry.id} className="grid grid-cols-[1fr_auto] gap-4 border-t border-white/10 bg-zinc-950 px-4 py-4 md:grid-cols-[1.3fr_0.8fr_0.7fr_auto]">
              <div>
                <p className="font-semibold text-white">{entry.title}</p>
                <p className="mt-1 text-sm text-zinc-500">{formatDate(entry.published_at)}</p>
              </div>
              <p className="hidden text-sm text-zinc-400 md:block">{entry.category}</p>
              <p className="hidden text-sm text-zinc-400 md:block">{entry.is_published ? "Published" : "Draft"}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingJournalEntry(entry);
                    setEditingItem(undefined);
                    setIsAdding(false);
                  }}
                  className="rounded-md border border-white/10 p-2 text-zinc-300 hover:text-white"
                  title="Edit"
                >
                  <Edit size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => deleteJournalEntry(entry)}
                  className="rounded-md border border-white/10 p-2 text-red-300 hover:text-red-200"
                  title="Delete"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {activeSection === "journal" && !journalEntries.length ? (
        <EmptyState title="No journal entries in Supabase yet" />
      ) : null}
    </div>
  );
}
