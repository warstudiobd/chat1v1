"use client"

import { useState } from "react"
import { Mic, Lock, Users, Search, Plus, Crown, Shield } from "lucide-react"
import { AvatarBadge } from "@/components/shared/avatar-badge"
import { mockVoiceRooms, formatNumber, getRoleBadgeColor } from "@/lib/mock-data"
import type { VoiceRoom } from "@/lib/mock-data"

interface RoomsScreenProps {
  onRoomClick?: (room: VoiceRoom) => void
}

function RoomCard({ room, onClick }: { room: VoiceRoom; onClick?: () => void }) {
  const filledSeats = room.seats.filter(s => s.user).length

  return (
    <button onClick={onClick} className="relative overflow-hidden rounded-2xl text-left w-full">
      <div className={`${room.coverGradient} aspect-[3/2] w-full flex flex-col justify-between p-3 relative`}>
        {/* Top row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {room.isLocked && (
              <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[rgba(0,0,0,0.5)] text-[8px] text-[#FFD700] font-bold">
                <Lock className="w-2.5 h-2.5" />
                LOCKED
              </span>
            )}
            {room.antiKickEnabled && (
              <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[rgba(0,0,0,0.5)] text-[8px] text-[#8B5CF6] font-bold">
                <Shield className="w-2.5 h-2.5" />
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[rgba(0,0,0,0.5)] text-[9px] text-white font-medium">
            <Users className="w-2.5 h-2.5" />
            {formatNumber(room.viewerCount)}
          </span>
        </div>

        {/* Seat avatars preview */}
        <div className="flex items-center gap-0.5">
          {room.seats.slice(0, 5).map((seat) => (
            <div key={seat.id} className="w-6 h-6 rounded-full border border-[rgba(255,255,255,0.3)] overflow-hidden">
              {seat.user ? (
                <div className={`w-full h-full ${seat.user.gradientClass} flex items-center justify-center text-[8px] font-bold text-white`}>
                  {seat.user.name.charAt(0)}
                </div>
              ) : (
                <div className="w-full h-full bg-[rgba(0,0,0,0.3)] flex items-center justify-center">
                  <Mic className="w-2.5 h-2.5 text-[rgba(255,255,255,0.3)]" />
                </div>
              )}
            </div>
          ))}
          {room.maxSeats > 5 && (
            <span className="text-[8px] text-white ml-0.5">+{room.maxSeats - 5}</span>
          )}
        </div>

        {/* Bottom info */}
        <div className="bg-gradient-to-t from-[rgba(0,0,0,0.85)] to-transparent -mx-3 -mb-3 px-3 pb-3 pt-4">
          <div className="flex items-center gap-2 mb-0.5">
            <AvatarBadge name={room.host.name} gradientClass={room.host.gradientClass} size="sm" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white leading-tight">{room.name}</span>
              <div className="flex items-center gap-1">
                <span className="text-[9px] text-[rgba(255,255,255,0.6)]">{room.host.name}</span>
                {(room.host.role === 'vip' || room.host.role === 'svip') && (
                  <span className="px-1 py-0 rounded text-[7px] font-black text-white" style={{ background: getRoleBadgeColor(room.host.role) }}>
                    {room.host.role.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-1 mt-1">
            {room.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-1.5 py-0.5 rounded-full bg-[rgba(255,255,255,0.1)] text-[8px] text-[rgba(255,255,255,0.7)]">
                {tag}
              </span>
            ))}
            <span className="px-1.5 py-0.5 rounded-full bg-[rgba(255,255,255,0.1)] text-[8px] text-[rgba(255,255,255,0.7)]">
              {filledSeats}/{room.maxSeats}
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}

export function RoomsScreen({ onRoomClick }: RoomsScreenProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "all", label: "All" },
    { id: "Chat", label: "Chat" },
    { id: "Music", label: "Music" },
    { id: "Party", label: "Party" },
    { id: "Karaoke", label: "Karaoke" },
    { id: "Dating", label: "Dating" },
    { id: "Gaming", label: "Gaming" },
  ]

  const filteredRooms = mockVoiceRooms.filter(room => {
    const matchCat = activeCategory === "all" || room.category === activeCategory
    const matchSearch = !searchQuery || room.name.toLowerCase().includes(searchQuery.toLowerCase()) || room.host.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch && room.isActive
  })

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="px-4 pt-2 pb-1">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[rgba(255,255,255,0.05)]">
          <Search className="w-4 h-4 text-[#8888AA]" />
          <input
            type="text"
            placeholder="Search voice rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-[#8888AA] outline-none"
          />
        </div>
      </div>

      {/* Create Room CTA */}
      <div className="px-4 py-2">
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-white font-bold text-sm" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>
          <Plus className="w-5 h-5" />
          Create Voice Room
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1 px-4 py-1 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium flex-shrink-0 transition-all ${activeCategory === cat.id ? "text-white" : "text-[#8888AA]"}`}
            style={activeCategory === cat.id ? { background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" } : { background: "rgba(255,255,255,0.05)" }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Active Banner */}
      <div className="flex items-center gap-2 mx-4 my-2 px-3 py-2 rounded-xl glass">
        <Mic className="w-4 h-4 text-[#FF2D78]" />
        <span className="text-xs text-[rgba(255,255,255,0.7)]">
          <span className="font-bold text-white">{formatNumber(mockVoiceRooms.reduce((sum, r) => sum + r.viewerCount, 0))}</span> people chatting now
        </span>
      </div>

      {/* Room Grid */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <div className="grid grid-cols-2 gap-2.5">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} onClick={() => onRoomClick?.(room)} />
          ))}
        </div>
      </div>
    </div>
  )
}
