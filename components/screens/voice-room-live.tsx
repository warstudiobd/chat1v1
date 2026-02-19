"use client"

import { useState, useRef, useEffect } from "react"
import { X, Mic, MicOff, Lock, Unlock, Shield, Crown, Gift, Gamepad2, MoreHorizontal, Heart, Users, ChevronDown } from "lucide-react"
import { GiftPanel, GiftEffectOverlay } from "@/components/gift-effects"
import { formatNumber, getRoleBadgeColor } from "@/lib/mock-data"
import { useAuth, useProfile, getAvatarGradient, sendGift } from "@/lib/supabase/hooks"
import type { VoiceRoomRow } from "@/lib/supabase/hooks"
import type { Gift as GiftType } from "@/lib/mock-data"
import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"

interface VoiceRoomLiveViewProps {
  room: VoiceRoomRow
  onClose: () => void
  onViewProfile: (userId: string) => void
  onGames: () => void
  diamonds: number
  onDiamondsChange: () => void
}

interface RoomMessage {
  id: string
  userId: string
  userName: string
  text: string
  type: "chat" | "join" | "gift" | "system"
  roleBadge?: string
  level?: number
}

function useRoomSeats(roomId: string) {
  const supabase = createClient()
  return useSWR(`room-seats-${roomId}`, async () => {
    const { data } = await supabase
      .from("room_seats")
      .select("*, user:profiles!room_seats_user_id_fkey(*)")
      .eq("room_id", roomId)
      .order("seat_index", { ascending: true })
    return data ?? []
  }, { refreshInterval: 5000 })
}

