"use client";

import { Bell, Coins, Search } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/components/user-provider";
import { formatNumber } from "@/lib/utils";

export function HomeHeader() {
  const { profile } = useUser();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between px-4 glass-dark">
      <div className="flex items-center gap-2.5">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-xl md:hidden"
          style={{
            background: "linear-gradient(135deg, hsl(330,80%,60%), hsl(270,80%,60%))",
          }}
        >
          <span className="text-sm font-black text-primary-foreground">L</span>
        </div>
        <h1 className="text-lg font-bold text-foreground md:hidden">
          LotChat
        </h1>
        <span className="hidden text-lg font-bold text-foreground md:block">
          Home
        </span>
      </div>
      <div className="flex items-center gap-2">
        {/* Coin balance */}
        {profile && (
          <Link
            href="/shop"
            className="flex items-center gap-1.5 rounded-full glass px-3 py-1.5"
          >
            <Coins className="h-3.5 w-3.5 text-gold" />
            <span className="text-xs font-bold text-gold">
              {formatNumber(profile.diamonds)}
            </span>
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gold/20 text-[8px] font-black text-gold">
              +
            </span>
          </Link>
        )}

        {/* Search */}
        <Link
          href="/discover"
          className="flex h-9 w-9 items-center justify-center rounded-full glass text-muted-foreground hover:text-foreground"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </Link>

        {/* Notifications */}
        <Link
          href="/notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full glass text-muted-foreground hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-pink text-[8px] font-bold text-primary-foreground">
            3
          </span>
        </Link>
      </div>
    </header>
  );
}
