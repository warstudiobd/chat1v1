"use client";

import { cn } from "@/lib/utils";
import { Lock, Mic, MicOff, Crown } from "lucide-react";
import { UserAvatar } from "@/components/user-avatar";

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

  // Use 4 columns for 8 seats, 5 cols for 10/20, 3 cols for 5
  const gridCols =
    maxSeats === 5
      ? "grid-cols-3"
      : maxSeats <= 8
        ? "grid-cols-4"
        : "grid-cols-5";

  return (
    <div className="relative z-10 px-2">
      <div className={cn("grid gap-x-3 gap-y-5", gridCols)}>
        {seatSlots.map(({ index, seat }) => {
          const isOwner = seat?.user?.id === ownerId;
          const isOccupied = !!seat?.user;

          return (
            <div key={index} className="flex flex-col items-center gap-1.5">
              {/* Avatar / Lock circle */}
              <div className="relative">
                {/* Speaking ring animation */}
                {isOccupied && !seat?.isMuted && (
                  <div className="absolute -inset-1 rounded-full border-2 border-green-400 animate-pulse-ring" />
                )}

                <div
                  className={cn(
                    "flex items-center justify-center rounded-full",
                    maxSeats <= 8 ? "h-16 w-16" : "h-13 w-13",
                    isOccupied
                      ? "ring-2 ring-primary/30"
                      : "bg-card/40 border border-border/50"
                  )}
                >
                  {isOccupied ? (
                    <UserAvatar
                      src={seat!.user!.avatar_url}
                      name={seat!.user!.display_name}
                      size={maxSeats <= 8 ? "lg" : "md"}
                    />
                  ) : (
                    <Lock className="h-5 w-5 text-muted-foreground/40" />
                  )}
                </div>

                {/* Owner crown */}
                {isOwner && (
                  <div className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full gradient-gold">
                    <Crown className="h-3 w-3 text-background" />
                  </div>
                )}

                {/* Mic status */}
                {isOccupied && (
                  <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-card border border-border">
                    {seat?.isMuted ? (
                      <MicOff className="h-2.5 w-2.5 text-destructive" />
                    ) : (
                      <Mic className="h-2.5 w-2.5 text-green-400" />
                    )}
                  </div>
                )}
              </div>

              {/* Name / seat number */}
              <span className="max-w-16 truncate text-[10px] text-foreground/70">
                {isOccupied
                  ? seat!.user!.display_name || "User"
                  : String(index + 1)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
