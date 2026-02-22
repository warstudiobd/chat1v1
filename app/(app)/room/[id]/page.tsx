import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { RoomView } from "@/components/room/room-view";

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
        id, display_name, avatar_url, level
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
    .eq("receiver_id", id)
    .order("created_at", { ascending: true })
    .limit(50);

  return (
    <RoomView
      room={{
        id: room.id,
        name: room.name,
        category: room.category,
        viewer_count: room.viewer_count,
        max_seats: room.max_seats,
        owner: room.owner as any,
      }}
      initialSeats={(seats || []).map((s: any) => ({
        seatNumber: s.seat_number,
        isMuted: s.is_muted,
        user: s.user,
      }))}
      initialMessages={(messages || []).map((m: any) => ({
        id: m.id,
        content: m.content,
        msgType: m.msg_type,
        giftType: m.gift_type,
        diamondCost: m.diamond_cost,
        createdAt: m.created_at,
        sender: m.sender,
      }))}
    />
  );
}
