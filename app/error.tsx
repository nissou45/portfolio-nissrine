"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[APP_ERROR]", error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-amber-50 to-stone-100 p-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-stone-800 mb-2">
          Une erreur est survenue
        </h1>
        <p className="text-stone-500 mb-6">
          Désolée, quelque chose s&apos;est mal passé.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-xl bg-purple-700 text-white font-semibold text-sm hover:bg-purple-600 transition"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl border border-stone-200 bg-white text-stone-700 font-semibold text-sm hover:border-purple-300 transition"
          >
            Accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
