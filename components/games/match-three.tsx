"use client";

import { useState, useCallback, useEffect } from "react";
import { X, Diamond, RotateCcw } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { useUser } from "@/components/user-provider";
import { createClient } from "@/lib/supabase/client";

const ITEMS = [
  { id: 0, emoji: "\u{1F370}", name: "Cake", color: "bg-pink-500/20 border-pink-400" },
  { id: 1, emoji: "\u{1F369}", name: "Donut", color: "bg-amber-500/20 border-amber-400" },
  { id: 2, emoji: "\u{1F36A}", name: "Cookie", color: "bg-yellow-500/20 border-yellow-400" },
  { id: 3, emoji: "\u{1F352}", name: "Cherry", color: "bg-red-500/20 border-red-400" },
  { id: 4, emoji: "\u{1F353}", name: "Strawberry", color: "bg-rose-500/20 border-rose-400" },
  { id: 5, emoji: "\u{1F48E}", name: "Diamond", color: "bg-cyan-500/20 border-cyan-400" },
  { id: 6, emoji: "\u{2615}", name: "Coffee", color: "bg-orange-500/20 border-orange-400" },
  { id: 7, emoji: "\u{1F95A}", name: "Egg", color: "bg-white/20 border-gray-300" },
];

const GRID_SIZE = 7;
const ENTRY_FEE = 100;
const MOVES_LIMIT = 25;

type Cell = {
  itemId: number;
  key: number;
};

let keyCounter = 0;
function nextKey() {
  return keyCounter++;
}

function createCell(itemId?: number): Cell {
  return { itemId: itemId ?? Math.floor(Math.random() * ITEMS.length), key: nextKey() };
}

function createGrid(): Cell[][] {
  const grid: Cell[][] = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < GRID_SIZE; c++) {
      row.push(createCell());
    }
    grid.push(row);
  }
  return grid;
}

function findMatches(grid: Cell[][]): [number, number][] {
  const matched = new Set<string>();

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE - 2; c++) {
      const id = grid[r][c].itemId;
      if (id === grid[r][c + 1].itemId && id === grid[r][c + 2].itemId) {
        matched.add(`${r},${c}`);
        matched.add(`${r},${c + 1}`);
        matched.add(`${r},${c + 2}`);
      }
    }
  }

  for (let c = 0; c < GRID_SIZE; c++) {
    for (let r = 0; r < GRID_SIZE - 2; r++) {
      const id = grid[r][c].itemId;
      if (id === grid[r + 1][c].itemId && id === grid[r + 2][c].itemId) {
        matched.add(`${r},${c}`);
        matched.add(`${r + 1},${c}`);
        matched.add(`${r + 2},${c}`);
      }
    }
  }

  return Array.from(matched).map((s) => {
    const [r, c] = s.split(",").map(Number);
    return [r, c];
  });
}

function swap(grid: Cell[][], r1: number, c1: number, r2: number, c2: number): Cell[][] {
  const newGrid = grid.map((row) => [...row]);
  const tmp = newGrid[r1][c1];
  newGrid[r1][c1] = newGrid[r2][c2];
  newGrid[r2][c2] = tmp;
  return newGrid;
}

function removeAndDrop(grid: Cell[][], matches: [number, number][]): Cell[][] {
  const newGrid = grid.map((row) => [...row]);
  for (const [r, c] of matches) {
    newGrid[r][c] = { itemId: -1, key: nextKey() };
  }

  for (let c = 0; c < GRID_SIZE; c++) {
    let writeRow = GRID_SIZE - 1;
    for (let r = GRID_SIZE - 1; r >= 0; r--) {
      if (newGrid[r][c].itemId !== -1) {
        if (r !== writeRow) {
          newGrid[writeRow][c] = newGrid[r][c];
          newGrid[r][c] = { itemId: -1, key: nextKey() };
        }
        writeRow--;
      }
    }
    for (let r = writeRow; r >= 0; r--) {
      newGrid[r][c] = createCell();
    }
  }

  return newGrid;
}

