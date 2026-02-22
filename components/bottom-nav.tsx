"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Mic, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/discover", icon: Compass, label: "Explore" },
  { href: "/create-room", icon: Mic, label: "", isCenter: true },
  { href: "/messages", icon: MessageCircle, label: "Chat" },
  { href: "/profile", icon: User, label: "Me" },
];

export function BottomNav() {
  const pathname = usePathname();

  // Hide on room pages
  if (pathname?.startsWith("/room/")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-dark border-t border-white/5 md:hidden">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center"
                aria-label="Create room"
              >
                <div
                  className="flex h-13 w-13 -mt-5 items-center justify-center rounded-full shadow-lg shadow-pink/30"
                  style={{ background: "linear-gradient(135deg, hsl(330,80%,60%), hsl(270,80%,60%))" }}
                >
                  <item.icon className="h-6 w-6 text-primary-foreground" />
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 transition-colors",
                isActive ? "text-pink" : "text-muted-foreground"
              )}
              aria-label={item.label}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[9px] font-medium">{item.label}</span>
              {isActive && (
                <span className="absolute bottom-1 h-0.5 w-4 rounded-full bg-pink" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
