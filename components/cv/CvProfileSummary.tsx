export const CvProfileSummary = () => {
  const stack = ["React", "TS", "Angular", "RN", "Next", "Node", "🌱"];

  return (
    <div className="bg-gradient-to-r from-purple-50 to-amber-50 px-6 md:px-10 py-6 border-y border-purple-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
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
            {stack.map((s, i) => (
              <div
                key={i}
                className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white border-2 border-purple-200 flex items-center justify-center text-xs font-bold text-purple-700 shadow-sm"
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
