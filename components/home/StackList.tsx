const STACK = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Angular",
  "React Native",
  "MongoDB",
  "Docker",
];

export const StackList = () => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-lg mx-auto">
      {STACK.map((t, i) => (
        <span
          key={i}
          className="text-xs px-3 py-1.5 bg-white text-stone-600 rounded-lg border border-stone-200 font-medium shadow-sm hover:border-purple-200 transition"
        >
          {t}
        </span>
      ))}
    </div>
  );
};
