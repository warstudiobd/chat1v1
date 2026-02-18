"use client"

import { useState } from "react"
import { Search, MessageCircle, MapPin, Crown, Shield, UserPlus } from "lucide-react"
import { mockUsers, countryFlags, formatNumber, getRoleBadgeColor } from "@/lib/mock-data"
import type { User } from "@/lib/mock-data"

interface DiscoverScreenProps {
  onUserClick?: (user: User) => void
  onMessage?: (user: User) => void
}

function UserCard({
  user,
  onMessage,
  onUserClick,
}: {
  user: User
  onMessage?: (user: User) => void
  onUserClick?: (user: User) => void
}) {
  return (
    <button
      onClick={() => onUserClick?.(user)}
      className="relative flex flex-col overflow-hidden rounded-2xl"
    >
      <div
        className={`${user.gradientClass} aspect-[3/4] w-full flex items-end relative`}
      >
        {user.isOnline && (
          <span className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full glass text-[9px] text-white font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            Online
          </span>
        )}

        {/* VIP/SVIP Badge */}
        {(user.role === "vip" || user.role === "svip") && (
          <span
            className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold text-white flex items-center gap-0.5"
            style={{ background: getRoleBadgeColor(user.role) }}
          >
            {user.role === "svip" ? <Crown className="w-2.5 h-2.5" /> : <Shield className="w-2.5 h-2.5" />}
            {user.role.toUpperCase()}
          </span>
        )}

        <div className="w-full p-2.5 bg-gradient-to-t from-[rgba(0,0,0,0.85)] via-[rgba(0,0,0,0.4)] to-transparent">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-white">{user.name}</span>
            <span className="text-xs text-[rgba(255,255,255,0.8)]">
              {user.age}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px]">
              {countryFlags[user.flag]}
            </span>
            <span className="text-[10px] text-[rgba(255,255,255,0.6)]">
              {user.country}
            </span>
            {user.distance && (
              <>
                <span className="text-[10px] text-[rgba(255,255,255,0.3)]">
                  |
                </span>
                <MapPin className="w-2.5 h-2.5 text-[rgba(255,255,255,0.5)]" />
                <span className="text-[10px] text-[rgba(255,255,255,0.5)]">
                  {user.distance}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span
              className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] font-bold text-white"
              style={{
                background:
                  user.level >= 30
                    ? "linear-gradient(135deg, #FFD700, #FF6B35)"
                    : "linear-gradient(135deg, #8B5CF6, #FF2D78)",
              }}
            >
              Lv.{user.level}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onMessage?.(user)
                }}
                className="flex items-center justify-center w-7 h-7 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #FF2D78, #8B5CF6)",
                }}
                aria-label={`Message ${user.name}`}
              >
                <MessageCircle className="w-3.5 h-3.5 text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation() }}
                className="flex items-center justify-center w-7 h-7 rounded-full glass"
                aria-label={`Follow ${user.name}`}
              >
                <UserPlus className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}

export function DiscoverScreen({ onUserClick, onMessage }: DiscoverScreenProps) {
  const [activeFilter, setActiveFilter] = useState("popular")
  const [searchQuery, setSearchQuery] = useState("")
  const filters = [
    { id: "popular", label: "Popular" },
    { id: "nearby", label: "Nearby" },
    { id: "new", label: "New" },
    { id: "online", label: "Online" },
    { id: "vip", label: "VIP" },
  ]

  const filteredUsers = mockUsers.filter((user) => {
    if (user.isBanned) return false
    if (searchQuery) {
      return user.name.toLowerCase().includes(searchQuery.toLowerCase())
    }
    switch (activeFilter) {
      case "online":
        return user.isOnline
      case "nearby":
        return user.distance !== undefined
      case "new":
        return user.level < 15
      case "vip":
        return user.role === "vip" || user.role === "svip"
      default:
        return true
    }
  })

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
              activeFilter === filter.id
                ? "text-white"
                : "text-[#8888AA]"
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
        <div className="grid grid-cols-2 gap-2.5">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onUserClick={onUserClick}
              onMessage={onMessage}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
