import Image from "next/image";

export const Hero = () => {
  return (
    <div className="text-center max-w-2xl">
      {/* Photo */}
      <div className="relative w-32 h-32 rounded-full border-4 border-purple-200 overflow-hidden shadow-xl shadow-purple-100 mx-auto mb-8">
        <Image
          src="/photo.jpg"
          alt="Nissrine Bussenet"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Nom */}
      <h1 className="text-5xl font-bold text-stone-800 mb-3 tracking-tight">
        Nissrine Bussenet
      </h1>
      <p className="text-purple-500 font-semibold text-lg mb-2">
        Développeuse Fullstack — Web & Mobile
      </p>
      <p className="text-stone-400 text-sm mb-10 italic">
        Reconversion professionnelle · Mazères-Lezons (64)
      </p>
    </div>
  );
};
