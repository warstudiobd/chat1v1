"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  Plus,
  MessageCircle,
  User,
  Mic,
  LogOut,
  Shield,
  Coins,
  Crown,
  Gamepad2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/components/user-provider";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { UserAvatar } from "@/components/user-avatar";
import { formatNumber } from "@/lib/utils";

const navItems = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/discover", icon: Compass, label: "Explore" },
  { href: "/create-room", icon: Plus, label: "Create Room" },
  { href: "/messages", icon: MessageCircle, label: "Messages" },
  { href: "/games", icon: Gamepad2, label: "Games" },
  { href: "/shop", icon: Coins, label: "Shop" },
  { href: "/profile", icon: User, label: "Profile" },
];

const adminItems = [{ href: "/admin", icon: Shield, label: "Admin" }];

export function Sidebar() {
  const pathname = usePathname();
  const { profile } = useUser();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="hidden md:flex fixed left-0 top-0 z-40 h-screen w-64 flex-col border-r border-white/5 bg-card/80 backdrop-blur-xl">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-6">
        <Image
          src="/icon-192.jpg"
          alt="LotChat"
          width={36}
          height={36}
          className="h-9 w-9 rounded-xl"
        />
        <span className="text-lg font-bold text-foreground">LotChat</span>
      </div>

      {/* Coin balance */}
      {profile && (
        <div className="mx-4 mb-3 flex items-center gap-2 rounded-xl glass px-3 py-2.5">
          <Coins className="h-4 w-4 text-gold" />
          <span className="text-sm font-bold text-gold">{formatNumber(profile.diamonds)}</span>
          <span className="text-[10px] text-muted-foreground">coins</span>
          <Link href="/shop" className="ml-auto rounded-full bg-gold/20 px-2 py-0.5 text-[9px] font-bold text-gold">
            Recharge
          </Link>
        </div>
      )}

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-0.5 px-3 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "gradient-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
        {profile?.role === "admin" && (
          <>
            <div className="my-2 border-t border-white/5" />
            {adminItems.map((item) => {
              const isActive = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "gradient-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </>
        )}
      </nav>

      {/* User card at bottom */}
      <div className="border-t border-white/5 p-4">
        {profile && (
          <div className="flex items-center gap-3">
            <UserAvatar src={profile.avatar_url} name={profile.display_name} size="sm" />
            <div className="flex flex-1 flex-col overflow-hidden">
              <span className="truncate text-sm font-medium text-foreground">
                {profile.display_name || "User"}
              </span>
              <span className="text-[10px] text-muted-foreground">Lv.{profile.level}</span>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-lg p-2 text-muted-foreground hover:bg-white/5 hover:text-foreground"
              aria-label="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
