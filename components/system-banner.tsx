"use client";

import { Megaphone } from "lucide-react";

export function SystemBanner() {
  return (
    <div
      className="mx-4 mb-3 rounded-xl px-3 py-2.5"
      style={{
        background: "rgba(255,255,255,0.05)",
        borderLeft: "3px solid hsl(45,100%,55%)",
      }}
    >
      <div className="flex items-center gap-2">
        <Megaphone className="h-3.5 w-3.5 shrink-0 text-gold" />
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-bold text-foreground">
            System Maintenance
          </span>
          <p className="truncate text-[9px] text-muted-foreground">
            Scheduled maintenance on Feb 20, 2-4 AM UTC.
          </p>
        </div>
        <button className="shrink-0 text-[8px] font-bold text-pink">
          1/4
        </button>
      </div>
    </div>
  );
}
