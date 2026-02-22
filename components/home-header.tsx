"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/components/user-provider";
import { DiamondDisplay } from "@/components/diamond-display";

export function HomeHeader() {
  const { profile } = useUser();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between px-4 bg-background/95 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg md:hidden"
          style={{
            background: "linear-gradient(135deg, hsl(330,80%,60%), hsl(270,80%,60%))",
          }}
        >
          <span className="text-sm font-bold text-foreground">L</span>
        </div>
        <h1 className="text-lg font-bold text-foreground md:hidden">
          LotChat
        </h1>
        <span className="hidden text-lg font-bold text-foreground md:block">
          Home
        </span>
      </div>
      <div className="flex items-center gap-3">
        {profile && (
          <DiamondDisplay
            amount={profile.diamonds}
            className="rounded-full bg-[rgba(255,255,255,0.05)] px-3 py-1.5 text-xs"
          />
        )}
        <Link
          href="/notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(255,255,255,0.05)] text-muted-foreground hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4 text-foreground" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-pink text-[8px] font-bold text-foreground">
            3
          </span>
        </Link>
      </div>
    </header>
  );
}
