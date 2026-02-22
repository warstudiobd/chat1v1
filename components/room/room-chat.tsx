"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Gift } from "lucide-react";

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

export function RoomChat({ messages }: { messages: ChatMessage[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="flex flex-1 flex-col gap-1 overflow-y-auto rounded-2xl bg-card p-3"
      style={{ maxHeight: "300px" }}
    >
      {messages.length === 0 ? (
        <p className="py-8 text-center text-xs text-muted-foreground">
          No messages yet. Say hi!
        </p>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex items-start gap-2 rounded-lg px-2 py-1",
              msg.msgType === "gift" && "bg-gold/5"
            )}
          >
            {msg.msgType === "gift" ? (
              <div className="flex items-center gap-1.5">
                <Gift className="h-3.5 w-3.5 text-gold" />
                <span className="text-xs">
                  <span className="font-semibold text-gold">
                    {msg.sender?.display_name || "Someone"}
                  </span>
                  <span className="text-muted-foreground">
                    {" "}sent {msg.giftType}{" "}
                  </span>
                  {msg.diamondCost && (
                    <span className="text-gold">
                      ({msg.diamondCost} diamonds)
                    </span>
                  )}
                </span>
              </div>
            ) : (
              <div className="flex items-start gap-1.5">
                <span className="shrink-0 text-xs font-semibold text-primary">
                  {msg.sender?.display_name || "User"}:
                </span>
                <span className="text-xs text-foreground/80">
                  {msg.content}
                </span>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
