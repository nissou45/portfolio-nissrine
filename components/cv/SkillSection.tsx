import { SKILL_CATEGORIES } from "@/constants";
import { SkillCategory } from "@/types";

export const SkillSection = () => {
  return (
    <div>
      <h3 className="text-lg font-bold text-stone-800 mb-6">
        Stack technique
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SKILL_CATEGORIES.map((g, i) => (
          <SkillCategoryItem key={i} group={g} />
        ))}
      </div>
    </div>
  );
};

const SkillCategoryItem = ({ group }: { group: SkillCategory }) => (
  <div
    className={`rounded-xl p-4 border ${
      group.grow
        ? "bg-emerald-50 border-emerald-200"
        : "bg-stone-50 border-stone-100"
    }`}
  >
    <div
      className={`text-xs font-bold uppercase tracking-wider mb-3 ${
        group.grow ? "text-emerald-600" : "text-stone-400"
      }`}
    >
      {group.cat}
    </div>
    <div className="flex flex-wrap gap-2">
      {group.items.map((s, j) => (
        <span
          key={j}
          className={`text-xs px-3 py-1 rounded-lg font-medium ${
            group.grow
              ? "bg-emerald-100 text-emerald-700"
              : "bg-white text-stone-700 border border-stone-200"
          }`}
        >
          {s}
        </span>
      ))}
    </div>
  </div>
);
