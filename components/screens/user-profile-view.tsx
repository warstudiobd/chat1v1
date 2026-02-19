"use client"

import { useState } from "react"
import { ArrowLeft, MessageCircle, UserPlus, UserCheck, Crown, Shield, Heart, Share2, MoreHorizontal, Flag, Ban } from "lucide-react"
import { AvatarBadge } from "@/components/shared/avatar-badge"
import { useProfile, useFollowCounts, useAuth, followUser, unfollowUser, getAvatarGradient } from "@/lib/supabase/hooks"
import { formatNumber, getRoleBadgeColor } from "@/lib/mock-data"
import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"

interface UserProfileViewProps {
  userId: string
  onBack: () => void
  onMessage: (userId: string) => void
}

function useIsFollowing(targetId?: string) {
  const { data: user } = useAuth()
  const supabase = createClient()
  return useSWR(
    user && targetId ? `is-following-${user.id}-${targetId}` : null,
    async () => {
      const { data } = await supabase
        .from("user_follows")
        .select("id")
        .eq("follower_id", user!.id)
        .eq("following_id", targetId!)
        .maybeSingle()
      return !!data
    }
  )
}

export function UserProfileView({ userId, onBack, onMessage }: UserProfileViewProps) {
  const { data: profile, isLoading } = useProfile(userId)
  const { data: followCounts } = useFollowCounts(userId)
  const { data: isFollowing, mutate: refreshFollow } = useIsFollowing(userId)
  const [showMenu, setShowMenu] = useState(false)
  const [followLoading, setFollowLoading] = useState(false)

  const handleToggleFollow = async () => {
    setFollowLoading(true)
    try {
      if (isFollowing) {
        await unfollowUser(userId)
      } else {
        await followUser(userId)
      }
      refreshFollow()
    } catch { /* ignore */ }
    setFollowLoading(false)
  }

  if (isLoading || !profile) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={onBack} className="w-9 h-9 rounded-full glass flex items-center justify-center" aria-label="Go back">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      </div>
    )
  }

  const displayName = profile.display_name ?? "User"
  const gradient = getAvatarGradient(displayName)
  const roleBadge = profile.is_svip ? "svip" : profile.is_vip ? "vip" : profile.role

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={onBack} className="w-9 h-9 rounded-full glass flex items-center justify-center" aria-label="Go back">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="w-9 h-9 rounded-full glass flex items-center justify-center" aria-label="More options">
            <MoreHorizontal className="w-5 h-5 text-white" />
          </button>
          {showMenu && (
            <div className="absolute top-12 right-0 w-40 rounded-xl glass-strong z-20 p-1.5">
              <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-white hover:bg-[rgba(255,255,255,0.05)]">
                <Share2 className="w-3.5 h-3.5" /> Share Profile
              </button>
              <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-[#EF4444] hover:bg-[rgba(255,255,255,0.05)]">
                <Flag className="w-3.5 h-3.5" /> Report User
              </button>
              <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-[#EF4444] hover:bg-[rgba(255,255,255,0.05)]">
                <Ban className="w-3.5 h-3.5" /> Block User
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center px-4 py-4">
        <AvatarBadge name={displayName} gradientClass={gradient} size="xl" level={profile.level} />
        <h2 className="text-xl font-bold text-white mt-3 text-balance">{displayName}</h2>
        <span className="text-xs text-muted-foreground mt-0.5">ID: {profile.id.substring(0, 8)}</span>

        {profile.is_online && (
          <span className="mt-1.5 flex items-center gap-1 text-[10px] text-[#10B981] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Online now
          </span>
        )}

        {(roleBadge === "vip" || roleBadge === "svip") && (
          <span className="mt-1.5 px-3 py-0.5 rounded-full text-[10px] font-black text-white" style={{ background: getRoleBadgeColor(roleBadge) }}>
            {roleBadge.toUpperCase()} MEMBER
          </span>
        )}

        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold text-white mt-2"
          style={{ background: profile.level >= 30 ? "linear-gradient(135deg, #FFD700, #FF6B35)" : "linear-gradient(135deg, #8B5CF6, #FF2D78)" }}>
          Lv.{profile.level}
        </span>

        {profile.bio && <p className="text-sm text-[rgba(255,255,255,0.6)] mt-2 text-center max-w-[280px] text-pretty">{profile.bio}</p>}
        {profile.country && <span className="text-[10px] text-muted-foreground mt-1">{profile.country}</span>}

        {/* Stats */}
        <div className="flex items-center gap-8 mt-5">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-white">{formatNumber(followCounts?.followers ?? 0)}</span>
            <span className="text-[10px] text-muted-foreground">Followers</span>
          </div>
          <div className="w-px h-8 bg-[rgba(255,255,255,0.1)]" />
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-white">{formatNumber(followCounts?.following ?? 0)}</span>
            <span className="text-[10px] text-muted-foreground">Following</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-5 w-full max-w-[300px]">
          <button
            onClick={handleToggleFollow}
            disabled={followLoading}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-50"
            style={{ background: isFollowing ? "rgba(255,255,255,0.08)" : "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}
          >
            {isFollowing ? <UserCheck className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            {isFollowing ? "Following" : "Follow"}
          </button>
          <button
            onClick={() => onMessage(userId)}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white glass"
          >
            <MessageCircle className="w-4 h-4" /> Message
          </button>
          <button className="w-11 h-11 rounded-xl glass flex items-center justify-center flex-shrink-0">
            <Heart className="w-4 h-4 text-[#FF2D78]" />
          </button>
        </div>
      </div>

      {/* Gifts Received section - placeholder */}
      <div className="mx-4 mt-4 p-4 rounded-2xl glass">
        <h3 className="text-sm font-semibold text-white mb-3">Recent Activity</h3>
        <p className="text-xs text-muted-foreground text-center py-4">No recent activity to show</p>
      </div>
    </div>
  )
}
