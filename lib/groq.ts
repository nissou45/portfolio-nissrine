const GROQ_TIMEOUT_MS = 25_000;

interface GroqStreamChoice {
  delta: { content?: string };
}
interface GroqStreamChunk {
  choices?: GroqStreamChoice[];
}

export interface GroqMessage {
  role: string;
  content: string;
}

/**
 * Stream a chat completion from Groq.
 * Calls onChunk for every text delta, and onError for fatal errors.
 */
export async function streamGroqChat(
  apiKey: string,
  systemPrompt: string,
  messages: GroqMessage[],
  onChunk: (text: string) => void,
  onError: (msg: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), GROQ_TIMEOUT_MS);

  try {
    const res = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "system", content: systemPrompt }, ...messages],
          max_tokens: 2048,
          temperature: 0.7,
          stream: true,
        }),
        signal: signal || controller.signal,
      },
    );

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      console.error("[Groq] API error:", errBody);
      onError("L'IA a rencontré un problème.");
      return;
    }

    const reader = res.body?.getReader();
    if (!reader) {
      onError("Impossible de lire le flux.");
      return;
    }

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith("data: ")) continue;
        const data = trimmed.slice(6);
        if (data === "[DONE]") continue;

        try {
          const parsed = JSON.parse(data) as GroqStreamChunk;
          const content = parsed.choices?.[0]?.delta?.content || "";
          if (content) onChunk(content);
        } catch {
          /* skip malformed chunk */
        }
      }
    }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      onChunk("\n\n⏱️ Désolée, la réponse a pris trop de temps.");
    } else {
      console.error("[Groq] Stream error:", error);
      onChunk("\n\nUne erreur est survenue.");
    }
  } finally {
    clearTimeout(timeoutId);
  }
}
