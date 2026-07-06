import { ArrowUpRight, Calendar, Wrench } from "lucide-react";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { SectionHeader } from "@/components/section-header";
import { VideoEmbed } from "@/components/video-embed";
import { getPortfolioItem } from "@/lib/portfolio";
import { formatDate } from "@/lib/utils";

const externalLinkLabels: Record<string, string> = {
  liveWebsite: "Preview",
  github: "GitHub",
  youtube: "YouTube",
  googleDrive: "Drive",
  other: "Reference",
};

const externalLinkOrder = ["liveWebsite", "github", "youtube", "googleDrive", "other"];

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getPortfolioItem(slug);

  if (!project) notFound();

  const externalLinks = Object.entries(project.external_links ?? {})
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .sort(([first], [second]) => {
      const firstIndex = externalLinkOrder.indexOf(first);
      const secondIndex = externalLinkOrder.indexOf(second);
      return (firstIndex === -1 ? 99 : firstIndex) - (secondIndex === -1 ? 99 : secondIndex);
    });

  return (
    <PageShell>
      <article>
        <section className="px-4 pb-24 pt-32 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1160px] gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.58fr)] lg:items-center">
            <div data-reveal className="mx-auto w-full max-w-[620px] lg:mx-0">
              <p className="mb-6 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--stamp)]">
                <span className="h-px w-12 bg-[var(--stamp)]" />
                {project.category}
              </p>
              <h1 className="font-display text-[clamp(3.2rem,7vw,6.5rem)] font-medium leading-[1.12] text-[var(--ink)]">
                {project.title}
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-[1.7] text-[var(--ink-soft)]">
                {project.role}
              </p>
            </div>

            {project.cover_url || project.thumbnail_url ? (
              <div data-reveal className="paper-panel mx-auto w-full max-w-[460px] p-3 md:p-4 lg:mr-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.cover_url ?? project.thumbnail_url ?? ""}
                  alt={project.title}
                  className="aspect-[4/5] w-full object-cover opacity-[0.9] saturate-[0.78]"
                />
              </div>
            ) : null}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:px-8 lg:grid-cols-[1fr_340px] lg:px-10">
          <div className="space-y-16">
            <div data-reveal>
              <SectionHeader title="Project Notes" />
              <p className="mt-8 text-base leading-[1.75] text-[var(--ink-soft)]">
                {project.description}
              </p>
            </div>

            {project.gallery_urls.length ? (
              <div data-reveal>
                <h2 className="mb-6 font-display text-3xl font-medium text-[var(--ink)]">Gallery</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {project.gallery_urls.map((url) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={url}
                      src={url}
                      alt={project.title}
                      className="aspect-video border border-[var(--line)] object-cover opacity-[0.9] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.08)]"
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {project.video_url ? (
              <div data-reveal>
                <h2 className="mb-6 font-display text-3xl font-medium text-[var(--ink)]">Video</h2>
                <div className="overflow-hidden border border-[var(--line)]">
                  <VideoEmbed url={project.video_url} />
                </div>
              </div>
            ) : null}

            {project.writing_content || project.document_url ? (
              <div data-reveal className="paper-panel p-8">
                <h2 className="font-display text-3xl font-medium text-[var(--ink)]">Writing / Reference</h2>
                {project.writing_content ? (
                  <p className="mt-6 whitespace-pre-line text-sm leading-[1.75] text-[var(--ink-soft)]">
                    {project.writing_content}
                  </p>
                ) : null}
                {project.document_url ? (
                  <a
                    href={project.document_url}
                    target="_blank"
                    rel="noreferrer"
                    className="premium-action mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[var(--paper-card)] hover:bg-[var(--stamp)]"
                  >
                    Open reference <ArrowUpRight size={15} />
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>

          <aside data-reveal className="paper-panel h-fit p-8 lg:sticky lg:top-32">
            <div className="space-y-8">
              <div>
                <p className="mb-3 flex items-center gap-2 text-sm text-[var(--muted)]">
                  <Calendar size={16} /> Date
                </p>
                <p className="font-medium text-[var(--ink)]">{formatDate(project.project_date)}</p>
              </div>
              <div>
                <p className="mb-4 flex items-center gap-2 text-sm text-[var(--muted)]">
                  <Wrench size={16} /> Tools & Materials
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--ink-soft)]">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              {externalLinks.length ? (
                <div>
                  <p className="mb-4 text-sm text-[var(--muted)]">Project Links</p>
                  <div className="space-y-2">
                    {externalLinks.map(([label, url]) => (
                      <a
                        key={label}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="premium-action flex items-center justify-between border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)] hover:border-[var(--stamp)] hover:text-[var(--stamp)]"
                      >
                        {externalLinkLabels[label] ?? label} <ArrowUpRight size={15} />
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </aside>
        </section>
      </article>
    </PageShell>
  );
}
