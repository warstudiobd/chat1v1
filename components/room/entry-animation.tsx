"use client";

import { useEffect, useState } from "react";

type EntryAnimationProps = {
  userName: string;
  vipLevel: "none" | "vip" | "svip";
  onComplete: () => void;
};

function VipCrownSvg() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="animate-[badge-pulse_2s_ease-in-out_infinite]">
      <path d="M3 18 L6 8 L10 13 L12 4 L14 13 L18 8 L21 18Z" fill="hsl(45 100% 55%)" />
      <rect x="3" y="18" width="18" height="3" rx="1" fill="hsl(40 100% 45%)" />
      <circle cx="6" cy="8" r="1.5" fill="hsl(45 100% 70%)" />
      <circle cx="12" cy="4" r="1.5" fill="hsl(45 100% 70%)" />
      <circle cx="18" cy="8" r="1.5" fill="hsl(45 100% 70%)" />
    </svg>
  );
}

function SvipGemSvg() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="animate-[gem-sparkle_2.5s_ease-in-out_infinite]">
      <polygon points="12,2 20,9 12,22 4,9" fill="hsl(280 80% 60%)" />
      <polygon points="12,2 16,9 12,22" fill="hsl(290 70% 50%)" />
      <polygon points="12,2 8,9 12,22" fill="hsl(270 85% 70%)" />
      <line x1="4" y1="9" x2="20" y2="9" stroke="hsl(280 90% 80%)" strokeWidth="0.5" />
    </svg>
  );
}

export function EntryAnimation({ userName, vipLevel, onComplete }: EntryAnimationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  if (vipLevel === "svip") {
    return (
      <div className="pointer-events-none absolute inset-x-0 top-20 z-50 flex justify-center">
        <div
          className="flex items-center gap-2 rounded-2xl px-5 py-3"
          style={{
            background: "linear-gradient(90deg, hsl(280 70% 25%)/0.9, hsl(330 70% 30%)/0.9, hsl(270 70% 25%)/0.9)",
            border: "1px solid hsl(280 60% 50%)",
            animation: "entry-svip 3s ease-out forwards",
          }}
        >
          <SvipGemSvg />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-svip-gradient">{userName}</span>
            <span className="text-[10px] text-purple-300">entered the room</span>
          </div>
          <div className="ml-2 flex gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="text-xs"
                style={{ animation: `sparkle 1s ${i * 0.15}s ease-in-out infinite` }}
              >
                {"*"}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (vipLevel === "vip") {
    return (
      <div className="pointer-events-none absolute inset-x-0 top-20 z-50 flex justify-center">
        <div
          className="flex items-center gap-2 rounded-2xl px-5 py-3"
          style={{
            background: "linear-gradient(90deg, hsl(45 80% 20%)/0.9, hsl(35 80% 25%)/0.9)",
            border: "1px solid hsl(45 80% 50%)",
            animation: "entry-vip 3s ease-out forwards",
          }}
        >
          <VipCrownSvg />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-vip-gradient">{userName}</span>
            <span className="text-[10px] text-amber-300/70">entered the room</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 top-20 z-50 flex justify-center">
      <div
        className="flex items-center gap-2 rounded-xl glass-dark px-4 py-2"
        style={{ animation: "entry-vip 3s ease-out forwards" }}
      >
        <span className="text-xs font-bold text-cyan">{userName}</span>
        <span className="text-[10px] text-muted-foreground">joined</span>
      </div>
    </div>
  );
}
