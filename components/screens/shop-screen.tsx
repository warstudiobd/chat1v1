"use client"

import { useState } from "react"
import {
  ArrowLeft, Diamond, Crown, Shield, Gift, Clock, Sparkles,
  CheckCircle, Star, Zap, Tag, ChevronRight, Smartphone, CreditCard,
  ShieldCheck, Lock, Loader2,
} from "lucide-react"
import { diamondPackages, vipPackages, mockOffers, formatNumber } from "@/lib/mock-data"
import { getDiamondProducts, getVipProducts, getOfferProducts, formatPrice, type Product } from "@/lib/products"
import { StripeCheckout } from "@/components/stripe-checkout"

interface ShopScreenProps {
  diamonds: number
  onDiamondsChange: (d: number) => void
  onBack: () => void
}

interface Transaction {
  id: string
  type: "purchase" | "gift_sent" | "gift_received" | "game_win" | "game_loss" | "bonus"
  description: string
  amount: number
  timestamp: string
}

const mockTransactions: Transaction[] = [
  { id: "t1", type: "purchase", description: "Diamond Package - 100K", amount: 100000, timestamp: "2 min ago" },
  { id: "t2", type: "gift_sent", description: "Sent Crown to Sofia", amount: -100, timestamp: "15 min ago" },
  { id: "t3", type: "game_win", description: "Lucky Wheel - Won!", amount: 2500, timestamp: "1h ago" },
  { id: "t4", type: "gift_received", description: "Received Diamond from Yuki", amount: 50, timestamp: "2h ago" },
  { id: "t5", type: "game_loss", description: "Coin Flip - Lost", amount: -200, timestamp: "3h ago" },
  { id: "t6", type: "bonus", description: "Daily Login Bonus", amount: 500, timestamp: "5h ago" },
  { id: "t7", type: "purchase", description: "Diamond Package - 50K", amount: 50000, timestamp: "1d ago" },
  { id: "t8", type: "gift_sent", description: "Sent Universe to Kim", amount: -50000, timestamp: "1d ago" },
  { id: "t9", type: "bonus", description: "New User Welcome Bonus", amount: 1000, timestamp: "2d ago" },
  { id: "t10", type: "game_win", description: "Greedy Cat - Cash out!", amount: 8500, timestamp: "2d ago" },
]

const transactionIcons: Record<string, { icon: typeof Diamond; color: string }> = {
  purchase: { icon: Diamond, color: "#06B6D4" },
  gift_sent: { icon: Gift, color: "#FF2D78" },
  gift_received: { icon: Gift, color: "#10B981" },
  game_win: { icon: Star, color: "#FFD700" },
  game_loss: { icon: Zap, color: "#EF4444" },
  bonus: { icon: Sparkles, color: "#8B5CF6" },
}

// ============================================================================
// PAYMENT METHOD SELECTOR
// ============================================================================

type PaymentMethod = "stripe" | "google_iap" | "apple_iap"

function PaymentMethodBadge({ method }: { method: PaymentMethod }) {
  if (method === "stripe") return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ background: "rgba(99,91,255,0.12)", border: "1px solid rgba(99,91,255,0.25)" }}>
      <CreditCard className="w-3 h-3 text-[#635BFF]" />
      <span className="text-[9px] font-bold text-[#635BFF]">Stripe</span>
    </div>
  )
  if (method === "google_iap") return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ background: "rgba(66,133,244,0.12)", border: "1px solid rgba(66,133,244,0.25)" }}>
      <Smartphone className="w-3 h-3 text-[#4285F4]" />
      <span className="text-[9px] font-bold text-[#4285F4]">Google Play</span>
    </div>
  )
  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
      <Smartphone className="w-3 h-3 text-white" />
      <span className="text-[9px] font-bold text-white">Apple Pay</span>
    </div>
  )
}

// ============================================================================
// DIAMONDS TAB (with Stripe checkout)
// ============================================================================

