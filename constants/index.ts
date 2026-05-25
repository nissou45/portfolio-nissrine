import { Project, Experience, SkillCategory, ContactInfo } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: 1,
    nom: "La tête dans les nuages",
    desc: "Site de coiffure à domicile — prise de RDV, prestations, espace client",
    tech: ["TypeScript", "React", "Next.js", "Vercel"],
    url: "https://latetedanslesnuages-web.vercel.app",
    type: "browser",
    color: "#F5F0EB",
    emoji: "☁️",
  },
  {
    id: 2,
    nom: "Snapnest",
    desc: "Application de partage et gestion de photos",
    tech: ["Angular", "TypeScript"],
    url: null,
    type: "browser",
    color: "#EBF0F5",
    emoji: "📸",
  },
  {
    id: 3,
    nom: "App Zenbulle",
    desc: "Application mobile de bien-être et méditation",
    tech: ["React Native", "Expo", "JavaScript"],
    url: "https://app-zenbulle.vercel.app",
    type: "mobile",
    color: "#F0EBF5",
    emoji: "🧘",
  },
    {
      id: 4,
      nom: "TotoApp",
      desc: "Application de gestion de tâches personnelles",
      tech: ["React", "Tailwind CSS"],
      url: "https://todo-app-hazel-iota-13.vercel.app/",
      type: "browser",
      color: "#EBF5F0",
      emoji: "✅",
    },
];

export const CV_PROJECTS: Project[] = [
  {
    id: 1,
    nom: "La tête dans les nuages — API",
    desc: "API REST complète",
    tech: ["TypeScript", "Node.js", "Express"],
    url: null,
    type: "browser",
    color: "",
    emoji: "☁️",
  },
  {
    id: 2,
    nom: "La tête dans les nuages — Web",
    desc: "Interface web élégante",
    tech: ["TypeScript", "React"],
    url: null,
    type: "browser",
    color: "",
    emoji: "🌐",
  },
  {
    id: 3,
    nom: "La tête dans les nuages — Blog",
    desc: "Blog avec gestion de contenu",
    tech: ["TypeScript", "React"],
    url: null,
    type: "browser",
    color: "",
    emoji: "✍️",
  },
  {
    id: 4,
    nom: "Snapnest",
    desc: "App de partage de photos",
    tech: ["Angular", "TypeScript"],
    url: null,
    type: "browser",
    color: "",
    emoji: "📸",
  },
  {
    id: 5,
    nom: "App Zenbulle",
    desc: "App mobile bien-être",
    tech: ["React Native", "JS"],
    url: null,
    type: "mobile",
    color: "",
    emoji: "🧘",
  },
    {
      id: 6,
      nom: "TotoApp",
      desc: "Gestion de tâches",
      tech: ["React", "Tailwind"],
      url: "https://todo-app-hazel-iota-13.vercel.app/",
      type: "browser",
      color: "",
      emoji: "✅",
    },
];

export const EXPERIENCES: Experience[] = [
  {
    poste: "Développeuse Web — Stage",
    org: "Aneo & Access IQ · Paris",
    date: "2026",
    bullets: [
      "Développement de composants Angular et React Native (TypeScript)",
      "Stylisation avec Tailwind CSS et SCSS",
      "Intégration de maquettes Figma en responsive design",
      "Gestion de tickets techniques via GitHub et Notion",
      "Participation aux cérémonies Agile (daily, sprint review, retrospective)",
      "Suivi d'un projet en production et cycle de vie produit complet",
      "Collaboration avec les équipes dev, design et product owner",
    ],
  },
  {
    poste: "Responsable de Salon & Coiffeuse",
    org: "Salon de coiffure · Pau",
    date: "2009 – 2024",
    bullets: [
      "Management équipe : planning, formation",
      "Relation client et fidélisation",
      "Gestion administrative et stocks",
      "Développement du CA",
    ],
  },
];

export const FORMATIONS: Experience[] = [
  {
    poste: "Formation Développeuse Web & Site Web",
    org: "AFEC · Pau",
    date: "2025 – 2026",
    bullets: [
      "HTML, CSS, JavaScript — fondamentaux",
      "Projets pratiques & stage en entreprise",
    ],
  },
  {
    poste: "Montée en compétences — Self-learning",
    org: "OpenClassroom & projets perso · En ligne",
    date: "2026 – présent",
    bullets: [
      "TypeScript, React, React Native, Angular, Next.js",
      "Node.js, Express, MongoDB, Docker, SQL",
      "Projets : La tête dans les nuages, Snapnest, Zenbulle, TotoApp",
      "Exploration IA & prompt engineering",
    ],
  },
];

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

export const CONTACT_INFOS: ContactInfo[] = [
  {
    ico: "☎",
    label: "Téléphone",
    val: "0656 75 07 71",
    href: "tel:0656750771",
  },
  {
    ico: "@",
    label: "Email",
    val: "niss91@icloud.com",
    href: "mailto:niss91@icloud.com",
  },
  {
    ico: "⌂",
    label: "Localisation",
    val: "Mazères-Lezons (64)",
  },
  {
    ico: "in",
    label: "LinkedIn",
    val: "nissrine-bussenet",
    href: "https://linkedin.com/in/nissrine-bussenet-5a2260386",
  },
  {
    ico: "⌥",
    label: "GitHub",
    val: "github.com/nissou45",
    href: "https://github.com/nissou45",
  },
];

export const SUGGESTIONS = [
  "Quels sont tes projets perso ?",
  "Tu fais du back-end aussi ?",
  "Parle-moi de ta reconversion",
  "Quels sont tes outils DevOps ?",
];

export const TABS = [
  "Profil",
  "Expériences",
  "Formation",
  "Projets",
  "Compétences",
  "RDV",
  "Contact",
  "Chat IA",
];

export const SYSTEM_PROMPT = `Tu es l'assistante IA de Nissrine Bussenet, développeuse fullstack junior en reconversion professionnelle à Mazères-Lezons (64).

COMPÉTENCES FRONT : HTML5, CSS3, SCSS, JavaScript, TypeScript, React, React Native, Angular, Next.js, Tailwind CSS.
COMPÉTENCES BACK : Node.js, Express, REST API, MongoDB, SQL, NoSQL, Docker, PHP.
OUTILS : Git/GitHub, Figma, Notion, Postman, Tailscale, Expo, Agile.
EN PROGRESSION : IA & Prompt Engineering, PostgreSQL.
PROJETS : La tête dans les nuages (API/Web/Blog en TypeScript), Snapnest (Angular), App Zenbulle (React Native), TotoApp (React/Tailwind).
STAGE 2024 : Aneo & Access IQ Paris.
Réponds en français, concis, chaleureux et professionnel.`;
