import { SkillCategory } from "@/types";

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    cat: "Front-End",
    items: ["HTML5", "CSS3", "SCSS", "Tailwind CSS"],
  },
  { cat: "Langages", items: ["JavaScript", "TypeScript"] },
  {
    cat: "Frameworks Front",
    items: ["React", "React Native", "Angular", "Next.js"],
  },
  {
    cat: "Back-End",
    items: ["Node.js", "Express", "REST API", "PHP"],
  },
  {
    cat: "Bases de données",
    items: ["MongoDB", "SQL", "NoSQL", "phpMyAdmin"],
  },
  {
    cat: "DevOps & Outils",
    items: [
      "Docker",
      "Git/GitHub",
      "Postman",
      "Tailscale",
      "Expo",
      "Figma",
      "Notion",
      "Agile",
    ],
  },
  {
    cat: "En progression 🌱",
    items: ["IA & Prompt Engineering", "PostgreSQL"],
    grow: true,
  },
];
