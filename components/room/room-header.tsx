"use client";

import { useRouter } from "next/navigation";
import { Users, MoreHorizontal, Power, Coins, Share2 } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";

type RoomHeaderProps = {
  name: string;
  roomId: string;
  category: string | null;
  viewerCount: number;
  owner: {
    id: string;
    display_name: string | null;
    avatar_url: string | null;
    level: number;
  } | null;
  diamonds?: number;
};

export function RoomHeader({
  name,
  roomId,
  category,
  viewerCount,
  owner,
  diamonds = 0,
}: RoomHeaderProps) {
  const router = useRouter();

  return (
    <header className="relative z-10 flex items-center justify-between px-3 py-2.5">
      {/* Left: Owner avatar + room info */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="relative shrink-0">
          <div className="rounded-full p-[2px]" style={{ background: "linear-gradient(135deg, hsl(330,80%,60%), hsl(270,80%,60%))" }}>
            <UserAvatar src={owner?.avatar_url ?? null} name={owner?.display_name ?? null} size="sm" />
          </div>
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-bold text-foreground">{name}</span>
          <span className="text-[10px] text-muted-foreground">
            {"ID: "}
            {roomId.slice(0, 8)}
          </span>
        </div>
      </div>

      {/* Right: Badges + actions */}
      <div className="flex items-center gap-1.5">
        {/* Coin badge */}
        <div className="flex items-center gap-1 rounded-full glass px-2 py-1">
          <Coins className="h-3 w-3 text-gold" />
          <span className="text-[10px] font-bold text-gold">{formatNumber(diamonds)}</span>
        </div>

        {category && (
          <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold text-gold">
            {category.toUpperCase()}
          </span>
        )}

        {/* Viewer count */}
        <div className="flex items-center gap-1 rounded-full glass px-2 py-1">
          <Users className="h-3 w-3 text-muted-foreground" />
          <span className="text-[10px] font-medium text-foreground">{viewerCount}</span>
        </div>

        {/* Share */}
        <button className="flex h-8 w-8 items-center justify-center rounded-full glass text-muted-foreground hover:text-foreground" aria-label="Share">
          <Share2 className="h-3.5 w-3.5" />
        </button>

        {/* More */}
        <button className="flex h-8 w-8 items-center justify-center rounded-full glass text-muted-foreground hover:text-foreground" aria-label="More options">
          <MoreHorizontal className="h-4 w-4" />
        </button>

        {/* Leave */}
        <button
          onClick={() => router.push("/home")}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/20 text-destructive hover:bg-destructive/30"
          aria-label="Leave room"
        >
          <Power className="h-3.5 w-3.5" />
        </button>
      </div>
    </header>
  );
}