function DiamondPackagesTab({
  diamonds, onDiamondsChange, onCheckout,
}: {
  diamonds: number; onDiamondsChange: (d: number) => void; onCheckout: (productId: string) => void
}) {
  const products = getDiamondProducts()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("stripe")

  return (
    <div className="px-4 py-3">
      {/* Payment method selector */}
      <div className="mb-4">
        <span className="text-[10px] text-[#8888AA] mb-2 block">Payment Method</span>
        <div className="flex gap-2">
          {(["stripe", "google_iap", "apple_iap"] as PaymentMethod[]).map(m => (
            <button
              key={m}
              onClick={() => setPaymentMethod(m)}
              className="flex-1 flex flex-col items-center gap-1.5 p-2.5 rounded-xl transition-all"
              style={{
                background: paymentMethod === m ? "rgba(255,45,120,0.1)" : "rgba(255,255,255,0.03)",
                border: paymentMethod === m ? "1px solid #FF2D78" : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {m === "stripe" && <CreditCard className="w-4 h-4" style={{ color: paymentMethod === m ? "#FF2D78" : "#8888AA" }} />}
              {m === "google_iap" && <Smartphone className="w-4 h-4" style={{ color: paymentMethod === m ? "#FF2D78" : "#8888AA" }} />}
              {m === "apple_iap" && <Smartphone className="w-4 h-4" style={{ color: paymentMethod === m ? "#FF2D78" : "#8888AA" }} />}
              <span className="text-[8px] font-bold" style={{ color: paymentMethod === m ? "#FF2D78" : "#8888AA" }}>
                {m === "stripe" ? "Card / UPI" : m === "google_iap" ? "Google Play" : "Apple Pay"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Google In-App Info Banner */}
      {paymentMethod === "google_iap" && (
        <div className="mb-4 p-3 rounded-2xl" style={{ background: "rgba(66,133,244,0.08)", border: "1px solid rgba(66,133,244,0.2)" }}>
          <div className="flex items-center gap-2 mb-1.5">
            <Smartphone className="w-4 h-4 text-[#4285F4]" />
            <span className="text-xs font-bold text-[#4285F4]">Google Play In-App Purchase</span>
          </div>
          <p className="text-[10px] text-[rgba(255,255,255,0.6)] leading-relaxed">
            In-app purchases are available when using the LotChat app from Google Play Store. Payment is processed securely through your Google Play account. Purchases will be charged to your Google Play balance, credit card, or carrier billing.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#10B981]" />
              <span className="text-[9px] text-[#10B981]">Secure</span>
            </div>
            <div className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-[#10B981]" />
              <span className="text-[9px] text-[#10B981]">Protected</span>
            </div>
          </div>
        </div>
      )}

      {paymentMethod === "apple_iap" && (
        <div className="mb-4 p-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="flex items-center gap-2 mb-1.5">
            <Smartphone className="w-4 h-4 text-white" />
            <span className="text-xs font-bold text-white">Apple In-App Purchase</span>
          </div>
          <p className="text-[10px] text-[rgba(255,255,255,0.6)] leading-relaxed">
            In-app purchases are available when using the LotChat app from the App Store. Payment is processed securely through your Apple ID. Face ID / Touch ID confirmation required.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#10B981]" />
              <span className="text-[9px] text-[#10B981]">Apple Verified</span>
            </div>
          </div>
        </div>
      )}

      {/* First Purchase Banner */}
      <div className="mb-4 p-3 rounded-2xl relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(255,215,0,0.12), rgba(255,45,120,0.12))", border: "1px solid rgba(255,215,0,0.2)" }}>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-[#FFD700]" />
          <span className="text-xs font-bold text-[#FFD700]">Bonus Diamonds Included</span>
        </div>
        <p className="text-[10px] text-[#8888AA]">Get extra bonus diamonds with every purchase!</p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => paymentMethod === "stripe" ? onCheckout(product.id) : undefined}
            className="relative flex flex-col items-center gap-2 p-4 rounded-2xl transition-all active:scale-95"
            style={{
              background: product.popular
                ? "linear-gradient(135deg, rgba(255,45,120,0.12), rgba(139,92,246,0.12))"
                : "rgba(255,255,255,0.04)",
              border: product.popular
                ? "1px solid rgba(255,45,120,0.3)"
                : "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {product.popular && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[8px] font-black text-white" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>
                BEST VALUE
              </span>
            )}
            <Diamond className="w-10 h-10 text-[#06B6D4]" />
            <span className="text-lg font-bold text-white">{formatNumber(product.diamonds)}</span>
            {product.bonus > 0 && (
              <span className="text-[9px] text-[#FFD700] font-semibold">+{formatNumber(product.bonus)} bonus</span>
            )}
            <span className="px-4 py-1.5 rounded-full text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>
              {formatPrice(product.priceInCents)}
            </span>
          </button>
        ))}
      </div>

      {/* Security note */}
      <div className="flex items-center justify-center gap-2 mt-4 py-2">
        <Lock className="w-3 h-3 text-[#10B981]" />
        <span className="text-[9px] text-[#8888AA]">Payments secured by Stripe. SSL encrypted.</span>
      </div>
    </div>
  )
}

// ============================================================================
// VIP TAB
// ============================================================================

function VipTab({ onCheckout }: { onCheckout: (productId: string) => void }) {
  const products = getVipProducts()

  return (
    <div className="px-4 py-3 flex flex-col gap-3">
      {products.map((product) => {
        const isSvip = product.category === "svip"
        return (
          <button
            key={product.id}
            onClick={() => onCheckout(product.id)}
            className="relative text-left w-full p-4 rounded-2xl transition-all active:scale-[0.98]"
            style={{
              background: isSvip
                ? "linear-gradient(135deg, rgba(255,45,120,0.1), rgba(139,92,246,0.1))"
                : "linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,107,53,0.08))",
              border: isSvip
                ? "1px solid rgba(255,45,120,0.25)"
                : "1px solid rgba(255,215,0,0.25)",
            }}
          >
            {product.popular && (
              <span className="absolute -top-2 right-3 px-2 py-0.5 rounded-full text-[8px] font-black text-white" style={{ background: isSvip ? "#FF2D78" : "#FFD700" }}>
                POPULAR
              </span>
            )}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {isSvip ? <Crown className="w-5 h-5 text-[#FF2D78]" /> : <Shield className="w-5 h-5 text-[#FFD700]" />}
                <span className="text-sm font-bold text-white">{product.name}</span>
              </div>
              <span className="text-sm font-bold" style={{ color: isSvip ? "#FF2D78" : "#FFD700" }}>
                {formatPrice(product.priceInCents)}
              </span>
            </div>
            <p className="text-[10px] text-[#8888AA] leading-relaxed">{product.description}</p>
            <div className="mt-3 py-2 rounded-xl text-center text-xs font-bold text-white"
              style={{ background: isSvip ? "linear-gradient(135deg, #FF2D78, #8B5CF6)" : "linear-gradient(135deg, #FFD700, #FF6B35)" }}
            >
              Purchase - {formatPrice(product.priceInCents)}
            </div>
          </button>
        )
      })}
    </div>
  )
}

// ============================================================================
// OFFERS TAB
// ============================================================================

function OffersTab({ onCheckout }: { onCheckout: (productId: string) => void }) {
  const products = getOfferProducts()

  return (
    <div className="px-4 py-3 flex flex-col gap-3">
      {products.map((product) => (
        <div key={product.id} className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="px-4 py-3 flex items-center justify-between" style={{ background: "linear-gradient(135deg, rgba(255,45,120,0.15), rgba(139,92,246,0.15))" }}>
            <div>
              <span className="text-sm font-black text-white block">{product.name}</span>
              <span className="text-[10px] text-[rgba(255,255,255,0.7)]">{product.description}</span>
            </div>
          </div>
          <div className="p-4 bg-[rgba(255,255,255,0.03)]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Diamond className="w-5 h-5 text-[#06B6D4]" />
                <span className="text-lg font-bold text-white">{formatNumber(product.diamonds)}</span>
                {product.bonus > 0 && (
                  <span className="text-xs text-[#FFD700] font-bold">+{formatNumber(product.bonus)}</span>
                )}
              </div>
              <span className="text-lg font-bold text-[#FF2D78]">{formatPrice(product.priceInCents)}</span>
            </div>
            <button
              onClick={() => onCheckout(product.id)}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white"
              style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}
            >
              Buy Now - {formatPrice(product.priceInCents)}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

// ============================================================================
// TRANSACTIONS TAB
// ============================================================================

function TransactionsTab() {
  const [filter, setFilter] = useState<"all" | "purchase" | "gift_sent" | "gift_received" | "game_win" | "bonus">("all")
  const filtered = filter === "all" ? mockTransactions : mockTransactions.filter(t => t.type === filter)

  return (
    <div className="px-4 py-3">
      <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1">
        {(["all", "purchase", "gift_sent", "gift_received", "game_win", "bonus"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-full text-[10px] font-medium whitespace-nowrap transition-colors"
            style={{
              background: filter === f ? "#FF2D78" : "rgba(255,255,255,0.05)",
              color: filter === f ? "#FFFFFF" : "#8888AA",
            }}
          >
            {f === "all" ? "All" : f.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {filtered.map((tx) => {
          const txMeta = transactionIcons[tx.type]
          const Icon = txMeta.icon
          const isPositive = tx.amount > 0
          return (
            <div key={tx.id} className="flex items-center gap-3 p-3 rounded-xl glass">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${txMeta.color}20` }}>
                <Icon className="w-4 h-4" style={{ color: txMeta.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-white block truncate">{tx.description}</span>
                <span className="text-[10px] text-[#8888AA]">{tx.timestamp}</span>
              </div>
              <span className="text-sm font-bold flex-shrink-0" style={{ color: isPositive ? "#10B981" : "#EF4444" }}>
                {isPositive ? "+" : ""}{formatNumber(Math.abs(tx.amount))}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================================
// MAIN SHOP SCREEN
// ============================================================================

export function ShopScreen({ diamonds, onDiamondsChange, onBack }: ShopScreenProps) {
  const [activeTab, setActiveTab] = useState<"diamonds" | "vip" | "offers" | "history">("diamonds")
  const [checkoutProductId, setCheckoutProductId] = useState<string | null>(null)

  const tabs = [
    { id: "diamonds" as const, label: "Diamonds", icon: Diamond },
    { id: "vip" as const, label: "VIP", icon: Crown },
    { id: "offers" as const, label: "Offers", icon: Tag },
    { id: "history" as const, label: "History", icon: Clock },
  ]

  // Show Stripe Checkout
  if (checkoutProductId) {
    return (
      <div className="flex flex-col h-full bg-background">
        <StripeCheckout
          productId={checkoutProductId}
          onClose={() => setCheckoutProductId(null)}
          onSuccess={(addedDiamonds) => {
            onDiamondsChange(diamonds + addedDiamonds)
          }}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
        <button onClick={onBack} className="w-8 h-8 rounded-full glass flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>
        <h1 className="text-lg font-bold text-white flex-1">Shop</h1>
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full glass">
          <Diamond className="w-3.5 h-3.5 text-[#06B6D4]" />
          <span className="text-xs font-bold text-white">{formatNumber(diamonds)}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-4 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-semibold transition-all"
              style={{
                background: activeTab === tab.id ? "linear-gradient(135deg, #FF2D78, #8B5CF6)" : "rgba(255,255,255,0.05)",
                color: activeTab === tab.id ? "#FFFFFF" : "#8888AA",
              }}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-4">
        {activeTab === "diamonds" && <DiamondPackagesTab diamonds={diamonds} onDiamondsChange={onDiamondsChange} onCheckout={setCheckoutProductId} />}
        {activeTab === "vip" && <VipTab onCheckout={setCheckoutProductId} />}
        {activeTab === "offers" && <OffersTab onCheckout={setCheckoutProductId} />}
        {activeTab === "history" && <TransactionsTab />}
      </div>
    </div>
  )
}
