import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/constants";
import { ApiResponse } from "@/types";
import { checkRateLimit } from "@/lib/rate-limit";

const GROQ_TIMEOUT_MS = 15_000;
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute

export async function POST(req: NextRequest) {
  try {
    // Rate limiting by IP
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(`chat:${ip}`, RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Trop de requêtes. Réessayez dans une minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Format de messages invalide." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("[API_CHAT] GROQ_API_KEY is missing");
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Configuration API manquante." },
        { status: 500 }
      );
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), GROQ_TIMEOUT_MS);

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
          max_tokens: 800,
          temperature: 0.7,
        }),
        signal: controller.signal,
      },
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[API_CHAT] Groq API error:", errorData);
      return NextResponse.json<ApiResponse>(
        { success: false, error: "L'IA a rencontré un problème." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Désolé, je n'ai pas pu générer de réponse.";
    
    return NextResponse.json<ApiResponse>({ success: true, data: reply });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error("[API_CHAT] Request timed out");
      return NextResponse.json<ApiResponse>(
        { success: false, error: "L'IA met trop de temps à répondre. Réessayez ?" },
        { status: 504 }
      );
    }
    console.error("[API_CHAT] Server error:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Une erreur interne est survenue." },
      { status: 500 },
    );
  }
}
