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

  const gridCols =
    maxSeats === 5
      ? "grid-cols-3"
      : maxSeats <= 8
        ? "grid-cols-4"
        : "grid-cols-5";

  // Host seat (first occupied or slot 0)
  const hostSlot = seatSlots.find(({ seat }) => seat?.user?.id === ownerId) || seatSlots[0];
  const regularSlots = seatSlots.filter((s) => s !== hostSlot);

  return (
    <div className="relative z-10 px-3">
      {/* Host seat - centered and larger */}
      {hostSlot && (
        <div className="flex justify-center mb-4">
          <div className="flex flex-col items-center gap-1.5">
            <div className="relative">
              {/* Glowing ring */}
              <div
                className="absolute -inset-1 rounded-full opacity-60 blur-sm"
                style={{ background: "linear-gradient(135deg, hsl(330,80%,60%), hsl(270,80%,60%))" }}
              />
              {/* Speaking ring */}
              {hostSlot.seat?.user && !hostSlot.seat.isMuted && (
                <div className="absolute -inset-2 rounded-full border-2 border-green-400 animate-pulse-ring" />
              )}
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-pink/50">
                {hostSlot.seat?.user ? (
                  <UserAvatar src={hostSlot.seat.user.avatar_url} name={hostSlot.seat.user.display_name} size="lg" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full glass">
                    <Lock className="h-6 w-6 text-muted-foreground/30" />
                  </div>
                )}
              </div>
              {/* Crown */}
              <div className="absolute -left-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full gradient-gold">
                <Crown className="h-3.5 w-3.5 text-background" />
              </div>
              {/* Mic */}
              {hostSlot.seat?.user && (
                <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-card border border-border">
                  {hostSlot.seat.isMuted ? <MicOff className="h-3 w-3 text-destructive" /> : <Mic className="h-3 w-3 text-green-400" />}
                </div>
              )}
            </div>
            <span className="text-[10px] font-bold text-pink">
              {hostSlot.seat?.user?.display_name || "Host"}
            </span>
          </div>
        </div>
      )}

      {/* Regular seats grid */}
      <div className={cn("grid gap-x-2 gap-y-4", gridCols)}>
        {regularSlots.map(({ index, seat }) => {
          const isOccupied = !!seat?.user;

          return (
            <div key={index} className="flex flex-col items-center gap-1">
              <div className="relative">
                {/* Speaking ring */}
                {isOccupied && !seat?.isMuted && (
                  <div className="absolute -inset-1 rounded-full border-2 border-green-400 animate-pulse-ring" />
                )}

                <div
                  className={cn(
                    "flex items-center justify-center rounded-full",
                    maxSeats <= 8 ? "h-14 w-14" : "h-12 w-12",
                    isOccupied ? "ring-1 ring-white/10" : "glass border border-white/5"
                  )}
                >
                  {isOccupied ? (
                    <UserAvatar
                      src={seat!.user!.avatar_url}
                      name={seat!.user!.display_name}
                      size={maxSeats <= 8 ? "lg" : "md"}
                    />
                  ) : (
                    <Lock className="h-4 w-4 text-muted-foreground/20" />
                  )}
                </div>

                {/* Mic status */}
                {isOccupied && (
                  <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-card border border-border">
                    {seat?.isMuted ? (
                      <MicOff className="h-2.5 w-2.5 text-destructive" />
                    ) : (
                      <Mic className="h-2.5 w-2.5 text-green-400" />
                    )}
                  </div>
                )}
              </div>

              <span className="max-w-14 truncate text-[9px] text-foreground/60">
                {isOccupied ? seat!.user!.display_name || "User" : String(index + 1)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
