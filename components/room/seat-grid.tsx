"use client";

import { cn } from "@/lib/utils";
import { Mic, MicOff, Plus, Crown } from "lucide-react";
import { UserAvatar } from "@/components/user-avatar";
import { LevelBadge } from "@/components/level-badge";

type Seat = {
  seatNumber: number;
  isMuted: boolean;
  user: {
    id: string;
    display_name: string | null;
    avatar_url: string | null;
    level: number;
  } | null;
};

type SeatGridProps = {
  seats: Seat[];
  maxSeats: number;
  ownerId?: string;
};

export function SeatGrid({ seats, maxSeats, ownerId }: SeatGridProps) {
  const seatSlots = Array.from({ length: maxSeats }, (_, i) => {
    const seat = seats.find((s) => s.seatNumber === i);
    return { index: i, seat };
  });

  return (
    <div className="rounded-2xl bg-card p-4">
      <div className="grid grid-cols-4 gap-4">
        {seatSlots.map(({ index, seat }) => {
          const isOwner = seat?.user?.id === ownerId;
          const isOccupied = !!seat?.user;

          return (
            <div
              key={index}
              className="flex flex-col items-center gap-2"
            >
              <div className="relative">
                {isOccupied && !seat?.isMuted && (
                  <div className="absolute -inset-1 rounded-full border-2 border-primary animate-pulse-ring" />
                )}
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full",
                    isOccupied ? "bg-muted" : "border-2 border-dashed border-border"
                  )}
                >
                  {isOccupied ? (
                    <UserAvatar
                      src={seat!.user!.avatar_url}
                      name={seat!.user!.display_name}
                      size="md"
                    />
                  ) : (
                    <Plus className="h-5 w-5 text-muted-foreground/50" />
                  )}
                </div>
                {isOwner && (
                  <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full gradient-gold">
                    <Crown className="h-3 w-3 text-background" />
                  </div>
                )}
                {isOccupied && (
                  <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-card">
                    {seat?.isMuted ? (
                      <MicOff className="h-3 w-3 text-destructive" />
                    ) : (
                      <Mic className="h-3 w-3 text-green-400" />
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span className="max-w-16 truncate text-[10px] text-muted-foreground">
                  {isOccupied
                    ? seat!.user!.display_name || "User"
                    : `Seat ${index + 1}`}
                </span>
                {isOccupied && (
                  <LevelBadge level={seat!.user!.level} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
