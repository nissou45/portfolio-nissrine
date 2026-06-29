import { NextRequest } from "next/server";
import { SYSTEM_PROMPT_BASE, PROJECTS, EXPERIENCES, FORMATIONS, SKILL_CATEGORIES } from "@/constants";
import { streamGroqChat } from "@/lib/groq";

function buildSystemPrompt(): string {
  const projectsStr = PROJECTS.map(
    (p) => `- ${p.nom} : ${p.desc} (${p.tech.join(", ")})${p.url ? ` → ${p.url}` : ""}`
  ).join("\n");

  const skillsStr = SKILL_CATEGORIES.map(
    (s) => `${s.cat} : ${s.items.join(", ")}${s.grow ? " 🌱" : ""}`
  ).join("\n");

  const experiencesStr = EXPERIENCES.map(
    (e) => `- ${e.poste} @ ${e.org} (${e.date})\n  ${e.bullets.map((b) => `• ${b}`).join("\n  ")}`
  ).join("\n\n");

  const formationsStr = FORMATIONS.map(
    (f) => `- ${f.poste} @ ${f.org} (${f.date})\n  ${f.bullets.map((b) => `• ${b}`).join("\n  ")}`
  ).join("\n\n");

  return `${SYSTEM_PROMPT_BASE}

## DONNÉES DYNAMIQUES (injectées automatiquement)

### Projets
${projectsStr}

### Compétences
${skillsStr}

### Expériences
${experiencesStr}

### Formations
${formationsStr}`;
}

export async function POST(req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const sendError = (msg: string) => {
        controller.enqueue(encoder.encode(JSON.stringify({ error: msg }) + "\n"));
        controller.close();
      };

      try {
        const body = await req.json();
        const { messages } = body;

        if (!messages || !Array.isArray(messages)) {
          sendError("Format de messages invalide.");
          return;
        }

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
          sendError("Configuration API manquante.");
          return;
        }

        const systemPrompt = buildSystemPrompt();

        await streamGroqChat(
          apiKey,
          systemPrompt,
          messages,
          (text) => controller.enqueue(encoder.encode(text)),
          (msg) => sendError(msg),
        );

        controller.close();
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          controller.enqueue(encoder.encode("\n\n⏱️ Désolée, la réponse a pris trop de temps."));
        } else {
          console.error("[API_CHAT] Stream error:", error);
          controller.enqueue(encoder.encode("\n\nUne erreur est survenue."));
        }
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
