"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import {
  ArrowLeft,
  Diamond,
  Trophy,
  Users,
  Zap,
  Crown,
  RotateCw,
} from "lucide-react"
import { mockGames, formatNumber } from "@/lib/mock-data"
import type { GameItem } from "@/lib/mock-data"

// ============================================================================
// GAMES SCREEN (Lobby)
// ============================================================================
interface GamesScreenProps {
  diamonds: number
  onDiamondsChange: (d: number) => void
  onBack?: () => void
}

export function GamesScreen({ diamonds, onDiamondsChange, onBack }: GamesScreenProps) {
  const [activeGame, setActiveGame] = useState<GameItem | null>(null)
  const [filter, setFilter] = useState<"all" | "luck" | "card" | "casual" | "battle">("all")
  const activeGames = mockGames.filter(g => g.isActive)
  const filtered = filter === "all" ? activeGames : activeGames.filter(g => g.category === filter)

  if (activeGame) {
    return (
      <GamePlay
        game={activeGame}
        diamonds={diamonds}
        onDiamondsChange={onDiamondsChange}
        onBack={() => setActiveGame(null)}
      />
    )
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
        {onBack && (
          <button onClick={onBack} className="w-8 h-8 rounded-full glass flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
        )}
        <h1 className="text-lg font-bold text-white flex-1">Games</h1>
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full glass">
          <Diamond className="w-3.5 h-3.5 text-[#06B6D4]" />
          <span className="text-xs font-bold text-white">{formatNumber(diamonds)}</span>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto">
        {(["all", "luck", "card", "casual", "battle"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors"
            style={{
              background: filter === cat ? "#FF2D78" : "rgba(255,255,255,0.05)",
              color: filter === cat ? "#FFFFFF" : "#8888AA",
            }}
          >
            {cat === "all" ? "All Games" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Games Grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((game) => (
            <button
              key={game.id}
              onClick={() => setActiveGame(game)}
              className="rounded-2xl overflow-hidden glass text-left"
            >
              <div className="aspect-[3/2] flex items-center justify-center relative" style={{ background: `${game.color}15` }}>
                <span className="text-5xl">{game.icon}</span>
                {game.jackpot && (
                  <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[rgba(0,0,0,0.5)]">
                    <Trophy className="w-2.5 h-2.5 text-[#FFD700]" />
                    <span className="text-[8px] text-[#FFD700] font-bold">{formatNumber(game.jackpot)}</span>
                  </div>
                )}
                <div className="absolute bottom-2 left-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[rgba(0,0,0,0.5)]">
                  <Users className="w-2.5 h-2.5 text-white" />
                  <span className="text-[8px] text-white font-medium">{formatNumber(game.players)}</span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-bold text-white mb-0.5">{game.name}</h3>
                <p className="text-[10px] text-[#8888AA] mb-2">{game.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Diamond className="w-3 h-3 text-[#06B6D4]" />
                    <span className="text-xs font-bold text-white">{game.entryFee}</span>
                    <span className="text-[9px] text-[#8888AA]">entry</span>
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-full text-[8px] font-bold text-white"
                    style={{ background: game.color }}
                  >
                    PLAY
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// GAME PLAY VIEW
// ============================================================================
interface GamePlayProps {
  game: GameItem
  diamonds: number
  onDiamondsChange: (d: number) => void
  onBack: () => void
}

function GamePlay({ game, diamonds, onDiamondsChange, onBack }: GamePlayProps) {
  switch (game.id) {
    case "gm1": return <GreedyCatGame game={game} diamonds={diamonds} onDiamondsChange={onDiamondsChange} onBack={onBack} />
    case "gm2": return <TeenPattiGame game={game} diamonds={diamonds} onDiamondsChange={onDiamondsChange} onBack={onBack} />
    case "gm3": return <LuckyWheelGame game={game} diamonds={diamonds} onDiamondsChange={onDiamondsChange} onBack={onBack} />
    case "gm5": return <CoinFlipGame game={game} diamonds={diamonds} onDiamondsChange={onDiamondsChange} onBack={onBack} />
    case "gm7": return <CrashGame game={game} diamonds={diamonds} onDiamondsChange={onDiamondsChange} onBack={onBack} />
    default: return <GenericGame game={game} diamonds={diamonds} onDiamondsChange={onDiamondsChange} onBack={onBack} />
  }
}

// Shared game header
function GameHeader({ game, diamonds, onBack }: { game: GameItem; diamonds: number; onBack: () => void }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
      <button onClick={onBack} className="w-8 h-8 rounded-full glass flex items-center justify-center">
        <ArrowLeft className="w-4 h-4 text-white" />
      </button>
      <div className="flex items-center gap-2 flex-1">
        <span className="text-xl">{game.icon}</span>
        <span className="text-base font-bold text-white">{game.name}</span>
      </div>
      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full glass">
        <Diamond className="w-3.5 h-3.5 text-[#06B6D4]" />
        <span className="text-xs font-bold text-white">{formatNumber(diamonds)}</span>
      </div>
    </div>
  )
}

// Result pop-up
function ResultOverlay({ isWin, amount, onClose }: { isWin: boolean; amount: number; onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)] animate-fade-in">
      <div className="flex flex-col items-center gap-3 p-8 rounded-3xl glass-strong animate-bounce-in">
        <span className="text-6xl">{isWin ? "\u{1F389}" : "\u{1F614}"}</span>
        <h2 className="text-2xl font-black" style={{ color: isWin ? "#FFD700" : "#EF4444" }}>
          {isWin ? "YOU WIN!" : "YOU LOSE"}
        </h2>
        <div className="flex items-center gap-1.5">
          <Diamond className="w-5 h-5 text-[#06B6D4]" />
          <span className="text-xl font-bold text-white">{isWin ? "+" : "-"}{formatNumber(amount)}</span>
        </div>
        <button onClick={onClose} className="px-8 py-2.5 rounded-full text-sm font-bold text-white mt-2" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>
          Continue
        </button>
      </div>
    </div>
  )
}

// ============================================================================
// GREEDY CAT GAME
// ============================================================================
function GreedyCatGame({ game, diamonds, onDiamondsChange, onBack }: GamePlayProps) {
  const [bet, setBet] = useState(game.entryFee)
  const [playing, setPlaying] = useState(false)
  const [catLevel, setCatLevel] = useState(0)
  const [multiplier, setMultiplier] = useState(1)
  const [result, setResult] = useState<{ isWin: boolean; amount: number } | null>(null)
  const [catMood, setCatMood] = useState<"hungry" | "eating" | "full" | "escaped">("hungry")
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const feedCat = useCallback(() => {
    if (!playing) {
      if (diamonds < bet) return
      onDiamondsChange(diamonds - bet)
      setPlaying(true)
      setCatLevel(1)
      setMultiplier(1.5)
      setCatMood("eating")
    } else {
      // Try to feed more -- 70% success, 30% cat escapes
      const success = Math.random() < 0.65 - catLevel * 0.05
      if (success && catLevel < 8) {
        setCatLevel(prev => prev + 1)
        setMultiplier(prev => +(prev + 0.5 + Math.random() * 0.5).toFixed(1))
        setCatMood("eating")
      } else {
        setCatMood("escaped")
        setPlaying(false)
        setResult({ isWin: false, amount: bet })
      }
    }
  }, [playing, diamonds, bet, catLevel, onDiamondsChange])

  const cashOut = useCallback(() => {
    if (!playing) return
    const winAmount = Math.floor(bet * multiplier)
    onDiamondsChange(diamonds + winAmount)
    setCatMood("full")
    setPlaying(false)
    setResult({ isWin: true, amount: winAmount })
  }, [playing, bet, multiplier, diamonds, onDiamondsChange])

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  const catFaces = ["\u{1F63A}", "\u{1F63B}", "\u{1F63C}", "\u{1F63D}", "\u{1F640}", "\u{1F638}", "\u{1F639}", "\u{1F63E}", "\u{1F631}"]

  return (
    <div className="flex flex-col h-full bg-background relative">
      <GameHeader game={game} diamonds={diamonds} onBack={onBack} />
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4">
        {/* Cat */}
        <div className="relative">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: `${game.color}20`,
              transform: catMood === "eating" ? "scale(1.1)" : catMood === "escaped" ? "scale(0.8)" : "scale(1)",
              boxShadow: playing ? `0 0 40px ${game.color}40` : "none",
            }}
          >
            <span className="text-7xl" style={{ transform: catMood === "eating" ? "rotate(-10deg)" : "none", transition: "transform 0.3s" }}>
              {catMood === "escaped" ? "\u{1F4A8}" : catFaces[catLevel]}
            </span>
          </div>
          {playing && (
            <div className="absolute -top-2 -right-2 px-2.5 py-1 rounded-full bg-[#FFD700] flex items-center gap-1">
              <Zap className="w-3 h-3 text-black" />
              <span className="text-xs font-black text-black">{multiplier}x</span>
            </div>
          )}
        </div>

        {/* Level bar */}
        <div className="w-full max-w-[260px]">
          <div className="flex justify-between mb-1">
            <span className="text-[10px] text-[#8888AA]">Cat Level</span>
            <span className="text-[10px] text-[#FFD700] font-bold">{catLevel}/8</span>
          </div>
          <div className="h-2 rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(catLevel / 8) * 100}%`, background: `linear-gradient(90deg, ${game.color}, #FFD700)` }} />
          </div>
        </div>

        {/* Potential win */}
        {playing && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass">
            <Diamond className="w-4 h-4 text-[#06B6D4]" />
            <span className="text-sm text-[#8888AA]">Potential Win:</span>
            <span className="text-lg font-bold text-[#FFD700]">{formatNumber(Math.floor(bet * multiplier))}</span>
          </div>
        )}

        {/* Bet selector (only when not playing) */}
        {!playing && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#8888AA]">Bet:</span>
            {[100, 500, 1000, 5000].map(b => (
              <button
                key={b}
                onClick={() => setBet(b)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                style={{
                  background: bet === b ? game.color : "rgba(255,255,255,0.05)",
                  color: bet === b ? "#FFFFFF" : "#8888AA",
                }}
              >
                {formatNumber(b)}
              </button>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 w-full max-w-[300px]">
          {!playing ? (
            <button
              onClick={feedCat}
              disabled={diamonds < bet}
              className="flex-1 py-3.5 rounded-2xl text-sm font-bold text-white disabled:opacity-40"
              style={{ background: `linear-gradient(135deg, ${game.color}, #FFD700)` }}
            >
              Feed Cat ({formatNumber(bet)} D)
            </button>
          ) : (
            <>
              <button
                onClick={feedCat}
                className="flex-1 py-3.5 rounded-2xl text-sm font-bold text-white"
                style={{ background: game.color }}
              >
                Feed More
              </button>
              <button
                onClick={cashOut}
                className="flex-1 py-3.5 rounded-2xl text-sm font-bold text-black bg-[#FFD700]"
              >
                Cash Out
              </button>
            </>
          )}
        </div>
      </div>
      {result && <ResultOverlay isWin={result.isWin} amount={result.amount} onClose={() => { setResult(null); setCatLevel(0); setMultiplier(1); setCatMood("hungry") }} />}
    </div>
  )
}

// ============================================================================
// TEEN PATTI GAME
// ============================================================================
const CARD_SUITS = ["\u{2660}\u{FE0F}", "\u{2665}\u{FE0F}", "\u{2666}\u{FE0F}", "\u{2663}\u{FE0F}"]
const CARD_VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

function getRandomCards(count: number) {
  const cards: { value: string; suit: string; numValue: number }[] = []
  while (cards.length < count) {
    const suit = CARD_SUITS[Math.floor(Math.random() * 4)]
    const valIdx = Math.floor(Math.random() * 13)
    const value = CARD_VALUES[valIdx]
    const numValue = valIdx === 0 ? 14 : valIdx + 1
    if (!cards.find(c => c.value === value && c.suit === suit)) {
      cards.push({ value, suit, numValue })
    }
  }
  return cards
}

function getHandRank(cards: { numValue: number }[]) {
  const sorted = [...cards].sort((a, b) => b.numValue - a.numValue)
  const isTrips = sorted[0].numValue === sorted[1].numValue && sorted[1].numValue === sorted[2].numValue
  const isSequence = sorted[0].numValue - sorted[1].numValue === 1 && sorted[1].numValue - sorted[2].numValue === 1
  const isPair = sorted[0].numValue === sorted[1].numValue || sorted[1].numValue === sorted[2].numValue
  if (isTrips) return { rank: 4, label: "Trail", score: 4000 + sorted[0].numValue }
  if (isSequence) return { rank: 3, label: "Sequence", score: 3000 + sorted[0].numValue }
  if (isPair) return { rank: 2, label: "Pair", score: 2000 + sorted.find((_, i, arr) => i < 2 && arr[i].numValue === arr[i + 1]?.numValue)!.numValue }
  return { rank: 1, label: "High Card", score: 1000 + sorted[0].numValue * 10 + sorted[1].numValue }
}

function TeenPattiGame({ game, diamonds, onDiamondsChange, onBack }: GamePlayProps) {
  const [bet, setBet] = useState(game.entryFee)
  const [phase, setPhase] = useState<"bet" | "dealt" | "reveal">("bet")
  const [myCards, setMyCards] = useState<{ value: string; suit: string; numValue: number }[]>([])
  const [opCards, setOpCards] = useState<{ value: string; suit: string; numValue: number }[]>([])
  const [result, setResult] = useState<{ isWin: boolean; amount: number } | null>(null)
  const [cardsRevealed, setCardsRevealed] = useState(false)

  const deal = () => {
    if (diamonds < bet) return
    onDiamondsChange(diamonds - bet)
    setMyCards(getRandomCards(3))
    setOpCards(getRandomCards(3))
    setPhase("dealt")
    setCardsRevealed(false)
  }

  const show = () => {
    setPhase("reveal")
    setCardsRevealed(true)
    setTimeout(() => {
      const myRank = getHandRank(myCards)
      const opRank = getHandRank(opCards)
      const isWin = myRank.score > opRank.score
      if (isWin) {
        const winAmount = bet * 2
        onDiamondsChange(diamonds + winAmount)
        setResult({ isWin: true, amount: winAmount })
      } else {
        setResult({ isWin: false, amount: bet })
      }
    }, 1500)
  }

  const reset = () => {
    setPhase("bet")
    setMyCards([])
    setOpCards([])
    setResult(null)
    setCardsRevealed(false)
  }

  const CardView = ({ card, hidden }: { card: { value: string; suit: string }; hidden: boolean }) => (
    <div
      className="w-16 h-22 rounded-xl flex flex-col items-center justify-center text-lg font-bold transition-all duration-500"
      style={{
        background: hidden ? "linear-gradient(135deg, #FF2D78, #8B5CF6)" : "rgba(255,255,255,0.95)",
        color: hidden ? "#FFFFFF" : (card.suit.includes("\u2665") || card.suit.includes("\u2666")) ? "#EF4444" : "#1A1A2E",
        transform: hidden ? "rotateY(180deg)" : "rotateY(0deg)",
        minHeight: "88px",
      }}
    >
      {hidden ? (
        <span className="text-2xl">?</span>
      ) : (
        <>
          <span className="text-lg leading-tight">{card.value}</span>
          <span className="text-sm">{card.suit}</span>
        </>
      )}
    </div>
  )

  return (
    <div className="flex flex-col h-full bg-background relative">
      <GameHeader game={game} diamonds={diamonds} onBack={onBack} />

      <div className="flex-1 flex flex-col items-center justify-between px-6 py-6">
        {/* Opponent cards */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-[#8888AA] font-medium">Opponent</span>
          <div className="flex gap-2">
            {opCards.length > 0 ? opCards.map((c, i) => (
              <CardView key={i} card={c} hidden={!cardsRevealed} />
            )) : (
              [0, 1, 2].map(i => <div key={i} className="w-16 rounded-xl glass flex items-center justify-center" style={{ minHeight: "88px" }}><span className="text-2xl text-[#8888AA]">?</span></div>)
            )}
          </div>
          {cardsRevealed && opCards.length > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444" }}>
              {getHandRank(opCards).label}
            </span>
          )}
        </div>

        {/* VS */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
          <div className="px-4 py-1.5 rounded-full glass">
            <span className="text-sm font-black text-white">VS</span>
          </div>
          <div className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
        </div>

        {/* My cards */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            {myCards.length > 0 ? myCards.map((c, i) => (
              <CardView key={i} card={c} hidden={false} />
            )) : (
              [0, 1, 2].map(i => <div key={i} className="w-16 rounded-xl glass flex items-center justify-center" style={{ minHeight: "88px" }}><span className="text-2xl text-[#8888AA]">?</span></div>)
            )}
          </div>
          {myCards.length > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(255,215,0,0.15)", color: "#FFD700" }}>
              {getHandRank(myCards).label}
            </span>
          )}
          <span className="text-xs text-[#8888AA] font-medium">Your Hand</span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 pb-6">
        {phase === "bet" && (
          <>
            <div className="flex items-center justify-center gap-3 mb-4">
              {[500, 1000, 2500, 5000].map(b => (
                <button key={b} onClick={() => setBet(b)} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: bet === b ? "#FF2D78" : "rgba(255,255,255,0.05)", color: bet === b ? "#FFFFFF" : "#8888AA" }}>
                  {formatNumber(b)}
                </button>
              ))}
            </div>
            <button onClick={deal} disabled={diamonds < bet} className="w-full py-3.5 rounded-2xl text-sm font-bold text-white disabled:opacity-40" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>
              Deal Cards ({formatNumber(bet)} D)
            </button>
          </>
        )}
        {phase === "dealt" && (
          <button onClick={show} className="w-full py-3.5 rounded-2xl text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #FFD700, #FF6B35)" }}>
            Show Cards
          </button>
        )}
      </div>

      {result && <ResultOverlay isWin={result.isWin} amount={result.amount} onClose={reset} />}
    </div>
  )
}

// ============================================================================
// LUCKY WHEEL GAME
// ============================================================================
function LuckyWheelGame({ game, diamonds, onDiamondsChange, onBack }: GamePlayProps) {
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState<{ isWin: boolean; amount: number } | null>(null)
  const [bet, setBet] = useState(game.entryFee)

  const segments = [
    { label: "0x", multi: 0, color: "#EF4444" },
    { label: "0.5x", multi: 0.5, color: "#8B5CF6" },
    { label: "1x", multi: 1, color: "#06B6D4" },
    { label: "1.5x", multi: 1.5, color: "#10B981" },
    { label: "2x", multi: 2, color: "#FFD700" },
    { label: "0.5x", multi: 0.5, color: "#8B5CF6" },
    { label: "3x", multi: 3, color: "#FF2D78" },
    { label: "0x", multi: 0, color: "#EF4444" },
    { label: "1x", multi: 1, color: "#06B6D4" },
    { label: "5x", multi: 5, color: "#FFD700" },
    { label: "0.5x", multi: 0.5, color: "#8B5CF6" },
    { label: "1.5x", multi: 1.5, color: "#10B981" },
  ]

  const spin = () => {
    if (spinning || diamonds < bet) return
    onDiamondsChange(diamonds - bet)
    setSpinning(true)

    const winIdx = Math.floor(Math.random() * segments.length)
    const segAngle = 360 / segments.length
    const extraSpins = 5 * 360
    const targetAngle = extraSpins + (360 - winIdx * segAngle - segAngle / 2)

    setRotation(prev => prev + targetAngle)

    setTimeout(() => {
      setSpinning(false)
      const winMulti = segments[winIdx].multi
      const winAmount = Math.floor(bet * winMulti)
      if (winAmount > 0) {
        onDiamondsChange(diamonds - bet + winAmount)
        setResult({ isWin: true, amount: winAmount })
      } else {
        setResult({ isWin: false, amount: bet })
      }
    }, 4000)
  }

  return (
    <div className="flex flex-col h-full bg-background relative">
      <GameHeader game={game} diamonds={diamonds} onBack={onBack} />
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        {/* Wheel */}
        <div className="relative">
          {/* Pointer */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-0 h-0" style={{ borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: "20px solid #FF2D78" }} />
          <div
            className="w-56 h-56 rounded-full relative overflow-hidden border-4 border-[rgba(255,255,255,0.1)]"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
            }}
          >
            {segments.map((seg, i) => {
              const angle = (360 / segments.length) * i
              return (
                <div
                  key={i}
                  className="absolute top-0 left-1/2 origin-bottom flex items-start justify-center pt-4"
                  style={{
                    width: "50%",
                    height: "50%",
                    transform: `rotate(${angle}deg) translateX(-50%)`,
                  }}
                >
                  <span className="text-[10px] font-black text-white" style={{ transform: "translateX(50%)" }}>{seg.label}</span>
                </div>
              )
            })}
            {/* Colored segments as background */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
              {segments.map((seg, i) => {
                const startAngle = (360 / segments.length) * i - 90
                const endAngle = startAngle + 360 / segments.length
                const start = { x: 100 + 100 * Math.cos((startAngle * Math.PI) / 180), y: 100 + 100 * Math.sin((startAngle * Math.PI) / 180) }
                const end = { x: 100 + 100 * Math.cos((endAngle * Math.PI) / 180), y: 100 + 100 * Math.sin((endAngle * Math.PI) / 180) }
                return (
                  <path key={i} d={`M100,100 L${start.x},${start.y} A100,100 0 0,1 ${end.x},${end.y} Z`} fill={seg.color} opacity={0.3} />
                )
              })}
            </svg>
          </div>
        </div>

        {/* Bet & Spin */}
        <div className="flex items-center gap-3">
          {[50, 200, 500, 2000].map(b => (
            <button key={b} onClick={() => !spinning && setBet(b)} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: bet === b ? game.color : "rgba(255,255,255,0.05)", color: bet === b ? "#FFFFFF" : "#8888AA" }}>
              {formatNumber(b)}
            </button>
          ))}
        </div>
        <button onClick={spin} disabled={spinning || diamonds < bet} className="w-full max-w-[280px] py-3.5 rounded-2xl text-sm font-bold text-white disabled:opacity-40" style={{ background: `linear-gradient(135deg, ${game.color}, #FFD700)` }}>
          {spinning ? "Spinning..." : `Spin (${formatNumber(bet)} D)`}
        </button>
      </div>
      {result && <ResultOverlay isWin={result.isWin} amount={result.amount} onClose={() => setResult(null)} />}
    </div>
  )
}

// ============================================================================
// COIN FLIP GAME
// ============================================================================
function CoinFlipGame({ game, diamonds, onDiamondsChange, onBack }: GamePlayProps) {
  const [bet, setBet] = useState(game.entryFee)
  const [choice, setChoice] = useState<"heads" | "tails" | null>(null)
  const [flipping, setFlipping] = useState(false)
  const [coinSide, setCoinSide] = useState<"heads" | "tails">("heads")
  const [flipCount, setFlipCount] = useState(0)
  const [result, setResult] = useState<{ isWin: boolean; amount: number } | null>(null)

  const flip = () => {
    if (!choice || flipping || diamonds < bet) return
    onDiamondsChange(diamonds - bet)
    setFlipping(true)
    setFlipCount(prev => prev + 1)

    const outcome: "heads" | "tails" = Math.random() < 0.5 ? "heads" : "tails"

    setTimeout(() => {
      setCoinSide(outcome)
      setFlipping(false)
      const isWin = outcome === choice
      if (isWin) {
        const winAmount = bet * 2
        onDiamondsChange(diamonds - bet + winAmount)
        setResult({ isWin: true, amount: winAmount })
      } else {
        setResult({ isWin: false, amount: bet })
      }
    }, 2000)
  }

  return (
    <div className="flex flex-col h-full bg-background relative">
      <GameHeader game={game} diamonds={diamonds} onBack={onBack} />
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        {/* Coin */}
        <div
          className="w-36 h-36 rounded-full flex items-center justify-center text-6xl font-black border-4"
          style={{
            background: coinSide === "heads" ? "linear-gradient(135deg, #FFD700, #FF6B35)" : "linear-gradient(135deg, #8B5CF6, #06B6D4)",
            borderColor: coinSide === "heads" ? "#FFD700" : "#8B5CF6",
            animation: flipping ? `spin-slow 0.3s linear ${flipCount}` : "none",
            transform: flipping ? "rotateY(720deg)" : "rotateY(0deg)",
            transition: flipping ? "transform 2s ease-out" : "none",
          }}
        >
          <span className="text-white">{coinSide === "heads" ? "H" : "T"}</span>
        </div>

        {/* Choice */}
        <div className="flex gap-4">
          <button
            onClick={() => !flipping && setChoice("heads")}
            className="px-6 py-3 rounded-2xl text-sm font-bold transition-all"
            style={{
              background: choice === "heads" ? "linear-gradient(135deg, #FFD700, #FF6B35)" : "rgba(255,255,255,0.05)",
              color: choice === "heads" ? "#FFFFFF" : "#8888AA",
              transform: choice === "heads" ? "scale(1.05)" : "scale(1)",
            }}
          >
            Heads
          </button>
          <button
            onClick={() => !flipping && setChoice("tails")}
            className="px-6 py-3 rounded-2xl text-sm font-bold transition-all"
            style={{
              background: choice === "tails" ? "linear-gradient(135deg, #8B5CF6, #06B6D4)" : "rgba(255,255,255,0.05)",
              color: choice === "tails" ? "#FFFFFF" : "#8888AA",
              transform: choice === "tails" ? "scale(1.05)" : "scale(1)",
            }}
          >
            Tails
          </button>
        </div>

        {/* Bet & Flip */}
        <div className="flex items-center gap-3">
          {[100, 500, 1000, 5000].map(b => (
            <button key={b} onClick={() => !flipping && setBet(b)} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: bet === b ? game.color : "rgba(255,255,255,0.05)", color: bet === b ? "#FFFFFF" : "#8888AA" }}>
              {formatNumber(b)}
            </button>
          ))}
        </div>
        <button onClick={flip} disabled={!choice || flipping || diamonds < bet} className="w-full max-w-[280px] py-3.5 rounded-2xl text-sm font-bold text-white disabled:opacity-40" style={{ background: `linear-gradient(135deg, ${game.color}, #FFD700)` }}>
          {flipping ? "Flipping..." : `Flip (${formatNumber(bet)} D)`}
        </button>
      </div>
      {result && <ResultOverlay isWin={result.isWin} amount={result.amount} onClose={() => { setResult(null); setChoice(null) }} />}
    </div>
  )
}

// ============================================================================
// CRASH GAME
// ============================================================================
function CrashGame({ game, diamonds, onDiamondsChange, onBack }: GamePlayProps) {
  const [bet, setBet] = useState(game.entryFee)
  const [playing, setPlaying] = useState(false)
  const [multiplier, setMultiplier] = useState(1)
  const [crashed, setCrashed] = useState(false)
  const [result, setResult] = useState<{ isWin: boolean; amount: number } | null>(null)
  const [history, setHistory] = useState<number[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const crashPointRef = useRef(1)

  const start = useCallback(() => {
    if (playing || diamonds < bet) return
    onDiamondsChange(diamonds - bet)
    setPlaying(true)
    setCrashed(false)
    setMultiplier(1)
    crashPointRef.current = 1 + Math.random() * 9 + (Math.random() < 0.1 ? Math.random() * 20 : 0)

    intervalRef.current = setInterval(() => {
      setMultiplier(prev => {
        const next = +(prev + 0.02 + prev * 0.008).toFixed(2)
        if (next >= crashPointRef.current) {
          clearInterval(intervalRef.current!)
          setCrashed(true)
          setPlaying(false)
          setHistory(h => [crashPointRef.current, ...h].slice(0, 10))
          setResult({ isWin: false, amount: bet })
          return crashPointRef.current
        }
        return next
      })
    }, 50)
  }, [playing, diamonds, bet, onDiamondsChange])

  const cashOut = useCallback(() => {
    if (!playing) return
    if (intervalRef.current) clearInterval(intervalRef.current)
    const winAmount = Math.floor(bet * multiplier)
    onDiamondsChange(diamonds + winAmount)
    setPlaying(false)
    setHistory(h => [multiplier, ...h].slice(0, 10))
    setResult({ isWin: true, amount: winAmount })
  }, [playing, bet, multiplier, diamonds, onDiamondsChange])

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  return (
    <div className="flex flex-col h-full bg-background relative">
      <GameHeader game={game} diamonds={diamonds} onBack={onBack} />
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-5">
        {/* Multiplier display */}
        <div
          className="w-48 h-48 rounded-full flex items-center justify-center border-4 transition-all duration-100"
          style={{
            borderColor: crashed ? "#EF4444" : multiplier > 3 ? "#FFD700" : multiplier > 1.5 ? "#10B981" : game.color,
            background: crashed ? "rgba(239,68,68,0.1)" : `rgba(255,45,120,${Math.min(multiplier * 0.03, 0.2)})`,
            boxShadow: playing ? `0 0 ${multiplier * 10}px ${crashed ? "#EF4444" : game.color}40` : "none",
          }}
        >
          <div className="text-center">
            <span
              className="text-4xl font-black block"
              style={{ color: crashed ? "#EF4444" : multiplier > 3 ? "#FFD700" : "#FFFFFF" }}
            >
              {multiplier.toFixed(2)}x
            </span>
            {crashed && <span className="text-xs font-bold text-[#EF4444]">CRASHED</span>}
          </div>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="flex gap-1.5 flex-wrap justify-center">
            {history.map((h, i) => (
              <span key={i} className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: h >= 2 ? "rgba(255,215,0,0.15)" : "rgba(239,68,68,0.15)", color: h >= 2 ? "#FFD700" : "#EF4444" }}>
                {h.toFixed(2)}x
              </span>
            ))}
          </div>
        )}

        {/* Bet */}
        {!playing && (
          <div className="flex items-center gap-3">
            {[100, 500, 1000, 5000].map(b => (
              <button key={b} onClick={() => setBet(b)} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: bet === b ? game.color : "rgba(255,255,255,0.05)", color: bet === b ? "#FFFFFF" : "#8888AA" }}>
                {formatNumber(b)}
              </button>
            ))}
          </div>
        )}

        {/* Action */}
        {!playing ? (
          <button onClick={start} disabled={diamonds < bet} className="w-full max-w-[280px] py-3.5 rounded-2xl text-sm font-bold text-white disabled:opacity-40" style={{ background: `linear-gradient(135deg, ${game.color}, #FFD700)` }}>
            Start ({formatNumber(bet)} D)
          </button>
        ) : (
          <button onClick={cashOut} className="w-full max-w-[280px] py-3.5 rounded-2xl text-sm font-bold text-black bg-[#FFD700]">
            Cash Out ({formatNumber(Math.floor(bet * multiplier))} D)
          </button>
        )}
      </div>
      {result && <ResultOverlay isWin={result.isWin} amount={result.amount} onClose={() => { setResult(null); setCrashed(false); setMultiplier(1) }} />}
    </div>
  )
}

