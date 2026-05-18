export const ProfileSection = () => {
  return (
    <div>
      <h3 className="text-lg font-bold text-stone-800 mb-4">
        À propos
      </h3>
      <p className="text-stone-500 italic leading-relaxed border-l-4 border-purple-200 pl-4 mb-6">
        Développeuse fullstack junior en reconversion professionnelle,
        je combine plus de 15 ans d&apos;expérience en management et relation
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
  );
};
