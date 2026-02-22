"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/user-provider";
import { formatNumber } from "@/lib/utils";
import {
  ArrowLeft,
  Diamond,
  Users,
  X,
  Gamepad2,
  Dices,
  Target,
  Coins,
  Trophy,
  Swords,
} from "lucide-react";

const games = [
  {
    id: 1,
    name: "Greedy Cat",
    icon: Gamepad2,
    players: "12.8K",
    entry: 100,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: 2,
    name: "Teen Patti",
    icon: Swords,
    players: "8.9K",
    entry: 500,
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: 3,
    name: "Lucky Wheel",
    icon: Target,
    players: "15.6K",
    entry: 50,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: 4,
    name: "Ludo King",
    icon: Dices,
    players: "6.7K",
    entry: 200,
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    id: 5,
    name: "Coin Flip",
    icon: Coins,
    players: "21.3K",
    entry: 100,
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    id: 6,
    name: "Battle Arena",
    icon: Trophy,
    players: "5.4K",
    entry: 300,
    gradient: "from-red-500 to-rose-600",
  },
];

type Game = (typeof games)[number];

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const { profile } = useUser();
  const router = useRouter();

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-lg">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Games</h1>
        </div>

        {/* Balance */}
        <div className="mb-6 flex items-center justify-between rounded-xl bg-card p-4">
          <span className="text-sm text-muted-foreground">Your Diamonds</span>
          <div className="flex items-center gap-2">
            <Diamond className="h-5 w-5 text-gold" />
            <span className="text-xl font-bold text-foreground">
              {formatNumber(profile?.diamonds || 0)}
            </span>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 gap-3">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game)}
              className={`rounded-2xl bg-gradient-to-br ${game.gradient} p-5 text-center transition-transform hover:scale-[1.03] active:scale-[0.98]`}
            >
              <game.icon className="mx-auto mb-2 h-10 w-10 text-white" />
              <h3 className="font-bold text-white">{game.name}</h3>
              <p className="mt-1 flex items-center justify-center gap-1 text-xs text-white/70">
                <Users className="h-3 w-3" />
                {game.players}
              </p>
              <p className="mt-2 flex items-center justify-center gap-1 text-xs font-bold text-white">
                <Diamond className="h-3 w-3" />
                {game.entry}
              </p>
            </button>
          ))}
        </div>

        {/* Game Modal */}
        {selectedGame && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-background/80"
              onClick={() => setSelectedGame(null)}
            />
            <div
              className={`relative w-full max-w-sm rounded-2xl bg-gradient-to-br ${selectedGame.gradient} p-6`}
            >
              <button
                onClick={() => setSelectedGame(null)}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/20 text-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mb-4 text-center">
                <selectedGame.icon className="mx-auto mb-3 h-16 w-16 text-white" />
                <h2 className="text-2xl font-bold text-white">
                  {selectedGame.name}
                </h2>
                <p className="mt-1 flex items-center justify-center gap-1 text-sm text-white/70">
                  <Users className="h-3.5 w-3.5" />
                  {selectedGame.players} players online
                </p>
              </div>

              <div className="mb-4 rounded-xl bg-black/20 p-4">
                <div className="mb-2 flex items-center justify-between text-sm text-white">
                  <span>Entry Fee:</span>
                  <span className="flex items-center gap-1 font-bold">
                    <Diamond className="h-3.5 w-3.5" />
                    {selectedGame.entry}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-white">
                  <span>Max Win:</span>
                  <span className="flex items-center gap-1 font-bold">
                    <Diamond className="h-3.5 w-3.5" />
                    {(selectedGame.entry * 10).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedGame(null)}
                  className="flex-1 rounded-xl bg-white/20 py-3 text-sm font-semibold text-white"
                >
                  Cancel
                </button>
                <button className="flex-1 rounded-xl bg-white py-3 text-sm font-semibold text-background">
                  Play Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
