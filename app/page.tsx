import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { StackList } from "@/components/home/StackList";
import { SocialLinks } from "@/components/home/SocialLinks";

export default function HomePage() {
  return (
    <main className="min-h-screen p-6 flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-amber-50 to-stone-100">
      <div className="w-full max-w-2xl">
        <Hero />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/cv"
            className="px-8 py-4 rounded-2xl bg-stone-800 text-white font-bold text-sm text-center transition shadow-lg shadow-stone-200 hover:bg-purple-700"
          >
            Voir mon CV →
          </Link>
          <Link
            href="/portfolio"
            className="px-8 py-4 rounded-2xl border border-stone-200 bg-white text-stone-800 font-bold text-sm text-center transition shadow-lg hover:border-purple-300"
          >
            Voir mon Portfolio →
          </Link>
        </div>

        <StackList />
        <SocialLinks />
      </div>
    </main>
  );
}
