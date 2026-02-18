"use client"

import { useState } from "react"
import { HeaderBar } from "@/components/shared/header-bar"
import { BottomNav } from "@/components/bottom-nav"
import { HomeScreen } from "@/components/screens/home-screen"
import { DiscoverScreen } from "@/components/screens/discover-screen"
import { RoomsScreen } from "@/components/screens/rooms-screen"
import { MessagesScreen } from "@/components/screens/messages-screen"
import { ProfileScreen } from "@/components/screens/profile-screen"
import { GamesScreen } from "@/components/screens/games-screen"
import { ShopScreen } from "@/components/screens/shop-screen"
import { VoiceRoomView } from "@/components/voice-room/voice-room-view"
import type { VoiceRoom } from "@/lib/mock-data"

export default function LotChatApp() {
  const [activeTab, setActiveTab] = useState("home")
  const [activeRoom, setActiveRoom] = useState<VoiceRoom | null>(null)
  const [showGames, setShowGames] = useState(false)
  const [showShop, setShowShop] = useState(false)
  const [myDiamonds, setMyDiamonds] = useState(24800)

  const handleRoomClick = (room: VoiceRoom) => {
    setActiveRoom(room)
  }

  // Full-screen voice room view
  if (activeRoom) {
    return <VoiceRoomView room={activeRoom} onClose={() => setActiveRoom(null)} />
  }

  // Full-screen games view
  if (showGames) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#050508]">
        <div className="relative w-full max-w-[430px] h-screen max-h-[932px] bg-background flex flex-col overflow-hidden">
          <GamesScreen
            diamonds={myDiamonds}
            onDiamondsChange={setMyDiamonds}
            onBack={() => setShowGames(false)}
          />
        </div>
      </div>
    )
  }

  // Full-screen shop view
  if (showShop) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#050508]">
        <div className="relative w-full max-w-[430px] h-screen max-h-[932px] bg-background flex flex-col overflow-hidden">
          <ShopScreen
            diamonds={myDiamonds}
            onDiamondsChange={setMyDiamonds}
            onBack={() => setShowShop(false)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#050508]">
      <div className="relative w-full max-w-[430px] h-screen max-h-[932px] bg-background flex flex-col overflow-hidden">
        {/* Header */}
        <HeaderBar diamonds={myDiamonds} onDiamondClick={() => setShowShop(true)} />

        {/* Screen Content */}
        <main className="flex-1 overflow-hidden">
          {activeTab === "home" && <HomeScreen onRoomClick={handleRoomClick} onGamesClick={() => setShowGames(true)} />}
          {activeTab === "discover" && <DiscoverScreen />}
          {activeTab === "rooms" && <RoomsScreen onRoomClick={handleRoomClick} />}
          {activeTab === "messages" && <MessagesScreen />}
          {activeTab === "profile" && <ProfileScreen />}
        </main>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  )
}
