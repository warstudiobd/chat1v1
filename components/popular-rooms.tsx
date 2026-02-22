"use client";

import { ChevronRight, Users, Eye, Mic, Star } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

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

const tabs = ["Hot", "New", "Music", "Chat", "Party", "Dating"] as const;

const gradients = [
  "from-pink-600 to-rose-400",
  "from-purple-600 to-violet-400",
  "from-blue-600 to-cyan-400",
  "from-emerald-600 to-green-400",
  "from-amber-600 to-orange-400",
  "from-red-600 to-pink-400",
  "from-indigo-600 to-blue-400",
  "from-teal-600 to-cyan-400",
];

export function PopularRooms({ rooms }: { rooms: Room[] }) {
  const [activeTab, setActiveTab] = useState(0);
  const displayRooms = rooms.length > 0 ? rooms.slice(0, 8) : fallbackRooms;

  return (
    <section className="mb-4">
      {/* Tab bar */}
      <div className="scrollbar-hide flex gap-1 overflow-x-auto px-4 pb-3">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all",
              activeTab === i
                ? "gradient-primary text-primary-foreground"
                : "glass text-muted-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Section header */}
      <div className="mb-2 flex items-center justify-between px-4">
        <div className="flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 text-gold" />
          <h2 className="text-sm font-bold text-foreground">Popular Rooms</h2>
        </div>
        <Link href="/discover" className="flex items-center gap-0.5 text-[10px] font-semibold text-pink">
          See All
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Room cards - horizontal scroll */}
      <div className="scrollbar-hide flex gap-2.5 overflow-x-auto px-4 pb-1">
        {displayRooms.map((room, i) => (
          <Link
            key={room.id}
            href={`/room/${room.id}`}
            className="w-[130px] shrink-0 overflow-hidden rounded-2xl border border-white/5"
          >
            <div
              className={cn(
                "relative flex aspect-[3/4] flex-col justify-end bg-gradient-to-br",
                room.cover_url ? "" : gradients[i % gradients.length]
              )}
              style={
                room.cover_url
                  ? { backgroundImage: `url(${room.cover_url})`, backgroundSize: "cover", backgroundPosition: "center" }
                  : undefined
              }
            >
              {/* Live badge */}
              {room.is_live && (
                <div className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-full bg-destructive/90 px-1.5 py-[2px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground animate-pulse" />
                  <span className="text-[7px] font-bold text-primary-foreground">LIVE</span>
                </div>
              )}

              {/* Viewer count */}
              <div className="absolute right-1.5 top-1.5 flex items-center gap-0.5 rounded-full bg-black/50 px-1.5 py-[2px]">
                <Eye className="h-2.5 w-2.5 text-foreground" />
                <span className="text-[8px] font-medium text-foreground">{formatNumber(room.viewer_count)}</span>
              </div>

              {/* Mic icon for voice rooms without cover */}
              {!room.cover_url && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Mic className="h-8 w-8 text-primary-foreground/30" />
                </div>
              )}

              {/* Bottom info */}
              <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2 pb-2 pt-6">
                <span className="block truncate text-[10px] font-bold text-foreground">
                  {room.name}
                </span>
                <div className="flex items-center gap-1 mt-0.5">
                  {room.owner?.avatar_url ? (
                    <img src={room.owner.avatar_url} alt="" className="h-3 w-3 rounded-full object-cover" />
                  ) : (
                    <div className="h-3 w-3 rounded-full bg-white/20" />
                  )}
                  <span className="text-[8px] text-foreground/60">{room.owner?.display_name || "Host"}</span>
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
  { id: "1", name: "K-pop Fan Room", category: "music", viewer_count: 834, is_live: true, cover_url: null, owner: { display_name: "Kim", avatar_url: null, level: 12 } },
  { id: "2", name: "Late Night Party", category: "party", viewer_count: 567, is_live: true, cover_url: null, owner: { display_name: "Luna", avatar_url: null, level: 30 } },
  { id: "3", name: "Karaoke Night", category: "music", viewer_count: 456, is_live: true, cover_url: null, owner: { display_name: "Fatima", avatar_url: null, level: 22 } },
  { id: "4", name: "Dating Corner", category: "dating", viewer_count: 321, is_live: true, cover_url: null, owner: { display_name: "Priya", avatar_url: null, level: 18 } },
  { id: "5", name: "Gaming Squad", category: "chat", viewer_count: 289, is_live: true, cover_url: null, owner: { display_name: "Alex", avatar_url: null, level: 25 } },
  { id: "6", name: "Chill Vibes", category: "chat", viewer_count: 198, is_live: true, cover_url: null, owner: { display_name: "Mei", avatar_url: null, level: 15 } },
];
