"use client"

import { useEffect, useState } from "react"
import { HeaderBar } from "@/components/shared/header-bar"
import { BottomNav } from "@/components/bottom-nav"
import { HomeScreen } from "@/components/screens/home-screen"
import { DiscoverScreen } from "@/components/screens/discover-screen"
import { RoomsScreen } from "@/components/screens/rooms-screen"
import { MessagesScreen } from "@/components/screens/messages-screen"
import { ProfileScreen } from "@/components/screens/profile-screen"
import { GamesScreen } from "@/components/screens/games-screen"
import { ShopScreen } from "@/components/screens/shop-screen"
import { UserProfileView } from "@/components/screens/user-profile-view"
import { VoiceRoomLiveView } from "@/components/screens/voice-room-live"
import { useAuth, useMyProfile, setOnlineStatus } from "@/lib/supabase/hooks"
import type { VoiceRoomRow } from "@/lib/supabase/hooks"

export default function LotChatApp() {
  const { data: user, isLoading: authLoading } = useAuth()
  const { data: profile, mutate: refreshProfile } = useMyProfile()
  const [activeTab, setActiveTab] = useState("home")
  const [showGames, setShowGames] = useState(false)
  const [showShop, setShowShop] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<VoiceRoomRow | null>(null)
  const [chatPartnerId, setChatPartnerId] = useState<string | null>(null)
  const [viewUserId, setViewUserId] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    setOnlineStatus(true)
    const interval = setInterval(() => setOnlineStatus(true), 60000)
    const handleBeforeUnload = () => setOnlineStatus(false)
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      clearInterval(interval)
      window.removeEventListener("beforeunload", handleBeforeUnload)
      setOnlineStatus(false)
    }
  }, [user])

  if (authLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>
            <svg className="w-6 h-6 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
          </div>
          <span className="text-sm text-muted-foreground">Loading LotChat...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    if (typeof window !== "undefined") window.location.href = "/auth/login"
    return null
  }

  const myDiamonds = profile?.diamonds ?? 0

  // User Profile View (full screen overlay)
  if (viewUserId) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#050508]">
        <div className="relative w-full max-w-[430px] h-screen max-h-[932px] bg-background flex flex-col overflow-hidden">
          <UserProfileView
            userId={viewUserId}
            onBack={() => setViewUserId(null)}
            onMessage={(id) => { setViewUserId(null); setChatPartnerId(id); setActiveTab("messages") }}
          />
        </div>
      </div>
    )
  }

  // Voice Room Live View (full screen overlay)
  if (selectedRoom) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#050508]">
        <div className="relative w-full max-w-[430px] h-screen max-h-[932px] bg-background flex flex-col overflow-hidden">
          <VoiceRoomLiveView
            room={selectedRoom}
            onClose={() => setSelectedRoom(null)}
            onViewProfile={(id) => { setViewUserId(id) }}
            onGames={() => setShowGames(true)}
            diamonds={myDiamonds}
            onDiamondsChange={() => refreshProfile()}
          />
        </div>
      </div>
    )
  }

  // Games
  if (showGames) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#050508]">
        <div className="relative w-full max-w-[430px] h-screen max-h-[932px] bg-background flex flex-col overflow-hidden">
          <GamesScreen diamonds={myDiamonds} onDiamondsChange={() => refreshProfile()} onBack={() => setShowGames(false)} />
        </div>
      </div>
    )
  }

  // Shop
  if (showShop) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#050508]">
        <div className="relative w-full max-w-[430px] h-screen max-h-[932px] bg-background flex flex-col overflow-hidden">
          <ShopScreen diamonds={myDiamonds} onDiamondsChange={() => refreshProfile()} onBack={() => setShowShop(false)} />
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#050508]">
      <div className="relative w-full max-w-[430px] h-screen max-h-[932px] bg-background flex flex-col overflow-hidden">
        {activeTab !== "messages" && (
          <HeaderBar onNotificationClick={() => {}} onDiamondClick={() => setShowShop(true)} />
        )}
        <main className="flex-1 overflow-hidden">
          {activeTab === "home" && (
            <HomeScreen
              onRoomClick={(room) => setSelectedRoom(room)}
              onViewProfile={(id) => setViewUserId(id)}
            />
          )}
          {activeTab === "discover" && (
            <DiscoverScreen
              onMessage={(userId) => { setChatPartnerId(userId); setActiveTab("messages") }}
              onViewProfile={(id) => setViewUserId(id)}
            />
          )}
          {activeTab === "rooms" && (
            <RoomsScreen onRoomClick={(room) => setSelectedRoom(room)} />
          )}
          {activeTab === "messages" && (
            <MessagesScreen
              initialPartnerId={chatPartnerId}
              onClearPartner={() => setChatPartnerId(null)}
              onViewProfile={(id) => setViewUserId(id)}
            />
          )}
          {activeTab === "profile" && (
            <ProfileScreen
              onGames={() => setShowGames(true)}
              onShop={() => setShowShop(true)}
            />
          )}
        </main>
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  )
}
