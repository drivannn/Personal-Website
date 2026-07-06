import { FolderOpen } from "lucide-react";

export function EmptyState({
  title = "No items yet",
  description = "Add portfolio items from the admin dashboard.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div data-reveal className="paper-panel p-10 text-center">
      <FolderOpen className="mx-auto mb-4 text-[var(--stamp)]" size={34} />
      <h3 className="font-display text-2xl font-medium text-[var(--ink)]">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--ink-soft)]">{description}</p>
    </div>
  );
}
