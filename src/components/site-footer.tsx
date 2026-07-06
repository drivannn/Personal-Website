"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const footerLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/journal", label: "Journal" },
];

export function SiteFooter() {
  const pathname = usePathname();

  return (
    <footer className="relative z-10 border-t border-[#d8cbb0]/18 bg-[var(--night)] px-5 py-12 text-[#d8cbb0] sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-[220px]">
          <p className="font-display text-[26px] font-semibold leading-none tracking-[0.025em] text-[var(--paper-card)]">
            drivan.works
          </p>
          <p className="mt-2 text-xs leading-none text-[#d8cbb0]/65">Crafted with care.</p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm">
          {footerLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "group relative inline-flex items-center py-1 transition-colors duration-[250ms] ease-out hover:text-[var(--paper-card)]",
                  "opacity-90",
                  isActive ? "text-[var(--paper-card)] opacity-100" : "",
                ].join(" ")}
              >
                <span>{link.label}</span>
                <span
                  className={[
                    "absolute -bottom-1 left-0 h-px bg-[var(--stamp)] transition-all duration-[250ms] ease-out",
                    isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-80",
                  ].join(" ")}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
