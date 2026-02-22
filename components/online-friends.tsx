"use client";

import { cn } from "@/lib/utils";
import { Video, Phone } from "lucide-react";
import Link from "next/link";

const liveUsers = [
  { name: "Sofia", gradient: "from-pink-500 to-rose-400", type: "video" as const },
  { name: "Aisha", gradient: "from-purple-500 to-violet-400", type: "voice" as const },
  { name: "Yuki", gradient: "from-blue-500 to-cyan-400", badge: "VIP", type: "video" as const },
  { name: "Priya", gradient: "from-amber-500 to-orange-400", type: "voice" as const },
  { name: "Luna", gradient: "from-emerald-500 to-green-400", badge: "SVIP", type: "video" as const },
  { name: "Nadia", gradient: "from-indigo-500 to-blue-400", type: "voice" as const },
  { name: "Mei", gradient: "from-rose-500 to-pink-400", type: "video" as const },
  { name: "Aria", gradient: "from-teal-500 to-cyan-400", type: "voice" as const },
];

export function OnlineFriends() {
  return (
    <div className="scrollbar-hide flex gap-3 overflow-x-auto px-4 py-3">
      {/* Match button */}
      <Link
        href="/discover"
        className="flex shrink-0 flex-col items-center gap-1"
      >
        <div className="relative h-[60px] w-[60px] rounded-full p-[2px]" style={{ background: "linear-gradient(135deg, hsl(330,80%,60%), hsl(270,80%,60%))" }}>
          <div className="flex h-full w-full items-center justify-center rounded-full bg-background">
            <Video className="h-5 w-5 text-pink" />
          </div>
        </div>
        <span className="text-[9px] font-bold text-pink">Match</span>
      </Link>

      {liveUsers.map((user, i) => (
        <button key={i} className="flex shrink-0 flex-col items-center gap-1">
          <div className="relative">
            {/* Live ring */}
            <div className="h-[60px] w-[60px] rounded-full p-[2px]" style={{ background: user.type === "video" ? "linear-gradient(135deg, hsl(330,80%,60%), hsl(45,100%,55%))" : "linear-gradient(135deg, hsl(185,80%,55%), hsl(270,80%,60%))" }}>
              <div
                className={cn(
                  "flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br text-lg font-bold text-primary-foreground",
                  user.gradient
                )}
              >
                {user.name[0]}
              </div>
            </div>
            {/* Online dot */}
            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-background" />
            {/* Badge */}
            {user.badge && (
              <span className={cn(
                "absolute -right-1 -top-1 rounded px-1 py-[1px] text-[6px] font-black text-primary-foreground",
                user.badge === "SVIP" ? "bg-pink" : "bg-gold"
              )}>
                {user.badge}
              </span>
            )}
            {/* Type indicator */}
            <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 flex h-4 items-center gap-0.5 rounded-full bg-card px-1.5 text-[7px] font-bold text-muted-foreground border border-border">
              {user.type === "video" ? <Video className="h-2 w-2" /> : <Phone className="h-2 w-2" />}
            </span>
          </div>
          <span className="max-w-[60px] truncate text-[9px] font-medium text-muted-foreground">
            {user.name}
          </span>
        </button>
      ))}
    </div>
  );
}
