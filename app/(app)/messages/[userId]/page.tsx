import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ChatThread } from "@/components/messages/chat-thread";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: otherUser } = await supabase
    .from("profiles")
    .select("id, display_name, avatar_url, level, vip_expiry, svip_expiry")
    .eq("id", userId)
    .single();

  if (!otherUser) notFound();

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
      sender_id,
      receiver_id
    `
    )
    .is("room_id", null)
    .or(
      `and(sender_id.eq.${user.id},receiver_id.eq.${userId}),and(sender_id.eq.${userId},receiver_id.eq.${user.id})`
    )
    .order("created_at", { ascending: true })
    .limit(100);

  return (
    <ChatThread
      currentUserId={user.id}
      otherUser={otherUser}
      initialMessages={
        messages?.map((m) => ({
          id: m.id,
          content: m.content,
          msgType: m.msg_type,
          giftType: m.gift_type,
          diamondCost: m.diamond_cost,
          createdAt: m.created_at,
          senderId: m.sender_id,
        })) || []
      }
    />
  );
}
