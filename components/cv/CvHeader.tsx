import Image from "next/image";

export const CvHeader = () => {
  return (
    <div className="bg-white px-6 md:px-10 pt-8 pb-0">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-800">
            Nissrine Bussenet
          </h1>
          <p className="text-purple-500 font-semibold mt-1">
            Développeuse Fullstack — Web & Mobile
          </p>
        </div>
        <div className="text-left md:text-right text-sm text-stone-400 leading-relaxed">
          <div>niss91@icloud.com</div>
          <div>06 56 75 07 71</div>
          <a
            href="https://github.com/nissou45"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-600 transition"
          >
            github.com/nissou45
          </a>
        </div>
      </div>

      {/* Photo Section */}
      <div className="flex flex-col items-center my-6">
        <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-purple-200 overflow-hidden shadow-xl shadow-purple-100">
          <Image
            src="/photo.jpg"
            alt="Nissrine Bussenet"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
        <span className="mt-3 text-xs bg-emerald-50 text-emerald-600 border border-emerald-200 px-4 py-1 rounded-full font-semibold flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          Open to work
        </span>
      </div>
    </div>
  );
};
