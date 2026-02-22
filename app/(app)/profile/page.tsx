import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import { ShopView } from "@/components/profile/shop-view";
import { GamesView } from "@/components/profile/games-view";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  // Fetch profile, followers, following, notifications, and friends in parallel
  const [
    { data: profile },
    { count: followerCount },
    { count: followingCount },
    { data: notifications },
    { data: friendships },
    { data: pendingRequests },
  ] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("user_follows")
      .select("*", { count: "exact", head: true })
      .eq("following_id", user.id),
    supabase
      .from("user_follows")
      .select("*", { count: "exact", head: true })
      .eq("follower_id", user.id),
    supabase
      .from("notifications")
      .select(
        `
        id, type, title, body, is_read, created_at,
        from_user:profiles!notifications_from_user_id_fkey (
          id, display_name, avatar_url
        )
      `
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50),
    supabase
      .from("friendships")
      .select(
        `
        id, status,
        friend:profiles!friendships_friend_id_fkey (
          id, display_name, avatar_url, level, is_online, bio
        ),
        user:profiles!friendships_user_id_fkey (
          id, display_name, avatar_url, level, is_online, bio
        )
      `
      )
      .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
      .eq("status", "accepted"),
    supabase
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
      .eq("status", "pending"),
  ]);

  // Map notifications
  const mappedNotifications =
    notifications?.map((n: any) => ({
      id: n.id,
      type: n.type,
      title: n.title,
      body: n.body,
      isRead: n.is_read,
      createdAt: n.created_at,
      fromUser: n.from_user as any,
    })) || [];

  const unreadCount = mappedNotifications.filter((n) => !n.isRead).length;

  // Map friends
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

  return (
    <ProfileTabs
      profile={profile}
      followerCount={followerCount || 0}
      followingCount={followingCount || 0}
      notifications={mappedNotifications}
      friends={friends}
      pendingRequests={pending}
      unreadCount={unreadCount}
      shopContent={<ShopView />}
      gamesContent={<GamesView />}
    />
  );
}
