"use client";

import { useEffect, useState, useCallback } from "react";

type FloatingEmoji = {
  id: string;
  emoji: string;
  x: number;
  drift: number;
  rotation: number;
};

export function FloatingEmojiOverlay() {
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([]);

  const addEmoji = useCallback((emoji: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setEmojis((prev) => [
      ...prev,
      {
        id,
        emoji,
        x: 60 + Math.random() * 30,
        drift: -15 + Math.random() * 30,
        rotation: -20 + Math.random() * 40,
      },
    ]);
    setTimeout(() => {
      setEmojis((prev) => prev.filter((e) => e.id !== id));
    }, 3200);
  }, []);

  // Expose the addEmoji function via a custom event listener
  useEffect(() => {
    function handleFloatEmoji(e: CustomEvent<string>) {
      addEmoji(e.detail);
    }
    window.addEventListener("float-emoji" as any, handleFloatEmoji);
    return () => window.removeEventListener("float-emoji" as any, handleFloatEmoji);
  }, [addEmoji]);

  if (emojis.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
      {emojis.map((e) => (
        <span
          key={e.id}
          className="absolute text-3xl"
          style={{
            left: `${e.x}%`,
            bottom: "15%",
            animation: `floating-emoji 3s ease-out forwards`,
            transform: `rotate(${e.rotation}deg)`,
          }}
        >
          {e.emoji}
        </span>
      ))}
    </div>
  );
}

// Helper to dispatch float emoji event
export function triggerFloatingEmoji(emoji: string) {
  window.dispatchEvent(new CustomEvent("float-emoji", { detail: emoji }));
}
