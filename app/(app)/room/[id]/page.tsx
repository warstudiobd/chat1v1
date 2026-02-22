import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { RoomHeader } from "@/components/room/room-header";
import { SeatGrid } from "@/components/room/seat-grid";
import { RoomChat } from "@/components/room/room-chat";
import { RoomActions } from "@/components/room/room-actions";

export default async function VoiceRoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: room } = await supabase
    .from("voice_rooms")
    .select(
      `
      *,
      owner:profiles!voice_rooms_owner_id_fkey (
        id, display_name, avatar_url, level, is_vip, is_svip
      )
    `
    )
    .eq("id", id)
    .single();

  if (!room) notFound();

  const { data: seats } = await supabase
    .from("room_seats")
    .select(
      `
      seat_number,
      is_muted,
      user:profiles!room_seats_user_id_fkey (
        id, display_name, avatar_url, level
      )
    `
    )
    .eq("room_id", id)
    .order("seat_number");

  const { data: messages } = await supabase
    .from("messages")
    .select(
      `
      id,
      content,
      msg_type,
      gift_type,
      diamond_cost,
      created_at,
      sender:profiles!messages_sender_id_fkey (
        id, display_name, avatar_url
      )
    `
    )
    .eq("room_id", id)
    .order("created_at", { ascending: true })
    .limit(50);

  return (
    <div className="flex h-screen flex-col md:h-auto md:min-h-screen">
      <RoomHeader
        name={room.name}
        category={room.category}
        viewerCount={room.viewer_count}
        owner={room.owner as any}
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <SeatGrid
          seats={(seats || []).map((s) => ({
            seatNumber: s.seat_number,
            isMuted: s.is_muted,
            user: s.user as any,
          }))}
          maxSeats={room.max_seats}
          ownerId={(room.owner as any)?.id}
        />
        <RoomChat
          messages={(messages || []).map((m) => ({
            id: m.id,
            content: m.content,
            msgType: m.msg_type,
            giftType: m.gift_type,
            diamondCost: m.diamond_cost,
            createdAt: m.created_at,
            sender: m.sender as any,
          }))}
        />
      </div>
      <RoomActions roomId={id} />
    </div>
  );
}
