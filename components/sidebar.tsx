"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Plus,
  MessageCircle,
  User,
  Bell,
  Mic,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/components/user-provider";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { UserAvatar } from "@/components/user-avatar";

const navItems = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/discover", icon: Search, label: "Discover" },
  { href: "/create-room", icon: Plus, label: "Create Room" },
  { href: "/messages", icon: MessageCircle, label: "Messages" },
  { href: "/notifications", icon: Bell, label: "Notifications" },
  { href: "/profile", icon: User, label: "Profile" },
];

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
    <aside className="hidden md:flex fixed left-0 top-0 z-40 h-screen w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center gap-3 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
          <Mic className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold text-foreground">LotChat</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        {profile && (
          <div className="flex items-center gap-3">
            <UserAvatar
              src={profile.avatar_url}
              name={profile.display_name}
              size="sm"
            />
            <div className="flex flex-1 flex-col overflow-hidden">
              <span className="truncate text-sm font-medium text-foreground">
                {profile.display_name || "User"}
              </span>
              <span className="text-xs text-muted-foreground">
                Lv.{profile.level}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
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