function SeatSlot({ seat, index, onTap }: { seat: any; index: number; onTap: () => void }) {
  const isHost = index === 0
  const user = seat?.user

  return (
    <button onClick={onTap} className="flex flex-col items-center gap-1">
      <div className="relative">
        {seat?.is_locked ? (
          <div className="w-14 h-14 rounded-full bg-[rgba(255,255,255,0.05)] border border-dashed border-[rgba(255,255,255,0.15)] flex items-center justify-center">
            <Lock className="w-4 h-4 text-muted-foreground" />
          </div>
        ) : user ? (
          <>
            <div className={`w-14 h-14 rounded-full ${getAvatarGradient(user.display_name ?? "U")} flex items-center justify-center text-lg font-bold text-white ${isHost ? "ring-2 ring-[#FFD700]" : ""}`}>
              {(user.display_name ?? "U").charAt(0).toUpperCase()}
            </div>
            {(user.is_vip || user.is_svip) && (
              <span className="absolute -top-1 -right-1 px-1 py-0 rounded text-[6px] font-black text-white" style={{ background: getRoleBadgeColor(user.is_svip ? "svip" : "vip") }}>
                {user.is_svip ? "SVIP" : "VIP"}
              </span>
            )}
            {isHost && (
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 px-1.5 py-0 rounded-full bg-[#FFD700] text-[7px] font-black text-[#0A0A0F]">HOST</span>
            )}
          </>
        ) : (
          <div className="w-14 h-14 rounded-full bg-[rgba(255,255,255,0.05)] border border-dashed border-[rgba(255,255,255,0.1)] flex items-center justify-center">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </div>
        )}
      </div>
      <span className="text-[9px] text-muted-foreground font-medium max-w-[60px] truncate">
        {seat?.is_locked ? "Locked" : user ? (user.display_name ?? "User") : `Seat ${index + 1}`}
      </span>
    </button>
  )
}

export function VoiceRoomLiveView({ room, onClose, onViewProfile, onGames, diamonds, onDiamondsChange }: VoiceRoomLiveViewProps) {
  const { data: currentUser } = useAuth()
  const { data: hostProfile } = useProfile(room.host_id)
  const { data: seats } = useRoomSeats(room.id)
  const [showGiftPanel, setShowGiftPanel] = useState(false)
  const [activeGiftEffect, setActiveGiftEffect] = useState<GiftType | null>(null)
  const [isRoomLocked, setIsRoomLocked] = useState(room.is_locked)
  const [isMuted, setIsMuted] = useState(true)
  const [showRoomSettings, setShowRoomSettings] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const chatRef = useRef<HTMLDivElement>(null)

  const [chatMessages, setChatMessages] = useState<RoomMessage[]>([
    { id: "sys1", userId: "", userName: "System", text: `Welcome to ${room.name}!`, type: "system" },
  ])

  useEffect(() => {
    if (currentUser && hostProfile) {
      setChatMessages(prev => [
        ...prev,
        { id: `join-${Date.now()}`, userId: currentUser.id, userName: "You", text: "joined the room", type: "join" }
      ])
    }
  }, [currentUser, hostProfile])

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" })
  }, [chatMessages])

  const handleSendGift = (gift: GiftType) => {
    setActiveGiftEffect(gift)
    setShowGiftPanel(false)
    setChatMessages(prev => [...prev, {
      id: `gift-${Date.now()}`,
      userId: currentUser?.id ?? "",
      userName: "You",
      text: `sent a ${gift.name} to ${hostProfile?.display_name ?? "Host"}`,
      type: "gift",
    }])
    if (room.host_id && gift.price) {
      sendGift(room.host_id, gift.id, gift.price, room.id).then(() => onDiamondsChange()).catch(() => {})
    }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    setChatMessages(prev => [...prev, {
      id: `msg-${Date.now()}`,
      userId: currentUser?.id ?? "",
      userName: "You",
      text: newMessage,
      type: "chat",
    }])
    setNewMessage("")
  }

  const hostName = hostProfile?.display_name ?? room.host?.display_name ?? "Host"
  const hostGradient = getAvatarGradient(hostName)

  // Build seat grid: use real DB seats if available, otherwise create empty slots
  const maxSeats = room.max_seats || 8
  const seatSlots = Array.from({ length: maxSeats }).map((_, i) => {
    const dbSeat = seats?.find((s: any) => s.seat_index === i)
    if (i === 0 && !dbSeat) {
      return { user: hostProfile ?? room.host, is_locked: false, seat_index: 0 }
    }
    return dbSeat ?? null
  })

  return (
    <div className="flex flex-col h-full relative">
      <style jsx>{`@keyframes sound-wave { 0% { height: 2px; } 100% { height: 8px; } }`}</style>

      {activeGiftEffect && activeGiftEffect.effect !== "none" && (
        <GiftEffectOverlay gift={activeGiftEffect} onComplete={() => setActiveGiftEffect(null)} />
      )}

      {/* Room Header */}
      <div className="flex items-center justify-between px-4 py-3 z-10">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <button onClick={() => onViewProfile(room.host_id)} className={`w-9 h-9 rounded-full ${hostGradient} flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}>
            {hostName.charAt(0).toUpperCase()}
          </button>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-white truncate">{room.name}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground">{hostName}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                <Users className="w-2.5 h-2.5" /> {formatNumber(room.viewer_count)}
              </span>
              {isRoomLocked && <Lock className="w-2.5 h-2.5 text-[#FFD700]" />}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowRoomSettings(!showRoomSettings)} className="w-8 h-8 rounded-full glass flex items-center justify-center" aria-label="Room settings">
            <MoreHorizontal className="w-4 h-4 text-white" />
          </button>
          <button onClick={onClose} className="w-8 h-8 rounded-full glass flex items-center justify-center" aria-label="Close room">
            <ChevronDown className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Settings Dropdown */}
      {showRoomSettings && (
        <div className="absolute top-16 right-4 z-20 w-48 rounded-2xl glass-strong p-2 animate-fade-in">
          <button onClick={() => { setIsRoomLocked(!isRoomLocked); setShowRoomSettings(false) }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white hover:bg-[rgba(255,255,255,0.05)]">
            {isRoomLocked ? <Unlock className="w-4 h-4 text-[#10B981]" /> : <Lock className="w-4 h-4 text-[#FFD700]" />}
            {isRoomLocked ? "Unlock Room" : "Lock Room"}
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white hover:bg-[rgba(255,255,255,0.05)]">
            <Shield className="w-4 h-4 text-[#8B5CF6]" /> Anti-Kick Mode
          </button>
          <button onClick={() => { setShowRoomSettings(false); onGames() }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white hover:bg-[rgba(255,255,255,0.05)]">
            <Gamepad2 className="w-4 h-4 text-[#F59E0B]" /> Room Games
          </button>
        </div>
      )}

      {/* VIP Banner */}
      <div className="mx-4 mb-2 flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: "linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,45,120,0.1))" }}>
        <Crown className="w-3.5 h-3.5 text-[#FFD700]" />
        <span className="text-[10px] text-[#FFD700] font-medium">SVIP members enjoy anti-kick protection & room lock</span>
      </div>

      {/* Seats Grid */}
      <div className="px-4 py-3">
        <div className="grid grid-cols-4 gap-y-3 gap-x-2 justify-items-center">
          {seatSlots.map((seat, i) => (
            <SeatSlot
              key={i}
              seat={seat}
              index={i}
              onTap={() => {
                const uid = seat?.user?.id
                if (uid) onViewProfile(uid)
              }}
            />
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-1 px-4 mb-2">
        {(room.tags ?? []).slice(0, 4).map(tag => (
          <span key={tag} className="px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.05)] text-[9px] text-muted-foreground">{tag}</span>
        ))}
      </div>

      {/* Chat */}
      <div ref={chatRef} className="flex-1 overflow-y-auto px-4 pb-2">
        {chatMessages.map((msg) => (
          <div key={msg.id} className="flex items-start gap-2 mb-2">
            {msg.type === "system" ? (
              <div className="w-full text-center">
                <span className="text-[10px] text-muted-foreground px-3 py-1 rounded-full bg-[rgba(255,255,255,0.03)]">{msg.text}</span>
              </div>
            ) : (
              <>
                <div className={`w-6 h-6 rounded-full ${getAvatarGradient(msg.userName)} flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0`}>
                  {msg.userName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[10px] font-bold text-primary">{msg.userName}</span>
                  </div>
                  <span className={`text-xs ${msg.type === "join" ? "text-[#06B6D4]" : msg.type === "gift" ? "text-[#FFD700]" : "text-[rgba(255,255,255,0.8)]"}`}>
                    {msg.type === "join" && ">> "}{msg.text}
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Action Bar */}
      {!showGiftPanel && (
        <div className="flex items-center gap-2 px-4 py-3 border-t border-border bg-[#0A0A0F]">
          <div className="flex-1 flex items-center px-3 py-2 rounded-full glass">
            <input
              type="text"
              placeholder="Say something..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 bg-transparent text-xs text-white placeholder-muted-foreground outline-none"
            />
          </div>
          <button onClick={() => setIsMuted(!isMuted)} className={`w-10 h-10 rounded-full flex items-center justify-center ${isMuted ? "bg-[rgba(239,68,68,0.2)]" : "glass"}`} aria-label={isMuted ? "Unmute" : "Mute"}>
            {isMuted ? <MicOff className="w-4 h-4 text-[#EF4444]" /> : <Mic className="w-4 h-4 text-white" />}
          </button>
          <button onClick={() => setShowGiftPanel(true)} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }} aria-label="Send gift">
            <Gift className="w-4 h-4 text-white" />
          </button>
          <button className="w-10 h-10 rounded-full glass flex items-center justify-center" aria-label="Like">
            <Heart className="w-4 h-4 text-[#FF2D78]" />
          </button>
        </div>
      )}

      {showGiftPanel && (
        <GiftPanel onSendGift={handleSendGift} onClose={() => setShowGiftPanel(false)} diamonds={diamonds} />
      )}
    </div>
  )
}
