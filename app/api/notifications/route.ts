import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const notifTitles: Record<string, string> = {
  gift_received: "Gift Received!",
  friend_joined: "Friend Joined",
  room_started: "Room Started",
  follower: "New Follower",
  friend_request: "Friend Request",
};

function getNotifBody(type: string, data: Record<string, string>): string {
  switch (type) {
    case "gift_received":
      return `You received a ${data.giftName} from ${data.username}!`;
    case "friend_joined":
      return `${data.username} is now online`;
    case "room_started":
      return `${data.host} started a new room: ${data.roomName}`;
    case "follower":
      return `${data.username} started following you`;
    case "friend_request":
      return `${data.username} sent you a friend request`;
    default:
      return "You have a new notification";
  }
}

export async function POST(req: Request) {
  try {
    const { userId, fromUserId, type, data, refId } = await req.json();
    const supabase = await createClient();

    const { error } = await supabase.from("notifications").insert({
      user_id: userId,
      from_user_id: fromUserId || null,
      notif_type: type,
      title: notifTitles[type] || "Notification",
      body: getNotifBody(type, data || {}),
      ref_id: refId || null,
      is_read: false,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal error" },
      { status: 500 }
    );
  }
}
