"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { PROJECTS, EXPERIENCES, FORMATIONS, SKILL_CATEGORIES, SUGGESTIONS } from "@/constants";
import { useChat } from "@/hooks/useChat";
import { useRdv } from "@/hooks/useRdv";

const STACK = ["React", "TypeScript", "Next.js", "Node.js", "Angular", "React Native", "MongoDB", "Docker", "Tailwind", "Express", "SCSS", "Figma"];
const MOTIFS = ["Recrutement CDI", "Recrutement CDD", "Mission Freelance", "Collaboration projet", "Autre"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function shortUrl(u: string | null) {
  if (!u) return "";
  return u.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/* ---------- THEME TOGGLE ---------- */
function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <button
      onClick={toggle}
      className="theme-toggle"
      aria-label={`Passer en mode ${theme === "light" ? "sombre" : "clair"}`}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}

/* ---------- NAV ---------- */
function Nav() {
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

/* ---------- HERO ---------- */
function Hero() {
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
              <Image src="/photo.jpg" alt="Nissrine Bussenet" fill className="object-cover object-top" priority />
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

/* ---------- PROJECTS ---------- */
function Projects() {
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

/* ---------- PARCOURS ---------- */
function Parcours() {
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

/* ---------- SKILLS ---------- */
function Skills() {
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

/* ---------- ABOUT ---------- */
function About() {
  return (
    <section id="apropos">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <span className="sec-idx">04</span>
          <h2>À propos</h2>
        </div>
        <div className="about-grid">
          <div data-reveal>
            <p className="lead">
              Du <em>salon</em> au <em>code</em> — j&apos;ai troqué les ciseaux
              contre le clavier, sans rien perdre du sens du détail.
            </p>
            <p>
              Développeuse fullstack en reconversion, je combine plus de 15 ans
              d&apos;expérience en management et relation client avec une maîtrise
              des technologies front-end et back-end modernes. Rigueur, créativité
              et écoute : les mêmes qualités qui faisaient revenir mes clientes
              guident aujourd&apos;hui mes interfaces.
            </p>
          </div>
          <div className="about-card" data-reveal>
            <div className="about-sub">Langues</div>
            <div className="pill-row">
              {["Français", "Espagnol", "Arabe", "Anglais technique"].map((l, i) => (
                <span key={i} className="pill">
                  {l}
                </span>
              ))}
            </div>
            <div className="about-sub">Qualités</div>
            <div className="pill-row">
              {[
                "Créative & sens du détail",
                "Rigoureuse & organisée",
                "Leadership naturel",
                "Orientée client",
              ].map((q, i) => (
                <span key={i} className="pill q">
                  {q}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CHAT ---------- */
function ChatWidget() {
  const { msgs, loading, input, error, setInput, sendChat } = useChat();
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, loading]);

  return (
    <div className="chat" data-reveal>
      <div className="chat-head">
        <div className="chat-ava">
          <Image src="/photo.jpg" alt="Nissrine" width={42} height={42} className="object-cover object-top" />
        </div>
        <div>
          <div className="h-name">Assistante de Nissrine</div>
          <div className="h-status">
            <span className="dot" />
            en ligne
          </div>
        </div>
      </div>
      <div className="chat-body" ref={bodyRef}>
        {msgs.map((m, i) => (
          <div key={i} className={`msg ${m.role === "user" ? "user" : "bot"}`}>
            {m.role === "user"
              ? m.text
              : m.text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/(^|\s)\*(\S.*?\S)\*(\s|$)/g, "$1$2$3")}
          </div>
        ))}
        {loading && (
          <div className="typing">
            <i />
            <i />
            <i />
          </div>
        )}
      </div>
      {error && <div className="chat-err">{error}</div>}
      {msgs.length <= 1 && (
        <div className="suggs">
          {SUGGESTIONS.map((s, i) => (
            <button key={i} className="sugg" onClick={() => sendChat(s)}>
              {s}
            </button>
          ))}
        </div>
      )}
      <div className="chat-input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendChat()}
          placeholder="Votre question…"
          disabled={loading}
          aria-label="Votre question"
        />
        <button
          className="chat-send"
          onClick={() => sendChat()}
          disabled={loading || !input.trim()}
          aria-label="Envoyer"
        >
          ↑
        </button>
      </div>
    </div>
  );
}

/* ---------- ASSISTANT IA ---------- */
function Assistant() {
  return (
    <section id="assistant">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <span className="sec-idx">05</span>
          <h2>
            Assistant <span className="gradtext">IA</span>
          </h2>
        </div>
        <div className="assistant-grid">
          <div className="assistant-intro" data-reveal>
            <p className="lead">
              Une question sur mon <em>parcours</em>, mes <em>projets</em> ou mes{" "}
              <em>compétences</em> ?
            </p>
            <p>
              Mon assistant connaît mon CV sur le bout des doigts — reconversion,
              stack technique, expériences. Discutez avec lui comme vous le feriez
              avec moi.
            </p>
            <span className="assistant-note">✦ Conversationnel · temps réel</span>
          </div>
          <ChatWidget />
        </div>
      </div>
    </section>
  );
}

/* ---------- RDV FORM ---------- */
function RdvForm() {
  const { rdv, rdvSent, rdvLoading, error, sendRdv, updateRdv } = useRdv();
  const valid = rdv.nom.trim() && EMAIL_RE.test(rdv.email);

  if (rdvSent) {
    return (
      <div className="rdv-success">
        <div className="ico">🎉</div>
        <h3>Demande envoyée</h3>
        <p>
          Merci {rdv.nom.split(" ")[0]} ! Nissrine vous recontacte sous 24h.
        </p>
      </div>
    );
  }

  return (
    <>
      <h3>Prendre rendez-vous</h3>
      <p className="rdv-sub">
        Discutons d&apos;une opportunité — réponse sous 24h.
      </p>
      <div className="rdv-fields">
        <div className="field">
          <label>Votre nom</label>
          <input
            value={rdv.nom}
            onChange={(e) => updateRdv("nom", e.target.value)}
            placeholder="Jean Dupont"
          />
        </div>
        <div className="field">
          <label>Votre email</label>
          <input
            type="email"
            value={rdv.email}
            onChange={(e) => updateRdv("email", e.target.value)}
            placeholder="jean@exemple.com"
          />
        </div>
        <div className="field">
          <label>Date souhaitée</label>
          <input
            type="date"
            value={rdv.date}
            onChange={(e) => updateRdv("date", e.target.value)}
          />
        </div>
        <div className="field">
          <label>Motif</label>
          <select
            value={rdv.motif}
            onChange={(e) => updateRdv("motif", e.target.value)}
          >
            {MOTIFS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className="field full">
          <label>Message</label>
          <textarea
            value={rdv.msg}
            onChange={(e) => updateRdv("msg", e.target.value)}
            placeholder="Décrivez votre projet ou opportunité…"
          />
        </div>
      </div>
      {error && <div className="rdv-err">⚠️ {error}</div>}
      <button
        className="rdv-submit"
        onClick={sendRdv}
        disabled={rdvLoading || !valid}
      >
        {rdvLoading ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>
    </>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="contact-grid">
          <div className="contact-left">
            <div className="eyebrow" data-reveal>
              Disponible pour un poste ou une mission
            </div>
            <h2 data-reveal>
              Construisons quelque chose <em>ensemble</em>.
            </h2>
            <p className="lede" data-reveal>
              Un projet, un poste, ou simplement envie d&apos;échanger ?
              Écrivez-moi ou réservez un créneau — je réponds sous 24h.
            </p>
            <a href="mailto:niss91@icloud.com" className="contact-mail" data-reveal>
              niss91@icloud.com <span className="arr">→</span>
            </a>
            <div className="contact-links" data-reveal>
              <a href="tel:0656750771" className="cl">
                ☎ 06 56 75 07 71
              </a>
              <a
                href="https://linkedin.com/in/nissrine-bussenet-5a2260386"
                target="_blank"
                rel="noopener noreferrer"
                className="cl"
              >
                in · LinkedIn
              </a>
              <a
                href="https://github.com/nissou45"
                target="_blank"
                rel="noopener noreferrer"
                className="cl"
              >
                ⌥ github.com/nissou45
              </a>
            </div>
          </div>
          <div className="rdv-card" data-reveal>
            <RdvForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <p>© 2026 Nissrine Bussenet — Développeuse Fullstack</p>
          <a href="#top" className="to-top">
            Haut de page ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ---------- MAIN PAGE ---------- */
export default function HomePage() {
  // Reveal on scroll
  useEffect(() => {
    document.documentElement.classList.add("has-reveal");
    const revs = [...document.querySelectorAll("[data-reveal]")];
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

  // 3D tilt on hover
  useEffect(() => {
    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!motionOK) return;
    const bindTilt = () => {
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        if (el.dataset.tiltBound) return;
        el.dataset.tiltBound = "true";
        el.addEventListener("pointermove", (e: PointerEvent) => {
          if (document.documentElement.getAttribute("data-motion") === "off") return;
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

  return (
    <>
      <div className="aurora">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
        <div className="blob b4" />
        <div className="blob b5" />
      </div>
      <div className="grain" />
      <Nav />
      <Hero />
      <Projects />
      <Parcours />
      <Skills />
      <About />
      <Assistant />
      <Contact />
      <Footer />
    </>
  );
}
