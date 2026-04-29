import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Tu es l'assistante IA de Nissrine Bussenet, développeuse fullstack junior en reconversion professionnelle à Mazères-Lezons (64).

COMPÉTENCES FRONT : HTML5, CSS3, SCSS, JavaScript, TypeScript, React, React Native, Angular, Next.js, Tailwind CSS.
COMPÉTENCES BACK : Node.js, Express, REST API, MongoDB, SQL, NoSQL, Docker, PHP.
OUTILS : Git/GitHub, Figma, Notion, Postman, Tailscale, Expo, Agile.
EN PROGRESSION : IA & Prompt Engineering, PostgreSQL.
PROJETS : La tête dans les nuages (API/Web/Blog en TypeScript), Snapnest (Angular), App Zenbulle (React Native), TotoApp (React/Tailwind).
STAGE 2024 : Aneo & Access IQ Paris.
Réponds en français, concis, chaleureux et professionnel.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
          max_tokens: 400,
        }),
      },
    );

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      "Je n'ai pas pu répondre, réessayez !";
    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json(
      { reply: "Erreur serveur, réessayez !" },
      { status: 500 },
    );
  }
}
