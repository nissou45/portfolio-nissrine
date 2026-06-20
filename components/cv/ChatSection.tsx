"use client";

import { useEffect, useRef } from "react";
import { useChat } from "@/hooks/useChat";
import { SUGGESTIONS } from "@/constants";

export const ChatSection = () => {
  const { msgs, loading, input, error, setInput, sendChat } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  return (
    <div className="flex flex-col h-[500px] md:h-96">
      <div className="p-4 mb-4 rounded-xl border border-purple-100 bg-purple-50 text-sm text-stone-500">
        <strong className="text-purple-600">
          🤖 Assistante IA de Nissrine
        </strong>
        <br />
        Posez-moi une question sur son parcours, ses projets ou ses
        compétences !
      </div>

      {error && (
        <div className="p-2 mb-4 rounded-lg bg-red-50 border border-red-100 text-xs text-red-600 text-center">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            onClick={() => sendChat(s)}
            className="px-3 py-2 rounded-full border border-stone-200 bg-stone-50 text-xs text-stone-500 transition hover:border-purple-300 hover:text-purple-600"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex-1 mb-4 flex flex-col gap-3 overflow-y-auto scrollbar-hide">
        {msgs.map((m, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              m.role === "user"
                ? "self-end bg-purple-700 text-white rounded-br-sm"
                : "self-start bg-stone-100 text-stone-700 rounded-bl-sm"
            }`}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <div className="self-start px-4 py-3 rounded-2xl rounded-bl-sm bg-stone-100 text-stone-400 text-sm italic">
            En train de répondre…
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="mt-auto flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendChat()}
          placeholder="Votre question…"
          disabled={loading}
          className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm outline-none transition focus:border-purple-400"
        />
        <button
          onClick={() => sendChat()}
          disabled={loading || !input.trim()}
          className="px-5 rounded-xl bg-purple-700 text-white font-bold text-lg transition hover:bg-purple-600 disabled:opacity-40"
        >
          ↗
        </button>
      </div>
    </div>
  );
};
