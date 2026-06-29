import { useEffect } from "react";

export function useTilt() {
  useEffect(() => {
    const motionOK = !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!motionOK) return;

    const bindTilt = () => {
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        if (el.dataset.tiltBound) return;
        el.dataset.tiltBound = "true";

        el.addEventListener("pointermove", (e: PointerEvent) => {
          if (
            document.documentElement.getAttribute("data-motion") === "off"
          )
            return;
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          el.style.transform = `perspective(1000px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateY(-5px)`;
        });

        el.addEventListener("pointerleave", () => {
          el.style.transform = "";
        });
      });
    };

    bindTilt();
  }, []);
}
