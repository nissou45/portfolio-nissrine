"use client";

import ChatWidget from "./ChatWidget";

export default function Assistant() {
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
            <span className="assistant-note">
              ✦ Conversationnel · temps réel
            </span>
          </div>
          <ChatWidget />
        </div>
      </div>
    </section>
  );
}
