"use client";

import Link from "next/link";
import { Mic, Video, Users, Gamepad2, Gift, ShoppingBag, Crown, Trophy } from "lucide-react";

const actions = [
  { icon: Mic, label: "Voice Room", href: "/create-room", gradient: "from-pink-500 to-rose-400" },
  { icon: Video, label: "Video Chat", href: "/discover", gradient: "from-purple-500 to-violet-400" },
  { icon: Users, label: "Party", href: "/discover", gradient: "from-blue-500 to-cyan-400" },
  { icon: Gamepad2, label: "Games", href: "/games", gradient: "from-emerald-500 to-green-400" },
  { icon: Gift, label: "Gifts", href: "/shop", gradient: "from-amber-500 to-orange-400" },
  { icon: ShoppingBag, label: "Shop", href: "/shop", gradient: "from-red-500 to-pink-400" },
  { icon: Crown, label: "VIP", href: "/shop", gradient: "from-yellow-500 to-amber-400" },
  { icon: Trophy, label: "Ranking", href: "/discover", gradient: "from-indigo-500 to-blue-400" },
];

export function QuickActions() {
  return (
    <section className="mb-4 px-4">
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action, i) => (
          <Link
            key={i}
            href={action.href}
            className="flex flex-col items-center gap-1.5"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${action.gradient} transition-transform hover:scale-110 active:scale-95`}>
              <action.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-[9px] font-medium text-muted-foreground">{action.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
