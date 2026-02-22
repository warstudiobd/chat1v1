import { createClient } from "@/lib/supabase/server";
import { RoomCard } from "@/components/room-card";
import { UserAvatar } from "@/components/user-avatar";
import { LevelBadge } from "@/components/level-badge";
import { Search } from "lucide-react";
import Link from "next/link";

export default async function DiscoverPage() {
  const supabase = await createClient();

  const { data: trendingRooms } = await supabase
    .from("voice_rooms")
    .select(
      `
      id, name, category, viewer_count, is_live, cover_url,
      owner:profiles!voice_rooms_owner_id_fkey (
        display_name, avatar_url, level
      )
    `
    )
    .eq("is_live", true)
    .order("viewer_count", { ascending: false })
    .limit(6);

  const { data: newUsers } = await supabase
    .from("profiles")
    .select("id, display_name, avatar_url, level")
    .order("created_at", { ascending: false })
    .limit(10);

  const { data: popularHosts } = await supabase
    .from("profiles")
    .select("id, display_name, avatar_url, level, is_vip, is_svip")
    .order("xp", { ascending: false })
    .limit(6);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border bg-background/95 px-4 backdrop-blur-md">
        <h1 className="text-lg font-bold text-foreground">Discover</h1>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 rounded-xl border border-input bg-card px-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search rooms or users..."
            className="h-10 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>

      {/* New Users */}
      {newUsers && newUsers.length > 0 && (
        <section className="px-4 py-3">
          <h2 className="mb-3 text-sm font-bold text-foreground">New Users</h2>
          <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
            {newUsers.map((u) => (
              <Link
                key={u.id}
                href={`/user/${u.id}`}
                className="flex shrink-0 flex-col items-center gap-1.5"
              >
                <UserAvatar
                  src={u.avatar_url}
                  name={u.display_name}
                  size="lg"
                />
                <span className="max-w-16 truncate text-xs text-foreground">
                  {u.display_name || "User"}
                </span>
                <LevelBadge level={u.level} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Trending Rooms */}
      {trendingRooms && trendingRooms.length > 0 && (
        <section className="px-4 py-3">
          <h2 className="mb-3 text-sm font-bold text-foreground">
            Trending Rooms
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {trendingRooms.map((room) => (
              <RoomCard
                key={room.id}
                id={room.id}
                name={room.name}
                category={room.category}
                viewerCount={room.viewer_count}
                isLive={room.is_live}
                coverUrl={room.cover_url}
                owner={
                  room.owner
                    ? {
                        display_name: (room.owner as any).display_name,
                        avatar_url: (room.owner as any).avatar_url,
                        level: (room.owner as any).level,
                      }
                    : null
                }
              />
            ))}
          </div>
        </section>
      )}

      {/* Popular Hosts */}
      {popularHosts && popularHosts.length > 0 && (
        <section className="px-4 py-3 pb-8">
          <h2 className="mb-3 text-sm font-bold text-foreground">
            Popular Hosts
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {popularHosts.map((host) => (
              <Link
                key={host.id}
                href={`/user/${host.id}`}
                className="flex items-center gap-3 rounded-xl bg-card p-3 transition-colors hover:bg-muted/50"
              >
                <UserAvatar
                  src={host.avatar_url}
                  name={host.display_name}
                  size="md"
                />
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-sm font-semibold text-foreground">
                    {host.display_name || "User"}
                  </span>
                  <LevelBadge level={host.level} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {(!trendingRooms || trendingRooms.length === 0) &&
        (!newUsers || newUsers.length === 0) && (
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <Search className="h-12 w-12 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">
              Nothing to discover yet
            </p>
          </div>
        )}
    </div>
  );
}
