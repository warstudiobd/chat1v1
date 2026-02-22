import { Crown, Shield, ChevronRight } from "lucide-react";
import Link from "next/link";

export function VipBanner() {
  return (
    <section className="mb-4 px-4">
      <Link
        href="/shop"
        className="block overflow-hidden rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,215,0,0.12), rgba(255,45,120,0.12))",
        }}
      >
        <div className="flex items-center gap-3 p-3.5">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{
              background: "linear-gradient(135deg, hsl(45,100%,55%), hsl(330,80%,60%))",
            }}
          >
            <Crown className="h-6 w-6 text-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-foreground">
              Upgrade to VIP / SVIP
            </h3>
            <p className="text-[10px] text-muted-foreground">
              {"Anti-kick, room lock, exclusive badges & more"}
            </p>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-gold" />
        </div>
        <div className="flex gap-2 px-3.5 pb-3.5">
          <div className="flex flex-1 items-center gap-2 rounded-xl bg-[rgba(255,215,0,0.08)] px-2.5 py-2">
            <Shield className="h-3.5 w-3.5 text-gold" />
            <div>
              <span className="block text-[10px] font-bold text-gold">
                VIP
              </span>
              <span className="text-[8px] text-muted-foreground">
                From 5,000 D
              </span>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-xl bg-[rgba(255,45,120,0.08)] px-2.5 py-2">
            <Crown className="h-3.5 w-3.5 text-pink" />
            <div>
              <span className="block text-[10px] font-bold text-pink">
                SVIP
              </span>
              <span className="text-[8px] text-muted-foreground">
                From 20,000 D
              </span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
