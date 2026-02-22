import { ChevronRight, Users, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Room = {
  id: string;
  name: string;
  category: string | null;
  viewer_count: number;
  is_live: boolean;
  cover_url: string | null;
  owner: {
    display_name: string | null;
    avatar_url: string | null;
    level: number;
  } | null;
};

const gradients = [
  "from-purple-500 to-pink-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-yellow-500 to-orange-500",
];

export function PopularRooms({ rooms }: { rooms: Room[] }) {
  const displayRooms = rooms.length > 0 ? rooms.slice(0, 8) : fallbackRooms;

  return (
    <section className="mb-4 px-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-bold text-foreground">Popular Rooms</h2>
        <Link
          href="/discover"
          className="flex items-center gap-0.5 text-[10px] font-semibold text-pink"
        >
          See All
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="scrollbar-hide flex gap-2.5 overflow-x-auto pb-1">
        {displayRooms.map((room, i) => (
          <Link
            key={room.id}
            href={`/room/${room.id}`}
            className="w-[140px] shrink-0 overflow-hidden rounded-2xl"
          >
            <div
              className={cn(
                "relative flex aspect-[4/3] flex-col justify-end bg-gradient-to-br p-2",
                room.cover_url ? "" : gradients[i % gradients.length]
              )}
              style={
                room.cover_url
                  ? {
                      backgroundImage: `url(${room.cover_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : undefined
              }
            >
              <div className="absolute right-2 top-2 flex items-center gap-0.5 rounded-full bg-[rgba(0,0,0,0.5)] px-1.5 py-0.5">
                <Users className="h-2.5 w-2.5 text-foreground" />
                <span className="text-[8px] font-medium text-foreground">
                  {room.viewer_count}
                </span>
              </div>
              {room.category === "dating" && (
                <Lock className="absolute left-2 top-2 h-3 w-3 text-gold" />
              )}
              <div className="-mx-2 -mb-2 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent px-2 pb-2 pt-3">
                <span className="block truncate text-[10px] font-bold text-foreground">
                  {room.name}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[8px] text-[rgba(255,255,255,0.6)]">
                    {room.owner?.display_name || "Host"}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

const fallbackRooms: Room[] = [
  {
    id: "1",
    name: "K-pop Fan Room",
    category: "music",
    viewer_count: 834,
    is_live: true,
    cover_url: null,
    owner: { display_name: "Kim", avatar_url: null, level: 12 },
  },
  {
    id: "2",
    name: "Late Night Party",
    category: "party",
    viewer_count: 567,
    is_live: true,
    cover_url: null,
    owner: { display_name: "Luna", avatar_url: null, level: 30 },
  },
  {
    id: "3",
    name: "Karaoke Night",
    category: "music",
    viewer_count: 456,
    is_live: true,
    cover_url: null,
    owner: { display_name: "Fatima", avatar_url: null, level: 22 },
  },
  {
    id: "4",
    name: "Dating Corner",
    category: "dating",
    viewer_count: 321,
    is_live: true,
    cover_url: null,
    owner: { display_name: "Priya", avatar_url: null, level: 18 },
  },
];
