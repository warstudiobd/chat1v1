"use client"

import { useState, useEffect, useCallback } from "react"
import type { Gift, GiftEffect } from "@/lib/mock-data"

interface GiftEffectOverlayProps {
  gift: Gift
  onComplete: () => void
}

function SparkleParticle({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <div
      className="absolute w-2 h-2 rounded-full animate-fade-in"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        background: 'radial-gradient(circle, #FFD700, transparent)',
        animationDelay: `${delay}ms`,
        animationDuration: '800ms',
        boxShadow: '0 0 6px #FFD700',
      }}
    />
  )
}

function BurstEffect({ color }: { color: string }) {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i * 30) * (Math.PI / 180),
    delay: i * 50,
  }))

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: color,
            boxShadow: `0 0 10px ${color}`,
            animation: `burst-particle 1s ${p.delay}ms ease-out forwards`,
            transform: `translate(${Math.cos(p.angle) * 2}px, ${Math.sin(p.angle) * 2}px)`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes burst-particle {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(${`var(--dx, 80px)`}, ${`var(--dy, -80px)`}) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

function FireworkEffect({ color }: { color: string }) {
  const trails = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    angle: (i * 18) * (Math.PI / 180),
    dist: 60 + Math.random() * 60,
    delay: 200 + i * 30,
    size: 2 + Math.random() * 4,
  }))

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Central flash */}
      <div
        className="absolute w-24 h-24 rounded-full animate-bounce-in"
        style={{
          background: `radial-gradient(circle, ${color}60, transparent)`,
          boxShadow: `0 0 60px ${color}40`,
        }}
      />
      {/* Trails */}
      {trails.map((t) => {
        const endX = Math.cos(t.angle) * t.dist
        const endY = Math.sin(t.angle) * t.dist
        return (
          <div
            key={t.id}
            className="absolute rounded-full"
            style={{
              width: t.size,
              height: t.size,
              background: color,
              boxShadow: `0 0 8px ${color}`,
              animation: `fw-trail 1.2s ${t.delay}ms ease-out forwards`,
              ['--end-x' as string]: `${endX}px`,
              ['--end-y' as string]: `${endY}px`,
            }}
          />
        )
      })}
      <style jsx>{`
        @keyframes fw-trail {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translate(var(--end-x), var(--end-y)) scale(0.3); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

function UltraEffect({ gift }: { gift: Gift }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300)
    const t2 = setTimeout(() => setPhase(2), 1200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const rings = Array.from({ length: 5 }, (_, i) => i)
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 6,
    delay: Math.random() * 1000,
    dur: 1000 + Math.random() * 1500,
  }))

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Radial flash */}
      {phase >= 0 && (
        <div
          className="absolute w-full h-full animate-fade-in"
          style={{
            background: `radial-gradient(circle at center, ${gift.color}30, transparent 70%)`,
          }}
        />
      )}

      {/* Expanding rings */}
      {phase >= 1 && rings.map((i) => (
        <div
          key={i}
          className="absolute rounded-full animate-pulse-ring"
          style={{
            width: 80 + i * 40,
            height: 80 + i * 40,
            border: `2px solid ${gift.color}`,
            animationDelay: `${i * 200}ms`,
            opacity: 0.6 - i * 0.1,
          }}
        />
      ))}

      {/* Central gift icon - large */}
      {phase >= 1 && (
        <div className="absolute flex flex-col items-center gap-2 animate-bounce-in z-10">
          <span className="text-7xl drop-shadow-lg" style={{ filter: `drop-shadow(0 0 20px ${gift.color})` }}>
            {gift.icon}
          </span>
          <span
            className="px-4 py-1 rounded-full text-sm font-black text-white tracking-wide"
            style={{ background: `linear-gradient(135deg, ${gift.color}, #FF2D78)`, boxShadow: `0 0 30px ${gift.color}50` }}
          >
            ULTRA
          </span>
        </div>
      )}

      {/* Sparkle particles everywhere */}
      {phase >= 2 && particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: gift.color,
            boxShadow: `0 0 ${p.size * 2}px ${gift.color}`,
            animation: `sparkle-float ${p.dur}ms ${p.delay}ms ease-out forwards`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes sparkle-float {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

function LegendaryEffect({ gift }: { gift: Gift }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200)
    const t2 = setTimeout(() => setPhase(2), 800)
    const t3 = setTimeout(() => setPhase(3), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const megaParticles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    angle: (i * 7.2) * (Math.PI / 180),
    dist: 40 + Math.random() * 120,
    size: 2 + Math.random() * 8,
    delay: Math.random() * 800,
  }))

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Full screen golden flash */}
      {phase >= 0 && (
        <div
          className="absolute inset-0 animate-fade-in"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,215,0,0.4), transparent 60%)',
            animationDuration: '400ms',
          }}
        />
      )}

      {/* Rotating golden rays */}
      {phase >= 1 && (
        <div className="absolute w-64 h-64 animate-spin-slow" style={{ opacity: 0.3 }}>
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 origin-left"
              style={{
                width: 128,
                height: 2,
                background: `linear-gradient(90deg, #FFD700, transparent)`,
                transform: `rotate(${i * 30}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Mega expanding rings */}
      {phase >= 1 && Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-pulse-ring"
          style={{
            width: 60 + i * 30,
            height: 60 + i * 30,
            border: `2px solid ${i % 2 === 0 ? '#FFD700' : gift.color}`,
            animationDelay: `${i * 150}ms`,
            opacity: 0.5,
          }}
        />
      ))}

      {/* Central gift - massive */}
      {phase >= 2 && (
        <div className="absolute flex flex-col items-center gap-3 animate-bounce-in z-10">
          <span
            className="text-8xl"
            style={{
              filter: `drop-shadow(0 0 30px ${gift.color}) drop-shadow(0 0 60px #FFD700)`,
            }}
          >
            {gift.icon}
          </span>
          <div
            className="px-5 py-1.5 rounded-full text-base font-black text-white tracking-widest"
            style={{
              background: 'linear-gradient(135deg, #FFD700, #FF6B35, #FF2D78)',
              boxShadow: '0 0 40px rgba(255,215,0,0.5)',
            }}
          >
            LEGENDARY
          </div>
          <span className="text-sm font-bold text-[#FFD700]">
            {gift.price.toLocaleString()} Diamonds
          </span>
        </div>
      )}

      {/* Mega particles */}
      {phase >= 3 && megaParticles.map((p) => {
        const endX = Math.cos(p.angle) * p.dist
        const endY = Math.sin(p.angle) * p.dist
        return (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              background: p.id % 3 === 0 ? '#FFD700' : p.id % 3 === 1 ? gift.color : '#FF2D78',
              boxShadow: `0 0 ${p.size * 3}px ${p.id % 2 === 0 ? '#FFD700' : gift.color}`,
              animation: `legendary-particle 2s ${p.delay}ms ease-out forwards`,
              ['--end-x' as string]: `${endX}px`,
              ['--end-y' as string]: `${endY}px`,
            }}
          />
        )
      })}

      <style jsx>{`
        @keyframes legendary-particle {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          50% { opacity: 1; }
          100% { transform: translate(var(--end-x), var(--end-y)) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export function GiftEffectOverlay({ gift, onComplete }: GiftEffectOverlayProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, gift.effectDuration || 2000)
    return () => clearTimeout(timer)
  }, [gift.effectDuration, onComplete])

  const renderEffect = () => {
    switch (gift.effect) {
      case 'sparkle':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-5xl animate-bounce-in" style={{ filter: `drop-shadow(0 0 12px ${gift.color})` }}>
              {gift.icon}
            </span>
            {Array.from({ length: 8 }, (_, i) => (
              <SparkleParticle
                key={i}
                delay={i * 100}
                x={30 + Math.random() * 40}
                y={30 + Math.random() * 40}
              />
            ))}
          </div>
        )
      case 'burst':
        return (
          <>
            <BurstEffect color={gift.color} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-6xl animate-bounce-in" style={{ filter: `drop-shadow(0 0 16px ${gift.color})` }}>
                {gift.icon}
              </span>
            </div>
          </>
        )
      case 'firework':
        return (
          <>
            <FireworkEffect color={gift.color} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="flex flex-col items-center gap-1 animate-bounce-in">
                <span className="text-6xl" style={{ filter: `drop-shadow(0 0 20px ${gift.color})` }}>
                  {gift.icon}
                </span>
                <span className="text-xs font-bold text-white px-2 py-0.5 rounded-full" style={{ background: gift.color }}>
                  {gift.name}
                </span>
              </div>
            </div>
          </>
        )
      case 'ultra':
        return <UltraEffect gift={gift} />
      case 'legendary':
        return <LegendaryEffect gift={gift} />
      default:
        return null
    }
  }

  if (gift.effect === 'none') return null

  return (
    <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
      {renderEffect()}
    </div>
  )
}

// Enhanced gift panel with effect tiers
interface GiftPanelProps {
  onSendGift: (gift: Gift) => void
  onClose: () => void
  diamonds: number
}

export function GiftPanel({ onSendGift, onClose, diamonds }: GiftPanelProps) {
  const [activeTab, setActiveTab] = useState<GiftEffect | "all">("all")
  const tabs: { id: GiftEffect | "all"; label: string }[] = [
    { id: "all", label: "All" },
    { id: "none", label: "Basic" },
    { id: "sparkle", label: "Sparkle" },
    { id: "burst", label: "Burst" },
    { id: "firework", label: "Firework" },
    { id: "ultra", label: "Ultra" },
    { id: "legendary", label: "Legend" },
  ]

  // Import inside component to avoid circular deps
  const { mockGifts, getEffectLabel, getEffectColor } = require("@/lib/mock-data")
  const gifts = mockGifts as Gift[]

  const filteredGifts = activeTab === "all" ? gifts : gifts.filter((g: Gift) => g.effect === activeTab)

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 rounded-t-3xl glass-strong animate-slide-up">
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <h3 className="text-sm font-bold text-white">Send a Gift</h3>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#FFD700] font-semibold">
            {'💎'} {diamonds.toLocaleString()}
          </span>
          <button onClick={onClose} className="text-[#8888AA]" aria-label="Close gift panel">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      {/* Effect tabs */}
      <div className="flex gap-1 px-4 py-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1 rounded-full text-[10px] font-medium flex-shrink-0 transition-all ${
              activeTab === tab.id ? "text-white" : "text-[#8888AA]"
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

      <div className="grid grid-cols-4 gap-2 px-4 pb-6 max-h-[240px] overflow-y-auto">
        {filteredGifts.map((gift: Gift) => {
          const canAfford = diamonds >= gift.price
          const effectLabel = getEffectLabel(gift.effect) as string
          const effectColor = getEffectColor(gift.effect) as string
          return (
            <button
              key={gift.id}
              onClick={() => canAfford && onSendGift(gift)}
              className={`relative flex flex-col items-center gap-1 p-2.5 rounded-xl transition-colors ${
                canAfford
                  ? "bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)]"
                  : "bg-[rgba(255,255,255,0.02)] opacity-50"
              }`}
              style={
                gift.effect === "legendary"
                  ? { border: "1px solid rgba(255,215,0,0.3)", background: "rgba(255,215,0,0.05)" }
                  : gift.effect === "ultra"
                    ? { border: "1px solid rgba(255,45,120,0.2)", background: "rgba(255,45,120,0.05)" }
                    : undefined
              }
            >
              {effectLabel && (
                <span
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full text-[6px] font-black text-white"
                  style={{ background: effectColor }}
                >
                  {effectLabel}
                </span>
              )}
              <span className="text-2xl">{gift.icon}</span>
              <span className="text-[9px] text-white font-medium">{gift.name}</span>
              <span className="text-[8px] text-[#FFD700] font-bold">
                {gift.price.toLocaleString()}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
