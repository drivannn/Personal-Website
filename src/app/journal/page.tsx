import { EmptyState } from "@/components/empty-state";
import { PageShell } from "@/components/page-shell";
import { SectionHeader } from "@/components/section-header";
import { getJournalEntries } from "@/lib/journal";
import { formatDate } from "@/lib/utils";

export default async function JournalPage() {
  const entries = await getJournalEntries();

  return (
    <PageShell>
      <section className="relative px-4 pb-32 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-8 md:grid-cols-[auto_1fr_0.72fr] md:items-start">
            <p className="tategaki text-[12px] font-medium text-[var(--stamp)]">日誌</p>
            <SectionHeader
              eyebrow="Journal"
              title="Notes from the things I am learning, making, and noticing."
              description="Process notes, development logs, learning records, and quiet observations from creative work."
            />
            <p className="hidden text-right text-sm leading-[1.75] text-[var(--ink-soft)] md:block">
              Arranged like a small index: light, readable, and built for return visits.
            </p>
          </div>

          <div className="quiet-divider my-16" />

          {entries.length ? (
            <div className="grid gap-8 md:grid-cols-2">
              {entries.map((entry, index) => (
                <article
                  key={entry.id}
                  data-reveal
                  className="grid grid-cols-[auto_1fr] gap-6 border-b border-[var(--line)] pb-8"
                >
                  <p className="tategaki text-[11px] font-medium text-[var(--muted)]">
                    {formatDate(entry.published_at)}
                  </p>
                  <div>
                    <div className="mb-4 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--stamp)]">
                      <span>{entry.category}</span>
                      <span className="h-px flex-1 bg-[var(--line)]" />
                      <span className="font-display text-base text-[var(--muted)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className="font-display text-3xl font-medium leading-[1.15] text-[var(--ink)]">
                      {entry.title}
                    </h2>
                    <p className="mt-4 line-clamp-3 text-sm leading-[1.75] text-[var(--ink-soft)]">
                      {entry.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Journal is still quiet"
              description="Entries will live here soon: process notes, experiments, film behind-the-scenes, and personal project updates."
            />
          )}
        </div>
      </section>
    </PageShell>
  );
}
