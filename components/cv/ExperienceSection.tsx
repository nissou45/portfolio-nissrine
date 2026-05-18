import { Experience } from "@/types";
import { EXPERIENCES } from "@/constants";

export const ExperienceSection = () => {
  return (
    <div>
      <h3 className="text-lg font-bold text-stone-800 mb-6">
        Expériences professionnelles
      </h3>
      {EXPERIENCES.map((item, i) => (
        <ExperienceItem key={i} item={item} />
      ))}
    </div>
  );
};

const ExperienceItem = ({ item }: { item: Experience }) => (
  <div className="flex gap-4 mb-8">
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
);
