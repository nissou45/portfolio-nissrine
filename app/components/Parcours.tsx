"use client";

import { EXPERIENCES, FORMATIONS } from "@/constants";

export default function Parcours() {
  const renderTimeline = (items: typeof EXPERIENCES) =>
    items.map((e, i) => (
      <div key={i} className="tl-item">
        <div className="tl-date">{e.date}</div>
        <div className="tl-role">{e.poste}</div>
        <div className="tl-org">{e.org}</div>
        <ul className="tl-bul">
          {e.bullets.map((b, j) => (
            <li key={j}>{b}</li>
          ))}
        </ul>
      </div>
    ));

  return (
    <section id="parcours">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <span className="sec-idx">02</span>
          <h2>Parcours</h2>
        </div>
        <div className="parcours-grid">
          <div data-reveal>
            <div className="col-h">Expérience</div>
            <div className="tl">{renderTimeline(EXPERIENCES)}</div>
          </div>
          <div data-reveal>
            <div className="col-h">Formation</div>
            <div className="tl">{renderTimeline(FORMATIONS)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
