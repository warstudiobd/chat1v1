"use client";

import { useState } from "react";
import { cn, ROOM_CATEGORIES, formatCategory } from "@/lib/utils";

export function CategoryFilter() {
  const [active, setActive] = useState("All");

  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto px-4 py-3">
      {ROOM_CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={cn(
            "shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
            active === cat
              ? "gradient-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          {cat === "All" ? "All" : formatCategory(cat)}
        </button>
      ))}
    </div>
  );
}
