"use client";

import { useState } from "react";
import { User, Bell, Users, Diamond, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileView } from "@/components/profile/profile-view";
import { NotificationList } from "@/components/notifications/notification-list";
import { FriendsView } from "@/components/friends/friends-view";
import type { Profile } from "@/components/user-provider";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Alerts", icon: Bell },
  { id: "friends", label: "Friends", icon: Users },
  { id: "shop", label: "Shop", icon: Diamond },
  { id: "games", label: "Games", icon: Gamepad2 },
] as const;

type TabId = (typeof tabs)[number]["id"];

type Notification = {
  id: string;
  type: string;
  title: string;
  body: string | null;
  isRead: boolean;
  createdAt: string;
  fromUser: {
    id: string;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
};

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

type ProfileTabsProps = {
  profile: Profile | null;
  followerCount: number;
  followingCount: number;
  notifications: Notification[];
  friends: Friend[];
  pendingRequests: PendingRequest[];
  unreadCount: number;
  shopContent: React.ReactNode;
  gamesContent: React.ReactNode;
};

export function ProfileTabs({
  profile,
  followerCount,
  followingCount,
  notifications,
  friends,
  pendingRequests,
  unreadCount,
  shopContent,
  gamesContent,
}: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Tab Bar */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="flex items-center overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative flex flex-1 flex-col items-center gap-1 px-2 py-3 text-[11px] font-medium transition-colors min-w-[64px]",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="relative">
                  <tab.icon className="h-5 w-5" />
                  {tab.id === "notifications" && unreadCount > 0 && (
                    <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-pink px-1 text-[9px] font-bold text-foreground">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </div>
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full gradient-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1">
        {activeTab === "profile" && (
          <ProfileView
            profile={profile}
            followerCount={followerCount}
            followingCount={followingCount}
            isOwnProfile
          />
        )}

        {activeTab === "notifications" && (
          <NotificationList notifications={notifications} />
        )}

        {activeTab === "friends" && (
          <FriendsView friends={friends} pendingRequests={pendingRequests} />
        )}

        {activeTab === "shop" && shopContent}

        {activeTab === "games" && gamesContent}
      </div>
    </div>
  );
}
