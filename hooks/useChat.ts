import { useState, useRef, useEffect } from 'react';
import { ChatMessage, ApiResponse } from '@/types';

const CHAT_TIMEOUT_MS = 15_000;

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

  // Keep msgsRef in sync
  useEffect(() => {
    msgsRef.current = msgs;
  }, [msgs]);

  // Cleanup abort controller on unmount
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

    // Abort any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const timeoutId = setTimeout(() => controller.abort(), CHAT_TIMEOUT_MS);

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

      const result: ApiResponse<string> = await res.json();

      if (!result.success) {
        throw new Error(result.error || "Erreur lors de la réponse.");
      }

      setMsgs((prev) => [...prev, { role: 'assistant', text: result.data! }]);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      const errMsg = err instanceof Error ? err.message : "Erreur de connexion !";
      setError(errMsg);
      setMsgs((prev) => [...prev, { role: 'assistant', text: "Désolée, je rencontre une petite difficulté technique. Réessayez ?" }]);
    } finally {
      clearTimeout(timeoutId);
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
