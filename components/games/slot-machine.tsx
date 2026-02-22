"use client";

import { useState, useRef } from "react";
import { X, Diamond } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { useUser } from "@/components/user-provider";
import { createClient } from "@/lib/supabase/client";

const SYMBOLS = [
  { id: "wolf", emoji: "\u{1F43A}", name: "Wolf", value: 50 },
  { id: "pig", emoji: "\u{1F437}", name: "Pig", value: 30 },
  { id: "wild", emoji: "\u{2B50}", name: "Wild", value: 100 },
  { id: "king", emoji: "\u{1F451}", name: "King", value: 40 },
  { id: "queen", emoji: "\u{1F478}", name: "Queen", value: 35 },
  { id: "jack", emoji: "\u{1F934}", name: "Jack", value: 25 },
  { id: "ten", emoji: "\u{1F51F}", name: "10", value: 15 },
  { id: "ace", emoji: "\u{1F0CF}", name: "Ace", value: 20 },
];

const BET_AMOUNTS = [100, 200, 500, 1000, 2500, 5000];

type ReelResult = (typeof SYMBOLS)[number];

export function SlotMachine({ onClose }: { onClose: () => void }) {
  const { profile, updateDiamonds } = useUser();
  const [bet, setBet] = useState(100);
  const [spinning, setSpinning] = useState(false);
  const [reels, setReels] = useState<ReelResult[][]>([
    [SYMBOLS[0], SYMBOLS[1], SYMBOLS[2]],
    [SYMBOLS[3], SYMBOLS[4], SYMBOLS[5]],
    [SYMBOLS[6], SYMBOLS[7], SYMBOLS[0]],
    [SYMBOLS[1], SYMBOLS[2], SYMBOLS[3]],
    [SYMBOLS[4], SYMBOLS[5], SYMBOLS[6]],
  ]);
  const [winAmount, setWinAmount] = useState<number | null>(null);
  const [winLine, setWinLine] = useState<number | null>(null);
  const [totalWon, setTotalWon] = useState(0);
  const spinAudioRef = useRef<boolean>(false);

  function getRandomSymbol(): ReelResult {
    const roll = Math.random();
    if (roll < 0.05) return SYMBOLS.find((s) => s.id === "wild")!;
    if (roll < 0.15) return SYMBOLS.find((s) => s.id === "wolf")!;
    return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  }

  async function spin() {
    if (!profile || spinning) return;
    if (profile.diamonds < bet) return;

    setSpinning(true);
    setWinAmount(null);
    setWinLine(null);

    const supabase = createClient();
    const afterBet = profile.diamonds - bet;
    updateDiamonds(afterBet);
    await supabase
      .from("profiles")
      .update({ diamonds: afterBet })
      .eq("id", profile.id);

    /* Generate new reels with delays for animation */
    const newReels: ReelResult[][] = [];
    for (let col = 0; col < 5; col++) {
      const colSymbols: ReelResult[] = [];
      for (let row = 0; row < 3; row++) {
        colSymbols.push(getRandomSymbol());
      }
      newReels.push(colSymbols);
    }

    /* Animate each reel stopping */
    for (let col = 0; col < 5; col++) {
      await new Promise((r) => setTimeout(r, 300));
      setReels((prev) => {
        const updated = [...prev];
        updated[col] = newReels[col];
        return updated;
      });
    }

    /* Check win lines (check middle row for matching) */
    const middleRow = newReels.map((col) => col[1]);
    let matches = 1;
    const firstSymbol = middleRow[0];
    for (let i = 1; i < middleRow.length; i++) {
      if (middleRow[i].id === firstSymbol.id || middleRow[i].id === "wild" || firstSymbol.id === "wild") {
        matches++;
      } else {
        break;
      }
    }

    let win = 0;
    if (matches >= 3) {
      const multiplier = matches === 5 ? 25 : matches === 4 ? 10 : 3;
      win = bet * multiplier;
      setWinLine(1);

      const afterWin = afterBet + win;
      updateDiamonds(afterWin);
      await supabase
        .from("profiles")
        .update({ diamonds: afterWin })
        .eq("id", profile.id);
    }

    /* Also check top and bottom rows */
    if (win === 0) {
      for (const rowIdx of [0, 2]) {
        const row = newReels.map((col) => col[rowIdx]);
        let rowMatches = 1;
        const first = row[0];
        for (let i = 1; i < row.length; i++) {
          if (row[i].id === first.id || row[i].id === "wild" || first.id === "wild") {
            rowMatches++;
          } else break;
        }
        if (rowMatches >= 3) {
          const mult = rowMatches === 5 ? 25 : rowMatches === 4 ? 10 : 3;
          win = bet * mult;
          setWinLine(rowIdx);
          const afterWin2 = afterBet + win;
          updateDiamonds(afterWin2);
          await supabase
            .from("profiles")
            .update({ diamonds: afterWin2 })
            .eq("id", profile.id);
          break;
        }
      }
    }

    setWinAmount(win);
    if (win > 0) setTotalWon((prev) => prev + win);
    setSpinning(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-b from-green-800 via-green-900 to-green-950 overflow-hidden">
      {/* Header */}
      <header className="flex h-14 items-center justify-between px-4">
        <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-black text-amber-400 drop-shadow-lg tracking-tight">
          Greedy Wolf
        </h1>
        <div className="flex items-center gap-1 rounded-full bg-black/30 px-3 py-1.5">
          <Diamond className="h-3.5 w-3.5 text-amber-400" />
          <span className="text-sm font-bold text-white">{formatNumber(profile?.diamonds ?? 0)}</span>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4">
        {/* Slot machine frame */}
        <div className="w-full max-w-sm rounded-2xl border-4 border-amber-600 bg-gradient-to-b from-amber-900/80 to-amber-950/80 p-3 shadow-2xl">
          {/* Reels */}
          <div className="grid grid-cols-5 gap-1.5 rounded-xl bg-black/40 p-2">
            {reels.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-1">
                {col.map((symbol, rowIdx) => (
                  <div
                    key={`${colIdx}-${rowIdx}`}
                    className={cn(
                      "flex h-16 items-center justify-center rounded-lg border-2 transition-all duration-300",
                      spinning && "animate-pulse",
                      winLine === rowIdx && winAmount && winAmount > 0
                        ? "border-amber-400 bg-amber-500/20 shadow-[0_0_12px_rgba(255,200,0,0.4)]"
                        : "border-amber-800/50 bg-gradient-to-b from-green-800/60 to-green-900/60"
                    )}
                  >
                    <span className="text-3xl">{symbol.emoji}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Win display */}
          {winAmount !== null && (
            <div className={cn(
              "mt-2 flex items-center justify-center gap-2 rounded-lg py-2 text-center animate-bounce-in",
              winAmount > 0 ? "bg-amber-500/20" : "bg-red-500/10"
            )}>
              {winAmount > 0 ? (
                <>
                  <span className="text-lg">{"\u{1F389}"}</span>
                  <span className="text-base font-black text-amber-400">
                    WIN {formatNumber(winAmount)}
                  </span>
                  <Diamond className="h-4 w-4 text-amber-400" />
                </>
              ) : (
                <span className="text-sm font-bold text-red-400/70">No win - try again!</span>
              )}
            </div>
          )}
        </div>

        {/* Bet controls */}
        <div className="w-full max-w-sm">
          <p className="mb-2 text-center text-xs font-bold text-green-300/60">Bet Amount</p>
          <div className="grid grid-cols-6 gap-1.5">
            {BET_AMOUNTS.map((b) => (
              <button
                key={b}
                onClick={() => setBet(b)}
                disabled={spinning}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-xl py-2 text-xs font-bold transition-all",
                  bet === b
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30"
                    : "bg-white/10 text-white/70 hover:bg-white/15"
                )}
              >
                <Diamond className="h-3 w-3" />
                <span>{b}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Spin button */}
        <button
          onClick={spin}
          disabled={spinning || (profile?.diamonds ?? 0) < bet}
          className={cn(
            "w-full max-w-sm rounded-2xl py-4 text-lg font-black tracking-wide shadow-xl transition-all",
            !spinning && (profile?.diamonds ?? 0) >= bet
              ? "bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:scale-[1.02] active:scale-[0.98] shadow-amber-500/40"
              : "bg-gray-600 text-gray-400"
          )}
        >
          {spinning ? "SPINNING..." : "SPIN"}
        </button>

        {/* Stats */}
        <div className="flex gap-3">
          <div className="flex items-center gap-2 rounded-full bg-black/30 px-4 py-2">
            <span className="text-xs text-green-300/60">Total Won</span>
            <Diamond className="h-3 w-3 text-amber-400" />
            <span className="text-sm font-bold text-amber-400">{formatNumber(totalWon)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
