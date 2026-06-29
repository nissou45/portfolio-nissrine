"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <a href="#top" className="brand">
        <span className="mk">N</span>
        Nissrine Bussenet
      </a>
      <div className="nav-links">
        <a href="#travaux">Travaux</a>
        <a href="#parcours">Parcours</a>
        <a href="#competences">Compétences</a>
        <a href="#apropos">À propos</a>
        <a href="#assistant">Assistant IA</a>
        <a href="#contact">Contact</a>
      </div>
      <a href="#contact" className="nav-cta">
        <span className="dot live" />
        <span>Disponible</span>
      </a>
      <ThemeToggle />
    </nav>
  );
}
