"use client";

import { cn } from "@/lib/utils";

const friends = [
  { name: "Sofia", gradient: "from-purple-500 to-pink-500" },
  { name: "Aisha", gradient: "from-blue-500 to-cyan-500" },
  { name: "Yuki", gradient: "from-green-500 to-emerald-500", badge: "VIP" },
  { name: "Priya", gradient: "from-yellow-500 to-orange-500" },
  { name: "Luna", gradient: "from-red-500 to-pink-500", badge: "SVIP" },
  { name: "Nadia", gradient: "from-indigo-500 to-purple-500" },
];

export function OnlineFriends() {
  return (
    <div className="scrollbar-hide flex gap-3 overflow-x-auto px-4 py-3">
      {friends.map((friend, i) => (
        <button
          key={i}
          className="flex shrink-0 flex-col items-center gap-1"
        >
          <div className="relative">
            <div className="h-14 w-14 rounded-full p-0.5 bg-[rgba(255,255,255,0.1)]">
              <div
                className={cn(
                  "flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br text-base font-bold text-foreground",
                  friend.gradient
                )}
              >
                {friend.name[0]}
              </div>
            </div>
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background" />
            {friend.badge === "VIP" && (
              <span className="absolute -right-0.5 -top-0.5 rounded px-1 text-[5px] font-black text-foreground bg-gold">
                VIP
              </span>
            )}
            {friend.badge === "SVIP" && (
              <span className="absolute -right-0.5 -top-0.5 rounded px-1 text-[5px] font-black text-foreground bg-pink">
                SVIP
              </span>
            )}
          </div>
          <span className="max-w-[56px] truncate text-[9px] font-medium text-muted-foreground">
            {friend.name}
          </span>
        </button>
      ))}
    </div>
  );
}
