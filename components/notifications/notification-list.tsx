"use client";

import { cn, timeAgo } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { Bell, Gift, UserPlus, Info } from "lucide-react";

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

const typeIcons: Record<string, typeof Bell> = {
  gift: Gift,
  friend: UserPlus,
  system: Info,
};

export function NotificationList({
  notifications,
}: {
  notifications: Notification[];
}) {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20">
        <Bell className="h-12 w-12 text-muted-foreground/30" />
        <p className="text-sm text-muted-foreground">No notifications yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {notifications.map((notif) => {
        const Icon = typeIcons[notif.type] || Bell;
        return (
          <div
            key={notif.id}
            className={cn(
              "flex items-start gap-3 border-b border-border px-4 py-3 transition-colors",
              !notif.isRead && "bg-primary/5"
            )}
          >
            {notif.fromUser ? (
              <UserAvatar
                src={notif.fromUser.avatar_url}
                name={notif.fromUser.display_name}
                size="sm"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20">
                <Icon className="h-4 w-4 text-primary" />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="text-sm font-semibold text-foreground">
                {notif.title}
              </span>
              {notif.body && (
                <span className="text-xs text-muted-foreground">
                  {notif.body}
                </span>
              )}
              <span className="text-[10px] text-muted-foreground">
                {timeAgo(notif.createdAt)}
              </span>
            </div>
            {!notif.isRead && (
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
            )}
          </div>
        );
      })}
    </div>
  );
}
