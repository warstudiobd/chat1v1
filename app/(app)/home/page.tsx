import { createClient } from "@/lib/supabase/server";
import { HomeHeader } from "@/components/home-header";
import { OnlineFriends } from "@/components/online-friends";
import { SystemBanner } from "@/components/system-banner";
import { PopularRooms } from "@/components/popular-rooms";
import { VipBanner } from "@/components/vip-banner";
import { EventsSection } from "@/components/events-section";
import { GamesGrid } from "@/components/games-grid";
import { SpecialOffers } from "@/components/special-offers";

export default async function HomePage() {
  const supabase = await createClient();

  const { data: rooms } = await supabase
    .from("voice_rooms")
    .select(
      `
      id,
      name,
      category,
      viewer_count,
      is_live,
      cover_url,
      owner:profiles!voice_rooms_owner_id_fkey (
        display_name,
        avatar_url,
        level
      )
    `
    )
    .order("viewer_count", { ascending: false })
    .limit(8);

  const formattedRooms = (rooms || []).map((room) => ({
    id: room.id,
    name: room.name,
    category: room.category,
    viewer_count: room.viewer_count,
    is_live: room.is_live,
    cover_url: room.cover_url,
    owner: room.owner
      ? {
          display_name: (room.owner as any).display_name,
          avatar_url: (room.owner as any).avatar_url,
          level: (room.owner as any).level,
        }
      : null,
  }));

  return (
    <div className="flex flex-col">
      <HomeHeader />
      <main className="flex-1 overflow-y-auto pb-2">
        <OnlineFriends />
        <SystemBanner />
        <PopularRooms rooms={formattedRooms} />
        <VipBanner />
        <EventsSection />
        <GamesGrid />
        <SpecialOffers />
      </main>
    </div>
  );
}
