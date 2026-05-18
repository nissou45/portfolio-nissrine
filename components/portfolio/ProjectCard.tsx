import { Project } from "@/types";
import { BrowserMockup } from "./BrowserMockup";
import { MobileMockup } from "./MobileMockup";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex flex-col ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-10 items-center`}
    >
      {/* Visual Preview */}
      <div className="w-full lg:w-3/5">
        {project.type === "mobile" ? (
          <MobileMockup url={project.url} color={project.color} />
        ) : (
          <BrowserMockup url={project.url} color={project.color} />
        )}
      </div>

      {/* Project Details */}
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
            className="inline-flex items-center gap-2 bg-stone-800 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-purple-700 transition shadow-md shadow-stone-200"
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
  );
};
