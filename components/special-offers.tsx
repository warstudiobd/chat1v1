import { Tag, Coins, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const offers = [
  {
    discount: "80% OFF",
    title: "Starter Pack",
    desc: "100,000 coins + VIP 3 days",
    oldCoins: "100,000",
    price: "$1.99",
    gradient: "from-pink-600 to-rose-500",
    hot: true,
  },
  {
    discount: "50% OFF",
    title: "Coin Bundle",
    desc: "500,000 coins best value",
    oldCoins: "500,000",
    price: "$4.99",
    gradient: "from-purple-600 to-violet-500",
    hot: false,
  },
  {
    discount: "40% OFF",
    title: "VIP Monthly",
    desc: "VIP 30 days + 200K coins",
    oldCoins: "200,000",
    price: "$9.99",
    gradient: "from-amber-500 to-orange-500",
    hot: true,
  },
  {
    discount: "60% OFF",
    title: "Mega Pack",
    desc: "2M coins + SVIP 7 days",
    oldCoins: "2,000,000",
    price: "$19.99",
    gradient: "from-emerald-500 to-green-500",
    hot: false,
  },
];

export function SpecialOffers() {
  return (
    <section className="mb-4 px-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Tag className="h-3.5 w-3.5 text-pink" />
          <h2 className="text-sm font-bold text-foreground">Special Offers</h2>
        </div>
      </div>
      <div className="scrollbar-hide flex gap-2.5 overflow-x-auto pb-1">
        {offers.map((offer, i) => (
          <Link
            key={i}
            href="/shop"
            className="w-[150px] shrink-0 overflow-hidden rounded-2xl border border-white/5"
          >
            <div className={cn("relative px-3 py-2.5 bg-gradient-to-br", offer.gradient)}>
              {offer.hot && (
                <span className="absolute right-1.5 top-1.5 flex items-center gap-0.5 rounded-full bg-black/40 px-1.5 py-[1px] text-[7px] font-bold text-gold">
                  <Zap className="h-2 w-2" />
                  HOT
                </span>
              )}
              <span className="text-[10px] font-black text-primary-foreground">{offer.discount}</span>
            </div>
            <div className="bg-card/60 p-2.5">
              <span className="block text-xs font-bold text-foreground">{offer.title}</span>
              <p className="mb-2 text-[8px] text-muted-foreground">{offer.desc}</p>
              <div className="flex items-center gap-1.5">
                <span className="flex items-center gap-0.5 text-[9px] text-muted-foreground line-through">
                  <Coins className="h-2 w-2" />
                  {offer.oldCoins}
                </span>
              </div>
              <span className="mt-1 block text-sm font-bold text-pink">{offer.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
