"use client";

import { ArrowLeft, Eye, Share2, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatNumber } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { LevelBadge } from "@/components/level-badge";
import { VipBadge } from "@/components/vip-badge";

type RoomHeaderProps = {
  name: string;
  category: string | null;
  viewerCount: number;
  owner: {
    id: string;
    display_name: string | null;
    avatar_url: string | null;
    level: number;
    is_vip: boolean;
    is_svip: boolean;
  } | null;
};

export function RoomHeader({
  name,
  category,
  viewerCount,
  owner,
}: RoomHeaderProps) {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/home")}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-foreground">{name}</h1>
            {category && (
              <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-medium text-primary">
                {category}
              </span>
            )}
          </div>
          {owner && (
            <div className="flex items-center gap-1.5">
              <UserAvatar
                src={owner.avatar_url}
                name={owner.display_name}
                size="xs"
              />
              <span className="text-xs text-muted-foreground">
                {owner.display_name}
              </span>
              <LevelBadge level={owner.level} />
              <VipBadge isVip={owner.is_vip} isSvip={owner.is_svip} />
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Eye className="h-3.5 w-3.5" />
          {formatNumber(viewerCount)}
        </span>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
          aria-label="Share"
        >
          <Share2 className="h-4 w-4" />
        </button>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
          aria-label="More options"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
