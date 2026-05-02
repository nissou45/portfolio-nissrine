"use client";

const PROJECTS = [
  {
    id: 1,
    nom: "La tête dans les nuages",
    desc: "Site de coiffure à domicile — prise de RDV, prestations, espace client",
    tech: ["TypeScript", "React", "Next.js", "Vercel"],
    url: "https://latetedanslesnuages-web.vercel.app",
    type: "browser",
    color: "#F5F0EB",
  },
  {
    id: 2,
    nom: "Snapnest",
    desc: "Application de partage et gestion de photos",
    tech: ["Angular", "TypeScript"],
    url: null,
    type: "browser",
    color: "#EBF0F5",
  },
  {
    id: 3,
    nom: "App Zenbulle",
    desc: "Application mobile de bien-être et méditation",
    tech: ["React Native", "Expo", "JavaScript"],
    url: "https://app-zenbulle.vercel.app",
    type: "mobile",
    color: "#F0EBF5",
  },
  {
    id: 4,
    nom: "TotoApp",
    desc: "Application de gestion de tâches personnelles",
    tech: ["React", "Tailwind CSS"],
    url: null,
    type: "browser",
    color: "#EBF5F0",
  },
];

function BrowserMockup({ url, color }: { url: string | null; color: string }) {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-2xl shadow-purple-100 border border-stone-200">
      {/* Barre navigateur */}
      <div className="bg-stone-100 px-4 py-2.5 flex items-center gap-2 border-b border-stone-200">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-stone-400 ml-2">
          {url || "Bientôt disponible…"}
        </div>
      </div>
      {/* Contenu */}
      <div className="h-64 w-full" style={{ background: color }}>
        {url ? (
          <iframe
            src={url}
            className="w-full h-full border-0"
            title="Project preview"
            loading="lazy"
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-3">
            <div className="text-4xl">🚀</div>
            <div className="text-sm text-stone-400 font-medium">
              Déploiement en cours…
            </div>
            <div className="text-xs text-stone-300">Bientôt disponible !</div>
          </div>
        )}
      </div>
    </div>
  );
}

function MobileMockup({ url, color }: { url: string | null; color: string }) {
  return (
    <div className="mx-auto w-48 rounded-3xl overflow-hidden shadow-2xl shadow-purple-100 border-4 border-stone-800">
      {/* Encoche */}
      <div className="bg-stone-800 h-6 flex items-center justify-center">
        <div className="w-16 h-3 bg-stone-900 rounded-full" />
      </div>
      {/* Contenu */}
      <div className="h-80" style={{ background: color }}>
        {url ? (
          <iframe
            src={url}
            className="w-full h-full border-0"
            title="Mobile preview"
            loading="lazy"
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-3">
            <div className="text-3xl">🚀</div>
            <div className="text-xs text-stone-400 text-center px-4">
              Bientôt disponible !
            </div>
          </div>
        )}
      </div>
      {/* Bouton home */}
      <div className="bg-stone-800 h-6 flex items-center justify-center">
        <div className="w-8 h-1 bg-stone-600 rounded-full" />
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-amber-50 to-stone-100 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-purple-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Mes réalisations
          </p>
          <h1 className="text-4xl font-bold text-stone-800 mb-4">Portfolio</h1>
          <p className="text-stone-400 text-lg max-w-xl mx-auto">
            Des projets fullstack — du design à lAPI, du mobile au web 💜
          </p>
          <a
            href="/cv"
            className="inline-flex items-center gap-2 mt-6 text-sm text-purple-600 hover:text-purple-800 font-semibold transition"
          >
            ← Voir mon CV
          </a>
        </div>

        {/* Projects */}
        <div className="flex flex-col gap-20">
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 items-center`}
            >
              {/* Mockup */}
              <div className="w-full lg:w-3/5">
                {project.type === "mobile" ? (
                  <MobileMockup url={project.url} color={project.color} />
                ) : (
                  <BrowserMockup url={project.url} color={project.color} />
                )}
              </div>

              {/* Infos */}
              <div className="w-full lg:w-2/5">
                <div className="text-xs text-purple-400 font-bold uppercase tracking-widest mb-2">
                  Projet 0{project.id}
                </div>
                <h2 className="text-2xl font-bold text-stone-800 mb-3">
                  {project.nom}
                </h2>
                <p className="text-stone-500 leading-relaxed mb-5">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t, j) => (
                    <span
                      key={j}
                      className="text-xs px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg font-semibold border border-purple-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-stone-800 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-purple-700 transition"
                  >
                    Voir le projet →
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 bg-stone-100 text-stone-400 px-6 py-3 rounded-xl font-semibold text-sm">
                    🚀 Bientôt en ligne
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-20 pt-10 border-t border-stone-200">
          <p className="text-stone-400 text-sm">
            Nissrine Bussenet — Développeuse Fullstack 💜
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <a
              href="/cv"
              className="text-sm text-purple-500 hover:text-purple-700 font-semibold"
            >
              CV
            </a>
            <a
              href="/contact"
              className="text-sm text-purple-500 hover:text-purple-700 font-semibold"
            >
              Contact
            </a>
            <a
              href="https://github.com/nissou45"
              target="_blank"
              className="text-sm text-purple-500 hover:text-purple-700 font-semibold"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
