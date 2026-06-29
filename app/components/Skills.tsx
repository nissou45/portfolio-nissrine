"use client";

import { SKILL_CATEGORIES } from "@/constants";

export default function Skills() {
  return (
    <section id="competences">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <span className="sec-idx">03</span>
          <h2>Compétences</h2>
        </div>
        <div className="skills-grid">
          {SKILL_CATEGORIES.map((s, i) => (
            <div
              key={i}
              className={`skill-card${s.grow ? " grow" : ""}`}
              data-reveal
            >
              <h4>
                {s.cat}
                {s.grow ? " 🌱" : ""}
              </h4>
              <div className="chips">
                {s.items.map((item, j) => (
                  <span key={j} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
