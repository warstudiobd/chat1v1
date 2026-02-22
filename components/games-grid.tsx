import { Gamepad2, Diamond } from "lucide-react";
import Link from "next/link";

const games = [
  { icon: "cat-face", name: "Greedy Cat", players: "12.8K", cost: 100 },
  { icon: "spade", name: "Teen Patti", players: "8.9K", cost: 500 },
  { icon: "wheel", name: "Lucky Wheel", players: "15.6K", cost: 50 },
  { icon: "dice", name: "Ludo King", players: "6.7K", cost: 200 },
  { icon: "coin", name: "Coin Flip", players: "21.3K", cost: 100 },
  { icon: "cards", name: "Rummy", players: "5.4K", cost: 300 },
];

const gameIcons: Record<string, string> = {
  "cat-face": "C",
  spade: "T",
  wheel: "L",
  dice: "D",
  coin: "F",
  cards: "R",
};

const gameGradients = [
  "from-purple-500 to-pink-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-yellow-500 to-orange-500",
  "from-red-500 to-pink-500",
  "from-indigo-500 to-purple-500",
];

export function GamesGrid() {
  return (
    <section className="mb-4 px-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Gamepad2 className="h-3.5 w-3.5 text-gold" />
          <h2 className="text-sm font-bold text-foreground">Games</h2>
        </div>
        <Link href="/games" className="text-[10px] font-semibold text-pink">
          See All
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {games.map((game, i) => (
          <button
            key={i}
            className="flex flex-col items-center gap-1 rounded-xl p-3"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${gameGradients[i]} text-lg font-bold text-foreground`}
            >
              {gameIcons[game.icon]}
            </div>
            <span className="text-[9px] font-bold text-foreground">
              {game.name}
            </span>
            <div className="flex items-center gap-0.5">
              <Diamond className="h-2 w-2 text-cyan-400" />
              <span className="text-[7px] font-bold text-gold">
                {game.cost}
              </span>
            </div>
            <span className="text-[6px] text-muted-foreground">
              {game.players} playing
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
