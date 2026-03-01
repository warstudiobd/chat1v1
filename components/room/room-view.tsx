"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { RoomHeader } from "@/components/room/room-header";
import { SeatGrid } from "@/components/room/seat-grid";
import { RoomChat } from "@/components/room/room-chat";
import { RoomActions } from "@/components/room/room-actions";
import { GiftAnimation } from "@/components/room/gift-animation";
import { EntryAnimation } from "@/components/room/entry-animation";
import { FloatingEmojiOverlay, triggerFloatingEmoji } from "@/components/room/floating-emoji";
import { VibeBar } from "@/components/room/sound-vibes";
import { useRoomRealtime } from "@/hooks/use-room-realtime";
import { useUser } from "@/components/user-provider";
import { createClient } from "@/lib/supabase/client";
import type { Gift } from "@/lib/gifts";

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
    isLocked?: boolean;
    invitedUserId?: string | null;
    user: {
      id: string;
      display_name: string | null;
      avatar_url: string | null;
      level: number;
      vip_level?: "none" | "vip" | "svip";
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
      vip_level?: "none" | "vip" | "svip";
    } | null;
  }[];
  initialAdminIds?: string[];
};

type ActiveGift = {
  id: string;
  gift: Gift;
  senderName: string;
  quantity: number;
};

type EntryEvent = {
  id: string;
  userName: string;
  vipLevel: "none" | "vip" | "svip";
};

export function RoomView({ room, initialSeats, initialMessages, initialAdminIds = [] }: RoomViewProps) {
  const { profile } = useUser();
  const { messages, seats, viewerCount } = useRoomRealtime(room.id, initialMessages, initialSeats);
  const [seatMode, setSeatMode] = useState(room.max_seats);
  const [activeGifts, setActiveGifts] = useState<ActiveGift[]>([]);
  const [entryEvents, setEntryEvents] = useState<EntryEvent[]>([]);
  const [adminIds, setAdminIds] = useState<string[]>(initialAdminIds);
  const [activeVibe, setActiveVibe] = useState<string | null>(null);
  const processedJoinsRef = useRef<Set<string>>(new Set());

  // Determine current user role
  const isOwner = profile?.id === room.owner?.id;
  const isAdmin = profile ? adminIds.includes(profile.id) : false;
  const currentUserRole: "owner" | "admin" | "user" = isOwner ? "owner" : isAdmin ? "admin" : "user";
  const isPrivileged = isOwner || isAdmin;

  // Fetch admin list
  useEffect(() => {
    async function fetchAdmins() {
      const supabase = createClient();
      const { data } = await supabase
        .from("room_admins")
        .select("user_id")
        .eq("room_id", room.id);
      if (data) {
        setAdminIds(data.map((a: any) => a.user_id));
      }
    }
    fetchAdmins();

    // Subscribe to admin changes
    const supabase = createClient();
    const channel = supabase
      .channel(`room-${room.id}-admins`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "room_admins", filter: `room_id=eq.${room.id}` },
        () => fetchAdmins()
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [room.id]);

  // Watch for join messages to trigger entry animation
  useEffect(() => {
    const joinMessages = messages.filter((m) => m.msgType === "join");
    for (const msg of joinMessages) {
      if (!processedJoinsRef.current.has(msg.id)) {
        processedJoinsRef.current.add(msg.id);
        const vipLevel = msg.sender?.vip_level || "none";
        setEntryEvents((prev) => [
          ...prev,
          {
            id: msg.id,
            userName: msg.sender?.display_name || "User",
            vipLevel: vipLevel as "none" | "vip" | "svip",
          },
        ]);
      }
    }
  }, [messages]);

  const handleSeatModeChange = useCallback(
    async (mode: number) => {
      setSeatMode(mode);
      const supabase = createClient();
      await supabase.from("voice_rooms").update({ max_seats: mode }).eq("id", room.id);
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

  const handleGiftSent = useCallback(
    (gift: Gift, quantity: number) => {
      const giftId = `${gift.id}-${Date.now()}`;
      setActiveGifts((prev) => [
        ...prev,
        {
          id: giftId,
          gift,
          senderName: profile?.display_name || "Someone",
          quantity,
        },
      ]);
    },
    [profile]
  );

  const removeGift = useCallback((giftId: string) => {
    setActiveGifts((prev) => prev.filter((g) => g.id !== giftId));
  }, []);

  const removeEntry = useCallback((entryId: string) => {
    setEntryEvents((prev) => prev.filter((e) => e.id !== entryId));
  }, []);

  const handleEmojiFloat = useCallback((emoji: string) => {
    triggerFloatingEmoji(emoji);
  }, []);

  const handleVibeChange = useCallback((vibeId: string | null) => {
    setActiveVibe(vibeId);
  }, []);

  return (
    <div className="relative flex h-screen flex-col overflow-hidden">
      {/* Chamet purple gradient background */}
      <div className="pointer-events-none absolute inset-0 gradient-room" />

      {/* Subtle mesh overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, hsl(280 60% 30% / 0.4), transparent 50%), " +
            "radial-gradient(ellipse at 80% 20%, hsl(330 60% 30% / 0.3), transparent 50%)",
        }}
      />

      {/* Decorative mic silhouette */}
      <div className="pointer-events-none absolute bottom-20 right-0 h-72 w-48 opacity-10">
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

      {/* Content area */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto pt-2 pb-2 scrollbar-hide">
        <SeatGrid
          seats={seats}
          maxSeats={seatMode}
          ownerId={room.owner?.id}
          currentUserId={profile?.id}
          currentUserRole={currentUserRole}
          adminIds={adminIds}
          roomId={room.id}
        />

        {/* Active vibe bar */}
        {activeVibe && (
          <div className="px-3">
            <VibeBar vibeId={activeVibe} onStop={() => setActiveVibe(null)} />
          </div>
        )}

        <RoomChat messages={messages} announcement={room.description || undefined} />
      </div>

      {/* Floating emoji overlay */}
      <FloatingEmojiOverlay />

      {/* Bottom toolbar */}
      <RoomActions
        roomId={room.id}
        seatMode={seatMode}
        onSeatModeChange={handleSeatModeChange}
        onSendMessage={handleSendMessage}
        onGiftSent={handleGiftSent}
        onEmojiFloat={handleEmojiFloat}
        isPrivileged={isPrivileged}
        activeVibe={activeVibe}
        onVibeChange={handleVibeChange}
      />

      {/* Gift animations overlay */}
      {activeGifts.map((ag) => (
        <GiftAnimation
          key={ag.id}
          gift={ag.gift}
          senderName={ag.senderName}
          quantity={ag.quantity}
          onComplete={() => removeGift(ag.id)}
        />
      ))}

      {/* Entry animations */}
      {entryEvents.map((entry) => (
        <EntryAnimation
          key={entry.id}
          userName={entry.userName}
          vipLevel={entry.vipLevel}
          onComplete={() => removeEntry(entry.id)}
        />
      ))}
    </div>
  );
}
