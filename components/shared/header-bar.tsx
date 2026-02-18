"use client"

import { Bell, Diamond } from "lucide-react"

interface HeaderBarProps {
  diamonds: number
  onNotificationClick?: () => void
  onDiamondClick?: () => void
}

export function HeaderBar({ diamonds, onNotificationClick, onDiamondClick }: HeaderBarProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg"
          style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}
        >
          <span className="text-white font-bold text-sm">L</span>
        </div>
        <h1 className="text-lg font-bold text-white">LotChat</h1>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={onDiamondClick} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass">
          <Diamond className="w-3.5 h-3.5 text-[#FFD700]" />
          <span className="text-xs font-semibold text-[#FFD700]">
            {diamonds.toLocaleString()}
          </span>
        </button>

        <button
          onClick={onNotificationClick}
          className="relative flex items-center justify-center w-9 h-9 rounded-full glass"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 text-white" />
          <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-[#FF2D78] text-[8px] font-bold text-white">
            3
          </span>
        </button>
      </div>
    </header>
  )
}
