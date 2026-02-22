"use client";

import Link from "next/link";
import { UserAvatar } from "@/components/user-avatar";
import { LevelBadge } from "@/components/level-badge";
import { timeAgo } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

type Conversation = {
  userId: string;
  displayName: string | null;
  avatarUrl: string | null;
  level: number;
  lastMessage: string | null;
  lastMessageAt: string;
};

export function ConversationList({
  conversations,
}: {
  conversations: Conversation[];
}) {
  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20">
        <MessageCircle className="h-12 w-12 text-muted-foreground/30" />
        <p className="text-sm text-muted-foreground">No messages yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {conversations.map((conv) => (
        <Link
          key={conv.userId}
          href={`/messages/${conv.userId}`}
          className="flex items-center gap-3 border-b border-border px-4 py-3 transition-colors hover:bg-muted/50"
        >
          <UserAvatar
            src={conv.avatarUrl}
            name={conv.displayName}
            size="md"
            showOnline
          />
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-semibold text-foreground">
                {conv.displayName || "User"}
              </span>
              <LevelBadge level={conv.level} />
            </div>
            <span className="truncate text-xs text-muted-foreground">
              {conv.lastMessage || "Sent a gift"}
            </span>
          </div>
          <span className="shrink-0 text-[10px] text-muted-foreground">
            {timeAgo(conv.lastMessageAt)}
          </span>
        </Link>
      ))}
    </div>
  );
}
