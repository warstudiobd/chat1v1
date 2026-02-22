import { createClient } from "@/lib/supabase/server";
import { ConversationList } from "@/components/messages/conversation-list";

export default async function MessagesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Get distinct conversations by fetching the latest message with each user
  const { data: sentMessages } = await supabase
    .from("messages")
    .select(
      `
      id,
      content,
      msg_type,
      created_at,
      receiver_id,
      receiver:profiles!messages_receiver_id_fkey (
        id, display_name, avatar_url, level
      )
    `
    )
    .eq("sender_id", user.id)
    .is("room_id", null)
    .order("created_at", { ascending: false });

  const { data: receivedMessages } = await supabase
    .from("messages")
    .select(
      `
      id,
      content,
      msg_type,
      created_at,
      sender_id,
      sender:profiles!messages_sender_id_fkey (
        id, display_name, avatar_url, level
      )
    `
    )
    .eq("receiver_id", user.id)
    .is("room_id", null)
    .order("created_at", { ascending: false });

  // Build conversation map
  const convMap = new Map<
    string,
    {
      userId: string;
      displayName: string | null;
      avatarUrl: string | null;
      level: number;
      lastMessage: string | null;
      lastMessageAt: string;
    }
  >();

  sentMessages?.forEach((m) => {
    const other = m.receiver as any;
    if (other && !convMap.has(other.id)) {
      convMap.set(other.id, {
        userId: other.id,
        displayName: other.display_name,
        avatarUrl: other.avatar_url,
        level: other.level,
        lastMessage: m.content,
        lastMessageAt: m.created_at,
      });
    }
  });

  receivedMessages?.forEach((m) => {
    const other = m.sender as any;
    if (other) {
      const existing = convMap.get(other.id);
      if (!existing || new Date(m.created_at) > new Date(existing.lastMessageAt)) {
        convMap.set(other.id, {
          userId: other.id,
          displayName: other.display_name,
          avatarUrl: other.avatar_url,
          level: other.level,
          lastMessage: m.content,
          lastMessageAt: m.created_at,
        });
      }
    }
  });

  const conversations = Array.from(convMap.values()).sort(
    (a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
  );

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border bg-background/95 px-4 backdrop-blur-md">
        <h1 className="text-lg font-bold text-foreground">Messages</h1>
      </header>
      <ConversationList conversations={conversations} />
    </div>
  );
}
