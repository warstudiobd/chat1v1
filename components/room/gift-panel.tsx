"use client";

import { useState, useRef } from "react";
import { X, Coins, Send, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GIFTS, GIFT_CATEGORIES, formatCoinPrice, type Gift, type GiftCategory } from "@/lib/gifts";
import { GiftSvgIcon } from "@/components/room/gift-svgs";
import { useUser } from "@/components/user-provider";
import { createClient } from "@/lib/supabase/client";

type GiftPanelProps = {
  roomId: string;
  onClose: () => void;
  onGiftSent?: (gift: Gift, quantity: number) => void;
};

export function GiftPanel({ roomId, onClose, onGiftSent }: GiftPanelProps) {
  const { profile } = useUser();
  const [activeCategory, setActiveCategory] = useState<GiftCategory>("love");
  const [selected, setSelected] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sending, setSending] = useState(false);
  const catScrollRef = useRef<HTMLDivElement>(null);

  const filteredGifts = GIFTS.filter((g) => g.category === activeCategory);
  const selectedGift = GIFTS.find((g) => g.id === selected);
  const totalCost = selectedGift ? selectedGift.cost * quantity : 0;
  const canAfford = (profile?.diamonds ?? 0) >= totalCost;

  async function handleSend() {
    if (!selected || !selectedGift || !profile || sending) return;
    setSending(true);

    const supabase = createClient();

    // Deduct diamonds
    await supabase
      .from("profiles")
      .update({ diamonds: Math.max(0, (profile.diamonds ?? 0) - totalCost) })
      .eq("id", profile.id);

    // Record gift in messages
    await supabase.from("messages").insert({
      sender_id: profile.id,
      receiver_id: roomId,
      content: `sent ${selectedGift.name}`,
      msg_type: "gift",
      gift_type: selectedGift.id,
      diamond_cost: totalCost,
    });

    // Trigger animation
    onGiftSent?.(selectedGift, quantity);
    setSending(false);
    setSelected(null);
  }

  function scrollCats(dir: "left" | "right") {
    catScrollRef.current?.scrollBy({ left: dir === "left" ? -120 : 120, behavior: "smooth" });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-background/50" onClick={onClose} />

      <div className="relative w-full max-w-lg animate-slide-up rounded-t-3xl border-t border-border/50 bg-card">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground">Gifts</span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
              {GIFTS.length}{" items"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-full bg-gold/10 px-2.5 py-1">
              <Coins className="h-3.5 w-3.5 text-gold" />
              <span className="text-xs font-bold text-gold">
                {(profile?.diamonds ?? 0).toLocaleString()}
              </span>
            </div>
            <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Category tabs */}
        <div className="relative flex items-center px-1">
          <button onClick={() => scrollCats("left")} className="shrink-0 p-1 text-muted-foreground" aria-label="Scroll left">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div ref={catScrollRef} className="flex gap-1 overflow-x-auto scrollbar-hide px-1 py-1.5">
            {GIFT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setSelected(null); }}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                  activeCategory === cat.id
                    ? "gradient-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <button onClick={() => scrollCats("right")} className="shrink-0 p-1 text-muted-foreground" aria-label="Scroll right">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Gift grid */}
        <div className="grid grid-cols-4 gap-1.5 px-3 py-3 max-h-64 overflow-y-auto scrollbar-hide">
          {filteredGifts.map((gift) => (
            <button
              key={gift.id}
              onClick={() => setSelected(gift.id)}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-xl p-2 transition-all",
                selected === gift.id
                  ? "bg-primary/20 ring-1 ring-primary scale-105"
                  : "bg-muted/30 hover:bg-muted/60"
              )}
            >
              <GiftSvgIcon giftId={gift.id} size={40} />
              <span className="text-[9px] leading-tight text-foreground/80 line-clamp-1">{gift.name}</span>
              <span className="flex items-center gap-0.5 text-[9px] font-bold text-gold">
                <Coins className="h-2 w-2" />
                {formatCoinPrice(gift.cost)}
              </span>
            </button>
          ))}
        </div>

        {/* Footer: quantity + send */}
        <div className="flex items-center justify-between border-t border-border/50 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-muted-foreground">Qty</span>
            {[1, 5, 10, 66, 99, 520].map((q) => (
              <button
                key={q}
                onClick={() => setQuantity(q)}
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors",
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
            onClick={handleSend}
            disabled={!selected || !canAfford || sending}
            className="flex items-center gap-1.5 rounded-full gradient-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-opacity disabled:opacity-30"
          >
            <Send className="h-3.5 w-3.5" />
            Send
            {selectedGift && (
              <span className="flex items-center gap-0.5 rounded-full bg-white/20 px-1.5 py-0.5">
                <Coins className="h-2.5 w-2.5" />
                {formatCoinPrice(totalCost)}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
