"use client";

import { useEffect } from "react";

export function HashScrollHandler() {
  useEffect(() => {
    function scrollToHash() {
      const hash = window.location.hash;

      if (!hash) return;

      let attempts = 0;

      function tryScroll() {
        const target = document.querySelector(hash);
        attempts += 1;

        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        if (attempts < 12) {
          window.setTimeout(tryScroll, 90);
        }
      }

      requestAnimationFrame(tryScroll);
    }

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    window.addEventListener("load", scrollToHash);

    return () => {
      window.removeEventListener("hashchange", scrollToHash);
      window.removeEventListener("load", scrollToHash);
    };
  }, []);

  return null;
}
