import { PortfolioItem } from "@/lib/types";

export const featuredProjects: PortfolioItem[] = [
  {
    id: "sample-1",
    slug: "cinematic-student-portfolio",
    title: "Personal Portfolio System",
    category: "Web Development",
    role: "Full-Stack Developer & UI Designer",
    short_description:
      "A personal website built to hold technical work, creative experiments, and a clearer sense of identity.",
    description:
      "A personal web experience for organizing projects across software, writing, visual work, and academic experiments. The focus is clear structure, responsive pages, and a portfolio system that can grow without losing its personal voice.",
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Figma"],
    project_date: "2026-06-01",
    thumbnail_url: null,
    cover_url: null,
    gallery_urls: [],
    video_url: null,
    document_url: null,
    writing_content:
      "This page shows how written notes can live beside project details, links, tools, and visual references.",
    external_links: {
      liveWebsite: "https://example.com",
      github: "https://github.com",
    },
  },
  {
    id: "sample-2",
    slug: "secret-killer-short-film",
    title: "Secret Killer",
    category: "Student Film Work",
    role: "Talent Actor & Production Collaborator",
    short_description:
      "A student short film project involving acting, script interpretation, and collaborative production work.",
    description:
      "A university short film experience centered on character interpretation, scene understanding, and collaboration with the production team. It reflects Dityo's interest in story and visual communication without framing film as his main profession.",
    tools: ["Visual Story", "Script Interpretation", "Student Film Work", "Basic Cinematography"],
    project_date: "2026-01-01",
    thumbnail_url: null,
    cover_url: null,
    gallery_urls: [],
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    document_url: null,
    writing_content: null,
    external_links: {
      youtube: "https://youtube.com",
      googleDrive: "https://drive.google.com",
    },
  },
  {
    id: "sample-3",
    slug: "audio-production-story-project",
    title: "Audio Story Project",
    category: "Academic Work",
    role: "Scriptwriter & Concept Collaborator",
    short_description:
      "An academic story project exploring concept development, dialogue, and production support.",
    description:
      "This academic project involved developing a narrative concept, writing dialogue, shaping the story flow, and working with a team through the production process. It connects writing with the practical side of making content.",
    tools: ["Scriptwriting", "Writing for Audio", "Content Planning", "Canva"],
    project_date: "2025-06-01",
    thumbnail_url: null,
    cover_url: null,
    gallery_urls: [],
    video_url: null,
    document_url: null,
    writing_content:
      "Narrative development focused on clear story flow, tone, and how the audience experiences each beat.",
    external_links: {},
  },
];

export const skills = {
  Programming: [
    "HTML",
    "CSS",
    "JavaScript",
    "PHP",
    "Laravel",
    "Next.js",
    "Bootstrap",
    "Git & GitHub",
    "REST API",
    "Responsive Web Design",
    "UI Implementation",
    "Version Control",
  ],
  Creative: [
    "Story Development",
    "Scriptwriting",
    "Writing for Ideas",
    "Content Direction",
    "Student Film Work",
  ],
  Design: ["Figma", "Canva", "Interface Design", "User Experience Thinking"],
  "Soft Skills": [
    "Leadership",
    "Communication",
    "Teamwork",
    "Critical Thinking",
    "Problem Solving",
    "Project Management",
    "Adaptability",
  ],
};

export const experiences = [
  {
    title: "Creative Production & Scriptwriter",
    organization: "Audio Production Academic Project",
    date: "Jun 2025",
    summary:
      "Developed content concepts, scripts, dialogue, and production direction for an academic media project.",
  },
  {
    title: "Talent Actor & Creative Production",
    organization: "Indonesia Film Festival Melbourne",
    date: "Jan 2026",
    summary:
      "Collaborated in short film production, script interpretation, and visual storytelling for an international competition context.",
  },
  {
    title: "Content Talent",
    organization: "Digital Innovation Student Competition",
    date: "Feb 2026",
    summary:
      "Supported a student innovation presentation through performance, communication, and narrative delivery.",
  },
];
