import Link from "next/link";
import { PROJECTS } from "@/constants";
import { ProjectCard } from "@/components/portfolio/ProjectCard";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen py-16 px-6 bg-gradient-to-br from-purple-50 via-amber-50 to-stone-100">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="mb-3 text-sm font-semibold text-purple-400 tracking-widest uppercase">
            Mes réalisations
          </p>
          <h1 className="mb-4 text-4xl font-bold text-stone-800">Portfolio</h1>
          <p className="max-w-xl mx-auto text-lg text-stone-400">
            Des projets fullstack — du design à l&apos;API, du mobile au web 💜
          </p>
          <Link
            href="/cv"
            className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-purple-600 transition hover:text-purple-800"
          >
            ← Voir mon CV
          </Link>
        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-20">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-10 text-center border-t border-stone-200">
          <p className="text-sm text-stone-400">
            Nissrine Bussenet — Développeuse Fullstack 💜
          </p>
          <nav className="mt-4 flex justify-center gap-6">
            <Link
              href="/cv"
              className="text-sm font-semibold text-purple-500 hover:text-purple-700"
            >
              CV
            </Link>
            <Link
              href="/portfolio"
              className="text-sm font-semibold text-purple-500 hover:text-purple-700"
            >
              Portfolio
            </Link>
            <a
              href="https://github.com/nissou45"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-purple-500 hover:text-purple-700"
            >
              GitHub
            </a>
          </nav>
        </footer>
      </div>
    </main>
  );
}
