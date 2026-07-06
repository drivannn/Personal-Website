"use client";

import { ReactLenis } from "lenis/react";

export function LenisProvider() {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        anchors: {
          offset: -88,
          duration: 1.05,
          easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
        },
        duration: 1.05,
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1,
        wheelMultiplier: 0.85,
      }}
    />
  );
}
