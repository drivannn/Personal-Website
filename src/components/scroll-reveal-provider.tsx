"use client";

import { animate } from "framer-motion";
import { useEffect } from "react";

export function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const parallaxElements = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const delay = Number(element.dataset.revealDelay ?? "0");

            animate(
              element,
              {
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                filter: "blur(0px)",
                opacity: 1,
                transform: "translateY(0px) scale(1)",
              },
              {
                delay,
                duration: 0.48,
                ease: [0.16, 1, 0.3, 1],
              },
            ).then(() => element.classList.add("is-visible"));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element, index) => {
      element.dataset.revealDelay = `${Math.min(index * 0.035, 0.21)}`;
      observer.observe(element);
    });

    function updateParallax() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        parallaxElements.forEach((element) => {
          const speed = Number(element.dataset.parallax ?? "0.05");
          const rect = element.getBoundingClientRect();
          const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
          const y = centerOffset * speed * -1;

          element.style.setProperty("--parallax-y", `${y.toFixed(2)}px`);
        });
      });
    }

    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateParallax);
      window.removeEventListener("resize", updateParallax);
    };
  }, []);

  return <>{children}</>;
}
