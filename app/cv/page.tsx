"use client";

import { useState } from "react";
type RdvForm = {
  nom: string;
  email: string;
  motif: string;
  date: string;
  msg: string;
};

const SUGGESTIONS = [
  "Quels sont tes projets perso ?",
  "Tu fais du back-end aussi ?",
  "Parle-moi de ta reconversion",
  "Quels sont tes outils DevOps ?",
];

export default function Home() {
  const [tab, setTab] = useState("profil");
  const [msgs, setMsgs] = useState([
    {
      role: "ai",
      text: "Bonjour ! Je suis l'assistante IA de Nissrine. Posez-moi n'importe quelle question 😊",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [rdv, setRdv] = useState<RdvForm>({
    nom: "",
    email: "",
    motif: "Recrutement CDI",
    date: "",
    msg: "",
  });
  const [rdvSent, setRdvSent] = useState(false);
  const [rdvLoading, setRdvLoading] = useState(false);

  const sendChat = async (text?: string) => {
    const q = (text || input).trim();
    if (!q || loading) return;
    setInput("");
    const next = [...msgs, { role: "user", text: q }];
    setMsgs(next);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({
            role: m.role === "ai" ? "assistant" : "user",
            content: m.text,
          })),
        }),
      });
      const data = await res.json();
      setMsgs((m) => [...m, { role: "ai", text: data.reply }]);
    } catch {
      setMsgs((m) => [...m, { role: "ai", text: "Erreur de connexion !" }]);
    }
    setLoading(false);
  };

  const sendRdv = async () => {
    if (!rdv.nom || !rdv.email) return;
    setRdvLoading(true);
    try {
      await fetch("/api/rdv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rdv),
      });
      setRdvSent(true);
    } catch {
      alert("Erreur, réessayez !");
    }
    setRdvLoading(false);
  };

  const TABS = [
    "Profil",
    "Expériences",
    "Formation",
    "Projets",
    "Compétences",
    "RDV",
    "Contact",
    "Chat IA",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-amber-50 to-stone-100 flex justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-white px-10 pt-8 pb-0">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-stone-800">
                Nissrine Bussenet
              </h1>
              <p className="text-purple-500 font-semibold mt-1">
                Développeuse Fullstack — Web & Mobile
              </p>
            </div>
            <div className="text-right text-sm text-stone-400 leading-relaxed">
              <div>niss91@icloud.com</div>
              <div>0656 75 07 71</div>
              <div>github.com/nissou45</div>
            </div>
          </div>

          {/* Photo */}
          <div className="flex flex-col items-center my-6">
            <div className="w-48 h-48 rounded-full border-4 border-purple-200 overflow-hidden shadow-xl shadow-purple-100">
              <img
                src="/photo.jpg"
                alt="Nissrine"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="mt-3 text-xs bg-emerald-50 text-emerald-600 border border-emerald-200 px-4 py-1 rounded-full font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Open to work
            </span>
          </div>
        </div>

        {/* Band beige */}
        <div className="bg-gradient-to-r from-purple-50 to-amber-50 px-10 py-6 border-y border-purple-100">
          <div className="grid grid-cols-2 gap-10">
            <div>
              <h2 className="font-bold text-stone-800 mb-3">Profil</h2>
              <p className="text-sm text-stone-500 italic leading-relaxed">
                Développeuse fullstack en reconversion, je combine 15 ans de
                management avec une maîtrise des technologies modernes front-end
                et back-end.
              </p>
            </div>
            <div>
              <h2 className="font-bold text-stone-800 mb-3">Stack clé</h2>
              <div className="flex flex-wrap gap-2">
                {["Re", "TS", "Ng", "RN", "NJ", "No", "🌱"].map((s, i) => (
                  <div
                    key={i}
                    className="w-11 h-11 rounded-full bg-white border-2 border-purple-200 flex items-center justify-center text-xs font-bold text-purple-700 shadow-sm"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-stone-100 px-4">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t.toLowerCase().replace(" ", "-"))}
              className={`px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
                tab === t.toLowerCase().replace(" ", "-")
                  ? "border-purple-400 text-purple-700"
                  : "border-transparent text-stone-400 hover:text-stone-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-10">
          {tab === "profil" && (
            <div>
              <h3 className="text-lg font-bold text-stone-800 mb-4">
                À propos
              </h3>
              <p className="text-stone-500 italic leading-relaxed border-l-4 border-purple-200 pl-4 mb-6">
                Développeuse fullstack junior en reconversion professionnelle,
                je combine plus de 15 ans d expérience en management et relation
                client avec une solide maîtrise des technologies front-end et
                back-end modernes.
              </p>
              <h3 className="text-lg font-bold text-stone-800 mb-3">Langues</h3>
              <div className="flex gap-3 mb-6 flex-wrap">
                {["Français", "Espagnol", "Arabe", "Anglais technique"].map(
                  (l, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-semibold border border-purple-200"
                    >
                      {l}
                    </span>
                  ),
                )}
              </div>
              <h3 className="text-lg font-bold text-stone-800 mb-3">
                Qualités
              </h3>
              <div className="flex gap-3 flex-wrap">
                {[
                  "Créative & sens du détail",
                  "Rigoureuse & organisée",
                  "Leadership naturel",
                  "Orientée satisfaction client",
                ].map((q, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-amber-50 text-amber-800 rounded-full text-sm font-semibold border border-amber-200"
                  >
                    {q}
                  </span>
                ))}
              </div>
            </div>
          )}

          {tab === "expériences" && (
            <div>
              <h3 className="text-lg font-bold text-stone-800 mb-6">
                Expériences professionnelles
              </h3>
              {[
                {
                  poste: "Développeuse Web — Stage",
                  org: "Aneo & Access IQ · Paris",
                  date: "2026",
                  bullets: [
                    "Développement de composants Angular et React Native (TypeScript)",
                    "Stylisation avec Tailwind CSS et SCSS",
                    "Intégration de maquettes Figma en responsive design",
                    "Gestion de tickets techniques via GitHub et Notion",
                    "Participation aux cérémonies Agile (daily, sprint review, retrospective)",
                    "Suivi d'un projet en production et cycle de vie produit complet",
                    "Collaboration avec les équipes dev, design et product owner",
                  ],
                },
                {
                  poste: "Responsable de Salon & Coiffeuse",
                  org: "Salon de coiffure · Pau",
                  date: "2009 – 2024",
                  bullets: [
                    "Management équipe : planning, formation",
                    "Relation client et fidélisation",
                    "Gestion administrative et stocks",
                    "Développement du CA",
                  ],
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 mb-8">
                  <div className="w-24 flex-shrink-0 pt-1">
                    <span className="text-xs bg-purple-50 text-purple-600 border border-purple-200 px-2 py-1 rounded-full font-bold">
                      {item.date}
                    </span>
                  </div>
                  <div className="flex flex-col items-center w-6">
                    <div className="w-3 h-3 rounded-full bg-purple-400 mt-1 shadow-sm shadow-purple-200"></div>
                    <div className="w-0.5 bg-stone-100 flex-1 mt-1"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="font-bold text-stone-800 uppercase text-sm tracking-wide">
                      {item.poste}
                    </div>
                    <div className="text-purple-500 text-sm font-semibold mt-1">
                      {item.org}
                    </div>
                    <ul className="mt-3 space-y-1">
                      {item.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="text-sm text-stone-500 pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-purple-300"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "formation" && (
            <div>
              <h3 className="text-lg font-bold text-stone-800 mb-6">
                Formation & montée en compétences
              </h3>
              {[
                {
                  poste: "Formation Développeuse Web & Site Web",
                  org: "AFEC · Pau",
                  date: "2025 – 2026",
                  bullets: [
                    "HTML, CSS, JavaScript — fondamentaux",
                    "Projets pratiques & stage en entreprise",
                  ],
                },
                {
                  poste: "Montée en compétences — Self-learning",
                  org: "OpenClassroom & projets perso · En ligne",
                  date: "2026 – présent",
                  bullets: [
                    "TypeScript, React, React Native, Angular, Next.js",
                    "Node.js, Express, MongoDB, Docker, SQL",
                    "Projets : La tête dans les nuages, Snapnest, Zenbulle, TotoApp",
                    "Exploration IA & prompt engineering",
                  ],
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 mb-8">
                  <div className="w-24 flex-shrink-0 pt-1">
                    <span className="text-xs bg-purple-50 text-purple-600 border border-purple-200 px-2 py-1 rounded-full font-bold">
                      {item.date}
                    </span>
                  </div>
                  <div className="flex flex-col items-center w-6">
                    <div className="w-3 h-3 rounded-full bg-purple-400 mt-1"></div>
                    <div className="w-0.5 bg-stone-100 flex-1 mt-1"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="font-bold text-stone-800 uppercase text-sm tracking-wide">
                      {item.poste}
                    </div>
                    <div className="text-purple-500 text-sm font-semibold mt-1">
                      {item.org}
                    </div>
                    <ul className="mt-3 space-y-1">
                      {item.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="text-sm text-stone-500 pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-purple-300"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "projets" && (
            <div>
              <h3 className="text-lg font-bold text-stone-800 mb-6">
                Projets personnels
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    e: "☁️",
                    n: "La tête dans les nuages — API",
                    d: "API REST complète",
                    t: ["TypeScript", "Node.js", "Express"],
                  },
                  {
                    e: "🌐",
                    n: "La tête dans les nuages — Web",
                    d: "Interface web élégante",
                    t: ["TypeScript", "React"],
                  },
                  {
                    e: "✍️",
                    n: "La tête dans les nuages — Blog",
                    d: "Blog avec gestion de contenu",
                    t: ["TypeScript", "React"],
                  },
                  {
                    e: "📸",
                    n: "Snapnest",
                    d: "App de partage de photos",
                    t: ["Angular", "TypeScript"],
                  },
                  {
                    e: "🧘",
                    n: "App Zenbulle",
                    d: "App mobile bien-être",
                    t: ["React Native", "JS"],
                  },
                  {
                    e: "✅",
                    n: "TotoApp",
                    d: "Gestion de tâches",
                    t: ["React", "Tailwind"],
                  },
                ].map((p, i) => (
                  <div
                    key={i}
                    className="bg-stone-50 rounded-2xl p-4 border border-stone-100 hover:border-purple-200 hover:-translate-y-1 transition-all"
                  >
                    <div className="text-2xl mb-2">{p.e}</div>
                    <div className="font-bold text-stone-800 text-sm mb-1 leading-tight">
                      {p.n}
                    </div>
                    <div className="text-xs text-stone-400 mb-3">{p.d}</div>
                    <div className="flex flex-wrap gap-1">
                      {p.t.map((t, j) => (
                        <span
                          key={j}
                          className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded font-semibold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "compétences" && (
            <div>
              <h3 className="text-lg font-bold text-stone-800 mb-6">
                Stack technique
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    cat: "Front-End",
                    items: ["HTML5", "CSS3", "SCSS", "Tailwind CSS"],
                  },
                  { cat: "Langages", items: ["JavaScript", "TypeScript"] },
                  {
                    cat: "Frameworks Front",
                    items: ["React", "React Native", "Angular", "Next.js"],
                  },
                  {
                    cat: "Back-End",
                    items: ["Node.js", "Express", "REST API", "PHP"],
                  },
                  {
                    cat: "Bases de données",
                    items: ["MongoDB", "SQL", "NoSQL", "phpMyAdmin"],
                  },
                  {
                    cat: "DevOps & Outils",
                    items: [
                      "Docker",
                      "Git/GitHub",
                      "Postman",
                      "Tailscale",
                      "Expo",
                      "Figma",
                      "Notion",
                      "Agile",
                    ],
                  },
                  {
                    cat: "En progression 🌱",
                    items: ["IA & Prompt Engineering", "PostgreSQL"],
                    grow: true,
                  },
                ].map((g, i) => (
                  <div
                    key={i}
                    className={`rounded-xl p-4 border ${g.grow ? "bg-emerald-50 border-emerald-200" : "bg-stone-50 border-stone-100"}`}
                  >
                    <div
                      className={`text-xs font-bold uppercase tracking-wider mb-3 ${g.grow ? "text-emerald-600" : "text-stone-400"}`}
                    >
                      {g.cat}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {g.items.map((s, j) => (
                        <span
                          key={j}
                          className={`text-xs px-3 py-1 rounded-lg font-medium ${g.grow ? "bg-emerald-100 text-emerald-700" : "bg-white text-stone-700 border border-stone-200"}`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "rdv" && (
            <div>
              <h3 className="text-lg font-bold text-stone-800 mb-2">
                Prendre rendez-vous
              </h3>
              <p className="text-stone-400 text-sm mb-6">
                Vous souhaitez discuter d une opportunité ? Je vous réponds sous
                24h !
              </p>
              {!rdvSent ? (
                <div className="bg-gradient-to-br from-purple-50 to-amber-50 rounded-2xl p-6 border border-purple-100">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {[
                      {
                        label: "Votre nom",
                        key: "nom",
                        placeholder: "Jean Dupont",
                        type: "text",
                      },
                      {
                        label: "Votre email",
                        key: "email",
                        placeholder: "jean@example.com",
                        type: "email",
                      },
                      {
                        label: "Date souhaitée",
                        key: "date",
                        placeholder: "",
                        type: "date",
                      },
                    ].map((f) => (
                      <div key={f.key}>
                        <label className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-1 block">
                          {f.label}
                        </label>
                        <input
                          type={f.type}
                          placeholder={f.placeholder}
                          value={rdv[f.key as keyof typeof rdv]}
                          onChange={(e) =>
                            setRdv((r) => ({ ...r, [f.key]: e.target.value }))
                          }
                          className="w-full border border-purple-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-400 bg-white"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-1 block">
                        Motif
                      </label>
                      <select
                        value={rdv.motif}
                        onChange={(e) =>
                          setRdv((r) => ({ ...r, motif: e.target.value }))
                        }
                        className="w-full border border-purple-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-400 bg-white"
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
                    onChange={(e) =>
                      setRdv((r) => ({ ...r, msg: e.target.value }))
                    }
                    className="w-full border border-purple-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-400 bg-white mb-4 resize-none"
                  />
                  <button
                    onClick={sendRdv}
                    disabled={rdvLoading || !rdv.nom || !rdv.email}
                    className="w-full bg-purple-700 text-white rounded-xl py-3 font-bold text-sm hover:bg-purple-600 transition disabled:opacity-40"
                  >
                    {rdvLoading ? "Envoi en cours…" : "Envoyer ma demande ✨"}
                  </button>
                </div>
              ) : (
                <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl p-6 text-center font-semibold">
                  🎉 Demande envoyée ! Nissrine vous contactera sous 24h.
                </div>
              )}
            </div>
          )}

          {tab === "contact" && (
            <div>
              <h3 className="text-lg font-bold text-stone-800 mb-6">
                Me contacter
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    ico: "☎",
                    label: "Téléphone",
                    val: "0656 75 07 71",
                    href: "tel:0656750771",
                  },
                  {
                    ico: "@",
                    label: "Email",
                    val: "niss91@icloud.com",
                    href: "mailto:niss91@icloud.com",
                  },
                  {
                    ico: "⌂",
                    label: "Localisation",
                    val: "Mazères-Lezons (64)",
                  },
                  {
                    ico: "in",
                    label: "LinkedIn",
                    val: "nissrine-bussenet",
                    href: "https://linkedin.com/in/nissrine-bussenet-5a2260386",
                  },
                  {
                    ico: "⌥",
                    label: "GitHub",
                    val: "github.com/nissou45",
                    href: "https://github.com/nissou45",
                  },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="bg-stone-50 rounded-xl p-4 flex items-center gap-3 border border-stone-100"
                  >
                    <div className="w-9 h-9 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-sm font-bold text-purple-600 flex-shrink-0">
                      {c.ico}
                    </div>
                    <div>
                      <div className="text-xs text-stone-400 uppercase font-bold tracking-wide">
                        {c.label}
                      </div>
                      {c.href ? (
                        <a
                          href={c.href}
                          target="_blank"
                          className="text-sm font-semibold text-stone-700 hover:text-purple-600"
                        >
                          {c.val}
                        </a>
                      ) : (
                        <div className="text-sm font-semibold text-stone-700">
                          {c.val}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "chat-ia" && (
            <div className="flex flex-col h-96">
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 mb-4 text-sm text-stone-500">
                <strong className="text-purple-600">
                  🤖 Assistante IA de Nissrine
                </strong>
                <br />
                Posez-moi une question sur son parcours, ses projets ou ses
                compétences !
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => sendChat(s)}
                    className="text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-full text-stone-500 hover:border-purple-300 hover:text-purple-600 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto flex flex-col gap-3 mb-4">
                {msgs.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "self-end bg-purple-700 text-white rounded-br-sm"
                        : "self-start bg-stone-100 text-stone-700 rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
                {loading && (
                  <div className="self-start bg-stone-100 text-stone-400 text-sm italic px-4 py-3 rounded-2xl rounded-bl-sm">
                    En train de répondre…
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendChat()}
                  placeholder="Votre question…"
                  disabled={loading}
                  className="flex-1 border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-400 bg-stone-50"
                />
                <button
                  onClick={() => sendChat()}
                  disabled={loading || !input.trim()}
                  className="bg-purple-700 text-white rounded-xl px-5 font-bold text-lg disabled:opacity-40 hover:bg-purple-600 transition"
                >
                  ↗
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
