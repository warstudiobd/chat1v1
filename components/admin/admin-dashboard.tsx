"use client";

import { useState } from "react";
import { cn, formatNumber, timeAgo, formatCategory } from "@/lib/utils";
import {
  Users,
  Mic,
  Diamond,
  TrendingUp,
  BarChart3,
  Gift,
  FileText,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  stats: {
    totalUsers: number;
    activeRooms: number;
  };
  recentUsers: {
    id: string;
    display_name: string | null;
    diamonds: number;
    level: number;
    role: string | null;
    created_at: string;
  }[];
  recentRooms: {
    id: string;
    name: string;
    category: string;
    viewer_count: number;
    is_live: boolean;
    created_at: string;
    owner: { display_name: string | null } | null;
  }[];
};

const sections = [
  { id: "dashboard", name: "Dashboard", icon: BarChart3 },
  { id: "users", name: "Users", icon: Users },
  { id: "rooms", name: "Rooms", icon: Mic },
  { id: "gifts", name: "Gifts", icon: Gift },
  { id: "reports", name: "Reports", icon: FileText },
];

export function AdminDashboard({ stats, recentUsers, recentRooms }: Props) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      {/* Admin Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-14 items-center gap-2 border-b border-border px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <Mic className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-bold text-foreground">
            LotChat Admin
          </span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                activeSection === section.id
                  ? "gradient-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <section.icon className="h-4 w-4" />
              {section.name}
            </button>
          ))}
        </nav>
        <div className="border-t border-border p-3">
          <button
            onClick={() => router.push("/home")}
            className="flex w-full items-center gap-2 rounded-xl px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to App
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        {/* Mobile back button */}
        <div className="mb-4 flex items-center gap-3 lg:hidden">
          <button
            onClick={() => router.push("/home")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Admin Dashboard</h1>
        </div>

        <h1 className="mb-6 hidden text-2xl font-bold text-foreground lg:block">
          Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl bg-card p-4">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Total Users</p>
            <p className="text-2xl font-bold text-foreground">
              {formatNumber(stats.totalUsers)}
            </p>
          </div>
          <div className="rounded-xl bg-card p-4">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/20">
              <Mic className="h-4 w-4 text-green-400" />
            </div>
            <p className="text-xs text-muted-foreground">Active Rooms</p>
            <p className="text-2xl font-bold text-foreground">
              {formatNumber(stats.activeRooms)}
            </p>
          </div>
          <div className="rounded-xl bg-card p-4">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-gold/20">
              <Diamond className="h-4 w-4 text-gold" />
            </div>
            <p className="text-xs text-muted-foreground">Diamonds Today</p>
            <p className="text-2xl font-bold text-foreground">--</p>
          </div>
          <div className="rounded-xl bg-card p-4">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-pink/20">
              <TrendingUp className="h-4 w-4 text-pink-400" />
            </div>
            <p className="text-xs text-muted-foreground">Revenue</p>
            <p className="text-2xl font-bold text-foreground">--</p>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="mb-8 rounded-xl bg-card p-6">
          <h2 className="mb-4 font-bold text-foreground">User Growth</h2>
          <div className="flex h-48 items-end gap-2">
            {[65, 45, 75, 55, 85, 70, 90].map((height, i) => (
              <div key={i} className="flex flex-1 flex-col items-center">
                <div
                  className="w-full rounded-t gradient-primary"
                  style={{ height: `${height}%` }}
                />
                <span className="mt-2 text-[10px] text-muted-foreground">
                  Day {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users Table */}
        <div className="mb-6 rounded-xl bg-card p-4 md:p-6">
          <h2 className="mb-4 font-bold text-foreground">Recent Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground">
                  <th className="pb-3 font-medium">User</th>
                  <th className="pb-3 font-medium">Level</th>
                  <th className="pb-3 font-medium">Diamonds</th>
                  <th className="pb-3 font-medium">Role</th>
                  <th className="pb-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="border-t border-border">
                    <td className="py-3 font-medium text-foreground">
                      {user.display_name || "Anonymous"}
                    </td>
                    <td className="py-3 text-muted-foreground">
                      Lv.{user.level}
                    </td>
                    <td className="py-3 text-gold">
                      {formatNumber(user.diamonds)}
                    </td>
                    <td className="py-3">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-medium",
                          user.role === "admin"
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {user.role || "user"}
                      </span>
                    </td>
                    <td className="py-3 text-xs text-muted-foreground">
                      {timeAgo(user.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Rooms Table */}
        <div className="rounded-xl bg-card p-4 md:p-6">
          <h2 className="mb-4 font-bold text-foreground">Recent Rooms</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground">
                  <th className="pb-3 font-medium">Room</th>
                  <th className="pb-3 font-medium">Host</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Viewers</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRooms.map((room) => (
                  <tr key={room.id} className="border-t border-border">
                    <td className="py-3 font-medium text-foreground">
                      {room.name}
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {(room.owner as any)?.display_name || "Unknown"}
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {formatCategory(room.category)}
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {formatNumber(room.viewer_count)}
                    </td>
                    <td className="py-3">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-medium",
                          room.is_live
                            ? "bg-green-500/20 text-green-400"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {room.is_live ? "LIVE" : "Ended"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
