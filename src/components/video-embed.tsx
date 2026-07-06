function getYouTubeId(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return parsed.pathname.slice(1);
    if (parsed.hostname.includes("youtube.com")) return parsed.searchParams.get("v");
  } catch {
    return null;
  }

  return null;
}

export function VideoEmbed({ url }: { url: string }) {
  const youtubeId = getYouTubeId(url);

  if (youtubeId) {
    return (
      <iframe
        className="aspect-video w-full rounded-lg border border-white/10"
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title="Project video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400"
    >
      Open video
    </a>
  );
}
