"use client";

import Link from "next/link";
import { Diamond, Gamepad2, Users, Gift } from "lucide-react";

const links = [
  {
    href: "/shop",
    icon: Diamond,
    label: "Shop",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    href: "/games",
    icon: Gamepad2,
    label: "Games",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    href: "/friends",
    icon: Users,
    label: "Friends",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    href: "/discover",
    icon: Gift,
    label: "Events",
    gradient: "from-amber-500 to-orange-500",
  },
];

export function QuickLinks() {
  return (
    <div className="flex gap-3 overflow-x-auto px-4 py-3 scrollbar-hide">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex shrink-0 flex-col items-center gap-1.5 rounded-2xl bg-gradient-to-br ${link.gradient} px-5 py-3 transition-transform hover:scale-[1.03] active:scale-[0.98]`}
        >
          <link.icon className="h-6 w-6 text-white" />
          <span className="text-[11px] font-semibold text-white">
            {link.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
