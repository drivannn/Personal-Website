import { PageShell } from "@/components/page-shell";
import { SectionHeader } from "@/components/section-header";
import { skills } from "@/lib/portfolio-data";

export default function SkillsPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeader
          eyebrow="Skills"
          title="Technical focus, with creative range around it."
          description="A practical set of tools I use to build websites, shape interfaces, write ideas, create visuals, and collaborate on student projects."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="rounded-lg border border-white/10 bg-zinc-950 p-7">
              <h2 className="text-2xl font-semibold text-white">{group}</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {items.map((skill) => (
                  <div key={skill} className="rounded-md bg-white/[0.04] px-4 py-3 text-sm text-zinc-300">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
