import { CV_PROJECTS } from "@/constants";
import { Project } from "@/types";

export const ProjectSection = () => {
  return (
    <div>
      <h3 className="text-lg font-bold text-stone-800 mb-6">
        Projets personnels
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CV_PROJECTS.map((p, i) => (
          <ProjectItem key={i} project={p} />
        ))}
      </div>
    </div>
  );
};

const ProjectItem = ({ project }: { project: Project }) => (
  <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100 hover:border-purple-200 hover:-translate-y-1 transition-all">
    <div className="text-2xl mb-2">{project.emoji}</div>
    <div className="font-bold text-stone-800 text-sm mb-1 leading-tight">
      {project.nom}
    </div>
    <div className="text-xs text-stone-400 mb-3">{project.desc}</div>
    <div className="flex flex-wrap gap-1">
      {project.tech.map((t, j) => (
        <span
          key={j}
          className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded font-semibold"
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);
