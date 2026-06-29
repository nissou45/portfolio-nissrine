"use client";

import RdvForm from "./RdvForm";

export default function Contact() {
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
            <a
              href="mailto:niss91@icloud.com"
              className="contact-mail"
              data-reveal
            >
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
