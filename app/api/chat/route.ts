import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/constants";
import { ApiResponse } from "@/types";

export async function POST(req: NextRequest) {
  try {
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

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
          max_tokens: 400,
        }),
      },
    );

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
    console.error("[API_CHAT] Server error:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Une erreur interne est survenue." },
      { status: 500 },
    );
  }
}
