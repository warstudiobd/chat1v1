import { createClient } from "@/lib/supabase/server";
import { FriendsView } from "@/components/friends/friends-view";

export default async function FriendsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch accepted friends
  const { data: friendships } = await supabase
    .from("friendships")
    .select(
      `
      id,
      status,
      friend:profiles!friendships_friend_id_fkey (
        id, display_name, avatar_url, level, is_online, bio
      ),
      user:profiles!friendships_user_id_fkey (
        id, display_name, avatar_url, level, is_online, bio
      )
    `
    )
    .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
    .eq("status", "accepted");

  // Fetch pending friend requests (where current user is the friend)
  const { data: pendingRequests } = await supabase
    .from("friendships")
    .select(
      `
      id,
      user:profiles!friendships_user_id_fkey (
        id, display_name, avatar_url, level
      )
    `
    )
    .eq("friend_id", user.id)
    .eq("status", "pending");

  // Map friends to a flat list
  const friends = (friendships || []).map((f: any) => {
    const friend = f.user?.id === user.id ? f.friend : f.user;
    return {
      id: friend?.id,
      display_name: friend?.display_name,
      avatar_url: friend?.avatar_url,
      level: friend?.level || 1,
      is_online: friend?.is_online || false,
      bio: friend?.bio,
    };
  });

  const pending = (pendingRequests || []).map((r: any) => ({
    id: r.id,
    user: {
      id: r.user?.id,
      display_name: r.user?.display_name,
      avatar_url: r.user?.avatar_url,
      level: r.user?.level || 1,
    },
  }));

  return <FriendsView friends={friends} pendingRequests={pending} />;
}
