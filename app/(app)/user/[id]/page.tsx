import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ProfileView } from "@/components/profile/profile-view";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (!profile) notFound();

  const { count: followerCount } = await supabase
    .from("user_follows")
    .select("*", { count: "exact", head: true })
    .eq("following_id", id);

  const { count: followingCount } = await supabase
    .from("user_follows")
    .select("*", { count: "exact", head: true })
    .eq("follower_id", id);

  let isFollowing = false;
  if (user) {
    const { data: follow } = await supabase
      .from("user_follows")
      .select("id")
      .eq("follower_id", user.id)
      .eq("following_id", id)
      .single();
    isFollowing = !!follow;
  }

  return (
    <ProfileView
      profile={profile}
      followerCount={followerCount || 0}
      followingCount={followingCount || 0}
      isOwnProfile={user?.id === id}
      isFollowing={isFollowing}
    />
  );
}
