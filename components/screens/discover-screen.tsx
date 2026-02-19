"use client"

import { useState } from "react"
import { Search, MessageCircle, MapPin, Crown, Shield, UserPlus, Loader2 } from "lucide-react"
import { useDiscoverUsers, followUser, getAvatarGradient, type Profile } from "@/lib/supabase/hooks"

interface DiscoverScreenProps {
  onMessage?: (userId: string) => void
}

function UserCard({ user, onMessage }: { user: Profile; onMessage?: (userId: string) => void }) {
  const [following, setFollowing] = useState(false)
  const gradient = user.avatar_url ? "" : getAvatarGradient(user.display_name ?? "U")
  const displayName = user.display_name ?? "User"
  const roleBadge = user.is_svip ? "svip" : user.is_vip ? "vip" : user.role

  const handleFollow = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (following) return
    setFollowing(true)
    try {
      await followUser(user.id)
    } catch { /* ignore */ }
  }

  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl">
      <div className={`${gradient || "bg-gradient-to-br from-pink-500 to-purple-600"} aspect-[3/4] w-full flex items-end relative`}>
        {user.avatar_url && (
          <img src={user.avatar_url} alt={displayName} className="absolute inset-0 w-full h-full object-cover" />
        )}
        {!user.avatar_url && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-white/60">{displayName.charAt(0).toUpperCase()}</span>
          </div>
        )}

        {user.is_online && (
          <span className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full glass text-[9px] text-white font-medium z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            Online
          </span>
        )}

        {(roleBadge === "vip" || roleBadge === "svip") && (
          <span
            className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold text-white flex items-center gap-0.5 z-10"
            style={{ background: roleBadge === "svip" ? "linear-gradient(135deg, #FF2D78, #8B5CF6)" : "linear-gradient(135deg, #FFD700, #FF6B35)" }}
          >
            {roleBadge === "svip" ? <Crown className="w-2.5 h-2.5" /> : <Shield className="w-2.5 h-2.5" />}
            {roleBadge.toUpperCase()}
          </span>
        )}

        <div className="w-full p-2.5 bg-gradient-to-t from-[rgba(0,0,0,0.85)] via-[rgba(0,0,0,0.4)] to-transparent relative z-10">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-white">{displayName}</span>
          </div>
          {user.country && (
            <span className="text-[10px] text-[rgba(255,255,255,0.6)]">{user.country}</span>
          )}
          <div className="flex items-center justify-between mt-1.5">
            <span
              className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] font-bold text-white"
              style={{
                background: user.level >= 30
                  ? "linear-gradient(135deg, #FFD700, #FF6B35)"
                  : "linear-gradient(135deg, #8B5CF6, #FF2D78)",
              }}
            >
              Lv.{user.level}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); onMessage?.(user.id) }}
                className="flex items-center justify-center w-7 h-7 rounded-full"
                style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}
                aria-label={`Message ${displayName}`}
              >
                <MessageCircle className="w-3.5 h-3.5 text-white" />
              </button>
              <button
                onClick={handleFollow}
                className={`flex items-center justify-center w-7 h-7 rounded-full ${following ? "bg-[rgba(16,185,129,0.2)]" : "glass"}`}
                aria-label={`Follow ${displayName}`}
              >
                {following ? (
                  <span className="text-[8px] text-[#10B981] font-bold">OK</span>
                ) : (
                  <UserPlus className="w-3.5 h-3.5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DiscoverScreen({ onMessage }: DiscoverScreenProps) {
  const [activeFilter, setActiveFilter] = useState("popular")
  const [searchQuery, setSearchQuery] = useState("")
  const { data: users, isLoading } = useDiscoverUsers(activeFilter, searchQuery)

  const filters = [
    { id: "popular", label: "Popular" },
    { id: "online", label: "Online" },
    { id: "new", label: "New" },
    { id: "vip", label: "VIP" },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="px-4 py-2">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl glass">
          <Search className="w-4 h-4 text-[#8888AA]" />
          <input
            type="text"
            placeholder="Search people..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-[#8888AA] outline-none"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 px-4 py-2 overflow-x-auto">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex-shrink-0 ${
              activeFilter === filter.id ? "text-white" : "text-[#8888AA]"
            }`}
            style={
              activeFilter === filter.id
                ? { background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }
                : { background: "rgba(255,255,255,0.05)" }
            }
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* User Grid */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-[#FF2D78] animate-spin" />
          </div>
        ) : !users || users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <span className="text-sm text-[#8888AA]">No users found</span>
            <span className="text-xs text-[#555]">Be the first to invite friends!</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {users.map((user) => (
              <UserCard key={user.id} user={user} onMessage={onMessage} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
