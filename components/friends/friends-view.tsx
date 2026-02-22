"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { LevelBadge } from "@/components/level-badge";
import {
  Search,
  UserPlus,
  MessageCircle,
  Check,
  X,
} from "lucide-react";

type Friend = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  level: number;
  is_online: boolean;
  bio: string | null;
};

type PendingRequest = {
  id: string;
  user: {
    id: string;
    display_name: string | null;
    avatar_url: string | null;
    level: number;
  };
};

type Props = {
  friends: Friend[];
  pendingRequests: PendingRequest[];
};

const tabs = ["online", "all", "pending"] as const;

export function FriendsView({ friends, pendingRequests }: Props) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("online");
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filtered = friends.filter((f) => {
    const matchesSearch = f.display_name
      ?.toLowerCase()
      .includes(search.toLowerCase());
    if (activeTab === "online") return matchesSearch && f.is_online;
    return matchesSearch;
  });

  const onlineCount = friends.filter((f) => f.is_online).length;

  return (
    <div className="p-4">
      <div className="mx-auto max-w-lg">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Friends</h2>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary"
            aria-label="Add friend"
          >
            <UserPlus className="h-5 w-5 text-primary-foreground" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search friends..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-input bg-card py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>

        {/* Tabs */}
        <div className="mb-4 flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 rounded-xl py-2.5 text-sm font-medium capitalize transition-colors",
                activeTab === tab
                  ? "gradient-primary text-primary-foreground"
                  : "bg-card text-muted-foreground"
              )}
            >
              {tab}
              {tab === "online" && onlineCount > 0 && (
                <span className="ml-1 text-xs opacity-70">
                  ({onlineCount})
                </span>
              )}
              {tab === "pending" && pendingRequests.length > 0 && (
                <span className="ml-1 text-xs opacity-70">
                  ({pendingRequests.length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Friends List */}
        {activeTab !== "pending" && (
          <div className="flex flex-col gap-2">
            {filtered.length === 0 ? (
              <p className="py-12 text-center text-sm text-muted-foreground">
                {activeTab === "online"
                  ? "No friends online right now"
                  : "No friends yet"}
              </p>
            ) : (
              filtered.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center gap-3 rounded-xl bg-card p-3"
                >
                  <div className="relative">
                    <UserAvatar
                      src={friend.avatar_url}
                      name={friend.display_name}
                      size="md"
                    />
                    <span
                      className={cn(
                        "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card",
                        friend.is_online ? "bg-green-500" : "bg-muted-foreground/40"
                      )}
                    />
                  </div>
                  <div className="flex flex-1 flex-col overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold text-foreground">
                        {friend.display_name || "User"}
                      </span>
                      <LevelBadge level={friend.level} />
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {friend.is_online
                        ? "Online"
                        : friend.bio || "Offline"}
                    </p>
                  </div>
                  <button
                    onClick={() => router.push(`/messages/${friend.id}`)}
                    className="rounded-xl bg-muted px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Pending Requests */}
        {activeTab === "pending" && (
          <div className="flex flex-col gap-2">
            {pendingRequests.length === 0 ? (
              <p className="py-12 text-center text-sm text-muted-foreground">
                No pending friend requests
              </p>
            ) : (
              <>
                <h2 className="mb-1 text-sm font-bold text-foreground">
                  Friend Requests ({pendingRequests.length})
                </h2>
                {pendingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center justify-between rounded-xl bg-card p-3"
                  >
                    <div className="flex items-center gap-3">
                      <UserAvatar
                        src={req.user.avatar_url}
                        name={req.user.display_name}
                        size="sm"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {req.user.display_name || "User"}
                        </span>
                        <LevelBadge level={req.user.level} />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 text-green-400"
                        aria-label="Accept"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/20 text-destructive"
                        aria-label="Decline"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
