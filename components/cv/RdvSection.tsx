"use client";

import { useRdv } from "@/hooks/useRdv";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const RdvSection = () => {
  const { rdv, rdvSent, rdvLoading, error, sendRdv, updateRdv } = useRdv();

  const isFormValid = rdv.nom.trim() && rdv.email.trim() && EMAIL_REGEX.test(rdv.email);

  return (
    <div>
      <h3 className="text-lg font-bold text-stone-800 mb-2">
        Prendre rendez-vous
      </h3>
      <p className="text-sm text-stone-400 mb-6">
        Vous souhaitez discuter d&apos;une opportunité ? Je vous réponds sous 24h !
      </p>
      
      {!rdvSent ? (
        <div className="p-6 rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-amber-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <RdvInput 
              label="Votre nom" 
              value={rdv.nom} 
              placeholder="Jean Dupont" 
              onChange={(v) => updateRdv('nom', v)} 
            />
            <RdvInput 
              label="Votre email" 
              type="email" 
              value={rdv.email} 
              placeholder="jean@example.com" 
              onChange={(v) => updateRdv('email', v)} 
            />
            <RdvInput 
              label="Date souhaitée" 
              type="date" 
              value={rdv.date} 
              onChange={(v) => updateRdv('date', v)} 
            />
            <div>
              <label className="block mb-1 text-xs font-bold text-purple-600 uppercase tracking-wide">
                Motif
              </label>
              <select
                value={rdv.motif}
                onChange={(e) => updateRdv('motif', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-purple-200 bg-white text-sm outline-none transition focus:border-purple-400"
              >
                <option>Recrutement CDI</option>
                <option>Recrutement CDD</option>
                <option>Mission Freelance</option>
                <option>Collaboration projet</option>
                <option>Autre</option>
              </select>
            </div>
          </div>
          <textarea
            placeholder="Décrivez votre projet ou opportunité…"
            rows={3}
            value={rdv.msg}
            onChange={(e) => updateRdv('msg', e.target.value)}
            className="w-full px-4 py-2.5 mb-4 rounded-xl border border-purple-200 bg-white text-sm outline-none resize-none transition focus:border-purple-400"
          />
          
          {error && (
            <div className="mb-4 text-xs text-red-600 font-semibold text-center">
              ⚠️ {error}
            </div>
          )}

          <button
            onClick={sendRdv}
            disabled={rdvLoading || !isFormValid}
            className="w-full py-3 rounded-xl bg-purple-700 text-white font-bold text-sm transition hover:bg-purple-600 disabled:opacity-40"
          >
            {rdvLoading ? "Envoi en cours…" : "Envoyer ma demande ✨"}
          </button>
        </div>
      ) : (
        <div className="p-6 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 text-center font-semibold">
          🎉 Demande envoyée ! Nissrine vous contactera sous 24h.
        </div>
      )}
    </div>
  );
};

const RdvInput = ({ 
  label, 
  value, 
  placeholder, 
  type = "text", 
  onChange 
}: { 
  label: string; 
  value: string; 
  placeholder?: string; 
  type?: string; 
  onChange: (v: string) => void; 
}) => (
  <div>
    <label className="block mb-1 text-xs font-bold text-purple-600 uppercase tracking-wide">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2.5 rounded-xl border border-purple-200 bg-white text-sm outline-none transition focus:border-purple-400"
    />
  </div>
);