// ============================================================================
// GENERIC GAME (for games without a custom UI)
// ============================================================================
function GenericGame({ game, diamonds, onDiamondsChange, onBack }: GamePlayProps) {
  const [bet, setBet] = useState(game.entryFee)
  const [playing, setPlaying] = useState(false)
  const [result, setResult] = useState<{ isWin: boolean; amount: number } | null>(null)

  const play = () => {
    if (playing || diamonds < bet) return
    onDiamondsChange(diamonds - bet)
    setPlaying(true)

    setTimeout(() => {
      setPlaying(false)
      const win = Math.random() < 0.45
      if (win) {
        const multi = 1.5 + Math.random() * 2.5
        const winAmount = Math.floor(bet * multi)
        onDiamondsChange(diamonds - bet + winAmount)
        setResult({ isWin: true, amount: winAmount })
      } else {
        setResult({ isWin: false, amount: bet })
      }
    }, 2000)
  }

  return (
    <div className="flex flex-col h-full bg-background relative">
      <GameHeader game={game} diamonds={diamonds} onBack={onBack} />
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ background: `${game.color}20` }}>
          <span className={`text-7xl ${playing ? "animate-bounce" : ""}`}>{game.icon}</span>
        </div>
        <h2 className="text-xl font-bold text-white">{game.name}</h2>
        <p className="text-sm text-[#8888AA] text-center">{game.description}</p>
        {game.jackpot && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass">
            <Trophy className="w-4 h-4 text-[#FFD700]" />
            <span className="text-sm text-[#8888AA]">Jackpot:</span>
            <span className="text-lg font-bold text-[#FFD700]">{formatNumber(game.jackpot)} D</span>
          </div>
        )}
        <div className="flex items-center gap-3">
          {[game.entryFee, game.entryFee * 5, game.entryFee * 10, game.entryFee * 50].map(b => (
            <button key={b} onClick={() => !playing && setBet(b)} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: bet === b ? game.color : "rgba(255,255,255,0.05)", color: bet === b ? "#FFFFFF" : "#8888AA" }}>
              {formatNumber(b)}
            </button>
          ))}
        </div>
        <button onClick={play} disabled={playing || diamonds < bet} className="w-full max-w-[280px] py-3.5 rounded-2xl text-sm font-bold text-white disabled:opacity-40" style={{ background: `linear-gradient(135deg, ${game.color}, #FFD700)` }}>
          {playing ? "Playing..." : `Play (${formatNumber(bet)} D)`}
        </button>
      </div>
      {result && <ResultOverlay isWin={result.isWin} amount={result.amount} onClose={() => setResult(null)} />}
    </div>
  )
}
