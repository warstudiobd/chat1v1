"use client";

import { useState } from "react";
import { X, CloudRain, Waves, Trees, Coffee, Bird, Music, Zap, Drum, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";

type Vibe = {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: "ambient" | "effects" | "music";
  color: string;
};

const VIBES: Vibe[] = [
  { id: "lofi", name: "Lo-fi Beats", icon: <Music className="h-4 w-4" />, category: "ambient", color: "hsl(270 60% 55%)" },
  { id: "rain", name: "Rain", icon: <CloudRain className="h-4 w-4" />, category: "ambient", color: "hsl(200 70% 50%)" },
  { id: "ocean", name: "Ocean Waves", icon: <Waves className="h-4 w-4" />, category: "ambient", color: "hsl(195 80% 50%)" },
  { id: "cafe", name: "Cafe", icon: <Coffee className="h-4 w-4" />, category: "ambient", color: "hsl(30 50% 45%)" },
  { id: "forest", name: "Forest Birds", icon: <Bird className="h-4 w-4" />, category: "ambient", color: "hsl(140 50% 40%)" },
  { id: "applause", name: "Applause", icon: <PartyPopper className="h-4 w-4" />, category: "effects", color: "hsl(45 100% 50%)" },
  { id: "airhorn", name: "Airhorn", icon: <Zap className="h-4 w-4" />, category: "effects", color: "hsl(0 75% 55%)" },
  { id: "drumroll", name: "Drum Roll", icon: <Drum className="h-4 w-4" />, category: "effects", color: "hsl(25 80% 50%)" },
  { id: "party", name: "Party Beat", icon: <Music className="h-4 w-4" />, category: "music", color: "hsl(330 80% 55%)" },
  { id: "chill", name: "Chill Beat", icon: <Trees className="h-4 w-4" />, category: "music", color: "hsl(185 70% 45%)" },
  { id: "jazz", name: "Jazz Vibe", icon: <Music className="h-4 w-4" />, category: "music", color: "hsl(40 70% 50%)" },
  { id: "edm", name: "EDM Drop", icon: <Zap className="h-4 w-4" />, category: "music", color: "hsl(280 80% 55%)" },
];

function WaveformSvg({ color, playing }: { color: string; playing: boolean }) {
  return (
    <svg width="48" height="20" viewBox="0 0 48 20" className="shrink-0">
      {Array.from({ length: 12 }).map((_, i) => (
        <rect
          key={i}
          x={i * 4}
          y="4"
          width="2.5"
          height="12"
          rx="1"
          fill={color}
          opacity={playing ? 0.8 : 0.2}
          style={
            playing
              ? {
                  animation: `vibe-wave ${0.3 + (i % 4) * 0.15}s ease-in-out infinite`,
                  animationDelay: `${i * 0.05}s`,
                  transformOrigin: "center",
                }
              : undefined
          }
        />
      ))}
    </svg>
  );
}

type SoundVibesProps = {
  onClose: () => void;
  activeVibe: string | null;
  onVibeChange: (vibeId: string | null) => void;
};

export function SoundVibes({ onClose, activeVibe, onVibeChange }: SoundVibesProps) {
  const [tab, setTab] = useState<"ambient" | "effects" | "music">("ambient");
  const filtered = VIBES.filter((v) => v.category === tab);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-background/40" onClick={onClose} />
      <div className="relative w-full max-w-lg animate-slide-up rounded-t-3xl border-t border-border bg-card">
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-sm font-bold text-foreground">Sound Vibes</h3>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-4 mb-3">
          {(["ambient", "effects", "music"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-full px-3 py-1.5 text-[11px] font-semibold capitalize transition-colors",
                tab === t ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Vibes grid */}
        <div className="grid grid-cols-2 gap-2 px-4 pb-6">
          {filtered.map((vibe) => {
            const isActive = activeVibe === vibe.id;
            return (
              <button
                key={vibe.id}
                onClick={() => onVibeChange(isActive ? null : vibe.id)}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3 py-3 transition-all",
                  isActive ? "ring-1 ring-white/20" : "bg-muted hover:bg-muted/80"
                )}
                style={isActive ? { background: `${vibe.color}20` } : undefined}
              >
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: isActive ? vibe.color : "rgba(255,255,255,0.06)", color: isActive ? "white" : "inherit" }}
                >
                  {vibe.icon}
                </div>
                <div className="flex flex-col items-start gap-0.5">
                  <span className="text-[11px] font-semibold text-foreground">{vibe.name}</span>
                  <WaveformSvg color={vibe.color} playing={isActive} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Active vibe bar shown at top of chat
export function VibeBar({ vibeId, onStop }: { vibeId: string; onStop: () => void }) {
  const vibe = VIBES.find((v) => v.id === vibeId);
  if (!vibe) return null;

  return (
    <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: `${vibe.color}15`, border: `1px solid ${vibe.color}30` }}>
      <WaveformSvg color={vibe.color} playing />
      <span className="text-[11px] font-semibold text-foreground">{vibe.name}</span>
      <button onClick={onStop} className="ml-auto text-muted-foreground hover:text-foreground">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
