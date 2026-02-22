"use client";

import { useState } from "react";
import { useUser } from "@/components/user-provider";
import { formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";
import {
  Diamond,
  Users,
  Loader2,
  Trophy,
  Flame,
  Sparkles,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { GreedyGame } from "@/components/games/greedy-game";
import { SlotMachine } from "@/components/games/slot-machine";
import { MatchThree } from "@/components/games/match-three";

/* ----------- Featured full-screen games ----------- */
const FEATURED = [
  {
    id: "greedy",
    name: "Greedy BIGO",
    description: "Pick food items on the wheel and win up to 45x your bet!",
    icon: "\u{1F425}",
    players: "24.6K",
    gradient: "from-amber-400 to-orange-500",
    tag: "HOT",
    tagColor: "bg-red-500",
  },
  {
    id: "slots",
    name: "Greedy Wolf",
    description: "Spin 5 reels with wild symbols for massive slot payouts!",
    icon: "\u{1F43A}",
    players: "18.2K",
    gradient: "from-green-600 to-emerald-700",
    tag: "NEW",
    tagColor: "bg-blue-500",
  },
  {
    id: "match3",
    name: "Sweet Match",
    description: "Classic match-3 puzzle! Match food items to earn diamonds!",
    icon: "\u{1F370}",
    players: "15.9K",
    gradient: "from-sky-400 to-blue-500",
    tag: "FUN",
    tagColor: "bg-purple-500",
  },
] as const;

/* ----------- Mini quick-play games ----------- */
type MiniGame = {
  id: string;
  name: string;
  cost: number;
  maxWin: number;
  icon: string;
  gradient: string;
  players: string;
};

const MINI_GAMES: MiniGame[] = [
  { id: "lucky_box", name: "Lucky Box", cost: 10, maxWin: 100, icon: "\u{1F381}", gradient: "from-amber-500 to-orange-600", players: "12.1K" },
  { id: "dice_duel", name: "Dice Duel", cost: 20, maxWin: 200, icon: "\u{1F3B2}", gradient: "from-red-500 to-pink-600", players: "9.8K" },
  { id: "coin_flip", name: "Coin Flip", cost: 15, maxWin: 30, icon: "\u{1FA99}", gradient: "from-yellow-400 to-amber-500", players: "21.3K" },
  { id: "lucky_spin", name: "Lucky Spin", cost: 50, maxWin: 500, icon: "\u{1F3A1}", gradient: "from-purple-500 to-indigo-600", players: "15.6K" },
  { id: "treasure", name: "Treasure Hunt", cost: 30, maxWin: 300, icon: "\u{1F48E}", gradient: "from-emerald-500 to-teal-600", players: "7.4K" },
  { id: "rocket", name: "Rocket Crash", cost: 25, maxWin: 250, icon: "\u{1F680}", gradient: "from-blue-500 to-cyan-600", players: "11.2K" },
  { id: "patti", name: "Teen Patti", cost: 500, maxWin: 5000, icon: "\u{1F0CF}", gradient: "from-green-500 to-emerald-600", players: "8.9K" },
  { id: "ludo", name: "Ludo King", cost: 200, maxWin: 2000, icon: "\u{1F3B2}", gradient: "from-blue-500 to-indigo-600", players: "6.7K" },
  { id: "arena", name: "Battle Arena", cost: 300, maxWin: 3000, icon: "\u{2694}\u{FE0F}", gradient: "from-red-600 to-rose-700", players: "5.4K" },
];

type MiniResult = { won: boolean; amount: number; gameName: string };

export function GamesView() {
  const { profile } = useUser();
  const [openGame, setOpenGame] = useState<string | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [miniResult, setMiniResult] = useState<MiniResult | null>(null);

  async function playMini(game: MiniGame) {
    if (!profile || profile.diamonds < game.cost) return;
    setPlaying(game.id);
    setMiniResult(null);

    const supabase = createClient();
    await supabase.from("profiles").update({ diamonds: profile.diamonds - game.cost }).eq("id", profile.id);
    await new Promise((r) => setTimeout(r, 1500));

    const won = Math.random() < 0.4;
    const amount = won ? Math.floor(Math.random() * game.maxWin) + 1 : 0;

    if (won && amount > 0) {
      await supabase.from("profiles").update({ diamonds: profile.diamonds - game.cost + amount }).eq("id", profile.id);
    }

    setMiniResult({ won, amount, gameName: game.name });
    setPlaying(null);
  }

  /* Full-screen game overlays */
  if (openGame === "greedy") return <GreedyGame onClose={() => setOpenGame(null)} />;
  if (openGame === "slots") return <SlotMachine onClose={() => setOpenGame(null)} />;
  if (openGame === "match3") return <MatchThree onClose={() => setOpenGame(null)} />;

  return (
    <div className="p-4">
      <div className="mx-auto max-w-lg">
        {/* Balance card */}
        <div className="mb-5 flex items-center justify-between rounded-2xl bg-gradient-to-r from-card to-secondary p-4 border border-border/50">
          <div>
            <span className="text-xs text-muted-foreground">Your Balance</span>
            <div className="flex items-center gap-2 mt-0.5">
              <Diamond className="h-5 w-5 text-gold" />
              <span className="text-2xl font-black text-foreground">{formatNumber(profile?.diamonds || 0)}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-gold/20 px-3 py-1.5">
            <Trophy className="h-3.5 w-3.5 text-gold" />
            <span className="text-xs font-bold text-gold">Level {profile?.level || 1}</span>
          </div>
        </div>

        {/* Featured games (large cards) */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="h-4 w-4 text-orange-400" />
            <h3 className="text-sm font-bold text-foreground">Featured Games</h3>
          </div>
          <div className="flex flex-col gap-3">
            {FEATURED.map((game) => (
              <button
                key={game.id}
                onClick={() => setOpenGame(game.id)}
                className={cn(
                  "relative flex items-center gap-4 rounded-2xl bg-gradient-to-r p-4 text-left transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg",
                  game.gradient
                )}
              >
                <span className="absolute top-2 right-2 rounded-full px-2 py-0.5 text-[9px] font-bold text-white shadow-sm" style={{ backgroundColor: "" }}>
                  <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-bold text-white", game.tagColor)}>
                    {game.tag}
                  </span>
                </span>
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-4xl backdrop-blur-sm">
                  {game.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-black text-white">{game.name}</h4>
                  <p className="mt-0.5 text-xs text-white/75 line-clamp-2">{game.description}</p>
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] text-white/60">
                    <Users className="h-3 w-3" />
                    {game.players} playing
                  </div>
                </div>
                <div className="shrink-0 rounded-xl bg-white/25 px-3 py-2 backdrop-blur-sm">
                  <span className="text-xs font-black text-white">PLAY</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Result banner */}
        {miniResult && (
          <div className={cn(
            "mb-4 flex items-center gap-3 rounded-xl px-4 py-3 animate-bounce-in",
            miniResult.won ? "bg-gradient-to-r from-gold/20 to-amber-500/10 border border-gold/30" : "bg-destructive/10 border border-destructive/20"
          )}>
            <span className="text-2xl">{miniResult.won ? "\u{1F389}" : "\u{1F614}"}</span>
            <div>
              <span className={cn("text-sm font-bold", miniResult.won ? "text-gold" : "text-destructive")}>
                {miniResult.won ? `Won ${formatNumber(miniResult.amount)} diamonds!` : "Better luck next time!"}
              </span>
              <p className="text-[10px] text-muted-foreground">{miniResult.gameName}</p>
            </div>
          </div>
        )}

        {/* Quick play grid */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <h3 className="text-sm font-bold text-foreground">Quick Play</h3>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {MINI_GAMES.map((game) => {
              const isPlaying = playing === game.id;
              const canAfford = (profile?.diamonds ?? 0) >= game.cost;
              return (
                <button
                  key={game.id}
                  onClick={() => playMini(game)}
                  disabled={isPlaying || !!playing || !canAfford}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-2xl border border-border/50 bg-card p-3 transition-all",
                    isPlaying && "animate-pulse",
                    canAfford ? "hover:scale-105 hover:border-primary/50 active:scale-95" : "opacity-40"
                  )}
                >
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-2xl", game.gradient)}>
                    {isPlaying ? <Loader2 className="h-6 w-6 animate-spin text-white" /> : game.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-foreground">{game.name}</span>
                  <div className="flex items-center gap-0.5">
                    <Diamond className="h-2.5 w-2.5 text-cyan-400" />
                    <span className="text-[10px] font-bold text-cyan-400">{game.cost}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-[8px] text-muted-foreground">
                    <Users className="h-2 w-2" />
                    {game.players}
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
