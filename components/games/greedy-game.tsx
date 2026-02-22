"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, Diamond, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { useUser } from "@/components/user-provider";
import { createClient } from "@/lib/supabase/client";

/* ---- Food items on the wheel with multipliers ---- */
const FOOD_ITEMS = [
  { id: "hotdog", emoji: "\u{1F32D}", name: "Hot Dog", multiplier: 10, color: "border-blue-400" },
  { id: "kebab", emoji: "\u{1F356}", name: "Kebab", multiplier: 15, color: "border-red-400" },
  { id: "drumstick", emoji: "\u{1F357}", name: "Drumstick", multiplier: 25, color: "border-blue-400" },
  { id: "steak", emoji: "\u{1F969}", name: "Steak", multiplier: 45, color: "border-blue-400" },
  { id: "corn", emoji: "\u{1F33D}", name: "Corn", multiplier: 5, color: "border-blue-400" },
  { id: "carrot", emoji: "\u{1F955}", name: "Carrot", multiplier: 5, color: "border-blue-400" },
  { id: "tomato", emoji: "\u{1F345}", name: "Tomato", multiplier: 5, color: "border-blue-400" },
  { id: "cabbage", emoji: "\u{1F96C}", name: "Cabbage", multiplier: 5, color: "border-blue-400" },
];

const WAGER_OPTIONS = [100, 500, 1000, 5000];

const RECIPE_SETS = [
  { id: "salad", name: "Salad", emoji: "\u{1F957}" },
  { id: "pizza", name: "Pizza", emoji: "\u{1F355}" },
  { id: "sushi", name: "Sushi", emoji: "\u{1F363}" },
  { id: "burger", name: "Burger", emoji: "\u{1F354}" },
];

type ResultEntry = {
  food: (typeof FOOD_ITEMS)[number];
  won: boolean;
  amount: number;
};

