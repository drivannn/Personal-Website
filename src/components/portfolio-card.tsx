import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PortfolioItem } from "@/lib/types";

const verticalMarks = [
  "\u7269\u8a9e\u3092\u3001\u5f62\u306b\u3059\u308b\u3002",
  "\u9759\u3051\u3055\u306e\u4e2d\u3067\u3001\u78e8\u304f\u3002",
  "\u624b\u3067\u8003\u3048\u3001\u76ee\u3067\u6574\u3048\u308b\u3002",
];

export function PortfolioCard({
  item,
  index = 0,
}: {
  item: PortfolioItem;
  index?: number;
}) {
  const detailHref = `/portfolio/${item.slug}`;
  const previewUrl = item.external_links?.liveWebsite;
  const githubUrl = item.external_links?.github;

  return (
    <article
      data-reveal
      className="makimono-card motion-surface group border border-[var(--line)] p-3"
    >
      <Link href={detailHref} className="block">
        <div className="scroll-frame relative border border-[var(--line)] p-3">
          <div className="ink-wash" />
          <div className="relative aspect-[4/3] overflow-hidden bg-[linear-gradient(145deg,rgba(42,33,25,0.16),rgba(69,84,63,0.11),rgba(251,247,236,0.74))] sm:aspect-[16/10]">
            {item.thumbnail_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.thumbnail_url}
                alt={item.title}
                className="h-full w-full object-cover opacity-[0.88] saturate-[0.78] transition-opacity duration-[280ms] group-hover:opacity-100"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_38%_26%,rgba(163,57,42,0.12),transparent_34%),linear-gradient(160deg,rgba(69,84,63,0.12),rgba(251,247,236,0.7))]" />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(42,33,25,0.2))]" />
            <span className="ink-kanji kanji-mark absolute right-4 top-4 text-[15px] font-normal leading-none text-[var(--paper-card)]/86 drop-shadow-sm">
              {verticalMarks[index % verticalMarks.length]}
            </span>
            <span className="seal-stamp absolute bottom-3 left-3 px-3 py-1 text-[11px] font-medium tracking-[0.14em]">
              {item.category}
            </span>
          </div>
        </div>
      </Link>

      <div className="px-1 pt-6">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
          {item.role}
        </p>
        <Link href={detailHref} className="block">
          <h3 className="font-display text-2xl font-medium leading-[1.15] text-[var(--ink)] transition-colors duration-200 hover:text-[var(--stamp)]">
            {item.title}
          </h3>
        </Link>
        <p className="mt-4 line-clamp-3 text-sm leading-[1.75] text-[var(--ink-soft)]">
          {item.short_description}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-end gap-2 border-t border-[var(--line)] pt-4">
          {previewUrl ? (
            <a
              href={previewUrl}
              target="_blank"
              rel="noreferrer"
              className="premium-action inline-flex items-center gap-1 border border-[var(--stamp)] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-[var(--stamp)] hover:bg-[var(--stamp)] hover:text-[var(--paper-card)]"
            >
              Preview <ArrowUpRight size={13} />
            </a>
          ) : null}
          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="premium-action inline-flex items-center gap-1 border border-[var(--line)] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-[var(--ink-soft)] hover:border-[var(--stamp)] hover:text-[var(--stamp)]"
            >
              GitHub <ArrowUpRight size={13} />
            </a>
          ) : null}
          <Link
            href={detailHref}
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--stamp)]"
          >
            View Project <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
