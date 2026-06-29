import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    document.documentElement.classList.add("has-reveal");

    const revs = [...document.querySelectorAll("[data-reveal]")] as HTMLElement[];

    const checkReveal = () => {
      const vh = window.innerHeight;
      for (let i = revs.length - 1; i >= 0; i--) {
        if (revs[i].getBoundingClientRect().top < vh * 0.92) {
          revs[i].classList.add("in");
          revs.splice(i, 1);
        }
      }
    };

    const revealAll = () => {
      revs.forEach((el) => el.classList.add("in"));
      revs.length = 0;
    };

    checkReveal();
    requestAnimationFrame(() => {
      checkReveal();
      requestAnimationFrame(checkReveal);
    });

    window.addEventListener("scroll", checkReveal, { passive: true });
    window.addEventListener("resize", checkReveal, { passive: true });
    window.addEventListener("load", checkReveal);
    setTimeout(revealAll, 1600);

    return () => {
      window.removeEventListener("scroll", checkReveal);
      window.removeEventListener("resize", checkReveal);
      window.removeEventListener("load", checkReveal);
    };
  }, []);
}
