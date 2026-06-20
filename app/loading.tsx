export default function Loading() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-amber-50 to-stone-100">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
        <p className="text-sm text-stone-400 font-medium">Chargement…</p>
      </div>
    </main>
  );
}
