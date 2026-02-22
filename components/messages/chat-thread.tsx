"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, Gift } from "lucide-react";
import { cn, timeAgo } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { LevelBadge } from "@/components/level-badge";
import { VipBadge } from "@/components/vip-badge";
import { createClient } from "@/lib/supabase/client";

type Message = {
  id: string;
  content: string | null;
  msgType: string;
  giftType: string | null;
  diamondCost: number | null;
  createdAt: string;
  senderId: string;
};

type OtherUser = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  level: number;
  is_vip: boolean;
  is_svip: boolean;
};

export function ChatThread({
  currentUserId,
  otherUser,
  initialMessages,
}: {
  currentUserId: string;
  otherUser: OtherUser;
  initialMessages: Message[];
}) {
  const router = useRouter();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || sending) return;
    setSending(true);

    const { data, error } = await supabase
      .from("messages")
      .insert({
        sender_id: currentUserId,
        receiver_id: otherUser.id,
        content: input.trim(),
        msg_type: "text",
      })
      .select()
      .single();

    if (!error && data) {
      setMessages((prev) => [
        ...prev,
        {
          id: data.id,
          content: data.content,
          msgType: data.msg_type,
          giftType: data.gift_type,
          diamondCost: data.diamond_cost,
          createdAt: data.created_at,
          senderId: data.sender_id,
        },
      ]);
      setInput("");
    }
    setSending(false);
  }

  return (
    <div className="flex h-screen flex-col md:h-auto md:min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur-md">
        <button
          onClick={() => router.push("/messages")}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <UserAvatar
          src={otherUser.avatar_url}
          name={otherUser.display_name}
          size="sm"
          showOnline
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">
              {otherUser.display_name || "User"}
            </span>
            <LevelBadge level={otherUser.level} />
            <VipBadge isVip={otherUser.is_vip} isSvip={otherUser.is_svip} />
          </div>
        </div>
      </header>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-4"
      >
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUserId;
          return (
            <div
              key={msg.id}
              className={cn(
                "flex max-w-[75%]",
                isMe ? "ml-auto" : "mr-auto"
              )}
            >
              {msg.msgType === "gift" ? (
                <div className="flex items-center gap-2 rounded-2xl bg-gold/10 px-4 py-2">
                  <Gift className="h-4 w-4 text-gold" />
                  <span className="text-xs text-gold">
                    {isMe ? "You" : otherUser.display_name} sent {msg.giftType}
                  </span>
                </div>
              ) : (
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2.5",
                    isMe
                      ? "gradient-primary text-primary-foreground"
                      : "bg-card text-foreground"
                  )}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <span
                    className={cn(
                      "mt-1 block text-right text-[10px]",
                      isMe ? "text-primary-foreground/60" : "text-muted-foreground"
                    )}
                  >
                    {timeAgo(msg.createdAt)}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="sticky bottom-16 flex items-center gap-2 border-t border-border bg-background p-3 md:bottom-0"
      >
        <div className="flex flex-1 items-center gap-2 rounded-full border border-input bg-card px-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="h-10 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={!input.trim() || sending}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full gradient-primary text-primary-foreground transition-opacity disabled:opacity-40"
          aria-label="Send"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
