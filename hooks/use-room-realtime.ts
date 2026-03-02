"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

type RealtimeMessage = {
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
    vip_level?: "none" | "vip" | "svip";
  } | null;
};

type RealtimeSeat = {
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

export function useRoomRealtime(
  roomId: string,
  initialMessages: RealtimeMessage[],
  initialSeats: RealtimeSeat[]
) {
  const [messages, setMessages] = useState(initialMessages);
  const [seats, setSeats] = useState(initialSeats);
  const [viewerCount, setViewerCount] = useState(0);

  const fetchSeats = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("room_seats")
      .select(
        `seat_number, is_muted, is_locked, invited_user_id, user:profiles!room_seats_user_id_fkey (id, display_name, avatar_url, level, vip_level)`
      )
      .eq("room_id", roomId)
      .order("seat_number");

    if (data) {
      setSeats(
        data.map((s: any) => ({
          seatNumber: s.seat_number,
          isMuted: s.is_muted,
          isLocked: s.is_locked ?? false,
          invitedUserId: s.invited_user_id,
          user: s.user,
        }))
      );
    }
  }, [roomId]);

  useEffect(() => {
    const supabase = createClient();

    const seatChannel = supabase
      .channel(`room-${roomId}-seats`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "room_seats",
          filter: `room_id=eq.${roomId}`,
        },
        () => {
          fetchSeats();
        }
      )
      .subscribe();

    const messageChannel = supabase
      .channel(`room-${roomId}-messages`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `receiver_id=eq.${roomId}`,
        },
        async (payload) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("id, display_name, avatar_url, vip_level")
            .eq("id", payload.new.sender_id)
            .single();

          setMessages((prev) => [
            ...prev,
            {
              id: payload.new.id,
              content: payload.new.content,
              msgType: payload.new.msg_type,
              giftType: payload.new.gift_type,
              diamondCost: payload.new.diamond_cost,
              createdAt: payload.new.created_at,
              sender: profile,
            },
          ]);
        }
      )
      .subscribe();

    const roomChannel = supabase
      .channel(`room-${roomId}-info`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "voice_rooms",
          filter: `id=eq.${roomId}`,
        },
        (payload) => {
          setViewerCount(payload.new.viewer_count);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(seatChannel);
      supabase.removeChannel(messageChannel);
      supabase.removeChannel(roomChannel);
    };
  }, [roomId, fetchSeats]);

  return { messages, seats, viewerCount };
}
