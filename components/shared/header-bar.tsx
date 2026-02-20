"use client"

import Image from "next/image"
import { Bell } from "lucide-react"

interface HeaderBarProps {
  onNotificationClick?: () => void
}

export function HeaderBar({ onNotificationClick }: HeaderBarProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-1.5">
        <Image src="/logo.png" alt="LotChat" width={36} height={36} className="rounded-lg" />
        <h1 className="text-lg font-bold text-white">LotChat</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onNotificationClick}
          className="relative flex items-center justify-center w-9 h-9 rounded-full glass"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 text-white" />
          <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-primary text-[8px] font-bold text-white">
            3
          </span>
        </button>
      </div>
    </header>
  )
}
