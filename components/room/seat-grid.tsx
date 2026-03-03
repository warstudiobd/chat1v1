"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Lock, Mic, MicOff, Crown, Shield } from "lucide-react";
import { UserAvatar } from "@/components/user-avatar";
import { SeatActionMenu, type SeatAction } from "@/components/room/seat-action-menu";
import { createClient } from "@/lib/supabase/client";

type Seat = {
  seatNumber: number;
  isMuted: boolean;
  isLocked?: boolean;
  invitedUserId?: string | null;
  user: {
    id: string;
    display_name: string | null;
    avatar_url: string | null;
    level: number;
    vip_level?: "none" | "vip" | "svip";
  } | null;
};

type SeatGridProps = {
  seats: Seat[];
  maxSeats: number;
  ownerId?: string;
  currentUserId?: string;
  currentUserRole: "owner" | "admin" | "user";
  adminIds?: string[];
  roomId: string;
};

// Speaking indicator SVG ring
function SpeakingWave() {
  return (
    <svg
      className="absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)]"
      viewBox="0 0 80 80"
      fill="none"
    >
      <circle cx="40" cy="40" r="36" stroke="hsl(150 80% 50%)" strokeWidth="2" opacity="0.6">
        <animate attributeName="r" values="36;39" dur="1.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="40" cy="40" r="36" stroke="hsl(170 80% 50%)" strokeWidth="1.5" opacity="0.4">
        <animate attributeName="r" values="36;42" dur="1.2s" repeatCount="indefinite" begin="0.3s" />
        <animate attributeName="opacity" values="0.4;0" dur="1.2s" repeatCount="indefinite" begin="0.3s" />
      </circle>
      <circle cx="40" cy="40" r="36" stroke="hsl(160 80% 55%)" strokeWidth="1" opacity="0.3">
        <animate attributeName="r" values="36;45" dur="1.2s" repeatCount="indefinite" begin="0.6s" />
        <animate attributeName="opacity" values="0.3;0" dur="1.2s" repeatCount="indefinite" begin="0.6s" />
      </circle>
    </svg>
  );
}

// Mini equalizer bars next to mic
function EqualizerBars() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" className="ml-0.5">
      <rect x="0" y="4" width="2" height="6" rx="0.5" fill="hsl(150 80% 50%)" style={{ animation: "equalizer-bar 0.4s ease-in-out infinite alternate" }} />
      <rect x="3.5" y="2" width="2" height="8" rx="0.5" fill="hsl(150 80% 50%)" style={{ animation: "equalizer-bar 0.5s ease-in-out infinite alternate-reverse" }} />
      <rect x="7" y="3" width="2" height="7" rx="0.5" fill="hsl(150 80% 50%)" style={{ animation: "equalizer-bar 0.35s ease-in-out infinite alternate" }} />
    </svg>
  );
}

// VIP/SVIP badge overlay on seat
function SeatVipOverlay({ vipLevel }: { vipLevel?: "none" | "vip" | "svip" }) {
  if (!vipLevel || vipLevel === "none") return null;
  if (vipLevel === "svip") {
    return (
      <div className="absolute -right-1 -top-1 z-10">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="animate-[gem-sparkle_2.5s_ease-in-out_infinite]">
          <polygon points="12,2 20,9 12,22 4,9" fill="hsl(280 80% 60%)" />
          <polygon points="12,2 16,9 12,22" fill="hsl(290 70% 50%)" />
          <line x1="4" y1="9" x2="20" y2="9" stroke="hsl(280 90% 80%)" strokeWidth="0.5" />
        </svg>
      </div>
    );
  }
  return (
    <div className="absolute -right-1 -top-1 z-10">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="animate-[badge-pulse_2s_ease-in-out_infinite]">
        <path d="M3 18 L6 8 L10 13 L12 4 L14 13 L18 8 L21 18Z" fill="hsl(45 100% 55%)" />
        <rect x="3" y="18" width="18" height="3" rx="1" fill="hsl(40 100% 45%)" />
      </svg>
    </div>
  );
}

