"use client";

import Image from "next/image";

const STACK = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Angular",
  "React Native",
  "MongoDB",
  "Docker",
  "Tailwind",
  "Express",
  "SCSS",
  "Figma",
];

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-meta" data-reveal>
              <span className="chip-glass">
                <span className="status-dot" />
                Ouverte aux opportunités
              </span>
              <span className="chip-glass">Web &amp; Mobile</span>
              <span className="chip-glass">Mazères-Lezons (64)</span>
            </div>
            <h1 data-reveal>
              Nissrine
              <br />
              <span className="gradtext">Bussenet</span>
            </h1>
            <p className="role" data-reveal>Développeuse Fullstack</p>
            <p className="hero-sub" data-reveal>
              <b>15 ans à diriger un salon</b>, aujourd&apos;hui à concevoir et
              coder des produits web &amp; mobile en React, Angular, React&nbsp;Native
              et Node.js.
            </p>
            <div className="btn-row" data-reveal>
              <a href="#travaux" className="btn btn-primary">
                Voir mes travaux <span className="arr">→</span>
              </a>
              <a href="#contact" className="btn btn-ghost">
                Me contacter
              </a>
            </div>
          </div>
          <div className="portrait-wrap" data-reveal style={{ position: "relative" }}>
            <div className="portrait-glow" />
            <div className="portrait" data-tilt>
              <Image
                src="/photo.jpg"
                alt="Nissrine Bussenet"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            <div className="float-card">
              <div className="n">15+</div>
              <div className="l">
                ans de management
                <br />→ aujourd&apos;hui dev
              </div>
            </div>
          </div>
        </div>
        <div className="marquee" data-reveal>
          <div className="marquee-track">
            {[...STACK, ...STACK].map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
