"use client"

import { useState } from "react"
import { Mic, Lock, Users, Search, Plus, Crown, Shield, Loader2, X } from "lucide-react"
import { AvatarBadge } from "@/components/shared/avatar-badge"
import { useVoiceRooms, createVoiceRoom, getAvatarGradient, type VoiceRoomRow } from "@/lib/supabase/hooks"
import { formatNumber } from "@/lib/mock-data"

interface RoomsScreenProps {
  onRoomClick?: (room: VoiceRoomRow) => void
}

const coverGradients = [
  "bg-gradient-to-br from-pink-600 to-purple-700",
  "bg-gradient-to-br from-cyan-600 to-blue-700",
  "bg-gradient-to-br from-orange-600 to-red-700",
  "bg-gradient-to-br from-green-600 to-teal-700",
  "bg-gradient-to-br from-indigo-600 to-violet-700",
  "bg-gradient-to-br from-rose-600 to-pink-700",
]

function getGradient(name: string) {
  const hash = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0)
  return coverGradients[hash % coverGradients.length]
}

function RoomCard({ room, onClick }: { room: VoiceRoomRow; onClick?: () => void }) {
  const hostName = room.host?.display_name ?? "Host"
  const hostGradient = getAvatarGradient(hostName)
  const isVip = room.host?.is_vip || room.host?.is_svip

  return (
    <button onClick={onClick} className="relative overflow-hidden rounded-2xl text-left w-full">
      <div className={`${getGradient(room.name)} aspect-[3/2] w-full flex flex-col justify-between p-3 relative`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {room.is_locked && (
              <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[rgba(0,0,0,0.5)] text-[8px] text-[#FFD700] font-bold">
                <Lock className="w-2.5 h-2.5" /> LOCKED
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[rgba(0,0,0,0.5)] text-[9px] text-white font-medium">
            <Users className="w-2.5 h-2.5" /> {formatNumber(room.viewer_count)}
          </span>
        </div>

        <div className="flex items-center gap-0.5">
          {Array.from({ length: Math.min(room.max_seats, 5) }).map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-full border border-[rgba(255,255,255,0.3)] bg-[rgba(0,0,0,0.3)] flex items-center justify-center">
              <Mic className="w-2.5 h-2.5 text-[rgba(255,255,255,0.3)]" />
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-t from-[rgba(0,0,0,0.85)] to-transparent -mx-3 -mb-3 px-3 pb-3 pt-4">
          <div className="flex items-center gap-2 mb-0.5">
            <AvatarBadge name={hostName} gradientClass={hostGradient} size="sm" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white leading-tight">{room.name}</span>
              <div className="flex items-center gap-1">
                <span className="text-[9px] text-[rgba(255,255,255,0.6)]">{hostName}</span>
                {isVip && (
                  <span className="px-1 py-0 rounded text-[7px] font-black text-white"
                    style={{ background: room.host?.is_svip ? "linear-gradient(135deg, #FF2D78, #8B5CF6)" : "linear-gradient(135deg, #FFD700, #FF6B35)" }}
                  >
                    {room.host?.is_svip ? "SVIP" : "VIP"}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-1 mt-1">
            {(room.tags ?? []).slice(0, 3).map((tag) => (
              <span key={tag} className="px-1.5 py-0.5 rounded-full bg-[rgba(255,255,255,0.1)] text-[8px] text-[rgba(255,255,255,0.7)]">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </button>
  )
}

function CreateRoomModal({ onClose, onCreate }: { onClose: () => void; onCreate: (room: VoiceRoomRow) => void }) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("Chat")
  const [creating, setCreating] = useState(false)

  const categories = ["Chat", "Music", "Party", "Karaoke", "Dating", "Gaming"]

  const handleCreate = async () => {
    if (!name.trim()) return
    setCreating(true)
    try {
      const room = await createVoiceRoom(name.trim(), category)
      onCreate(room)
    } catch { /* ignore */ }
    setCreating(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(0,0,0,0.6)]">
      <div className="w-full max-w-[430px] rounded-t-3xl glass-strong animate-slide-up">
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h3 className="text-base font-bold text-white">Create Voice Room</h3>
          <button onClick={onClose} aria-label="Close"><X className="w-5 h-5 text-[#8888AA]" /></button>
        </div>

        <div className="px-5 pb-2">
          <input
            type="text"
            placeholder="Room name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            className="w-full py-3 px-4 rounded-2xl glass text-sm text-white placeholder-[#8888AA] bg-transparent outline-none"
            autoFocus
          />
        </div>

        <div className="flex flex-wrap gap-2 px-5 py-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium ${category === cat ? "text-white" : "text-[#8888AA]"}`}
              style={category === cat ? { background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" } : { background: "rgba(255,255,255,0.05)" }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="px-5 pb-6 pt-2">
          <button
            onClick={handleCreate}
            disabled={!name.trim() || creating}
            className="w-full py-3 rounded-xl text-sm font-bold text-white disabled:opacity-40"
            style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}
          >
            {creating ? "Creating..." : "Create Room"}
          </button>
        </div>
      </div>
    </div>
  )
}

export function RoomsScreen({ onRoomClick }: RoomsScreenProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreate, setShowCreate] = useState(false)
  const { data: rooms, isLoading, mutate } = useVoiceRooms(activeCategory === "all" ? undefined : activeCategory)

  const categories = [
    { id: "all", label: "All" },
    { id: "Chat", label: "Chat" },
    { id: "Music", label: "Music" },
    { id: "Party", label: "Party" },
    { id: "Karaoke", label: "Karaoke" },
    { id: "Dating", label: "Dating" },
    { id: "Gaming", label: "Gaming" },
  ]

  const filteredRooms = searchQuery
    ? rooms?.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : rooms

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-2 pb-1">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[rgba(255,255,255,0.05)]">
          <Search className="w-4 h-4 text-[#8888AA]" />
          <input type="text" placeholder="Search voice rooms..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-transparent text-sm text-white placeholder-[#8888AA] outline-none" />
        </div>
      </div>

      <div className="px-4 py-2">
        <button onClick={() => setShowCreate(true)} className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-white font-bold text-sm" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>
          <Plus className="w-5 h-5" /> Create Voice Room
        </button>
      </div>

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

      <div className="flex-1 overflow-y-auto px-3 pb-4 mt-2">
        {isLoading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 text-[#FF2D78] animate-spin" /></div>
        ) : !filteredRooms || filteredRooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <Mic className="w-8 h-8 text-[#333]" />
            <span className="text-sm text-[#8888AA]">No rooms yet</span>
            <span className="text-xs text-[#555]">Be the first to create one!</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} onClick={() => onRoomClick?.(room)} />
            ))}
          </div>
        )}
      </div>

      {showCreate && (
        <CreateRoomModal
          onClose={() => setShowCreate(false)}
          onCreate={(room) => { setShowCreate(false); mutate(); onRoomClick?.(room) }}
        />
      )}
    </div>
  )
}
