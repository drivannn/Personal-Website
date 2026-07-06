"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.35 });
  const smoothY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.35 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    const move = (event: PointerEvent) => {
      setVisible(true);
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const leave = () => setVisible(false);
    const over = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      setActive(Boolean(target?.closest("a, button, [data-cursor='magnetic']")));
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[140] hidden h-9 w-9 rounded-full border border-[#f6b632]/50 mix-blend-screen shadow-[0_0_26px_rgba(246,182,50,0.25)] md:block"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: active ? 1.85 : 1,
        backgroundColor: active ? "rgba(187,51,51,0.16)" : "rgba(246,182,50,0.05)",
      }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f6b632]" />
    </motion.div>
  );
}
