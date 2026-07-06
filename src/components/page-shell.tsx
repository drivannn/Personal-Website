import { LenisProvider } from "@/components/lenis-provider";
import { JapaneseAmbience } from "@/components/japanese-ambience";
import { SiteHeader } from "@/components/site-header";
import { ScrollProgress } from "@/components/scroll-progress";
import { ScrollRevealProvider } from "@/components/scroll-reveal-provider";
import { SiteFooter } from "@/components/site-footer";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--paper)] text-[var(--ink)]">
      <LenisProvider />
      <ScrollProgress />
      <JapaneseAmbience />
      <SiteHeader />
      <ScrollRevealProvider>
        <main className="page-enter relative z-10">{children}</main>
      </ScrollRevealProvider>
      <SiteFooter />
    </div>
  );
}
