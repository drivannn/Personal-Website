import { ArrowRight, Code2, Film, PenLine, Sparkles } from "lucide-react";
import Link from "next/link";
import { ContactSections } from "@/components/contact-sections";
import { HashScrollHandler } from "@/components/hash-scroll-handler";
import { PageShell } from "@/components/page-shell";
import { PortfolioCard } from "@/components/portfolio-card";
import { SectionHeader } from "@/components/section-header";
import { getPortfolioItems } from "@/lib/portfolio";
import { skills } from "@/lib/portfolio-data";

const notes = [
  {
    icon: Code2,
    title: "Full-Stack Web Development",
    body: "Building end-to-end web applications with clean design, scalable structure, and thoughtful user experience.",
  },
  {
    icon: Film,
    title: "Script Writing",
    body: "Writing structured narratives and scripts for film, video, and interactive storytelling.",
  },
  {
    icon: Sparkles,
    title: "Creative Direction",
    body: "Shaping ideas into visual stories through design, code, and narrative thinking.",
  },
];

export default async function Home() {
  const projects = await getPortfolioItems();

  return (
    <PageShell>
      <HashScrollHandler />

      <section id="top" className="ornament-section relative overflow-hidden px-[clamp(20px,4vw,48px)] pb-24 pt-36">
        <div className="seigaiha-watermark pointer-events-none absolute right-[-96px] top-24 h-64 w-80" aria-hidden />
        <div className="seigaiha-watermark pointer-events-none absolute bottom-10 left-[-120px] h-64 w-80" aria-hidden />
        <div className="sun-disc pointer-events-none absolute left-1/2 top-[34%] h-[min(54vw,560px)] w-[min(54vw,560px)] -translate-x-1/2 -translate-y-1/2" aria-hidden />

        <div className="relative mx-auto grid min-h-[72vh] max-w-[1600px] grid-cols-1 items-center gap-8 text-center md:grid-cols-[auto_minmax(0,1fr)_auto]">
          <p data-reveal className="tategaki mx-auto hidden text-[12px] font-medium text-[var(--muted)] md:block">
            {"\u7269\u8A9E\u3092\u7DE8\u3080"}
          </p>

          <div data-reveal className="mx-auto max-w-5xl">
            <div className="torii-mark mb-8" aria-hidden />
            <p className="text-[12px] font-medium uppercase tracking-[0.24em] text-[var(--stamp)]">
              DRIVAN / DITYO RIVANDAYU
            </p>
            <h1 className="mx-auto mt-6 max-w-5xl font-display text-[clamp(48px,7vw,100px)] font-semibold leading-[1.12] text-[var(--ink)]">
              Code with
              <br />
              a sense
              <br />
              of story.
            </h1>
            <p className="mx-auto mt-8 max-w-[560px] text-[16px] leading-[1.7] text-[var(--ink-soft)]">
              From full-stack web development to filmmaking, I create digital experiences where technology meets storytelling.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/portfolio" className="premium-action inline-flex items-center justify-center gap-3 text-base font-medium">
                View Portfolio <ArrowRight size={18} />
              </Link>
              <Link href="#contact" className="premium-action inline-flex items-center justify-center text-base font-medium">
                Contact
              </Link>
            </div>
          </div>

          <p data-reveal className="tategaki mx-auto hidden text-[12px] font-medium text-[var(--stamp)] opacity-55 md:block">
            {"\u30B3\u30FC\u30C9\u3092\u78E8\u304F"}
          </p>
        </div>
      </section>

      <section className="ornament-section px-[clamp(20px,4vw,48px)] py-24">
        <div className="mx-auto mb-8 max-w-[1600px]">
          <p className="text-[12px] font-medium uppercase tracking-[0.24em] text-[var(--stamp)]">
            {"\u4F55\u3092\u3057\u3066\u3044\u308B\u304B"}
          </p>
          <h2 className="mt-3 font-display text-4xl font-medium text-[var(--ink)]">What I Do</h2>
        </div>
        <div className="mx-auto grid max-w-[1600px] border border-[var(--line)] bg-[var(--paper-card)]/62 md:grid-cols-3">
          {notes.map(({ icon: Icon, title, body }, index) => (
            <div
              key={title}
              data-reveal
              className={
                index === 0
                  ? "service-card p-8 md:p-10"
                  : "service-card border-t border-[var(--line)] p-8 md:border-l md:border-t-0 md:p-10"
              }
            >
              <Icon className="mb-8 h-5 w-5 text-[var(--stamp)]" strokeWidth={1.6} />
              <h2 className="font-display text-2xl font-medium text-[var(--ink)]">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ornament-section px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[0.72fr_1fr]">
          <div data-reveal>
            <SectionHeader
              eyebrow="About"
              title="A personal practice, kept intentionally simple."
              description="I am Dityo Rivandayu, building under drivan.works. I care about software that feels clear, humane, and quietly memorable."
            />
          </div>
          <div data-reveal className="paper-panel p-8 md:p-12">
            <PenLine className="mb-6 text-[var(--stamp)]" size={22} />
            <div className="space-y-6 text-base leading-[1.75] text-[var(--ink-soft)]">
              <p>
                I like building things the way a careful craftsperson works with material: understand the grain first, cut only what needs to be cut, and leave the final object calm enough to be used every day.
              </p>
              <p>
                My work moves between development, interface thinking, writing, and visual projects. This site is the room where those pieces can sit together without becoming noisy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ornament-section px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-16 grid gap-8 md:grid-cols-[auto_1fr_0.8fr] md:items-start">
            <p className="tategaki text-[12px] font-medium text-[var(--stamp)]">{"\u4F5C\u54C1\u96C6"}</p>
            <div>
              <h2 className="font-display text-5xl font-medium leading-tight text-[var(--ink)] md:text-6xl">
                Selected work
              </h2>
              <div className="brush-mark mt-6" />
            </div>
            <p className="text-sm leading-[1.75] text-[var(--ink-soft)] md:text-right">
              A curated catalogue of software, storytelling, and creative systems. Each piece keeps the role, material, and thought visible.
            </p>
          </div>
          {projects.length ? (
            <div className={projects.length === 1 ? "max-w-4xl" : "grid gap-8 lg:grid-cols-2"}>
              {projects.slice(0, 3).map((item, index) => (
                <div key={item.id} className={index === 1 ? "lg:pt-12" : index === 2 ? "lg:col-span-2 lg:max-w-[calc(50%-1rem)] lg:pt-2" : ""}>
                  <PortfolioCard item={item} index={index} />
                </div>
              ))}
            </div>
          ) : (
            <div data-reveal className="paper-panel p-8 md:p-10">
              <p className="font-display text-3xl text-[var(--ink)]">The portfolio shelf is still empty.</p>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--ink-soft)]">
                Real projects from the CMS will appear here after they are uploaded through admin.
              </p>
            </div>
          )}
          <div className="mt-16 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div className="engawa-dots" />
            <Link href="/portfolio" className="premium-action inline-flex items-center justify-center gap-3 text-sm font-medium uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-current opacity-75" />
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="ornament-section px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[0.72fr_1fr]">
          <SectionHeader
            eyebrow="Materials"
            title="Tools and skills, arranged like a small shelf."
            description="The tools are practical. The goal is still warmth, clarity, and usefulness."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} data-reveal className="wood-panel p-6 md:p-8">
                <h3 className="font-display text-2xl font-medium text-[var(--ink)]">{group}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill} className="rounded-full bg-[var(--paper-card)]/62 px-3 py-1 text-xs text-[var(--ink)]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSections />
    </PageShell>
  );
}
