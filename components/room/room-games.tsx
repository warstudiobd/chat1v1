"use client";

import { useState } from "react";
import { X, Diamond, Users, Loader2 } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { useUser } from "@/components/user-provider";
import { createClient } from "@/lib/supabase/client";
import { GreedyGame } from "@/components/games/greedy-game";
import { SlotMachine } from "@/components/games/slot-machine";
import { MatchThree } from "@/components/games/match-three";

/* Full-screen games that open as overlays */
const FULLSCREEN_GAMES = [
  {
    id: "greedy",
    name: "Greedy BIGO",
    description: "Pick food & win up to 45x!",
    icon: "\u{1F425}",
    players: "24.6K",
    gradient: "from-amber-400 to-orange-500",
    hot: true,
  },
  {
    id: "slots",
    name: "Greedy Wolf",
    description: "Spin the reels for big wins",
    icon: "\u{1F43A}",
    players: "18.2K",
    gradient: "from-green-600 to-emerald-700",
    hot: false,
  },
  {
    id: "match3",
    name: "Sweet Match",
    description: "Match 3 to earn diamonds",
    icon: "\u{1F370}",
    players: "15.9K",
    gradient: "from-sky-400 to-blue-500",
    hot: false,
  },
] as const;

/* Quick play mini-games that play inline */
type MiniGame = {
  id: string;
  name: string;
  description: string;
  cost: number;
  maxWin: number;
  icon: string;
  gradient: string;
};

const MINI_GAMES: MiniGame[] = [
  { id: "lucky_box", name: "Lucky Box", description: "Mystery prize!", cost: 100, maxWin: 1000, icon: "\u{1F381}", gradient: "from-amber-500 to-orange-600" },
  { id: "dice_duel", name: "Dice Duel", description: "Roll high to win!", cost: 200, maxWin: 2000, icon: "\u{1F3B2}", gradient: "from-red-500 to-pink-600" },
  { id: "coin_flip", name: "Coin Flip", description: "Double or nothing!", cost: 100, maxWin: 200, icon: "\u{1FA99}", gradient: "from-yellow-400 to-amber-500" },
  { id: "lucky_spin", name: "Lucky Spin", description: "Spin the wheel!", cost: 500, maxWin: 5000, icon: "\u{1F3A1}", gradient: "from-purple-500 to-indigo-600" },
  { id: "treasure", name: "Treasure Hunt", description: "Dig for gems!", cost: 300, maxWin: 3000, icon: "\u{1F48E}", gradient: "from-emerald-500 to-teal-600" },
  { id: "rocket", name: "Rocket Crash", description: "Cash out in time!", cost: 200, maxWin: 2500, icon: "\u{1F680}", gradient: "from-blue-500 to-cyan-600" },
];

type MiniResult = { won: boolean; amount: number; game: MiniGame };

export function RoomGames({ onClose }: { onClose: () => void }) {
  const { profile, updateDiamonds } = useUser();
  const [openGame, setOpenGame] = useState<string | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [miniResult, setMiniResult] = useState<MiniResult | null>(null);

  async function playMini(game: MiniGame) {
    if (!profile || profile.diamonds < game.cost) return;
    setPlaying(game.id);
    setMiniResult(null);

    const supabase = createClient();
    const afterBet = profile.diamonds - game.cost;
    updateDiamonds(afterBet);
    await supabase.from("profiles").update({ diamonds: afterBet }).eq("id", profile.id);

    await new Promise((r) => setTimeout(r, 1500));

    const won = Math.random() < 0.4;
    const amount = won ? Math.floor(Math.random() * game.maxWin) + game.cost : 0;

    if (won && amount > 0) {
      const afterWin = afterBet + amount;
      updateDiamonds(afterWin);
      await supabase.from("profiles").update({ diamonds: afterWin }).eq("id", profile.id);
    }

    setMiniResult({ won, amount, game });
    setPlaying(null);
  }

  /* Render full-screen game overlays */
  if (openGame === "greedy") return <GreedyGame onClose={() => setOpenGame(null)} />;
  if (openGame === "slots") return <SlotMachine onClose={() => setOpenGame(null)} />;
  if (openGame === "match3") return <MatchThree onClose={() => setOpenGame(null)} />;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-background/50" onClick={onClose} />
      <div className="relative w-full max-w-lg animate-slide-up rounded-t-3xl border-t border-border bg-card max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-card px-4 py-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-foreground">Games</span>
            <div className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5">
              <Diamond className="h-3 w-3 text-cyan-400" />
              <span className="text-[10px] font-bold text-foreground">{formatNumber(profile?.diamonds ?? 0)}</span>
            </div>
          </div>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Featured full-screen games */}
        <div className="p-4">
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Featured Games</h4>
          <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1">
            {FULLSCREEN_GAMES.map((game) => (
              <button
                key={game.id}
                onClick={() => setOpenGame(game.id)}
                className={cn(
                  "relative shrink-0 w-[140px] rounded-2xl bg-gradient-to-br p-4 text-left transition-all hover:scale-[1.03] active:scale-[0.97]",
                  game.gradient
                )}
              >
                {game.hot && (
                  <span className="absolute -top-1 -right-1 rounded-full bg-red-500 px-2 py-0.5 text-[8px] font-bold text-white shadow-sm">
                    HOT
                  </span>
                )}
                <span className="text-3xl">{game.icon}</span>
                <h5 className="mt-2 text-sm font-black text-white">{game.name}</h5>
                <p className="mt-0.5 text-[10px] text-white/70">{game.description}</p>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-white/60">
                  <Users className="h-2.5 w-2.5" />
                  {game.players}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mini result */}
        {miniResult && (
          <div className={cn(
            "mx-4 mb-3 flex items-center gap-3 rounded-xl px-4 py-3 animate-bounce-in",
            miniResult.won ? "bg-gradient-to-r from-gold/20 to-amber-500/10 border border-gold/30" : "bg-destructive/10 border border-destructive/20"
          )}>
            <span className="text-2xl">{miniResult.won ? "\u{1F389}" : "\u{1F614}"}</span>
            <div>
              <span className={cn("text-sm font-bold", miniResult.won ? "text-gold" : "text-destructive")}>
                {miniResult.won ? `Won ${formatNumber(miniResult.amount)}!` : "Try again!"}
              </span>
              <p className="text-[10px] text-muted-foreground">{miniResult.game.name}</p>
            </div>
          </div>
        )}

        {/* Quick-play mini games */}
        <div className="px-4 pb-6">
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Quick Play</h4>
          <div className="grid grid-cols-3 gap-2">
            {MINI_GAMES.map((game) => {
              const isPlaying = playing === game.id;
              const canAfford = (profile?.diamonds ?? 0) >= game.cost;
              return (
                <button
                  key={game.id}
                  onClick={() => playMini(game)}
                  disabled={isPlaying || !!playing || !canAfford}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-2xl border border-border/50 p-3 transition-all",
                    isPlaying && "animate-pulse",
                    canAfford ? "hover:scale-105 active:scale-95" : "opacity-40"
                  )}
                >
                  <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-xl", game.gradient)}>
                    {isPlaying ? <Loader2 className="h-5 w-5 animate-spin text-white" /> : game.icon}
                  </div>
                  <span className="text-[10px] font-semibold text-foreground">{game.name}</span>
                  <div className="flex items-center gap-0.5">
                    <Diamond className="h-2.5 w-2.5 text-cyan-400" />
                    <span className="text-[9px] font-bold text-cyan-400">{game.cost}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
