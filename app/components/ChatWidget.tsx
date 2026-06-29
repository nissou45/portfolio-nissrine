"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { SUGGESTIONS } from "@/constants";
import { useChat } from "@/hooks/useChat";

export default function ChatWidget() {
  const { msgs, loading, input, error, setInput, sendChat } = useChat();
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({
      top: bodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs, loading]);

  return (
    <div className="chat" data-reveal>
      <div className="chat-head">
        <div className="chat-ava">
          <Image
            src="/photo.jpg"
            alt="Nissrine"
            width={42}
            height={42}
            className="object-cover object-top"
          />
        </div>
        <div>
          <div className="h-name">Assistante de Nissrine</div>
          <div className="h-status">
            <span className="dot" />
            en ligne
          </div>
        </div>
      </div>
      <div className="chat-body" ref={bodyRef}>
        {msgs.map((m, i) => (
          <div
            key={i}
            className={`msg ${m.role === "user" ? "user" : "bot"}`}
          >
            {m.role === "user"
              ? m.text
              : m.text
                  .replace(/\*\*(.+?)\*\*/g, "$1")
                  .replace(
                    /(^|\s)\*(\S.*?\S)\*(\s|$)/g,
                    "$1$2$3"
                  )}
          </div>
        ))}
        {loading && (
          <div className="typing">
            <i />
            <i />
            <i />
          </div>
        )}
      </div>
      {error && <div className="chat-err">{error}</div>}
      {msgs.length <= 1 && (
        <div className="suggs">
          {SUGGESTIONS.map((s, i) => (
            <button key={i} className="sugg" onClick={() => sendChat(s)}>
              {s}
            </button>
          ))}
        </div>
      )}
      <div className="chat-input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendChat()}
          placeholder="Votre question…"
          disabled={loading}
          aria-label="Votre question"
        />
        <button
          className="chat-send"
          onClick={() => sendChat()}
          disabled={loading || !input.trim()}
          aria-label="Envoyer"
        >
          ↑
        </button>
      </div>
    </div>
  );
}
