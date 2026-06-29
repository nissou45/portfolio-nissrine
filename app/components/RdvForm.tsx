"use client";

import { EMAIL_RE } from "@/constants";
import { useRdv } from "@/hooks/useRdv";

const MOTIFS = [
  "Recrutement CDI",
  "Recrutement CDD",
  "Mission Freelance",
  "Collaboration projet",
  "Autre",
];

export default function RdvForm() {
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
