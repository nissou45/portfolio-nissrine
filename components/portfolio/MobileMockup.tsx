export function MobileMockup({ url, color }: { url: string | null; color: string }) {
  return (
    <div className="mx-auto w-40 md:w-48 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-purple-100 border-[6px] border-stone-800 bg-stone-800">
      {/* Haut du téléphone (Haut-parleur/Caméra) */}
      <div className="h-6 flex items-center justify-center">
        <div className="w-12 h-1 bg-stone-900 rounded-full" />
      </div>
      
      {/* Contenu de l'écran */}
      <div className="h-72 md:h-80 rounded-2xl overflow-hidden" style={{ background: color }}>
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
      
      {/* Bas du téléphone (Bouton home ou barre) */}
      <div className="h-6 flex items-center justify-center">
        <div className="w-8 h-1 bg-stone-700 rounded-full" />
      </div>
    </div>
  );
}
