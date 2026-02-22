import { Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const offers = [
  {
    discount: "80% OFF",
    title: "Starter Pack",
    desc: "Perfect for new users",
    old: "$49.99",
    newPrice: "$9.99",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    discount: "50% OFF",
    title: "Diamond Bundle",
    desc: "Best value diamond pack",
    old: "$99.99",
    newPrice: "$49.99",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    discount: "30% OFF",
    title: "VIP Monthly",
    desc: "VIP for 30 days + bonuses",
    old: "$29.99",
    newPrice: "$19.99",
    gradient: "from-green-500 to-emerald-500",
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
            className="w-[160px] shrink-0 overflow-hidden rounded-2xl"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <div
              className={cn(
                "bg-gradient-to-br px-3 py-2",
                offer.gradient
              )}
            >
              <span className="text-[10px] font-black text-foreground">
                {offer.discount}
              </span>
            </div>
            <div className="p-2.5">
              <span className="block text-xs font-bold text-foreground">
                {offer.title}
              </span>
              <p className="mb-1.5 text-[8px] text-muted-foreground">
                {offer.desc}
              </p>
              <div className="flex items-center gap-1">
                <span className="text-[9px] text-muted-foreground line-through">
                  {offer.old}
                </span>
                <span className="text-xs font-bold text-pink">
                  {offer.newPrice}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
