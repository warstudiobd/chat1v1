"use client"

import { countryFlags } from "@/lib/mock-data"

interface AvatarBadgeProps {
  name: string
  gradientClass: string
  size?: "sm" | "md" | "lg" | "xl"
  isOnline?: boolean
  inRoom?: boolean
  level?: number
  countryCode?: string
}

const sizeMap = {
  sm: "w-8 h-8 text-xs",
  md: "w-11 h-11 text-sm",
  lg: "w-16 h-16 text-lg",
  xl: "w-24 h-24 text-2xl",
}

export function AvatarBadge({
  name,
  gradientClass,
  size = "md",
  isOnline,
  inRoom,
  level,
  countryCode,
}: AvatarBadgeProps) {
  const initial = name.charAt(0).toUpperCase()

  return (
    <div className="relative inline-flex flex-shrink-0">
      <div
        className={`${sizeMap[size]} ${gradientClass} rounded-full flex items-center justify-center font-bold text-white`}
        style={
          inRoom
            ? { boxShadow: "0 0 0 2px #0A0A0F, 0 0 0 4px #10B981" }
            : undefined
        }
      >
        {initial}
      </div>

      {inRoom && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 text-[7px] font-bold text-white bg-[#10B981] rounded-full leading-none">
          IN ROOM
        </span>
      )}

      {!inRoom && isOnline && (
        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#10B981] border-2 border-[#0A0A0F]" />
      )}

      {countryCode && countryFlags[countryCode] && (
        <span className="absolute -bottom-0.5 -right-0.5 text-xs">
          {countryFlags[countryCode]}
        </span>
      )}

      {level && level > 0 && (
        <span
          className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full text-[8px] font-bold text-white"
          style={{
            background:
              level >= 30
                ? "linear-gradient(135deg, #FFD700, #FF6B35)"
                : level >= 20
                  ? "linear-gradient(135deg, #8B5CF6, #FF2D78)"
                  : "linear-gradient(135deg, #06B6D4, #8B5CF6)",
          }}
        >
          {level}
        </span>
      )}
    </div>
  )
}
