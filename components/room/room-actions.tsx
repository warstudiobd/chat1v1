"use client";

import { useState } from "react";
import { Mic, MicOff, Gift, Send, Smile } from "lucide-react";
import { GiftPanel } from "@/components/room/gift-panel";

export function RoomActions({ roomId }: { roomId: string }) {
  const [message, setMessage] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const [showGifts, setShowGifts] = useState(false);

  return (
    <>
      <div className="sticky bottom-16 flex items-center gap-2 border-t border-border bg-background p-3 md:bottom-0">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            isMuted
              ? "bg-destructive/20 text-destructive"
              : "bg-green-500/20 text-green-400"
          }`}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <MicOff className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </button>

        <div className="flex flex-1 items-center gap-2 rounded-full border border-input bg-card px-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Say something..."
            className="h-10 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            className="text-muted-foreground hover:text-foreground"
            aria-label="Emoji"
          >
            <Smile className="h-5 w-5" />
          </button>
        </div>

        {message ? (
          <button
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full gradient-primary"
            aria-label="Send message"
          >
            <Send className="h-5 w-5 text-primary-foreground" />
          </button>
        ) : (
          <button
            onClick={() => setShowGifts(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold"
            aria-label="Send gift"
          >
            <Gift className="h-5 w-5" />
          </button>
        )}
      </div>

      {showGifts && (
        <GiftPanel roomId={roomId} onClose={() => setShowGifts(false)} />
      )}
    </>
  );
}