export function SeatGrid({ seats, maxSeats, ownerId, currentUserId, currentUserRole, adminIds = [], roomId }: SeatGridProps) {
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  const seatSlots = Array.from({ length: maxSeats }, (_, i) => {
    const seat = seats.find((s) => s.seatNumber === i);
    return { index: i, seat };
  });

  const gridCols =
    maxSeats === 2
      ? "grid-cols-2"
      : maxSeats <= 9
        ? "grid-cols-4"
        : "grid-cols-5";

  // Host seat (first occupied or slot 0)
  const hostSlot = seatSlots.find(({ seat }) => seat?.user?.id === ownerId) || seatSlots[0];
  const regularSlots = seatSlots.filter((s) => s !== hostSlot);

  const handleSeatAction = useCallback(
    async (action: SeatAction, seatIndex: number) => {
      const supabase = createClient();
      const slot = seatSlots.find((s) => s.index === seatIndex);

      switch (action) {
        case "lock":
          await supabase.from("room_seats").upsert({
            room_id: roomId,
            seat_number: seatIndex,
            is_locked: true,
          }, { onConflict: "room_id,seat_number" });
          break;
        case "unlock":
          await supabase.from("room_seats").update({ is_locked: false }).eq("room_id", roomId).eq("seat_number", seatIndex);
          break;
        case "kick":
          await supabase.from("room_seats").delete().eq("room_id", roomId).eq("seat_number", seatIndex);
          break;
        case "mute":
          if (slot?.seat) {
            await supabase.from("room_seats").update({ is_muted: !slot.seat.isMuted }).eq("room_id", roomId).eq("seat_number", seatIndex);
          }
          break;
        case "sit":
          if (currentUserId) {
            await supabase.from("room_seats").upsert({
              room_id: roomId,
              seat_number: seatIndex,
              user_id: currentUserId,
              is_muted: false,
              is_locked: false,
            }, { onConflict: "room_id,seat_number" });
          }
          break;
        case "make-admin":
          if (slot?.seat?.user) {
            await supabase.from("room_admins").insert({
              room_id: roomId,
              user_id: slot.seat.user.id,
              appointed_by: currentUserId,
            });
          }
          break;
        case "remove-admin":
          if (slot?.seat?.user) {
            await supabase.from("room_admins").delete().eq("room_id", roomId).eq("user_id", slot.seat.user.id);
          }
          break;
      }
      setSelectedSeat(null);
    },
    [roomId, currentUserId, seatSlots]
  );

  function renderSeatContent(
    user: Seat["user"],
    isMuted: boolean,
    isLocked: boolean,
    isHost: boolean,
    avatarSize: "lg" | "md" | "sm",
    sizeClass: string,
    seatIndex: number
  ) {
    const isOccupied = !!user;
    const isSpeaking = isOccupied && !isMuted;
    const isAdmin = user ? adminIds.includes(user.id) : false;

    return (
      <button
        onClick={() => setSelectedSeat(seatIndex)}
        className="flex flex-col items-center gap-1.5 focus:outline-none"
      >
        <div className="relative">
          {/* Speaking sound wave */}
          {isSpeaking && <SpeakingWave />}

          {/* Glowing ring for host */}
          {isHost && (
            <div
              className="absolute -inset-1 rounded-full opacity-60 blur-sm"
              style={{ background: "linear-gradient(135deg, hsl(330,80%,60%), hsl(270,80%,60%))" }}
            />
          )}

          <div
            className={cn(
              "relative flex items-center justify-center rounded-full",
              sizeClass,
              isOccupied ? "ring-1 ring-white/10" : isLocked ? "ring-1 ring-destructive/30" : "glass border border-white/5"
            )}
          >
            {isOccupied ? (
              <UserAvatar src={user!.avatar_url} name={user!.display_name} size={avatarSize} />
            ) : isLocked ? (
              <Lock className="h-4 w-4 text-destructive/50" />
            ) : (
              <div className="h-2 w-2 rounded-full bg-white/10" />
            )}
          </div>

          {/* VIP badge overlay */}
          {isOccupied && <SeatVipOverlay vipLevel={user!.vip_level} />}

          {/* Crown for host / Shield for admin */}
          {isHost && (
            <div className="absolute -left-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full gradient-gold">
              <Crown className="h-3.5 w-3.5 text-background" />
            </div>
          )}
          {!isHost && isAdmin && (
            <div className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan/80">
              <Shield className="h-3 w-3 text-background" />
            </div>
          )}

          {/* Mic status */}
          {isOccupied && (
            <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-card border border-border">
              {isMuted ? (
                <MicOff className="h-3 w-3 text-destructive" />
              ) : (
                <span className="flex items-center">
                  <Mic className="h-3 w-3 text-green-400" />
                  <EqualizerBars />
                </span>
              )}
            </div>
          )}
        </div>

        <span
          className={cn(
            "max-w-16 truncate text-[9px]",
            isHost
              ? "font-bold text-pink"
              : isOccupied && user!.vip_level === "svip"
                ? "font-bold text-svip-gradient"
                : isOccupied && user!.vip_level === "vip"
                  ? "font-bold text-vip-gradient"
                  : isOccupied
                    ? "text-foreground/60"
                    : "text-foreground/30"
          )}
        >
          {isOccupied ? user!.display_name || "User" : isLocked ? "Locked" : String(seatIndex + 1)}
        </span>
      </button>
    );
  }

  const selectedSlot = selectedSeat !== null ? seatSlots.find((s) => s.index === selectedSeat) : null;

  return (
    <div className="relative z-10 px-3">
      {/* Host seat - centered and larger */}
      {hostSlot && (
        <div className="flex justify-center mb-4">
          {renderSeatContent(
            hostSlot.seat?.user ?? null,
            hostSlot.seat?.isMuted ?? false,
            hostSlot.seat?.isLocked ?? false,
            true,
            "lg",
            "h-20 w-20 border-2 border-pink/50",
            hostSlot.index
          )}
        </div>
      )}

      {/* Regular seats grid */}
      {maxSeats === 2 ? (
        /* Duo layout: just 1 other seat centered */
        <div className="flex justify-center">
          {regularSlots.map(({ index, seat }) =>
            renderSeatContent(
              seat?.user ?? null,
              seat?.isMuted ?? false,
              seat?.isLocked ?? false,
              false,
              "lg",
              "h-16 w-16",
              index
            )
          )}
        </div>
      ) : (
        <div className={cn("grid gap-x-2 gap-y-4", gridCols)}>
          {regularSlots.map(({ index, seat }) => (
            <div key={index} className="flex justify-center">
              {renderSeatContent(
                seat?.user ?? null,
                seat?.isMuted ?? false,
                seat?.isLocked ?? false,
                false,
                maxSeats <= 9 ? "md" : "sm",
                maxSeats <= 9 ? "h-14 w-14" : "h-12 w-12",
                index
              )}
            </div>
          ))}
        </div>
      )}

      {/* Seat action menu */}
      {selectedSeat !== null && selectedSlot && (
        <SeatActionMenu
          seatNumber={selectedSlot.index}
          isOccupied={!!selectedSlot.seat?.user}
          isLocked={selectedSlot.seat?.isLocked ?? false}
          occupantName={selectedSlot.seat?.user?.display_name ?? undefined}
          occupantIsAdmin={selectedSlot.seat?.user ? adminIds.includes(selectedSlot.seat.user.id) : false}
          currentUserRole={currentUserRole}
          onAction={(action) => handleSeatAction(action, selectedSlot.index)}
          onClose={() => setSelectedSeat(null)}
        />
      )}
    </div>
  );
}
