"use client";

export default function About() {
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
