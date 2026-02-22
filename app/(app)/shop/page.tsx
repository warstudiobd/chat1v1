"use client";

import { useUser } from "@/components/user-provider";
import { formatNumber } from "@/lib/utils";
import {
  ArrowLeft,
  Diamond,
  Crown,
  Sparkles,
  Check,
  Clock,
} from "lucide-react";
import { useRouter } from "next/navigation";

const diamondPacks = [
  { id: 1, diamonds: 100, price: 1.99, popular: false, bonus: 0 },
  { id: 2, diamonds: 500, price: 8.99, popular: true, bonus: 50 },
  { id: 3, diamonds: 1200, price: 19.99, popular: false, bonus: 200 },
  { id: 4, diamonds: 2500, price: 39.99, popular: false, bonus: 500 },
  { id: 5, diamonds: 6500, price: 99.99, popular: false, bonus: 1500 },
];

const vipPlans = [
  {
    id: "vip",
    name: "VIP",
    price: 9.99,
    period: "month",
    gradient: "from-amber-500 to-orange-600",
    icon: Crown,
    benefits: [
      "Ad-free experience",
      "Exclusive VIP badge",
      "2x gift XP earnings",
      "Priority room access",
    ],
  },
  {
    id: "svip",
    name: "SVIP",
    price: 19.99,
    period: "month",
    gradient: "from-purple-500 to-pink-600",
    icon: Sparkles,
    benefits: [
      "All VIP benefits",
      "500 free diamonds monthly",
      "Room creation priority",
      "Profile highlight ring",
      "Exclusive animated effects",
    ],
  },
];

export default function ShopPage() {
  const { profile } = useUser();
  const router = useRouter();

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-lg">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Diamond Shop</h1>
        </div>

        {/* Balance Card */}
        <div className="mb-6 rounded-2xl gradient-primary p-6">
          <p className="mb-1 text-sm text-primary-foreground/70">
            Your Balance
          </p>
          <div className="flex items-center gap-3">
            <Diamond className="h-8 w-8 text-primary-foreground" />
            <span className="text-4xl font-bold text-primary-foreground">
              {formatNumber(profile?.diamonds || 0)}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-4 text-xs text-primary-foreground/60">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> No expiry
            </span>
          </div>
        </div>

        {/* Diamond Packs */}
        <h2 className="mb-3 text-lg font-bold text-foreground">
          Buy Diamonds
        </h2>
        <div className="mb-8 flex flex-col gap-3">
          {diamondPacks.map((pack) => (
            <div
              key={pack.id}
              className={`relative rounded-xl bg-card p-4 ${
                pack.popular
                  ? "ring-2 ring-gold"
                  : "border border-border"
              }`}
            >
              {pack.popular && (
                <span className="absolute -top-2.5 right-4 rounded-full bg-gold px-3 py-0.5 text-[10px] font-bold text-background">
                  MOST POPULAR
                </span>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Diamond className="h-5 w-5 text-gold" />
                    <span className="text-xl font-bold text-foreground">
                      {pack.diamonds.toLocaleString()}
                    </span>
                    {pack.bonus > 0 && (
                      <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-bold text-green-400">
                        +{pack.bonus} BONUS
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    ${pack.price} USD
                  </p>
                </div>
                <button className="rounded-xl gradient-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* VIP Subscriptions */}
        <h2 className="mb-3 text-lg font-bold text-foreground">
          VIP Membership
        </h2>
        <div className="mb-8 grid grid-cols-2 gap-3">
          {vipPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl bg-gradient-to-br ${plan.gradient} p-4`}
            >
              <plan.icon className="mb-2 h-6 w-6 text-white/90" />
              <h3 className="text-lg font-bold text-white">{plan.name}</h3>
              <p className="text-2xl font-bold text-white">${plan.price}</p>
              <p className="mb-3 text-xs text-white/70">per {plan.period}</p>
              <ul className="mb-4 flex flex-col gap-1">
                {plan.benefits.slice(0, 3).map((benefit, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-1.5 text-[11px] text-white/90"
                  >
                    <Check className="h-3 w-3 shrink-0" />
                    <span className="truncate">{benefit}</span>
                  </li>
                ))}
                {plan.benefits.length > 3 && (
                  <li className="text-[10px] text-white/60">
                    +{plan.benefits.length - 3} more benefits
                  </li>
                )}
              </ul>
              <button className="w-full rounded-xl bg-white/20 py-2.5 text-sm font-semibold text-white backdrop-blur-sm">
                Subscribe
              </button>
            </div>
          ))}
        </div>

        {/* Purchase History */}
        <details className="rounded-xl bg-card p-4">
          <summary className="cursor-pointer text-sm font-semibold text-foreground">
            Purchase History
          </summary>
          <div className="mt-3 text-sm text-muted-foreground">
            <p>No purchases yet</p>
          </div>
        </details>
      </div>
    </div>
  );
}
