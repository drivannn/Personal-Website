import { EmptyState } from "@/components/empty-state";
import { PageShell } from "@/components/page-shell";
import { PortfolioCard } from "@/components/portfolio-card";
import { SectionHeader } from "@/components/section-header";
import { getPortfolioItems } from "@/lib/portfolio";
import { portfolioCategories } from "@/lib/types";

export default async function ProjectsPage() {
  const projects = await getPortfolioItems();

  return (
    <PageShell>
      <section className="px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div data-reveal className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <SectionHeader
              eyebrow="Portfolio"
              title="A catalogue of projects, notes, and experiments."
              description="Each item is presented plainly: what it is, what I did, and the material used to make it."
            />
            <div className="paper-panel p-6">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--stamp)]">
                Categories
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {portfolioCategories.map((category) => (
                  <span key={category} className="rounded-full border border-[var(--line)] px-3 py-1 text-[11px] text-[var(--ink-soft)]">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="quiet-divider my-16" />

          {projects.length ? (
            <div className={projects.length === 1 ? "max-w-4xl" : "grid gap-8 lg:grid-cols-2"}>
              {projects.map((item, index) => (
                <PortfolioCard key={item.id} item={item} index={index} />
              ))}
            </div>
          ) : (
            <EmptyState title="Portfolio is empty" />
          )}
        </div>
      </section>
    </PageShell>
  );
}
