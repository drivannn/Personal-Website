import { Mail } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/drivannn" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dityo-rivandayu-293415416?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
  { label: "Instagram", href: "https://instagram.com/drivan.works" },
  { label: "Email", href: "mailto:dityorivandayu@gmail.com" },
];

export function ContactSections() {
  return (
    <section id="contact" className="relative bg-[var(--night)] px-4 py-32 text-[var(--paper-card)] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[auto_1fr_0.72fr] lg:items-start">
        <p className="tategaki text-[12px] font-medium text-[var(--stamp)]">連絡</p>
        <div data-reveal>
          <p className="mb-6 text-[12px] font-medium uppercase tracking-[0.24em] text-[var(--muted)]">
            Contact
          </p>
          <h2 className="font-display text-5xl font-medium leading-[1.12] md:text-7xl">
            Let&apos;s build <span className="text-[var(--stamp)]">with care</span>.
          </h2>
          <p className="mt-8 max-w-2xl text-base leading-[1.75] text-[#d8cbb0]">
            Send a brief, a rough thought, or a project idea. I&apos;ll reply with a simple next step.
          </p>
          <a
            href="mailto:dityorivandayu@gmail.com"
            className="premium-action mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--paper-card)] px-6 py-3 text-sm font-medium text-[var(--night)] hover:bg-[var(--stamp)] hover:text-[var(--paper-card)]"
          >
            <Mail size={16} /> dityorivandayu@gmail.com
          </a>
        </div>

        <aside data-reveal className="border-t border-[#d8cbb0]/20 pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="font-display text-2xl">Bandung, Indonesia</p>
          <p className="mt-4 text-sm leading-[1.75] text-[#d8cbb0]">
            Available for portfolio sites, product interfaces, writing-led digital projects, and thoughtful collaborations.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="border-b border-transparent pb-1 text-sm text-[#d8cbb0] transition-colors duration-[250ms] hover:border-[var(--stamp)] hover:text-[var(--paper-card)]"
              >
                {link.label}
              </a>
            ))}
          </div>
          <Link href="/portfolio" className="mt-8 inline-block text-sm font-medium text-[var(--stamp)]">
            Browse the portfolio
          </Link>
        </aside>
      </div>
    </section>
  );
}
