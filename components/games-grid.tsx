import { Gamepad2, Coins, Users } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const games = [
  { icon: "\u{1F431}", name: "Greedy Cat", players: "12.8K", cost: 1000, gradient: "from-amber-500 to-orange-500" },
  { icon: "\u{2660}\u{FE0F}", name: "Teen Patti", players: "8.9K", cost: 5000, gradient: "from-red-500 to-rose-500" },
  { icon: "\u{1F3A1}", name: "Lucky Wheel", players: "15.6K", cost: 500, gradient: "from-purple-500 to-violet-500" },
  { icon: "\u{1F3B2}", name: "Ludo King", players: "6.7K", cost: 2000, gradient: "from-blue-500 to-cyan-500" },
  { icon: "\u{1FA99}", name: "Coin Flip", players: "21.3K", cost: 1000, gradient: "from-yellow-500 to-amber-500" },
  { icon: "\u{1F0CF}", name: "Rummy", players: "5.4K", cost: 3000, gradient: "from-emerald-500 to-green-500" },
  { icon: "\u{1F680}", name: "Crash", players: "18.2K", cost: 2500, gradient: "from-indigo-500 to-blue-500" },
  { icon: "\u{1F48E}", name: "Treasure", players: "9.1K", cost: 1500, gradient: "from-pink-500 to-rose-500" },
  { icon: "\u{1F3AF}", name: "Dart King", players: "7.3K", cost: 800, gradient: "from-teal-500 to-emerald-500" },
];

export function GamesGrid() {
  return (
    <section className="mb-4 px-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Gamepad2 className="h-3.5 w-3.5 text-gold" />
          <h2 className="text-sm font-bold text-foreground">Games</h2>
        </div>
        <Link href="/games" className="text-[10px] font-semibold text-pink">See All</Link>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {games.map((game, i) => (
          <button
            key={i}
            className="flex flex-col items-center gap-1.5 rounded-xl glass p-3 transition-all hover:scale-105 active:scale-95"
          >
            <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-xl", game.gradient)}>
              {game.icon}
            </div>
            <span className="text-[10px] font-bold text-foreground">{game.name}</span>
            <div className="flex items-center gap-0.5">
              <Coins className="h-2.5 w-2.5 text-gold" />
              <span className="text-[8px] font-bold text-gold">{game.cost.toLocaleString()}</span>
            </div>
            <span className="flex items-center gap-0.5 text-[7px] text-muted-foreground">
              <Users className="h-2 w-2" />
              {game.players}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
