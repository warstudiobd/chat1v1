"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Settings,
  Edit3,
  Coins,
  Users,
  UserPlus,
  LogOut,
  Crown,
  MessageCircle,
  UserCheck,
  Gift,
  Heart,
  Star,
} from "lucide-react";
import { UserAvatar } from "@/components/user-avatar";
import { LevelBadge } from "@/components/level-badge";
import { VipBadge } from "@/components/vip-badge";
import { formatNumber, calculateLevel, isVipActive, isSvipActive } from "@/lib/utils";
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
    <div className="flex flex-col gradient-chamet min-h-screen">
      {/* Header background */}
      <div
        className="relative flex flex-col items-center gap-3 px-4 pt-10 pb-6"
        style={{ background: "linear-gradient(180deg, hsl(280 50% 25%) 0%, transparent 100%)" }}
      >
        {/* Settings */}
        {isOwnProfile && (
          <Link
            href="/profile/edit"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full glass text-muted-foreground"
            aria-label="Settings"
          >
            <Settings className="h-4 w-4" />
          </Link>
        )}

        {/* Avatar with ring */}
        <div className="relative">
          <div
            className="rounded-full p-[3px]"
            style={{ background: "linear-gradient(135deg, hsl(330,80%,60%), hsl(270,80%,60%))" }}
          >
            <div className="rounded-full border-2 border-background">
              <UserAvatar src={profile.avatar_url} name={profile.display_name} size="xl" />
            </div>
          </div>
          {/* Level badge on avatar */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
            <LevelBadge level={profile.level} />
          </div>
        </div>

        {/* Name + badges */}
        <div className="flex flex-col items-center gap-1 mt-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-foreground">{profile.display_name || "User"}</h2>
            <VipBadge isVip={isVipActive(profile.vip_expiry)} isSvip={isSvipActive(profile.svip_expiry)} />
          </div>
          <span className="text-xs text-muted-foreground">
            {"ID: "}
            {profile.id.slice(0, 8)}
          </span>
          {profile.bio && (
            <p className="max-w-xs text-center text-sm text-muted-foreground mt-1">{profile.bio}</p>
          )}
          {profile.country && (
            <span className="text-[10px] text-muted-foreground">{profile.country}</span>
          )}
        </div>

        {/* Level progress bar */}
        <div className="w-full max-w-xs mt-1">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">Lv.{profile.level}</span>
            <span className="text-[10px] text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full gradient-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 px-4 -mt-1">
        <div className="flex flex-col items-center gap-1 rounded-xl glass p-3">
          <Coins className="h-5 w-5 text-gold" />
          <span className="text-sm font-bold text-foreground">{formatNumber(profile.diamonds)}</span>
          <span className="text-[9px] text-muted-foreground">Coins</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-xl glass p-3">
          <Gift className="h-5 w-5 text-pink" />
          <span className="text-sm font-bold text-foreground">{formatNumber(profile.beans)}</span>
          <span className="text-[9px] text-muted-foreground">Beans</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-xl glass p-3">
          <Heart className="h-5 w-5 text-destructive" />
          <span className="text-sm font-bold text-foreground">{formatNumber(followerCount)}</span>
          <span className="text-[9px] text-muted-foreground">Followers</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-xl glass p-3">
          <Star className="h-5 w-5 text-cyan" />
          <span className="text-sm font-bold text-foreground">{formatNumber(followingCount)}</span>
          <span className="text-[9px] text-muted-foreground">Following</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 px-4 py-5">
        {isOwnProfile ? (
          <>
            <Link
              href="/profile/edit"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl glass py-3 text-sm font-medium text-foreground hover:bg-white/10"
            >
              <Edit3 className="h-4 w-4" />
              Edit Profile
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 rounded-xl glass px-6 py-3 text-sm font-medium text-destructive hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" />
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
              className="flex items-center justify-center gap-2 rounded-xl glass px-6 py-3 text-sm font-medium text-foreground hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
            </Link>
          </>
        )}
      </div>

      {/* VIP Section */}
      {(isVipActive(profile.vip_expiry) || isSvipActive(profile.svip_expiry)) && (
        <div className="mx-4 mb-4 flex items-center gap-3 rounded-2xl glass p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-gold">
            <Crown className="h-6 w-6 text-background" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gold">
              {isSvipActive(profile.svip_expiry) ? "SVIP Member" : "VIP Member"}
            </span>
            {profile.vip_expiry && (
              <span className="text-xs text-muted-foreground">
                {"Expires: "}
                {new Date(profile.vip_expiry).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="mx-4 mb-4 grid grid-cols-3 gap-2">
        <Link href="/shop" className="flex flex-col items-center gap-1.5 rounded-xl glass p-3 hover:bg-white/10">
          <Coins className="h-5 w-5 text-gold" />
          <span className="text-[10px] font-medium text-foreground">Recharge</span>
        </Link>
        <Link href="/friends" className="flex flex-col items-center gap-1.5 rounded-xl glass p-3 hover:bg-white/10">
          <Users className="h-5 w-5 text-cyan" />
          <span className="text-[10px] font-medium text-foreground">Friends</span>
        </Link>
        <Link href="/shop" className="flex flex-col items-center gap-1.5 rounded-xl glass p-3 hover:bg-white/10">
          <Crown className="h-5 w-5 text-pink" />
          <span className="text-[10px] font-medium text-foreground">VIP Center</span>
        </Link>
      </div>
    </div>
  );
}
