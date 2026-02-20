"use client"

import { useState, useEffect, useCallback } from "react"
import { X, Mic, MicOff, Lock, Unlock, Shield, Crown, Gift, Gamepad2, MoreHorizontal, Heart, Volume2, Users, MessageCircle, ChevronDown } from "lucide-react"
import { GiftPanel, GiftEffectOverlay } from "@/components/gift-effects"
import { formatNumber, getRoleBadgeColor, mockUsers } from "@/lib/mock-data"
import type { VoiceRoom, VoiceRoomSeat, Gift as GiftType, User } from "@/lib/mock-data"

interface VoiceRoomViewProps {
  room: VoiceRoom
  onClose: () => void
}

interface ChatMessage {
  id: string
  user: User
  text: string
  type: "chat" | "join" | "gift" | "system"
}

function SeatItem({ seat, index, onTap }: { seat: VoiceRoomSeat; index: number; onTap: () => void }) {
  const seatPositions = [
    "col-start-2 row-start-1", // host center top
    "col-start-1 row-start-2", // left 1
    "col-start-3 row-start-2", // right 1
    "col-start-1 row-start-3", // left 2
    "col-start-3 row-start-3", // right 2
    "col-start-2 row-start-3", // center bottom
    "col-start-1 row-start-4", // left 3
    "col-start-3 row-start-4", // right 3
  ]

  const isHost = index === 0

  return (
    <button onClick={onTap} className={`flex flex-col items-center gap-1 ${seatPositions[index] || ""}`}>
      <div className="relative">
        {seat.isLocked ? (
          <div className="w-14 h-14 rounded-full bg-[rgba(255,255,255,0.05)] border border-dashed border-[rgba(255,255,255,0.15)] flex items-center justify-center">
            <Lock className="w-4 h-4 text-[#8888AA]" />
          </div>
        ) : seat.user ? (
          <>
            <div className={`w-14 h-14 rounded-full ${seat.user.gradientClass} flex items-center justify-center text-lg font-bold text-white ${isHost ? "ring-2 ring-[#FFD700]" : ""}`}
              style={seat.user.role === 'svip' ? { boxShadow: '0 0 12px rgba(255,45,120,0.4)' } : seat.user.role === 'vip' ? { boxShadow: '0 0 12px rgba(255,215,0,0.3)' } : {}}>
              {seat.user.name.charAt(0)}
            </div>
            {/* Role indicator */}
            {(seat.user.role === 'vip' || seat.user.role === 'svip') && (
              <span className="absolute -top-1 -right-1 px-1 py-0 rounded text-[6px] font-black text-white" style={{ background: getRoleBadgeColor(seat.user.role) }}>
                {seat.user.role.toUpperCase()}
              </span>
            )}
            {isHost && (
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 px-1.5 py-0 rounded-full bg-[#FFD700] text-[7px] font-black text-[#0A0A0F]">
                HOST
              </span>
            )}
            {/* Mic indicator */}
            {seat.isMuted && (
              <span className="absolute bottom-3 -right-1 w-4 h-4 rounded-full bg-[#EF4444] flex items-center justify-center">
                <MicOff className="w-2.5 h-2.5 text-white" />
              </span>
            )}
            {/* Anti-kick shield */}
            {seat.user.antiKick && (
              <span className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-[rgba(139,92,246,0.8)] flex items-center justify-center">
                <Shield className="w-2.5 h-2.5 text-white" />
              </span>
            )}
            {/* Sound wave animation */}
            {!seat.isMuted && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-end gap-px">
                {[0.5, 0.8, 0.4].map((h, i) => (
                  <div key={i} className="w-0.5 bg-[#10B981] rounded-full" style={{ height: `${h * 8}px`, animation: `sound-wave 0.6s ${i * 0.1}s ease-in-out infinite alternate` }} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-14 h-14 rounded-full bg-[rgba(255,255,255,0.05)] border border-dashed border-[rgba(255,255,255,0.1)] flex items-center justify-center">
            <Plus className="w-4 h-4 text-[#8888AA]" />
          </div>
        )}
      </div>
      <span className="text-[9px] text-[#8888AA] font-medium max-w-[60px] truncate">
        {seat.isLocked ? "Locked" : seat.user ? seat.user.name : `Seat ${index + 1}`}
      </span>
    </button>
  )
}

function Plus({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  )
}

export function VoiceRoomView({ room, onClose }: VoiceRoomViewProps) {
  const [showGiftPanel, setShowGiftPanel] = useState(false)
  const [activeGiftEffect, setActiveGiftEffect] = useState<GiftType | null>(null)
  const [myDiamonds] = useState(24800)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', user: room.host, text: `Welcome to ${room.name}!`, type: 'system' },
    { id: '2', user: mockUsers[1], text: 'joined the room', type: 'join' },
    { id: '3', user: mockUsers[7], text: 'Hey everyone!', type: 'chat' },
    { id: '4', user: mockUsers[10], text: 'Awesome vibes here', type: 'chat' },
    { id: '5', user: mockUsers[4], text: `sent a Crown to ${room.host.name}`, type: 'gift' },
    { id: '6', user: mockUsers[8], text: 'Love this room!', type: 'chat' },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [showRoomSettings, setShowRoomSettings] = useState(false)
  const [isRoomLocked, setIsRoomLocked] = useState(room.isLocked)
  const [isMuted, setIsMuted] = useState(false)

  const handleSendGift = useCallback((gift: GiftType) => {
    setActiveGiftEffect(gift)
    setShowGiftPanel(false)
    setChatMessages(prev => [...prev, {
      id: `msg-${Date.now()}`,
      user: mockUsers[15],
      text: `sent a ${gift.name} to ${room.host.name}`,
      type: 'gift',
    }])
  }, [room.host.name])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    setChatMessages(prev => [...prev, {
      id: `msg-${Date.now()}`,
      user: mockUsers[15],
      text: newMessage,
      type: 'chat',
    }])
    setNewMessage("")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050508]">
      <div className="relative w-full max-w-[430px] h-screen max-h-[932px] bg-background flex flex-col overflow-hidden">
        <style jsx>{`
          @keyframes sound-wave {
            0% { height: 2px; }
            100% { height: 8px; }
          }
        `}</style>

        {/* Gift Effect Overlay */}
        {activeGiftEffect && activeGiftEffect.effect !== 'none' && (
          <GiftEffectOverlay gift={activeGiftEffect} onComplete={() => setActiveGiftEffect(null)} />
        )}

        {/* Room Header */}
        <div className="flex items-center justify-between px-4 py-3 z-10">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className={`w-9 h-9 rounded-full ${room.host.gradientClass} flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}>
              {room.host.name.charAt(0)}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-white truncate">{room.name}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-[#8888AA]">{room.host.name}</span>
                <span className="w-1 h-1 rounded-full bg-[#8888AA]" />
                <span className="flex items-center gap-0.5 text-[10px] text-[#8888AA]">
                  <Users className="w-2.5 h-2.5" /> {formatNumber(room.viewerCount)}
                </span>
                {isRoomLocked && <Lock className="w-2.5 h-2.5 text-[#FFD700]" />}
                {room.antiKickEnabled && <Shield className="w-2.5 h-2.5 text-[#8B5CF6]" />}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowRoomSettings(!showRoomSettings)} className="w-8 h-8 rounded-full glass flex items-center justify-center">
              <MoreHorizontal className="w-4 h-4 text-white" />
            </button>
            <button onClick={onClose} className="w-8 h-8 rounded-full glass flex items-center justify-center">
              <ChevronDown className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Room Settings Dropdown */}
        {showRoomSettings && (
          <div className="absolute top-16 right-4 z-20 w-48 rounded-2xl glass-strong p-2 animate-fade-in">
            <button
              onClick={() => { setIsRoomLocked(!isRoomLocked); setShowRoomSettings(false) }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white hover:bg-[rgba(255,255,255,0.05)]"
            >
              {isRoomLocked ? <Unlock className="w-4 h-4 text-[#10B981]" /> : <Lock className="w-4 h-4 text-[#FFD700]" />}
              {isRoomLocked ? "Unlock Room" : "Lock Room"}
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white hover:bg-[rgba(255,255,255,0.05)]">
              <Shield className="w-4 h-4 text-[#8B5CF6]" />
              Anti-Kick Mode
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white hover:bg-[rgba(255,255,255,0.05)]">
              <Gamepad2 className="w-4 h-4 text-[#F59E0B]" />
              Room Games
            </button>
          </div>
        )}

        {/* VIP/SVIP Banner */}
        <div className="mx-4 mb-2 flex items-center gap-2 px-3 py-1.5 rounded-xl overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,45,120,0.1))" }}>
          <Crown className="w-3.5 h-3.5 text-[#FFD700]" />
          <span className="text-[10px] text-[#FFD700] font-medium">SVIP members enjoy anti-kick protection & room lock</span>
        </div>

        {/* Seats Grid */}
        <div className="px-4 py-3">
          <div className="grid grid-cols-3 gap-y-3 gap-x-2 justify-items-center">
            {room.seats.map((seat, i) => (
              <SeatItem key={seat.id} seat={seat} index={i} onTap={() => {}} />
            ))}
          </div>
        </div>

        {/* Room Tags */}
        <div className="flex items-center gap-1 px-4 mb-2">
          {room.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.05)] text-[9px] text-[#8888AA]">{tag}</span>
          ))}
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-4 pb-2">
          {chatMessages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-2 mb-2">
              {msg.type === 'system' ? (
                <div className="w-full text-center">
                  <span className="text-[10px] text-[#8888AA] px-3 py-1 rounded-full bg-[rgba(255,255,255,0.03)]">{msg.text}</span>
                </div>
              ) : (
                <>
                  <div className={`w-6 h-6 rounded-full ${msg.user.gradientClass} flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0`}>
                    {msg.user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-[10px] font-bold" style={{ color: getRoleBadgeColor(msg.user.role) }}>{msg.user.name}</span>
                      {(msg.user.role === 'vip' || msg.user.role === 'svip') && (
                        <span className="px-1 rounded text-[6px] font-black text-white" style={{ background: getRoleBadgeColor(msg.user.role) }}>
                          {msg.user.role.toUpperCase()}
                        </span>
                      )}
                      {msg.user.level > 0 && (
                        <span className="px-1 rounded text-[6px] font-bold text-white bg-[rgba(139,92,246,0.3)]">Lv.{msg.user.level}</span>
                      )}
                    </div>
                    <span className={`text-xs ${msg.type === 'join' ? "text-[#06B6D4]" : msg.type === 'gift' ? "text-[#FFD700]" : "text-[rgba(255,255,255,0.8)]"}`}>
                      {msg.type === 'join' && '>> '}{msg.text}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Action Bar */}
        {!showGiftPanel && (
          <div className="flex items-center gap-2 px-4 py-3 border-t border-[rgba(255,255,255,0.06)] bg-[#0A0A0F]">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-full bg-[rgba(255,255,255,0.05)]">
              <input
                type="text"
                placeholder="Say something..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 bg-transparent text-xs text-white placeholder-[#8888AA] outline-none"
              />
            </div>
            <button onClick={() => setIsMuted(!isMuted)} className={`w-10 h-10 rounded-full flex items-center justify-center ${isMuted ? "bg-[rgba(239,68,68,0.2)]" : "glass"}`}>
              {isMuted ? <MicOff className="w-4 h-4 text-[#EF4444]" /> : <Mic className="w-4 h-4 text-white" />}
            </button>
            <button onClick={() => setShowGiftPanel(true)} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>
              <Gift className="w-4 h-4 text-white" />
            </button>
            <button className="w-10 h-10 rounded-full glass flex items-center justify-center">
              <Heart className="w-4 h-4 text-[#FF2D78]" />
            </button>
          </div>
        )}

        {/* Gift Panel */}
        {showGiftPanel && (
          <GiftPanel onSendGift={handleSendGift} onClose={() => setShowGiftPanel(false)} diamonds={myDiamonds} />
        )}
      </div>
    </div>
  )
}
