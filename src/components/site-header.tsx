"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/#top", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/journal", label: "Journal" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("top");

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    function updateActiveHash() {
      const contact = document.getElementById("contact");
      if (!contact) {
        setActiveHash("top");
        return;
      }

      setActiveHash(contact.getBoundingClientRect().top <= window.innerHeight * 0.45 ? "contact" : "top");
    }

    updateActiveHash();
    window.addEventListener("scroll", updateActiveHash, { passive: true });
    window.addEventListener("resize", updateActiveHash);
    window.addEventListener("hashchange", updateActiveHash);

    return () => {
      window.removeEventListener("scroll", updateActiveHash);
      window.removeEventListener("resize", updateActiveHash);
      window.removeEventListener("hashchange", updateActiveHash);
    };
  }, [pathname]);

  const isActive = (href: string) => {
    const path = href.split("#")[0] || "/";
    const hash = href.split("#")[1];
    if (hash && path === "/") return pathname === "/" && activeHash === hash;
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const handleAnchorClick = (href: string) => {
    setOpen(false);
    if (!href.startsWith("/#") || pathname !== "/") return;
    const target = document.getElementById(href.split("#")[1]);
    if (!target) return;
    requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="mx-auto max-w-[1440px] rounded-2xl border border-[var(--line)] bg-[var(--paper-card)]/90 px-4 py-3 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.18)] backdrop-blur-md">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" aria-label="Go to home" className="flex items-center rounded-xl px-2 py-1">
            <Image
              src="/brand/drivan-monogram.png"
              alt="Drivan logo"
              width={38}
              height={38}
              priority
              className="h-9 w-9 object-contain"
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex lg:gap-10">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  scroll={!item.href.includes("#")}
                  onClick={() => handleAnchorClick(item.href)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.14em] text-[var(--ink-soft)] transition-colors duration-[250ms] ease-out hover:text-[var(--ink)]",
                    active && "bg-[var(--paper)] text-[var(--ink)]",
                  )}
                >
                  <span>{item.label}</span>
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-[var(--stamp)] transition-transform duration-[250ms] ease-out",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] text-[var(--ink)] md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open ? (
          <div className="mt-4 grid gap-2 border-t border-[var(--line)] pt-4 md:hidden">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  scroll={!item.href.includes("#")}
                  onClick={() => handleAnchorClick(item.href)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-[4px] px-3 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[var(--ink)] hover:bg-[var(--paper)]",
                    active && "bg-[var(--paper)] text-[var(--stamp)]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        ) : null}
      </nav>
    </header>
  );
}
