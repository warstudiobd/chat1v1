"use client";

import { useEffect, useRef } from "react";
import { Gift, Megaphone } from "lucide-react";
import { GIFTS } from "@/lib/gifts";
import { getGiftSvg } from "@/components/room/gift-svgs";

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
    vip_level?: "none" | "vip" | "svip";
  } | null;
};

type RoomChatProps = {
  messages: ChatMessage[];
  announcement?: string;
};

function SenderName({ name, vipLevel }: { name: string; vipLevel?: "none" | "vip" | "svip" }) {
  if (vipLevel === "svip") {
    return (
      <span className="flex items-center gap-1">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0 animate-[gem-sparkle_2.5s_ease-in-out_infinite]">
          <polygon points="12,2 20,9 12,22 4,9" fill="hsl(280 80% 60%)" />
          <polygon points="12,2 16,9 12,22" fill="hsl(290 70% 50%)" />
        </svg>
        <span className="text-xs font-bold text-svip-gradient">{name}</span>
      </span>
    );
  }
  if (vipLevel === "vip") {
    return (
      <span className="flex items-center gap-1">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0 animate-[badge-pulse_2s_ease-in-out_infinite]">
          <path d="M3 18 L6 8 L10 13 L12 4 L14 13 L18 8 L21 18Z" fill="hsl(45 100% 55%)" />
          <rect x="3" y="18" width="18" height="3" rx="1" fill="hsl(40 100% 45%)" />
        </svg>
        <span className="text-xs font-bold text-vip-gradient">{name}</span>
      </span>
    );
  }
  return <span className="text-xs font-bold text-cyan">{name}</span>;
}

function GiftMiniSvg({ giftType }: { giftType: string }) {
  const SvgComp = getGiftSvg(giftType);
  if (SvgComp) return <SvgComp size={20} />;
  const gift = GIFTS.find((g) => g.id === giftType);
  return <span className="text-lg">{gift?.emoji ?? ""}</span>;
}

export function RoomChat({ messages, announcement }: RoomChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
          const vipLevel = msg.sender?.vip_level;

          if (msg.msgType === "join") {
            return (
              <div key={msg.id} className="animate-fade-in-up">
                <span className="inline-flex items-center gap-1 rounded-lg glass-dark px-2.5 py-1">
                  <SenderName name={name} vipLevel={vipLevel} />
                  <span className="text-xs text-muted-foreground">joined</span>
                </span>
              </div>
            );
          }

          if (msg.msgType === "gift") {
            return (
              <div key={msg.id} className="animate-fade-in-up">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-gold/10 px-2.5 py-1.5">
                  {msg.giftType && <GiftMiniSvg giftType={msg.giftType} />}
                  <SenderName name={name} vipLevel={vipLevel} />
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
                <SenderName name={name} vipLevel={vipLevel} />
                <span className="text-xs text-foreground/90">{msg.content}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
