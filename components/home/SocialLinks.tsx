export const SocialLinks = () => {
  const links = [
    { label: "GitHub", href: "https://github.com/nissou45" },
    { label: "LinkedIn", href: "https://linkedin.com/in/nissrine-bussenet-5a2260386" },
    { label: "Email", href: "mailto:niss91@icloud.com" },
  ];

  return (
    <div className="flex justify-center gap-6">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-stone-400 hover:text-purple-600 font-semibold transition"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};
