import { createClient } from "@/lib/supabase/server";
import { RoomCard } from "@/components/room-card";
import { HomeHeader } from "@/components/home-header";
import { CategoryFilter } from "@/components/category-filter";

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
    .limit(20);

  return (
    <div className="flex flex-col">
      <HomeHeader />
      <CategoryFilter />
      <section className="px-4 py-4">
        <h2 className="mb-4 text-lg font-bold text-foreground">
          Live Rooms
        </h2>
        {rooms && rooms.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {rooms.map((room) => (
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
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-muted-foreground">No rooms yet</p>
            <p className="text-sm text-muted-foreground/60">
              Create the first voice room to get started
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
