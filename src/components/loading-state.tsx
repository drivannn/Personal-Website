export function LoadingState({ label = "Loading content" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-zinc-950 p-4 text-sm text-zinc-400">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
      {label}
    </div>
  );
}
