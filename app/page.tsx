import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-amber-50 to-stone-100 flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-2xl">
        {/* Photo */}
        <div className="w-32 h-32 rounded-full border-4 border-purple-200 overflow-hidden shadow-xl shadow-purple-100 mx-auto mb-8">
          <img
            src="/photo.jpg"
            alt="Nissrine"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Nom */}
        <h1 className="text-5xl font-bold text-stone-800 mb-3 tracking-tight">
          Nissrine Bussenet
        </h1>
        <p className="text-purple-500 font-semibold text-lg mb-2">
          Développeuse Fullstack — Web & Mobile
        </p>
        <p className="text-stone-400 text-sm mb-10 italic">
          Reconversion professionnelle · Mazères-Lezons (64)
        </p>

        {/* Boutons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/cv"
            className="bg-stone-800 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-purple-700 transition shadow-lg"
          >
            Voir mon CV →
          </Link>
          <Link
            href="/portfolio"
            className="bg-white text-stone-800 px-8 py-4 rounded-2xl font-bold text-sm hover:border-purple-300 transition shadow-lg border border-stone-200"
          >
            Voir mon Portfolio →
          </Link>
        </div>

        {/* Stack */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            "React",
            "TypeScript",
            "Next.js",
            "Node.js",
            "Angular",
            "React Native",
            "MongoDB",
            "Docker",
          ].map((t, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1.5 bg-white text-stone-600 rounded-lg border border-stone-200 font-medium shadow-sm"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Liens sociaux */}
        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/nissou45"
            target="_blank"
            className="text-sm text-stone-400 hover:text-purple-600 font-semibold transition"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/nissrine-bussenet-5a2260386"
            target="_blank"
            className="text-sm text-stone-400 hover:text-purple-600 font-semibold transition"
          >
            LinkedIn
          </a>
          <a
            href="mailto:niss91@icloud.com"
            className="text-sm text-stone-400 hover:text-purple-600 font-semibold transition"
          >
            Email
          </a>
        </div>
      </div>
    </main>
  );
}
