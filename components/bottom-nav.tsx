"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Mic, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/discover", icon: Compass, label: "Discover" },
  { href: "/create-room", icon: Mic, label: "Rooms", isCenter: true },
  { href: "/messages", icon: MessageCircle, label: "Messages" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[rgba(255,255,255,0.06)] bg-background/95 backdrop-blur-md md:hidden">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/");

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-0.5 px-3 py-1.5"
                aria-label={item.label}
              >
                <div
                  className="flex h-11 w-11 -mt-4 items-center justify-center rounded-full shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(330,80%,60%), hsl(330,70%,70%))",
                  }}
                >
                  <item.icon className="h-5 w-5 text-foreground" />
                </div>
                <span className="-mt-0.5 text-[10px] font-medium text-foreground">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5",
                isActive ? "text-pink" : "text-muted-foreground"
              )}
              aria-label={item.label}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