export function MatchThree({ onClose }: { onClose: () => void }) {
  const { profile, updateDiamonds } = useUser();
  const [grid, setGrid] = useState<Cell[][]>(createGrid);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(MOVES_LIMIT);
  const [gameActive, setGameActive] = useState(false);
  const [matchedCells, setMatchedCells] = useState<Set<string>>(new Set());
  const [cascading, setCascading] = useState(false);

  const startGame = async () => {
    if (!profile || profile.diamonds < ENTRY_FEE) return;
    const supabase = createClient();
    const afterBet = profile.diamonds - ENTRY_FEE;
    updateDiamonds(afterBet);
    await supabase
      .from("profiles")
      .update({ diamonds: afterBet })
      .eq("id", profile.id);

    setGrid(createGrid());
    setScore(0);
    setMoves(MOVES_LIMIT);
    setGameActive(true);
    setSelected(null);
  };

  const processMatches = useCallback(
    async (currentGrid: Cell[][]) => {
      let g = currentGrid;
      let totalMatched = 0;

      while (true) {
        const matches = findMatches(g);
        if (matches.length === 0) break;

        totalMatched += matches.length;
        setCascading(true);
        setMatchedCells(new Set(matches.map(([r, c]) => `${r},${c}`)));
        await new Promise((r) => setTimeout(r, 300));

        g = removeAndDrop(g, matches);
        setGrid(g);
        setMatchedCells(new Set());
        await new Promise((r) => setTimeout(r, 250));
      }

      setCascading(false);

      if (totalMatched > 0) {
        const pts = totalMatched * 10;
        setScore((prev) => prev + pts);
      }

      return g;
    },
    []
  );

  useEffect(() => {
    processMatches(grid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCellClick = async (r: number, c: number) => {
    if (!gameActive || moves <= 0 || cascading) return;

    if (!selected) {
      setSelected([r, c]);
      return;
    }

    const [sr, sc] = selected;
    const isAdjacent =
      (Math.abs(sr - r) === 1 && sc === c) ||
      (Math.abs(sc - c) === 1 && sr === r);

    if (!isAdjacent) {
      setSelected([r, c]);
      return;
    }

    const swapped = swap(grid, sr, sc, r, c);
    const matches = findMatches(swapped);

    if (matches.length === 0) {
      setSelected(null);
      return;
    }

    setGrid(swapped);
    setMoves((prev) => prev - 1);
    setSelected(null);

    await processMatches(swapped);
  };

  const cashOut = async () => {
    if (!profile || score === 0) return;
    const winAmount = Math.floor(score / 10);
    const newBalance = (profile.diamonds || 0) + winAmount;
    updateDiamonds(newBalance);
    const supabase = createClient();
    await supabase
      .from("profiles")
      .update({ diamonds: newBalance })
      .eq("id", profile.id);
    setGameActive(false);
  };

  useEffect(() => {
    if (moves === 0 && gameActive) {
      setTimeout(() => cashOut(), 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moves, gameActive]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-b from-sky-400 via-sky-500 to-blue-600 overflow-hidden">
      {/* Header */}
      <header className="flex h-14 items-center justify-between px-4">
        <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-black text-white drop-shadow-lg">Match 3</h1>
        <div className="flex items-center gap-1 rounded-full bg-black/20 px-3 py-1.5">
          <Diamond className="h-3.5 w-3.5 text-amber-300" />
          <span className="text-sm font-bold text-white">{formatNumber(profile?.diamonds ?? 0)}</span>
        </div>
      </header>

      {/* Stats */}
      <div className="flex items-center justify-center gap-4 py-2">
        <div className="flex items-center gap-1 rounded-full bg-white/20 px-4 py-1.5">
          <span className="text-xs font-bold text-white/70">Score</span>
          <span className="text-base font-black text-white">{score}</span>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-white/20 px-4 py-1.5">
          <span className="text-xs font-bold text-white/70">Moves</span>
          <span className={cn("text-base font-black", moves <= 5 ? "text-red-300" : "text-white")}>{moves}</span>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-amber-400/30 px-4 py-1.5">
          <Diamond className="h-3 w-3 text-amber-300" />
          <span className="text-base font-black text-amber-200">{Math.floor(score / 10)}</span>
        </div>
      </div>

      {/* Game grid */}
      <div className="flex flex-1 items-center justify-center px-3">
        <div className="w-full max-w-[350px] rounded-2xl bg-white/10 p-2 backdrop-blur-sm">
          <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
            {grid.map((row, r) =>
              row.map((cell, c) => {
                const item = ITEMS[cell.itemId];
                if (!item) return <div key={cell.key} className="aspect-square" />;
                const isSelected = selected?.[0] === r && selected?.[1] === c;
                const isMatched = matchedCells.has(`${r},${c}`);

                return (
                  <button
                    key={cell.key}
                    onClick={() => handleCellClick(r, c)}
                    disabled={!gameActive || cascading}
                    className={cn(
                      "flex aspect-square items-center justify-center rounded-lg border-2 text-xl transition-all duration-200",
                      item.color,
                      isSelected && "ring-2 ring-white scale-110 z-10",
                      isMatched && "animate-shake scale-0 opacity-0",
                      !isMatched && !isSelected && "hover:scale-105"
                    )}
                  >
                    {item.emoji}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="px-4 pb-6 pt-3">
        {!gameActive ? (
          <button
            onClick={startGame}
            disabled={(profile?.diamonds ?? 0) < ENTRY_FEE}
            className={cn(
              "w-full rounded-2xl py-4 text-center text-lg font-black shadow-xl transition-all",
              (profile?.diamonds ?? 0) >= ENTRY_FEE
                ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:scale-[1.02] active:scale-[0.98]"
                : "bg-gray-400 text-gray-600"
            )}
          >
            <span className="flex items-center justify-center gap-2">
              Play ({ENTRY_FEE} <Diamond className="h-5 w-5" />)
            </span>
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => { setGrid(createGrid()); setSelected(null); }}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white"
              aria-label="Shuffle"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
            <button
              onClick={cashOut}
              className="flex-1 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 py-3 text-center text-base font-black text-white"
            >
              Cash Out ({Math.floor(score / 10)} {"\u{1F48E}"})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
