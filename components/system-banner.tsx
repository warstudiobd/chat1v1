"use client";

import { useState } from "react";
import { Megaphone, ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  { title: "Voice Room Festival", desc: "Win exclusive badges! Ends Feb 28", highlight: true },
  { title: "New Feature: Video Rooms", desc: "1-on-1 video calling is now live!", highlight: false },
  { title: "Top Gifter Event", desc: "Send gifts to climb the leaderboard", highlight: true },
  { title: "Invite Friends Bonus", desc: "Get 5,000 coins for each referral", highlight: false },
];

export function SystemBanner() {
  const [index, setIndex] = useState(0);
  const current = banners[index];

  return (
    <div className="mx-4 mb-3 overflow-hidden rounded-xl glass">
      <div className="flex items-center gap-2 px-3 py-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gold/20">
          <Megaphone className="h-3.5 w-3.5 text-gold" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-bold text-foreground">
            {current.title}
          </span>
          <p className="truncate text-[9px] text-muted-foreground">
            {current.desc}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIndex((i) => (i - 1 + banners.length) % banners.length)}
            className="flex h-5 w-5 items-center justify-center rounded-full bg-white/5 text-muted-foreground"
            aria-label="Previous"
          >
            <ChevronLeft className="h-3 w-3" />
          </button>
          <span className="text-[8px] font-bold text-pink">
            {index + 1}/{banners.length}
          </span>
          <button
            onClick={() => setIndex((i) => (i + 1) % banners.length)}
            className="flex h-5 w-5 items-center justify-center rounded-full bg-white/5 text-muted-foreground"
            aria-label="Next"
          >
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
