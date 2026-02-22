import { Crown, Shield, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function VipBanner() {
  return (
    <section className="mb-4 px-4">
      <Link href="/shop" className="block overflow-hidden rounded-2xl border border-gold/10">
        {/* Top gradient bar */}
        <div
          className="px-4 py-3"
          style={{ background: "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,45,120,0.1))" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl gradient-gold">
              <Crown className="h-5 w-5 text-background" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-foreground">Upgrade to VIP</h3>
                <Sparkles className="h-3.5 w-3.5 text-gold" />
              </div>
              <p className="text-[10px] text-muted-foreground">
                {"Unlock anti-kick, exclusive badges, room lock & more"}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-gold" />
          </div>
        </div>

        {/* VIP tiers */}
        <div className="flex gap-2 px-3 py-3 bg-card/50">
          <div className="flex flex-1 items-center gap-2.5 rounded-xl glass px-3 py-2.5">
            <Shield className="h-4 w-4 text-gold" />
            <div>
              <span className="block text-[10px] font-bold text-gold">VIP</span>
              <span className="text-[8px] text-muted-foreground">50,000 coins/mo</span>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-2.5 rounded-xl glass px-3 py-2.5">
            <Crown className="h-4 w-4 text-pink" />
            <div>
              <span className="block text-[10px] font-bold text-pink">SVIP</span>
              <span className="text-[8px] text-muted-foreground">200,000 coins/mo</span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
