export const portfolioCategories = [
  "Web Development",
  "Student Film Work",
  "Content Ideas",
  "Interface Design",
  "Writing",
  "Photography",
  "Academic Work",
  "Competition Entry",
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];

export type ExternalLinks = {
  github?: string;
  youtube?: string;
  googleDrive?: string;
  liveWebsite?: string;
  other?: string;
};

export type PortfolioItem = {
  id: string;
  slug: string;
  title: string;
  category: PortfolioCategory;
  role: string;
  short_description: string;
  description: string;
  tools: string[];
  project_date: string | null;
  thumbnail_url: string | null;
  cover_url: string | null;
  gallery_urls: string[];
  video_url: string | null;
  document_url: string | null;
  writing_content: string | null;
  external_links: ExternalLinks;
  created_at?: string;
  updated_at?: string;
};

export type PortfolioFormInput = Omit<
  PortfolioItem,
  "id" | "created_at" | "updated_at" | "tools" | "gallery_urls" | "external_links"
> & {
  id?: string;
  tools: string;
  gallery_urls: string;
  github_url?: string;
  youtube_url?: string;
  google_drive_url?: string;
  live_website_url?: string;
  other_url?: string;
};

export const journalCategories = [
  "Behind the Scenes",
  "Development Log",
  "AI Experiment",
  "Photography",
  "Learning Note",
  "Technology & Creativity",
  "Project Update",
] as const;

export type JournalCategory = (typeof journalCategories)[number];

export type JournalEntry = {
  id: string;
  slug: string;
  title: string;
  category: JournalCategory;
  excerpt: string;
  content: string;
  cover_url: string | null;
  published_at: string | null;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
};
