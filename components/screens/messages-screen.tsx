"use client"

import { useState } from "react"
import {
  Search,
  Phone,
  Mic,
  ArrowLeft,
  Send,
  Image,
  Smile,
  Gift,
} from "lucide-react"
import { AvatarBadge } from "@/components/shared/avatar-badge"
import { mockConversations } from "@/lib/mock-data"
import type { Conversation, User } from "@/lib/mock-data"

interface MessagesScreenProps {
  onVoiceCall?: (user: User) => void
}

function ConversationItem({
  conversation,
  onClick,
}: {
  conversation: Conversation
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 hover:bg-[rgba(255,255,255,0.03)] transition-colors w-full"
    >
      <AvatarBadge
        name={conversation.user.name}
        gradientClass={conversation.user.gradientClass}
        size="md"
        isOnline={conversation.user.isOnline}
      />
      <div className="flex-1 flex flex-col items-start min-w-0">
        <div className="flex items-center justify-between w-full">
          <span className="text-sm font-semibold text-white">
            {conversation.user.name}
          </span>
          <span className="text-[10px] text-[#8888AA]">
            {conversation.lastMessageTime}
          </span>
        </div>
        <div className="flex items-center justify-between w-full">
          <span className="text-xs text-[#8888AA] truncate max-w-[200px]">
            {conversation.lastMessage}
          </span>
          {conversation.unreadCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#FF2D78] text-[9px] font-bold text-white flex-shrink-0">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

function ChatRoom({
  conversation,
  onBack,
  onVoiceCall,
}: {
  conversation: Conversation
  onBack: () => void
  onVoiceCall?: (user: User) => void
}) {
  const [messageInput, setMessageInput] = useState("")

  return (
    <div className="flex flex-col h-full bg-[#0A0A0F]">
      {/* Header */}
      <div className="flex items-center gap-3 px-3 py-3 border-b border-[rgba(255,255,255,0.06)]">
        <button onClick={onBack} aria-label="Back to messages">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <AvatarBadge
          name={conversation.user.name}
          gradientClass={conversation.user.gradientClass}
          size="sm"
          isOnline={conversation.user.isOnline}
        />
        <div className="flex-1 flex flex-col">
          <span className="text-sm font-semibold text-white">
            {conversation.user.name}
          </span>
          <span className="text-[10px] text-[#8888AA]">
            {conversation.user.isOnline ? "Online" : "Offline"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)]"
            aria-label="Voice call"
          >
            <Phone className="w-4 h-4 text-[#8888AA]" />
          </button>
          <button
            onClick={() => onVoiceCall?.(conversation.user)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)]"
            aria-label="Voice call"
          >
            <Mic className="w-4 h-4 text-[#8888AA]" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2.5">
        {conversation.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl ${
                msg.isMe
                  ? "rounded-br-sm"
                  : "rounded-bl-sm"
              }`}
              style={
                msg.isMe
                  ? { background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }
                  : { background: "rgba(255,255,255,0.08)" }
              }
            >
              <p className="text-sm text-white leading-relaxed">{msg.text}</p>
              <span className="text-[9px] text-[rgba(255,255,255,0.5)] mt-1 block text-right">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="px-3 py-3 border-t border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-2">
          <button
            className="flex-shrink-0"
            aria-label="Add emoji"
          >
            <Smile className="w-5 h-5 text-[#8888AA]" />
          </button>
          <button
            className="flex-shrink-0"
            aria-label="Send image"
          >
            <Image className="w-5 h-5 text-[#8888AA]" />
          </button>
          <button
            className="flex-shrink-0"
            aria-label="Send gift"
          >
            <Gift className="w-5 h-5 text-[#FFD700]" />
          </button>
          <div className="flex-1 flex items-center px-3 py-2 rounded-full glass">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-sm text-white placeholder-[#8888AA] outline-none"
            />
          </div>
          <button
            className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #FF2D78, #8B5CF6)",
            }}
            aria-label="Send message"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function MessagesScreen({ onVoiceCall }: MessagesScreenProps) {
  const [activeConvo, setActiveConvo] = useState<Conversation | null>(null)
  const [activeTab, setActiveTab] = useState("chats")
  const [searchQuery, setSearchQuery] = useState("")

  const tabs = [
    { id: "chats", label: "Chats" },
    { id: "calls", label: "Calls" },
    { id: "friends", label: "Friends" },
  ]

  if (activeConvo) {
    return (
      <ChatRoom
        conversation={activeConvo}
        onBack={() => setActiveConvo(null)}
        onVoiceCall={onVoiceCall}
      />
    )
  }

  const filteredConversations = searchQuery
    ? mockConversations.filter((c) =>
        c.user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockConversations

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex items-center gap-1 px-4 py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === tab.id
                ? "text-white"
                : "text-[#8888AA]"
            }`}
            style={
              activeTab === tab.id
                ? { background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }
                : { background: "rgba(255,255,255,0.05)" }
            }
          >
            {tab.label}
          </button>
        ))}
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
        {filteredConversations.map((convo) => (
          <ConversationItem
            key={convo.id}
            conversation={convo}
            onClick={() => setActiveConvo(convo)}
          />
        ))}
      </div>
    </div>
  )
}
