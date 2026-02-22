"use client";

import { Bell, Mic } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/components/user-provider";
import { DiamondDisplay } from "@/components/diamond-display";

export function HomeHeader() {
  const { profile } = useUser();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary md:hidden">
          <Mic className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold text-foreground md:hidden">
          LotChat
        </span>
        <span className="hidden text-lg font-bold text-foreground md:block">
          Home
        </span>
      </div>
      <div className="flex items-center gap-3">
        {profile && <DiamondDisplay amount={profile.diamonds} />}
        <Link
          href="/notifications"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </Link>
      </div>
    </header>
  );
}
