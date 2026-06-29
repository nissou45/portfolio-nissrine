import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/types';

export const useChat = () => {
  const [msgs, setMsgs] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      text: "Bonjour ! Je suis l'assistante IA de Nissrine. Posez-moi n'importe quelle question 😊",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const msgsRef = useRef<ChatMessage[]>(msgs);

  useEffect(() => {
    msgsRef.current = msgs;
  }, [msgs]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const sendChat = async (text?: string) => {
    const query = (text || input).trim();
    if (!query || loading) return;

    setInput("");
    setError(null);

    const userMsg: ChatMessage = { role: 'user', text: query };
    const history = [...msgsRef.current, userMsg];
    setMsgs(history);
    setLoading(true);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    // Add an empty assistant message that we'll fill progressively
    setMsgs((prev) => [...prev, { role: 'assistant', text: '' }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({
            role: m.role,
            content: m.text,
          })),
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        let errMsg = "Erreur lors de la réponse.";
        try { errMsg = JSON.parse(text).error || errMsg; } catch { errMsg = text || errMsg; }
        throw new Error(errMsg);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("Impossible de lire le flux.");

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        // Could be plain text or JSON error
        if (chunk.startsWith("{")) {
          try {
            const errData = JSON.parse(chunk);
            if (errData.error) throw new Error(errData.error);
          } catch (e) {
            if (e instanceof Error && e.message !== "Unexpected token") throw e;
          }
        }
        accumulated += chunk;
        // Update the last assistant message (the empty one we added)
        setMsgs((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: 'assistant', text: accumulated };
          return next;
        });
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      const errMsg = err instanceof Error ? err.message : "Erreur de connexion !";
      setError(errMsg);
      setMsgs((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last && last.role === 'assistant' && last.text === '') {
          next[next.length - 1] = { role: 'assistant', text: "Désolée, je rencontre une petite difficulté technique. Réessayez ?" };
        }
        return next;
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    msgs,
    loading,
    input,
    error,
    setInput,
    sendChat,
  };
};
