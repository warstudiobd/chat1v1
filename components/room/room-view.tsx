"use client";

import { useState, useCallback } from "react";
import { RoomHeader } from "@/components/room/room-header";
import { SeatGrid } from "@/components/room/seat-grid";
import { RoomChat } from "@/components/room/room-chat";
import { RoomActions } from "@/components/room/room-actions";
import { useRoomRealtime } from "@/hooks/use-room-realtime";
import { useUser } from "@/components/user-provider";
import { createClient } from "@/lib/supabase/client";

type RoomViewProps = {
  room: {
    id: string;
    name: string;
    description?: string | null;
    category: string | null;
    viewer_count: number;
    max_seats: number;
    owner: {
      id: string;
      display_name: string | null;
      avatar_url: string | null;
      level: number;
    } | null;
  };
  initialSeats: {
    seatNumber: number;
    isMuted: boolean;
    user: {
      id: string;
      display_name: string | null;
      avatar_url: string | null;
      level: number;
    } | null;
  }[];
  initialMessages: {
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
  }[];
};

export function RoomView({
  room,
  initialSeats,
  initialMessages,
}: RoomViewProps) {
  const { profile } = useUser();
  const { messages, seats, viewerCount } = useRoomRealtime(
    room.id,
    initialMessages,
    initialSeats
  );

  const [seatMode, setSeatMode] = useState(room.max_seats);

  const handleSeatModeChange = useCallback(
    async (mode: number) => {
      setSeatMode(mode);
      const supabase = createClient();
      await supabase
        .from("voice_rooms")
        .update({ max_seats: mode })
        .eq("id", room.id);
    },
    [room.id]
  );

  const handleSendMessage = useCallback(
    async (content: string) => {
      if (!profile) return;
      const supabase = createClient();
      await supabase.from("messages").insert({
        sender_id: profile.id,
        receiver_id: room.id,
        content,
        msg_type: "chat",
      });
    },
    [profile, room.id]
  );

  return (
    <div className="relative flex h-screen flex-col overflow-hidden">
      {/* Purple gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-900/80 via-purple-950/60 to-background" />

      {/* Decorative mic overlay in bottom-right */}
      <div className="pointer-events-none absolute bottom-20 right-0 h-72 w-48 opacity-20">
        <svg viewBox="0 0 200 320" fill="none" className="h-full w-full">
          <ellipse cx="100" cy="120" rx="60" ry="90" fill="hsl(280 60% 50%)" />
          <rect x="85" y="210" width="30" height="80" rx="15" fill="hsl(280 60% 50%)" />
          <path d="M50 200 Q100 260 150 200" stroke="hsl(280 60% 50%)" strokeWidth="8" fill="none" />
        </svg>
      </div>

      {/* Header */}
      <RoomHeader
        name={room.name}
        roomId={room.id}
        category={room.category}
        viewerCount={viewerCount || room.viewer_count}
        owner={room.owner}
        diamonds={profile?.diamonds ?? 0}
      />

      {/* Scrollable content */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto pt-4 pb-2 scrollbar-hide">
        {/* Seat grid */}
        <SeatGrid
          seats={seats}
          maxSeats={seatMode}
          ownerId={room.owner?.id}
        />

        {/* Chat feed */}
        <RoomChat
          messages={messages}
          announcement={room.description || undefined}
        />
      </div>

      {/* Bottom toolbar */}
      <RoomActions
        roomId={room.id}
        seatMode={seatMode}
        onSeatModeChange={handleSeatModeChange}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
