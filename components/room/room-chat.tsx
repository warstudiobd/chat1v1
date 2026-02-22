"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Gift, Star, Heart } from "lucide-react";

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

export function RoomChat({
  messages,
  announcement,
}: {
  messages: ChatMessage[];
  announcement?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="relative z-10 flex flex-1 flex-col gap-2 px-3">
      {/* Room announcement banner */}
      {announcement && (
        <div className="rounded-lg bg-card/70 px-3 py-2 backdrop-blur-sm">
          <p className="text-xs text-foreground">
            <span className="font-semibold">{"Room Announcement: "}</span>
            {announcement}
          </p>
        </div>
      )}

      {/* Gift prompt */}
      <button className="flex w-fit items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 backdrop-blur-sm">
        <Gift className="h-4 w-4 text-primary" />
        <span className="text-xs font-medium text-primary">
          {"Like? Send a gift!"}
        </span>
      </button>

      {/* Chat messages */}
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-1.5 overflow-y-auto scrollbar-hide"
        style={{ maxHeight: "200px" }}
      >
        {messages.length === 0 ? (
          <p className="py-4 text-center text-[10px] text-muted-foreground/60">
            Welcome to the room!
          </p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-1.5">
              {msg.msgType === "gift" ? (
                <div className="flex items-center gap-1 rounded-full bg-gold/10 px-2.5 py-1 backdrop-blur-sm">
                  <Gift className="h-3 w-3 text-gold" />
                  <span className="text-[11px]">
                    <span className="font-semibold text-gold">
                      {msg.sender?.display_name || "Someone"}
                    </span>
                    <span className="text-foreground/60">
                      {" sent "}
                      {msg.giftType}
                    </span>
                    {msg.diamondCost && (
                      <span className="text-gold">
                        {" ("}
                        {msg.diamondCost}
                        {")"}
                      </span>
                    )}
                  </span>
                </div>
              ) : msg.msgType === "join" ? (
                <div className="flex items-center gap-1 rounded-full bg-card/50 px-2.5 py-1 backdrop-blur-sm">
                  <span className="text-[11px]">
                    <span className="font-semibold text-cyan-400">
                      {msg.sender?.display_name || "User"}
                    </span>
                    <span className="text-foreground/50">{" joined"}</span>
                  </span>
                </div>
              ) : (
                <div className="flex items-start gap-1 rounded-lg bg-card/40 px-2.5 py-1 backdrop-blur-sm">
                  <span className="shrink-0 text-[11px] font-semibold text-primary">
                    {msg.sender?.display_name || "User"}
                    {":"}
                  </span>
                  <span className="text-[11px] text-foreground/80">
                    {msg.content}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
