"use client";

import { Crown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const topUsers = [
  { name: "Rose", coins: "2.1M", rank: 1, gradient: "from-amber-400 to-yellow-500" },
  { name: "Diana", coins: "1.8M", rank: 2, gradient: "from-gray-300 to-gray-400" },
  { name: "Lily", coins: "1.5M", rank: 3, gradient: "from-orange-400 to-amber-500" },
  { name: "Aria", coins: "1.2M", rank: 4, gradient: "from-pink-400 to-rose-500" },
  { name: "Mei", coins: "980K", rank: 5, gradient: "from-purple-400 to-violet-500" },
];

export function LeaderboardStrip() {
  return (
    <section className="mb-4 px-4">
      <div className="overflow-hidden rounded-2xl glass">
        <div className="flex items-center justify-between px-3 py-2.5">
          <div className="flex items-center gap-1.5">
            <Crown className="h-3.5 w-3.5 text-gold" />
            <span className="text-xs font-bold text-foreground">Top Gifters</span>
          </div>
          <Link href="/discover" className="flex items-center gap-0.5 text-[10px] font-semibold text-pink">
            View All
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="flex items-center gap-4 px-3 pb-3 overflow-x-auto scrollbar-hide">
          {topUsers.map((user) => (
            <div key={user.rank} className="flex shrink-0 items-center gap-2">
              <div className="relative">
                <div className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-primary-foreground",
                  user.gradient
                )}>
                  {user.name[0]}
                </div>
                <span className={cn(
                  "absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[7px] font-black text-background",
                  user.rank === 1 ? "bg-gold" : user.rank === 2 ? "bg-gray-300" : user.rank === 3 ? "bg-orange-400" : "bg-muted-foreground"
                )}>
                  {user.rank}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-foreground">{user.name}</span>
                <span className="text-[8px] text-gold">{user.coins}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
