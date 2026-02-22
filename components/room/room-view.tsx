"use client";

import { RoomHeader } from "@/components/room/room-header";
import { SeatGrid } from "@/components/room/seat-grid";
import { RoomChat } from "@/components/room/room-chat";
import { RoomActions } from "@/components/room/room-actions";
import { useRoomRealtime } from "@/hooks/use-room-realtime";

type RoomViewProps = {
  room: {
    id: string;
    name: string;
    category: string | null;
    viewer_count: number;
    max_seats: number;
    owner: {
      id: string;
      display_name: string | null;
      avatar_url: string | null;
      level: number;
      is_vip: boolean;
      is_svip: boolean;
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

export function RoomView({ room, initialSeats, initialMessages }: RoomViewProps) {
  const { messages, seats, viewerCount } = useRoomRealtime(
    room.id,
    initialMessages,
    initialSeats
  );

  return (
    <div className="flex h-screen flex-col md:h-auto md:min-h-screen">
      <RoomHeader
        name={room.name}
        category={room.category}
        viewerCount={viewerCount || room.viewer_count}
        owner={room.owner}
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <SeatGrid
          seats={seats}
          maxSeats={room.max_seats}
          ownerId={room.owner?.id}
        />
        <RoomChat messages={messages} />
      </div>
      <RoomActions roomId={room.id} />
    </div>
  );
}
