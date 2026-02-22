"use client";

import { useEffect, useRef } from "react";
import { Gift, Megaphone } from "lucide-react";
import { GIFTS } from "@/lib/gifts";

type ChatMessage = {
  id: string;
  content: string | null;
  msgType: string;
  giftType: string | null;
  diamondCost: number | null;
  createdAt: string;
  sender: {
    id: string;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
};

type RoomChatProps = {
  messages: ChatMessage[];
  announcement?: string;
};

export function RoomChat({ messages, announcement }: RoomChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function getGiftEmoji(giftType: string | null): string {
    if (!giftType) return "";
    const gift = GIFTS.find((g) => g.id === giftType);
    return gift?.emoji ?? "";
  }

  return (
    <div className="relative z-10 flex flex-1 flex-col gap-2 px-3 min-h-0">
      {/* Room announcement */}
      {announcement && (
        <div className="flex items-start gap-2 rounded-xl glass-dark px-3 py-2.5">
          <Megaphone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gold">Room Announcement</span>
            <span className="text-xs text-foreground/80">{announcement}</span>
          </div>
        </div>
      )}

      {/* Gift prompt */}
      <button className="flex w-fit items-center gap-2 rounded-full gradient-primary px-4 py-2">
        <Gift className="h-4 w-4 text-primary-foreground" />
        <span className="text-xs font-semibold text-primary-foreground">
          {"Like? Send a gift!"}
        </span>
      </button>

      {/* Chat feed */}
      <div ref={scrollRef} className="flex flex-1 flex-col gap-1.5 overflow-y-auto scrollbar-hide">
        {messages.length === 0 && (
          <div className="py-8 text-center">
            <span className="text-xs text-muted-foreground">{"Welcome to the room! Say hi"}</span>
          </div>
        )}

        {messages.map((msg) => {
          const name = msg.sender?.display_name || "User";

          if (msg.msgType === "join") {
            return (
              <div key={msg.id} className="animate-fade-in-up">
                <span className="inline-flex items-center gap-1 rounded-lg glass-dark px-2.5 py-1">
                  <span className="text-xs font-bold text-cyan">{name}</span>
                  <span className="text-xs text-muted-foreground">joined</span>
                </span>
              </div>
            );
          }

          if (msg.msgType === "gift") {
            const emoji = getGiftEmoji(msg.giftType);
            return (
              <div key={msg.id} className="animate-fade-in-up">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-gold/10 px-2.5 py-1.5">
                  <span className="text-lg">{emoji}</span>
                  <span className="text-xs font-bold text-gold">{name}</span>
                  <span className="text-xs text-foreground/70">{msg.content}</span>
                  {msg.diamondCost && (
                    <span className="rounded-full bg-gold/20 px-1.5 py-0.5 text-[9px] font-bold text-gold">
                      {msg.diamondCost.toLocaleString()}
                    </span>
                  )}
                </span>
              </div>
            );
          }

          if (msg.msgType === "system") {
            return (
              <div key={msg.id} className="animate-fade-in-up">
                <span className="inline-flex rounded-lg glass-dark px-2.5 py-1">
                  <span className="text-[10px] text-muted-foreground">{msg.content}</span>
                </span>
              </div>
            );
          }

          return (
            <div key={msg.id} className="animate-fade-in-up">
              <span className="inline-flex items-baseline gap-1.5 rounded-lg glass-dark px-2.5 py-1.5">
                <span className="text-xs font-bold text-cyan">{name}</span>
                <span className="text-xs text-foreground/90">{msg.content}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
