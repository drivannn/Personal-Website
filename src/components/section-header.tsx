export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="mb-4 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--stamp)]">
          <span className="h-px w-8 bg-[var(--stamp)]/55" />
          <span>{eyebrow}</span>
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-medium leading-[1.08] text-[var(--ink)] md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-[var(--ink-soft)] md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
