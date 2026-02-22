"use client";

import { useState } from "react";
import { X, Diamond, Send } from "lucide-react";
import { cn, GIFT_LIST } from "@/lib/utils";

const giftIcons: Record<string, string> = {
  rose: "/gifts/rose.svg",
  beer: "/gifts/beer.svg",
  cake: "/gifts/cake.svg",
  heart: "/gifts/heart.svg",
  fireworks: "/gifts/fireworks.svg",
  car: "/gifts/car.svg",
  yacht: "/gifts/yacht.svg",
  castle: "/gifts/castle.svg",
  rocket: "/gifts/rocket.svg",
  planet: "/gifts/planet.svg",
};

export function GiftPanel({
  roomId,
  onClose,
}: {
  roomId: string;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const selectedGift = GIFT_LIST.find((g) => g.id === selected);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-background/60" onClick={onClose} />
      <div className="relative w-full max-w-lg animate-slide-up rounded-t-3xl border-t border-border bg-card">
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-sm font-bold text-foreground">Send Gift</h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-5 gap-2 px-4 pb-2">
          {GIFT_LIST.map((gift) => (
            <button
              key={gift.id}
              onClick={() => setSelected(gift.id)}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl p-2 transition-colors",
                selected === gift.id
                  ? "bg-primary/20 ring-1 ring-primary"
                  : "bg-muted/50 hover:bg-muted"
              )}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg font-bold text-foreground">
                {gift.name.charAt(0)}
              </div>
              <span className="text-[10px] text-foreground">{gift.name}</span>
              <span className="flex items-center gap-0.5 text-[10px] text-gold">
                <Diamond className="h-2.5 w-2.5" />
                {gift.cost}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Qty:</span>
            {[1, 10, 99].map((q) => (
              <button
                key={q}
                onClick={() => setQuantity(q)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                  quantity === q
                    ? "gradient-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {q}
              </button>
            ))}
          </div>

          <button
            disabled={!selected}
            className="flex items-center gap-2 rounded-full gradient-primary px-5 py-2 text-xs font-semibold text-primary-foreground transition-opacity disabled:opacity-40"
          >
            <Send className="h-3.5 w-3.5" />
            Send
            {selectedGift && (
              <span className="flex items-center gap-0.5 opacity-80">
                <Diamond className="h-3 w-3" />
                {selectedGift.cost * quantity}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
