"use client";

import { useState } from "react";
import { X, Diamond, Coins, Trophy, Sparkles, Loader2 } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { useUser } from "@/components/user-provider";
import { createClient } from "@/lib/supabase/client";

type Game = {
  id: string;
  name: string;
  description: string;
  cost: number;
  minWin: number;
  maxWin: number;
  color: string;
  icon: string;
};

const ROOM_GAMES: Game[] = [
  {
    id: "lucky_box",
    name: "Lucky Box",
    description: "Open a mystery box for prizes!",
    cost: 10,
    minWin: 0,
    maxWin: 100,
    color: "from-amber-500 to-orange-600",
    icon: "\u{1F381}",
  },
  {
    id: "dice_duel",
    name: "Dice Duel",
    description: "Roll high to win big!",
    cost: 20,
    minWin: 0,
    maxWin: 200,
    color: "from-red-500 to-pink-600",
    icon: "\u{1F3B2}",
  },
  {
    id: "coin_flip",
    name: "Coin Flip",
    description: "Heads or tails? Double or nothing!",
    cost: 15,
    minWin: 0,
    maxWin: 30,
    color: "from-yellow-400 to-amber-500",
    icon: "\u{1FA99}",
  },
  {
    id: "lucky_spin",
    name: "Lucky Spin",
    description: "Spin the wheel of fortune!",
    cost: 50,
    minWin: 0,
    maxWin: 500,
    color: "from-purple-500 to-indigo-600",
    icon: "\u{1F3A1}",
  },
  {
    id: "treasure_hunt",
    name: "Treasure Hunt",
    description: "Dig for hidden treasure!",
    cost: 30,
    minWin: 0,
    maxWin: 300,
    color: "from-emerald-500 to-teal-600",
    icon: "\u{1F48E}",
  },
  {
    id: "rocket_crash",
    name: "Rocket Crash",
    description: "Cash out before it crashes!",
    cost: 25,
    minWin: 0,
    maxWin: 250,
    color: "from-blue-500 to-cyan-600",
    icon: "\u{1F680}",
  },
];

type GameResult = {
  won: boolean;
  amount: number;
  game: Game;
};

export function RoomGames({ onClose }: { onClose: () => void }) {
  const { profile } = useUser();
  const [playing, setPlaying] = useState<string | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);

  async function playGame(game: Game) {
    if (!profile) return;
    if (profile.diamonds < game.cost) return;

    setPlaying(game.id);
    setResult(null);

    const supabase = createClient();

    // Deduct cost
    const { error: deductError } = await supabase
      .from("profiles")
      .update({ diamonds: profile.diamonds - game.cost })
      .eq("id", profile.id);

    if (deductError) {
      setPlaying(null);
      return;
    }

    // Simulate game play (1.5s delay)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Calculate result: 40% chance to win
    const won = Math.random() < 0.4;
    const winAmount = won
      ? Math.floor(Math.random() * (game.maxWin - game.minWin + 1)) + game.minWin + 1
      : 0;

    if (won && winAmount > 0) {
      await supabase
        .from("profiles")
        .update({ diamonds: profile.diamonds - game.cost + winAmount })
        .eq("id", profile.id);
    }

    setResult({ won, amount: winAmount, game });
    setPlaying(null);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-background/50" onClick={onClose} />
      <div className="relative w-full max-w-lg animate-slide-up rounded-t-3xl border-t border-border bg-card">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-foreground">Room Games</h3>
            <div className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5">
              <Diamond className="h-3 w-3 text-cyan-400" />
              <span className="text-[10px] font-bold text-foreground">
                {formatNumber(profile?.diamonds ?? 0)}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Result banner */}
        {result && (
          <div
            className={cn(
              "mx-4 mb-3 flex items-center gap-3 rounded-xl px-4 py-3",
              result.won
                ? "bg-gradient-to-r from-gold/20 to-amber-500/10 border border-gold/30"
                : "bg-destructive/10 border border-destructive/20"
            )}
          >
            <span className="text-2xl">
              {result.won ? "\u{1F389}" : "\u{1F614}"}
            </span>
            <div className="flex flex-col">
              <span
                className={cn(
                  "text-sm font-bold",
                  result.won ? "text-gold" : "text-destructive"
                )}
              >
                {result.won ? "You Won!" : "Better luck next time!"}
              </span>
              <span className="text-[11px] text-muted-foreground">
                {result.won ? (
                  <>
                    {"Won "}
                    <span className="font-bold text-gold">
                      {result.amount}
                    </span>
                    {" diamonds from "}
                    {result.game.name}
                  </>
                ) : (
                  <>
                    {"Lost "}
                    {result.game.cost}
                    {" diamonds on "}
                    {result.game.name}
                  </>
                )}
              </span>
            </div>
          </div>
        )}

        {/* Game grid */}
        <div className="grid grid-cols-3 gap-2.5 px-4 pb-6">
          {ROOM_GAMES.map((game) => {
            const isPlaying = playing === game.id;
            const canAfford = (profile?.diamonds ?? 0) >= game.cost;

            return (
              <button
                key={game.id}
                onClick={() => playGame(game)}
                disabled={isPlaying || !!playing || !canAfford}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-2xl p-3 transition-all",
                  "border border-border/50",
                  isPlaying && "animate-pulse",
                  canAfford
                    ? "hover:scale-105 hover:border-primary/50 active:scale-95"
                    : "opacity-40"
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-2xl",
                    game.color
                  )}
                >
                  {isPlaying ? (
                    <Loader2 className="h-6 w-6 animate-spin text-white" />
                  ) : (
                    game.icon
                  )}
                </div>
                <span className="text-[11px] font-semibold text-foreground">
                  {game.name}
                </span>
                <div className="flex items-center gap-0.5">
                  <Diamond className="h-2.5 w-2.5 text-cyan-400" />
                  <span className="text-[10px] font-bold text-cyan-400">
                    {game.cost}
                  </span>
                </div>
                <span className="text-[9px] text-muted-foreground">
                  {"Win up to "}
                  {game.maxWin}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
