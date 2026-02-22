"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Settings,
  Edit3,
  Diamond,
  Coins,
  Users,
  UserPlus,
  LogOut,
  Crown,
  MessageCircle,
  UserCheck,
} from "lucide-react";
import { UserAvatar } from "@/components/user-avatar";
import { LevelBadge } from "@/components/level-badge";
import { VipBadge } from "@/components/vip-badge";
import { formatNumber, calculateLevel } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/components/user-provider";

type ProfileViewProps = {
  profile: Profile | null;
  followerCount: number;
  followingCount: number;
  isOwnProfile: boolean;
  isFollowing?: boolean;
  isFriend?: boolean;
};

export function ProfileView({
  profile,
  followerCount,
  followingCount,
  isOwnProfile,
  isFollowing,
  isFriend,
}: ProfileViewProps) {
  const router = useRouter();

  if (!profile) return null;

  const { progress } = calculateLevel(profile.xp);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur-md">
        <h1 className="text-lg font-bold text-foreground">
          {isOwnProfile ? "My Profile" : profile.display_name || "Profile"}
        </h1>
        {isOwnProfile && (
          <button
            onClick={handleLogout}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </button>
        )}
      </header>

      {/* Profile Card */}
      <div className="flex flex-col items-center gap-4 px-4 py-8">
        <UserAvatar
          src={profile.avatar_url}
          name={profile.display_name}
          size="xl"
        />
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-foreground">
              {profile.display_name || "User"}
            </h2>
            <LevelBadge level={profile.level} />
            <VipBadge isVip={profile.is_vip} isSvip={profile.is_svip} />
          </div>
          {profile.bio && (
            <p className="max-w-xs text-center text-sm text-muted-foreground">
              {profile.bio}
            </p>
          )}
          {profile.country && (
            <span className="text-xs text-muted-foreground">
              {profile.country}
            </span>
          )}
        </div>

        {/* Level Progress */}
        <div className="w-full max-w-xs">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">
              Level {profile.level}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full gradient-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-2 px-4">
        <div className="flex flex-col items-center gap-1 rounded-xl bg-card p-3">
          <Diamond className="h-5 w-5 text-gold" />
          <span className="text-sm font-bold text-foreground">
            {formatNumber(profile.diamonds)}
          </span>
          <span className="text-[10px] text-muted-foreground">Diamonds</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-xl bg-card p-3">
          <Coins className="h-5 w-5 text-green-400" />
          <span className="text-sm font-bold text-foreground">
            {formatNumber(profile.beans)}
          </span>
          <span className="text-[10px] text-muted-foreground">Beans</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-xl bg-card p-3">
          <Users className="h-5 w-5 text-primary" />
          <span className="text-sm font-bold text-foreground">
            {formatNumber(followerCount)}
          </span>
          <span className="text-[10px] text-muted-foreground">Followers</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-xl bg-card p-3">
          <UserPlus className="h-5 w-5 text-pink" />
          <span className="text-sm font-bold text-foreground">
            {formatNumber(followingCount)}
          </span>
          <span className="text-[10px] text-muted-foreground">Following</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 px-4 py-6">
        {isOwnProfile ? (
          <>
            <Link
              href="/profile/edit"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm font-medium text-foreground hover:bg-muted"
            >
              <Edit3 className="h-4 w-4" />
              Edit Profile
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium text-destructive hover:bg-muted"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl gradient-primary py-3 text-sm font-semibold text-primary-foreground">
              {isFollowing ? (
                <>
                  <UserCheck className="h-4 w-4" />
                  Following
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  Follow
                </>
              )}
            </button>
            <Link
              href={`/messages/${profile.id}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium text-foreground hover:bg-muted"
            >
              <MessageCircle className="h-4 w-4" />
              Message
            </Link>
          </>
        )}
      </div>

      {/* VIP Section */}
      {(profile.is_vip || profile.is_svip) && (
        <div className="mx-4 mb-6 flex items-center gap-3 rounded-2xl bg-card p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-gold">
            <Crown className="h-6 w-6 text-background" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gold">
              {profile.is_svip ? "SVIP Member" : "VIP Member"}
            </span>
            {profile.vip_expiry && (
              <span className="text-xs text-muted-foreground">
                Expires: {new Date(profile.vip_expiry).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
