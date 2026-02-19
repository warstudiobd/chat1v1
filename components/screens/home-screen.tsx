"use client"

import { useState } from "react"
import { Users, Calendar, Megaphone, ChevronRight, Lock, Mic } from "lucide-react"
import { mockEvents, mockAnnouncements, formatNumber, getRoleBadgeColor } from "@/lib/mock-data"
import { useVoiceRooms, useDiscoverUsers, getAvatarGradient, type VoiceRoomRow } from "@/lib/supabase/hooks"

interface HomeScreenProps {
  onRoomClick?: (room: VoiceRoomRow) => void
  onViewProfile?: (userId: string) => void
}

const coverGradients = [
  "bg-gradient-to-br from-pink-600 to-purple-700",
  "bg-gradient-to-br from-cyan-600 to-blue-700",
  "bg-gradient-to-br from-orange-600 to-red-700",
  "bg-gradient-to-br from-green-600 to-teal-700",
  "bg-gradient-to-br from-indigo-600 to-violet-700",
  "bg-gradient-to-br from-rose-600 to-pink-700",
]

function getCoverGradient(name: string) {
  const hash = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0)
  return coverGradients[hash % coverGradients.length]
}

function EventsSlider() {
  const activeEvents = mockEvents.filter(e => e.isActive)
  if (activeEvents.length === 0) return null
  return (
    <section className="px-4 mb-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-accent" /><h2 className="text-sm font-bold text-white">Events</h2></div>
        <button className="text-[10px] text-primary font-semibold">See All</button>
      </div>
      <div className="flex gap-2.5 overflow-x-auto pb-1 snap-x snap-mandatory">
        {activeEvents.map((event) => (
          <button key={event.id} className={`flex-shrink-0 w-[220px] snap-start ${event.gradientClass} rounded-2xl p-3.5 text-left`}>
            <span className="text-xs font-bold text-white block mb-1 text-balance">{event.title}</span>
            <p className="text-[9px] text-[rgba(255,255,255,0.7)] mb-2 line-clamp-2">{event.description}</p>
            <div className="flex items-center gap-2">
              <span className="text-[8px] text-[rgba(255,255,255,0.6)]">{formatNumber(event.participants)} joined</span>
              <span className="px-2 py-0.5 rounded-full bg-[rgba(0,0,0,0.3)] text-[8px] text-[#FFD700] font-bold">{event.reward.split("+")[0].trim()}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

function StoryBar({ onViewProfile }: { onViewProfile?: (userId: string) => void }) {
  const { data: onlineUsers } = useDiscoverUsers("online", "")
  const users = onlineUsers?.slice(0, 12) ?? []
  if (users.length === 0) return null
  return (
    <div className="flex gap-3 px-4 py-3 overflow-x-auto">
      {users.map((user) => {
        const name = user.display_name ?? "User"
        const gradient = getAvatarGradient(name)
        const roleBadge = user.is_svip ? "svip" : user.is_vip ? "vip" : null
        return (
          <button key={user.id} onClick={() => onViewProfile?.(user.id)} className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className="relative">
              <div className="w-14 h-14 rounded-full p-0.5" style={{ background: roleBadge === "svip" ? "linear-gradient(135deg, #FF2D78, #8B5CF6)" : roleBadge === "vip" ? "linear-gradient(135deg, #FFD700, #FF6B35)" : "rgba(255,255,255,0.1)" }}>
                <div className={`w-full h-full rounded-full ${gradient} flex items-center justify-center text-base font-bold text-white`}>
                  {name.charAt(0).toUpperCase()}
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#10B981] border-2 border-background" />
              {roleBadge && (
                <span className="absolute -top-0.5 -right-0.5 px-1 rounded text-[5px] font-black text-white" style={{ background: getRoleBadgeColor(roleBadge) }}>
                  {roleBadge.toUpperCase()}
                </span>
              )}
            </div>
            <span className="text-[9px] text-muted-foreground font-medium max-w-[56px] truncate">{name}</span>
          </button>
        )
      })}
    </div>
  )
}

function AnnouncementBanner() {
  const active = mockAnnouncements.filter(a => a.isActive)
  const [current, setCurrent] = useState(0)
  if (active.length === 0) return null
  const a = active[current % active.length]
  const typeColors: Record<string, string> = { info: "#3B82F6", warning: "#F59E0B", promo: "#FF2D78", update: "#10B981" }
  return (
    <div className="mx-4 mb-3 px-3 py-2.5 rounded-xl glass" style={{ borderLeft: `3px solid ${typeColors[a.type]}` }}>
      <div className="flex items-center gap-2">
        <Megaphone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: typeColors[a.type] }} />
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold text-white">{a.title}</span>
          <p className="text-[9px] text-muted-foreground truncate">{a.message}</p>
        </div>
        {active.length > 1 && (
          <button onClick={() => setCurrent(c => c + 1)} className="text-[8px] text-primary font-bold flex-shrink-0">
            {current % active.length + 1}/{active.length}
          </button>
        )}
      </div>
    </div>
  )
}

function PopularRooms({ onRoomClick }: { onRoomClick?: (room: VoiceRoomRow) => void }) {
  const { data: rooms } = useVoiceRooms()
  const topRooms = (rooms ?? []).slice(0, 6)

  if (topRooms.length === 0) {
    return (
      <section className="px-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-white">Popular Rooms</h2>
        </div>
        <div className="flex items-center justify-center py-8 rounded-2xl glass">
          <div className="text-center">
            <Mic className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
            <span className="text-xs text-muted-foreground">No rooms yet. Create one!</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="px-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-bold text-white">Popular Rooms</h2>
        <button className="flex items-center gap-0.5 text-[10px] text-primary font-semibold">See All <ChevronRight className="w-3 h-3" /></button>
      </div>
      <div className="flex gap-2.5 overflow-x-auto pb-1">
        {topRooms.map((room) => {
          const hostName = room.host?.display_name ?? "Host"
          return (
            <button key={room.id} onClick={() => onRoomClick?.(room)} className="flex-shrink-0 w-[140px] rounded-2xl overflow-hidden text-left">
              <div className={`${getCoverGradient(room.name)} aspect-[4/3] relative flex flex-col justify-end p-2`}>
                <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[rgba(0,0,0,0.5)]">
                  <Users className="w-2.5 h-2.5 text-white" />
                  <span className="text-[8px] text-white font-medium">{formatNumber(room.viewer_count)}</span>
                </div>
                {room.is_locked && <Lock className="absolute top-2 left-2 w-3 h-3 text-[#FFD700]" />}
                <div className="bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent -mx-2 -mb-2 px-2 pb-2 pt-3">
                  <span className="text-[10px] font-bold text-white block truncate">{room.name}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[8px] text-[rgba(255,255,255,0.6)]">{hostName}</span>
                    {(room.host?.is_vip || room.host?.is_svip) && (
                      <span className="px-0.5 rounded text-[5px] font-black text-white" style={{ background: getRoleBadgeColor(room.host?.is_svip ? "svip" : "vip") }}>{room.host?.is_svip ? "SVIP" : "VIP"}</span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export function HomeScreen({ onRoomClick, onViewProfile }: HomeScreenProps) {
  return (
    <div className="flex flex-col h-full overflow-y-auto pb-2">
      <EventsSlider />
      <StoryBar onViewProfile={onViewProfile} />
      <AnnouncementBanner />
      <PopularRooms onRoomClick={onRoomClick} />
    </div>
  )
}
