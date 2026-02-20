"use client"

import {
  Home,
  Compass,
  Mic,
  MessageCircle,
  User,
} from "lucide-react"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "discover", label: "Discover", icon: Compass },
  { id: "rooms", label: "Rooms", icon: Mic },
  { id: "messages", label: "Messages", icon: MessageCircle },
  { id: "profile", label: "Profile", icon: User },
]

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="flex items-center justify-around px-2 py-1 border-t border-[rgba(255,255,255,0.06)] bg-[#0A0A0F]">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        const isRooms = tab.id === "rooms"

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex flex-col items-center gap-0.5 py-1.5 px-3 transition-colors relative"
            aria-label={tab.label}
          >
            {isRooms ? (
              <div className="relative">
                <div
                  className="flex items-center justify-center w-11 h-11 -mt-4 rounded-full"
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, #FF2D78, #8B5CF6)"
                      : "linear-gradient(135deg, #FF2D78, #FF6B9D)",
                  }}
                >
                  <tab.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            ) : (
              <tab.icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? "text-[#FF2D78]" : "text-[#8888AA]"
                }`}
              />
            )}
            <span
              className={`text-[10px] font-medium transition-colors ${
                isRooms
                  ? "text-white -mt-0.5"
                  : isActive
                    ? "text-[#FF2D78]"
                    : "text-[#8888AA]"
              }`}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
