import Link from "next/link";
import { Eye, Mic } from "lucide-react";
import { cn, formatNumber, formatCategory } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";

type RoomCardProps = {
  id: string;
  name: string;
  category: string | null;
  viewerCount: number;
  isLive: boolean;
  coverUrl: string | null;
  owner: {
    display_name: string | null;
    avatar_url: string | null;
    level: number;
  } | null;
};

const categoryColors: Record<string, string> = {
  music: "bg-pink/20 text-pink",
  chat: "bg-primary/20 text-primary",
  gaming: "bg-green-500/20 text-green-400",
  party: "bg-orange-500/20 text-orange-400",
  dating: "bg-red-500/20 text-red-400",
};

export function RoomCard({
  id,
  name,
  category,
  viewerCount,
  isLive,
  coverUrl,
  owner,
}: RoomCardProps) {
  return (
    <Link
      href={`/room/${id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/30"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center gradient-primary opacity-60">
            <Mic className="h-10 w-10 text-primary-foreground/60" />
          </div>
        )}
        {isLive && (
          <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold text-destructive-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-destructive-foreground animate-pulse" />
            LIVE
          </span>
        )}
        <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-background/60 px-2 py-0.5 text-[10px] font-medium text-foreground backdrop-blur-sm">
          <Eye className="h-3 w-3" />
          {formatNumber(viewerCount)}
        </span>
      </div>
      <div className="flex flex-col gap-2 p-3">
        <h3 className="truncate text-sm font-semibold text-foreground">
          {name}
        </h3>
        <div className="flex items-center justify-between">
          {owner && (
            <div className="flex items-center gap-2 overflow-hidden">
              <UserAvatar
                src={owner.avatar_url}
                name={owner.display_name}
                size="xs"
              />
              <span className="truncate text-xs text-muted-foreground">
                {owner.display_name || "Anonymous"}
              </span>
            </div>
          )}
          {category && (
            <span
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
                categoryColors[category] || "bg-muted text-muted-foreground"
              )}
            >
              {formatCategory(category)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
