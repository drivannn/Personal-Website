"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 24,
    mass: 0.2,
  });

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-[120] h-[2px] bg-transparent">
      <motion.div
        className="h-full origin-left bg-[var(--stamp)]"
        style={{ scaleX }}
      />
    </div>
  );
}
