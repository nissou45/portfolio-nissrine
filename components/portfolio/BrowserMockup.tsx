export function BrowserMockup({ url, color }: { url: string | null; color: string }) {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-2xl shadow-purple-100 border border-stone-200 bg-white">
      {/* Barre navigateur */}
      <div className="bg-stone-100 px-4 py-2.5 flex items-center gap-2 border-b border-stone-200">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 text-[10px] md:text-xs text-stone-400 ml-2 truncate">
          {url || "Bientôt disponible…"}
        </div>
      </div>
      
      {/* Contenu */}
      <div className="h-48 md:h-64 w-full" style={{ background: color }}>
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
