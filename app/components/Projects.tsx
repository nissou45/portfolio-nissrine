"use client";

import Image from "next/image";
import { PROJECTS } from "@/constants";

function shortUrl(u: string | null) {
  if (!u) return "";
  return u.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export default function Projects() {
  return (
    <section id="travaux">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <span className="sec-idx">01</span>
          <h2>
            Travaux <span className="gradtext">sélectionnés</span>
          </h2>
        </div>
        <div className="projects">
          {PROJECTS.map((p, i) => {
            const isEven = i % 2 === 1;
            const media =
              p.type === "mobile" ? (
                <div className="phone-wrap">
                  <div className="phone" data-tilt>
                    <div className="screen" style={{ background: p.color }}>
                      {p.url ? (
                        <iframe
                          src={p.url}
                          className="w-full h-full border-0"
                          title={`${p.nom} preview`}
                          loading="lazy"
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        />
                      ) : (
                        <>
                          <div className="deco" />
                          <div className="glyph">{p.emoji}</div>
                          <div className="ttl">{p.nom}</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="browser" data-tilt>
                  <div className="browser-bar">
                    <div className="dots">
                      <i />
                      <i />
                      <i />
                    </div>
                    <div className="url">{p.url ? shortUrl(p.url) : "Bientôt disponible…"}</div>
                  </div>
                  <div className="screen" style={{ background: p.color }}>
                    {p.url ? (
                      <iframe
                        src={p.url}
                        className="w-full h-full border-0"
                        title={`${p.nom} preview`}
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      />
                    ) : (
                      <>
                        <div className="deco" />
                        <div className="glyph">{p.emoji}</div>
                        <div className="ttl">{p.nom}</div>
                      </>
                    )}
                  </div>
                </div>
              );
            const link = p.url ? (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pj-link"
              >
                Voir le projet en ligne <span className="arr">→</span>
              </a>
            ) : (
              <span className="pj-soon">● Bientôt en ligne</span>
            );
            return (
              <article
                key={p.id}
                className={`project${isEven ? " even" : ""}`}
                data-reveal
              >
                <div className={`pj-media${isEven ? " even" : ""}`}>{media}</div>
                <div className="pj-info">
                  <span className="num">PROJET 0{p.id}</span>
                  <h3>{p.nom}</h3>
                  <p>{p.desc}</p>
                  <div className="tags">
                    {p.tech.map((t, j) => (
                      <span key={j} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  {link}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
