"use client"

import { useState, useEffect, useRef } from "react"
import { Search, ArrowLeft, Send, Smile, Gift, Loader2 } from "lucide-react"
import { AvatarBadge } from "@/components/shared/avatar-badge"
import {
  useAuth, useConversations, useChatMessages, useProfile,
  sendMessage, markMessagesRead, getAvatarGradient, timeAgo,
  type Profile,
} from "@/lib/supabase/hooks"

interface MessagesScreenProps {
  initialPartnerId?: string | null
  onClearPartner?: () => void
}

function ChatRoom({ partnerId, onBack }: { partnerId: string; onBack: () => void }) {
  const { data: user } = useAuth()
  const { data: partner } = useProfile(partnerId)
  const { data: messages, mutate } = useChatMessages(partnerId)
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const displayName = partner?.display_name ?? "User"
  const gradient = getAvatarGradient(displayName)

  useEffect(() => {
    if (partnerId) markMessagesRead(partnerId)
  }, [partnerId, messages])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || sending) return
    setSending(true)
    try {
      await sendMessage(partnerId, input.trim())
      setInput("")
      mutate()
    } catch { /* ignore */ }
    setSending(false)
  }

  return (
    <div className="flex flex-col h-full bg-[#0A0A0F]">
      {/* Header */}
      <div className="flex items-center gap-3 px-3 py-3 border-b border-[rgba(255,255,255,0.06)]">
        <button onClick={onBack} aria-label="Back to messages">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <AvatarBadge name={displayName} gradientClass={gradient} size="sm" isOnline={partner?.is_online} />
        <div className="flex-1 flex flex-col">
          <span className="text-sm font-semibold text-white">{displayName}</span>
          <span className="text-[10px] text-[#8888AA]">
            {partner?.is_online ? "Online" : partner?.last_seen ? `Last seen ${timeAgo(partner.last_seen)}` : "Offline"}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2.5">
        {!messages ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-5 h-5 text-[#FF2D78] animate-spin" /></div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-1">
            <span className="text-sm text-[#8888AA]">No messages yet</span>
            <span className="text-xs text-[#555]">Say hello!</span>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender_id === user?.id
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl ${isMe ? "rounded-br-sm" : "rounded-bl-sm"}`}
                  style={isMe ? { background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" } : { background: "rgba(255,255,255,0.08)" }}
                >
                  <p className="text-sm text-white leading-relaxed">{msg.content}</p>
                  <span className="text-[9px] text-[rgba(255,255,255,0.5)] mt-1 block text-right">
                    {timeAgo(msg.created_at)}
                  </span>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center px-3 py-2 rounded-full glass">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-sm text-white placeholder-[#8888AA] outline-none"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || sending}
            className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0 disabled:opacity-40"
            style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}
            aria-label="Send message"
          >
            {sending ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
          </button>
        </div>
      </div>
    </div>
  )
}

export function MessagesScreen({ initialPartnerId, onClearPartner }: MessagesScreenProps) {
  const [activePartnerId, setActivePartnerId] = useState<string | null>(initialPartnerId ?? null)
  const [searchQuery, setSearchQuery] = useState("")
  const { data: conversations, isLoading } = useConversations()

  useEffect(() => {
    if (initialPartnerId) setActivePartnerId(initialPartnerId)
  }, [initialPartnerId])

  if (activePartnerId) {
    return (
      <ChatRoom
        partnerId={activePartnerId}
        onBack={() => { setActivePartnerId(null); onClearPartner?.() }}
      />
    )
  }

  const filtered = searchQuery
    ? conversations?.filter((c) =>
        c.partner?.display_name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex items-center gap-1 px-4 py-2">
        <span className="px-4 py-1.5 rounded-full text-xs font-medium text-white" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>
          Chats
        </span>
      </div>

      {/* Search */}
      <div className="px-4 py-2">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl glass">
          <Search className="w-4 h-4 text-[#8888AA]" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-[#8888AA] outline-none"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-5 h-5 text-[#FF2D78] animate-spin" /></div>
        ) : !filtered || filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <span className="text-sm text-[#8888AA]">No conversations yet</span>
            <span className="text-xs text-[#555]">Discover people and start chatting!</span>
          </div>
        ) : (
          filtered.map((convo) => {
            const name = convo.partner?.display_name ?? "User"
            return (
              <button
                key={convo.partner?.id}
                onClick={() => setActivePartnerId(convo.partner?.id ?? "")}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[rgba(255,255,255,0.03)] transition-colors w-full"
              >
                <AvatarBadge
                  name={name}
                  gradientClass={getAvatarGradient(name)}
                  size="md"
                  isOnline={convo.partner?.is_online}
                />
                <div className="flex-1 flex flex-col items-start min-w-0">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm font-semibold text-white">{name}</span>
                    <span className="text-[10px] text-[#8888AA]">{timeAgo(convo.lastMessage.created_at)}</span>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs text-[#8888AA] truncate max-w-[200px]">{convo.lastMessage.content}</span>
                    {convo.unread > 0 && (
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#FF2D78] text-[9px] font-bold text-white flex-shrink-0">
                        {convo.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