export function GreedyGame({ onClose }: { onClose: () => void }) {
  const { profile, updateDiamonds } = useUser();
  const [wager, setWager] = useState(100);
  const [timer, setTimer] = useState(20);
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<ResultEntry | null>(null);
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [todayProfit, setTodayProfit] = useState(0);
  const [currentRecipe, setCurrentRecipe] = useState(0);
  const [wheelAngle, setWheelAngle] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* countdown timer */
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) return 20;
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handlePlay = useCallback(async () => {
    if (!profile || !selectedFood || spinning) return;
    if (profile.diamonds < wager) return;

    setSpinning(true);
    setResult(null);

    const supabase = createClient();

    /* deduct wager */
    const afterBet = profile.diamonds - wager;
    updateDiamonds(afterBet);
    await supabase
      .from("profiles")
      .update({ diamonds: afterBet })
      .eq("id", profile.id);

    /* spin animation */
    const spins = 3 + Math.random() * 3;
    setWheelAngle((prev) => prev + spins * 360);

    await new Promise((r) => setTimeout(r, 2800));

    /* pick winning food (weighted) */
    const roll = Math.random();
    let winningFood: (typeof FOOD_ITEMS)[number];
    if (roll < 0.35) {
      /* 35% - low multiplier */
      const lowItems = FOOD_ITEMS.filter((f) => f.multiplier <= 5);
      winningFood = lowItems[Math.floor(Math.random() * lowItems.length)];
    } else if (roll < 0.6) {
      /* 25% - mid multiplier */
      const midItems = FOOD_ITEMS.filter((f) => f.multiplier >= 10 && f.multiplier <= 15);
      winningFood = midItems[Math.floor(Math.random() * midItems.length)];
    } else if (roll < 0.82) {
      /* 22% - no win */
      winningFood = FOOD_ITEMS[Math.floor(Math.random() * FOOD_ITEMS.length)];
      const entry: ResultEntry = { food: winningFood, won: false, amount: 0 };
      setResult(entry);
      setResults((prev) => [entry, ...prev].slice(0, 20));
      setTodayProfit((prev) => prev - wager);
      setSpinning(false);
      setSelectedFood(null);
      return;
    } else if (roll < 0.95) {
      /* 13% - high multiplier */
      winningFood = FOOD_ITEMS.find((f) => f.multiplier === 25)!;
    } else {
      /* 5% - jackpot */
      winningFood = FOOD_ITEMS.find((f) => f.multiplier === 45)!;
    }

    const won = selectedFood === winningFood.id;
    const amount = won ? wager * winningFood.multiplier : 0;

    if (won && amount > 0) {
      const afterWin = afterBet + amount;
      updateDiamonds(afterWin);
      await supabase
        .from("profiles")
        .update({ diamonds: afterWin })
        .eq("id", profile.id);
    }

    const entry: ResultEntry = { food: winningFood, won, amount };
    setResult(entry);
    setResults((prev) => [entry, ...prev].slice(0, 20));
    setTodayProfit((prev) => prev + (won ? amount - wager : -wager));
    setSpinning(false);
    setSelectedFood(null);
  }, [profile, selectedFood, spinning, wager]);

  /* auto-play when timer hits 0 */
  useEffect(() => {
    if (timer === 0 && selectedFood && !spinning) {
      handlePlay();
    }
  }, [timer, selectedFood, spinning, handlePlay]);

  const coinsLeft = profile?.diamonds ?? 0;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-b from-amber-100 to-amber-50 overflow-hidden">
      {/* Header */}
      <header className="relative flex h-14 items-center justify-center bg-white shadow-sm">
        <h1 className="text-xl font-black text-gray-900 tracking-tight">Greedy BIGO</h1>
        <button
          onClick={onClose}
          className="absolute right-3 flex h-9 w-9 items-center justify-center rounded-full"
          aria-label="Close"
        >
          <ArrowRight className="h-5 w-5 text-gray-600" />
        </button>
      </header>

      {/* Game area */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Ferris wheel area */}
        <div className="relative mx-auto mt-4 aspect-square max-w-[340px]">
          {/* Decorative floating diamonds */}
          <div className="absolute -left-2 top-8 animate-float text-xl opacity-60">{"\u{1F48E}"}</div>
          <div className="absolute -right-2 top-20 animate-float text-lg opacity-50" style={{ animationDelay: "1s" }}>{"\u{1F48E}"}</div>
          <div className="absolute left-4 bottom-16 animate-float text-sm opacity-40" style={{ animationDelay: "0.5s" }}>{"\u{1F48E}"}</div>

          {/* Center mascot & timer */}
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-red-400 bg-gradient-to-b from-red-100 to-red-50 shadow-lg">
              <span className="text-3xl">{"\u{1F425}"}</span>
              <div className="rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white">
                Select time
              </div>
              <span className="text-lg font-black text-red-500">{timer}s</span>
            </div>
          </div>

          {/* Wheel with food items */}
          <div
            className="relative h-full w-full transition-transform duration-[2800ms] ease-out"
            style={{ transform: `rotate(${wheelAngle}deg)` }}
          >
            {FOOD_ITEMS.map((food, i) => {
              const angle = (i * 360) / FOOD_ITEMS.length;
              const rad = (angle * Math.PI) / 180;
              const radius = 42;
              const x = 50 + radius * Math.sin(rad);
              const y = 50 - radius * Math.cos(rad);
              const isSelected = selectedFood === food.id;

              return (
                <button
                  key={food.id}
                  onClick={() => !spinning && setSelectedFood(food.id)}
                  className={cn(
                    "absolute flex flex-col items-center gap-0.5 -translate-x-1/2 -translate-y-1/2 transition-all",
                    isSelected && "scale-110"
                  )}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  disabled={spinning}
                >
                  <div
                    className={cn(
                      "flex h-16 w-16 items-center justify-center rounded-full border-[3px] bg-gradient-to-b from-sky-100 to-sky-50 shadow-md transition-all",
                      isSelected ? "border-red-500 ring-2 ring-red-300 scale-110" : food.color
                    )}
                    style={{ transform: `rotate(-${wheelAngle}deg)` }}
                  >
                    <span className="text-2xl">{food.emoji}</span>
                  </div>
                  <div
                    className="flex items-center gap-0.5 rounded-full bg-sky-200/80 px-2 py-0.5"
                    style={{ transform: `rotate(-${wheelAngle}deg)` }}
                  >
                    <span className="text-[9px] font-bold text-sky-800">
                      win {food.multiplier} times
                    </span>
                  </div>
                  {food.id === "hotdog" && (
                    <div
                      className="absolute -top-2 right-0 rounded bg-red-500 px-1.5 py-0.5 text-[8px] font-bold text-white"
                      style={{ transform: `rotate(-${wheelAngle}deg)` }}
                    >
                      Hot
                    </div>
                  )}
                </button>
              );
            })}

            {/* Connecting lines from center to items */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none opacity-30">
              {FOOD_ITEMS.map((_, i) => {
                const angle = (i * 360) / FOOD_ITEMS.length;
                const rad = (angle * Math.PI) / 180;
                const radius = 42;
                const x = 50 + radius * Math.sin(rad);
                const y = 50 - radius * Math.cos(rad);
                return (
                  <line
                    key={i}
                    x1="50%"
                    y1="50%"
                    x2={`${x}%`}
                    y2={`${y}%`}
                    stroke="#38bdf8"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Recipe navigation */}
        <div className="mt-2 flex items-center justify-between px-2">
          <button
            onClick={() => setCurrentRecipe((prev) => (prev > 0 ? prev - 1 : RECIPE_SETS.length - 1))}
            className="flex items-center gap-1 rounded-full bg-amber-200 px-3 py-1.5"
          >
            <span className="text-lg">{RECIPE_SETS[currentRecipe > 0 ? currentRecipe - 1 : RECIPE_SETS.length - 1].emoji}</span>
            <span className="text-xs font-bold text-amber-800">
              {RECIPE_SETS[currentRecipe > 0 ? currentRecipe - 1 : RECIPE_SETS.length - 1].name}
            </span>
            <ChevronLeft className="h-3 w-3 text-amber-800" />
          </button>
          <button
            onClick={() => setCurrentRecipe((prev) => (prev < RECIPE_SETS.length - 1 ? prev + 1 : 0))}
            className="flex items-center gap-1 rounded-full bg-amber-200 px-3 py-1.5"
          >
            <span className="text-lg">{RECIPE_SETS[(currentRecipe + 1) % RECIPE_SETS.length].emoji}</span>
            <span className="text-xs font-bold text-amber-800">
              {RECIPE_SETS[(currentRecipe + 1) % RECIPE_SETS.length].name}
            </span>
            <ChevronRight className="h-3 w-3 text-amber-800" />
          </button>
        </div>

        {/* Wager selection */}
        <div className="mt-4 rounded-xl bg-white p-3 shadow-sm">
          <p className="mb-2 text-center text-xs font-bold text-gray-600">
            {"Choose the amount of wager > choose food"}
          </p>
          <div className="flex gap-2">
            {WAGER_OPTIONS.map((w) => (
              <button
                key={w}
                onClick={() => setWager(w)}
                disabled={spinning}
                className={cn(
                  "flex flex-1 flex-col items-center gap-1 rounded-xl border-2 py-2.5 transition-all",
                  wager === w
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 bg-gray-50 hover:border-amber-300"
                )}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                  <span className="text-sm">{"\u{1FA99}"}</span>
                </div>
                <span className="text-sm font-black text-gray-800">{w}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Play button */}
        <button
          onClick={handlePlay}
          disabled={!selectedFood || spinning || coinsLeft < wager}
          className={cn(
            "mt-3 w-full rounded-xl py-3.5 text-center text-base font-black text-white shadow-lg transition-all",
            selectedFood && !spinning && coinsLeft >= wager
              ? "bg-gradient-to-r from-red-500 to-orange-500 hover:scale-[1.02] active:scale-[0.98]"
              : "bg-gray-300 text-gray-500"
          )}
        >
          {spinning ? "Spinning..." : selectedFood ? `Bet ${wager} on ${FOOD_ITEMS.find((f) => f.id === selectedFood)?.name}` : "Select a food first"}
        </button>

        {/* Stats bar */}
        <div className="mt-3 flex gap-2">
          <div className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-2.5 shadow-sm">
            <span className="text-xs font-bold text-gray-500">Coins left</span>
            <span className="text-sm">{"\u{1FA99}"}</span>
            <span className="text-sm font-black text-gray-900">{formatNumber(coinsLeft)}</span>
          </div>
          <div className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-2.5 shadow-sm">
            <span className="text-xs font-bold text-gray-500">{"Today's profits"}</span>
            <Diamond className="h-3.5 w-3.5 text-amber-500" />
            <span className={cn("text-sm font-black", todayProfit >= 0 ? "text-green-600" : "text-red-500")}>
              {todayProfit >= 0 ? "+" : ""}{formatNumber(todayProfit)}
            </span>
          </div>
        </div>

        {/* Result banner */}
        {result && (
          <div
            className={cn(
              "mt-3 flex items-center gap-3 rounded-xl p-3 animate-bounce-in",
              result.won
                ? "bg-gradient-to-r from-amber-100 to-yellow-50 border border-amber-300"
                : "bg-red-50 border border-red-200"
            )}
          >
            <span className="text-3xl">{result.won ? "\u{1F389}" : "\u{1F625}"}</span>
            <div>
              <p className={cn("text-sm font-black", result.won ? "text-amber-700" : "text-red-600")}>
                {result.won ? `You Won ${formatNumber(result.amount)} coins!` : "Better luck next time!"}
              </p>
              <p className="text-xs text-gray-500">
                {result.food.emoji} {result.food.name}
                {result.won && ` x${result.food.multiplier}`}
              </p>
            </div>
          </div>
        )}

        {/* Result history */}
        {results.length > 0 && (
          <div className="mt-3 rounded-xl bg-gradient-to-r from-red-500 to-red-400 p-2.5 shadow-sm">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <span className="shrink-0 rounded bg-white px-2 py-1 text-xs font-black text-red-500">
                Result
              </span>
              {results.slice(0, 12).map((r, i) => (
                <div key={i} className="relative shrink-0">
                  <span className="text-xl">{r.food.emoji}</span>
                  {i === 0 && (
                    <span className="absolute -bottom-1 -right-1 rounded bg-yellow-400 px-1 text-[7px] font-bold text-red-800">
                      New
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
