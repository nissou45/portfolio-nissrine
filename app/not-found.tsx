import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-amber-50 to-stone-100 p-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-4xl font-bold text-stone-800 mb-2">404</h1>
        <p className="text-stone-500 mb-6">
          Cette page n&apos;existe pas.
        </p>
        <Link
          href="/"
          className="inline-flex px-6 py-3 rounded-xl bg-purple-700 text-white font-semibold text-sm hover:bg-purple-600 transition"
        >
          Retour à l&apos;accueil →
        </Link>
      </div>
    </main>
  );
}
