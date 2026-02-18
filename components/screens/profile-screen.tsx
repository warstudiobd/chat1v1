"use client"

import { useState } from "react"
import {
  Settings, ChevronRight, Diamond, Star, Heart, HelpCircle, Crown, LogOut, X,
  Coins, Shield, Mic, Award, Users, Loader2,
} from "lucide-react"
import { AvatarBadge } from "@/components/shared/avatar-badge"
import { mockUsers, vipPackages, formatNumber, getRoleBadgeColor } from "@/lib/mock-data"
import { getDiamondProducts, formatPrice } from "@/lib/products"
import { createClient } from "@/lib/supabase/client"
import { StripeCheckout } from "@/components/stripe-checkout"

const currentUser = {
  ...mockUsers[15],
  name: "You",
  level: 24,
  followers: 1560,
  following: 234,
  fans: 890,
  diamonds: 2480,
  beans: 15200,
  role: "user" as const,
}

function WalletSection({ onRecharge }: { onRecharge: () => void }) {
  return (
    <div
      className="mx-4 p-4 rounded-2xl"
      style={{
        background: "linear-gradient(135deg, rgba(255,45,120,0.15), rgba(139,92,246,0.15))",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white">My Wallet</h3>
        <button
          onClick={onRecharge}
          className="px-3 py-1 rounded-full text-[10px] font-bold text-white"
          style={{ background: "linear-gradient(135deg, #FFD700, #FF6B35)" }}
        >
          Recharge
        </button>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col items-center flex-1 py-2 rounded-xl bg-[rgba(0,0,0,0.2)]">
          <Diamond className="w-5 h-5 text-[#FFD700] mb-1" />
          <span className="text-lg font-bold text-white">{formatNumber(currentUser.diamonds)}</span>
          <span className="text-[10px] text-[#8888AA]">Diamonds</span>
        </div>
        <div className="flex flex-col items-center flex-1 py-2 rounded-xl bg-[rgba(0,0,0,0.2)]">
          <Coins className="w-5 h-5 text-[#10B981] mb-1" />
          <span className="text-lg font-bold text-white">{formatNumber(currentUser.beans)}</span>
          <span className="text-[10px] text-[#8888AA]">Beans</span>
        </div>
      </div>
    </div>
  )
}

function RechargeModal({ onClose, onCheckout }: { onClose: () => void; onCheckout: (productId: string) => void }) {
  const products = getDiamondProducts()
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(0,0,0,0.6)]">
      <div className="w-full max-w-[430px] rounded-t-3xl glass-strong animate-slide-up">
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h3 className="text-base font-bold text-white">Recharge Diamonds</h3>
          <button onClick={onClose} aria-label="Close recharge modal"><X className="w-5 h-5 text-[#8888AA]" /></button>
        </div>
        <div className="flex items-center gap-2 px-5 py-2">
          <Diamond className="w-4 h-4 text-[#FFD700]" />
          <span className="text-sm text-white">Current balance: <span className="font-bold text-[#FFD700]">{currentUser.diamonds.toLocaleString()}</span></span>
        </div>
        <div className="grid grid-cols-3 gap-2 px-5 py-3">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => {
                onCheckout(product.id)
                onClose()
              }}
              className="relative flex flex-col items-center gap-1 p-3 rounded-xl transition-all active:scale-95"
              style={{
                background: product.popular ? "linear-gradient(135deg, rgba(255,45,120,0.2), rgba(139,92,246,0.2))" : "rgba(255,255,255,0.05)",
                border: product.popular ? "1px solid #FF2D78" : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {product.popular && <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#FF2D78] text-[7px] font-bold text-white">BEST</span>}
              <Diamond className="w-5 h-5 text-[#FFD700]" />
              <span className="text-sm font-bold text-white">{formatNumber(product.diamonds)}</span>
              {product.bonus > 0 && <span className="text-[7px] text-[#FFD700]">+{formatNumber(product.bonus)}</span>}
              <span className="text-xs text-[#06B6D4] font-semibold">{formatPrice(product.priceInCents)}</span>
            </button>
          ))}
        </div>
        <div className="px-5 pb-6 pt-2 text-center">
          <span className="text-[9px] text-[#8888AA]">Powered by Stripe. SSL encrypted payments.</span>
        </div>
      </div>
    </div>
  )
}

function VipModal({ onClose }: { onClose: () => void }) {
  const [selectedPkg, setSelectedPkg] = useState(vipPackages[0].id)

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(0,0,0,0.6)]">
      <div className="w-full max-w-[430px] rounded-t-3xl glass-strong animate-slide-up">
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h3 className="text-base font-bold text-white">VIP / SVIP Membership</h3>
          <button onClick={onClose} aria-label="Close VIP modal"><X className="w-5 h-5 text-[#8888AA]" /></button>
        </div>

        <div className="px-5 pb-4 flex flex-col gap-2.5">
          {vipPackages.map((pkg) => {
            const isSvip = pkg.id.startsWith("svip")
            const isSelected = selectedPkg === pkg.id
            return (
              <button
                key={pkg.id}
                onClick={() => setSelectedPkg(pkg.id)}
                className="relative text-left w-full p-3.5 rounded-2xl transition-all"
                style={{
                  background: isSelected
                    ? isSvip ? "linear-gradient(135deg, rgba(255,45,120,0.2), rgba(139,92,246,0.2))" : "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,107,53,0.15))"
                    : "rgba(255,255,255,0.04)",
                  border: isSelected
                    ? isSvip ? "1px solid #FF2D78" : "1px solid #FFD700"
                    : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {isSvip ? <Crown className="w-4 h-4 text-[#FF2D78]" /> : <Shield className="w-4 h-4 text-[#FFD700]" />}
                    <span className="text-sm font-bold text-white">{pkg.name}</span>
                    <span className="text-[10px] text-[#8888AA]">({pkg.duration})</span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: isSvip ? "#FF2D78" : "#FFD700" }}>
                    {formatNumber(pkg.price)} D
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {pkg.features.map((f) => (
                    <span key={f} className="px-2 py-0.5 rounded-full text-[9px] font-medium text-white bg-[rgba(255,255,255,0.08)]">
                      {f}
                    </span>
                  ))}
                </div>
              </button>
            )
          })}
        </div>

        <div className="px-5 pb-6 pt-1">
          <button className="w-full py-3 rounded-xl text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>
            Purchase Membership
          </button>
          <p className="text-center text-[9px] text-[#8888AA] mt-2">{"$1 = 10,000 Diamonds"}</p>
        </div>
      </div>
    </div>
  )
}

const menuItems = [
  { icon: Mic, label: "My Voice Rooms", color: "#FF2D78" },
  { icon: Award, label: "Achievements", color: "#8B5CF6" },
  { icon: Heart, label: "Favorites", color: "#EF4444" },
  { icon: Crown, label: "VIP / SVIP", color: "#FFD700", action: "vip" as const },
  { icon: Star, label: "Level Rewards", color: "#06B6D4" },
  { icon: Users, label: "My Followers", color: "#10B981" },
  { icon: Settings, label: "Settings", color: "#8888AA" },
  { icon: HelpCircle, label: "Help & Support", color: "#8888AA" },
]

export function ProfileScreen() {
  const [showRecharge, setShowRecharge] = useState(false)
  const [showVip, setShowVip] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [checkoutProductId, setCheckoutProductId] = useState<string | null>(null)

  // Show Stripe Checkout full-screen
  if (checkoutProductId) {
    return (
      <div className="flex flex-col h-full bg-background">
        <StripeCheckout
          productId={checkoutProductId}
          onClose={() => setCheckoutProductId(null)}
          onSuccess={() => setCheckoutProductId(null)}
        />
      </div>
    )
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = "/auth/login"
  }

  const levelProgress = (currentUser.level % 10) / 10

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-4">
      {/* Profile Header */}
      <div className="flex flex-col items-center px-4 py-6 relative">
        <button className="absolute top-4 right-4 flex items-center justify-center w-9 h-9 rounded-full glass" aria-label="Settings">
          <Settings className="w-4 h-4 text-white" />
        </button>

        <AvatarBadge name={currentUser.name} gradientClass={currentUser.gradientClass} size="xl" level={currentUser.level} />

        <h2 className="text-xl font-bold text-white mt-3">{currentUser.name}</h2>
        <span className="text-xs text-[#8888AA] mt-0.5">ID: {currentUser.id}00{currentUser.id}</span>

        {/* Role badge */}
        {(currentUser.role === 'vip' || currentUser.role === 'svip') ? (
          <span className="mt-1.5 px-3 py-0.5 rounded-full text-[10px] font-black text-white" style={{ background: getRoleBadgeColor(currentUser.role) }}>
            {currentUser.role.toUpperCase()} MEMBER
          </span>
        ) : (
          <button
            onClick={() => setShowVip(true)}
            className="mt-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-[#FFD700] flex items-center gap-1"
            style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)" }}
          >
            <Crown className="w-3 h-3" /> Become VIP
          </button>
        )}

        <p className="text-sm text-[rgba(255,255,255,0.6)] mt-1">{currentUser.bio}</p>

        {/* Level Progress */}
        <div className="w-full max-w-[200px] mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded-full" style={{ background: "linear-gradient(135deg, #8B5CF6, #FF2D78)" }}>
              Lv.{currentUser.level}
            </span>
            <span className="text-[10px] text-[#8888AA]">Lv.{currentUser.level + 1}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[rgba(255,255,255,0.1)]">
            <div className="h-full rounded-full" style={{ width: `${levelProgress * 100}%`, background: "linear-gradient(90deg, #FF2D78, #8B5CF6)" }} />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8 mt-5">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-white">{formatNumber(currentUser.followers)}</span>
            <span className="text-[10px] text-[#8888AA]">Followers</span>
          </div>
          <div className="w-px h-8 bg-[rgba(255,255,255,0.1)]" />
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-white">{formatNumber(currentUser.following)}</span>
            <span className="text-[10px] text-[#8888AA]">Following</span>
          </div>
          <div className="w-px h-8 bg-[rgba(255,255,255,0.1)]" />
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-white">{formatNumber(currentUser.fans)}</span>
            <span className="text-[10px] text-[#8888AA]">Fans</span>
          </div>
        </div>
      </div>

      {/* Wallet */}
      <WalletSection onRecharge={() => setShowRecharge(true)} />

      {/* VIP Benefits Banner */}
      <div className="mx-4 mt-3">
        <button
          onClick={() => setShowVip(true)}
          className="w-full rounded-2xl p-3 flex items-center gap-3"
          style={{ background: "linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,45,120,0.08))", border: "1px solid rgba(255,215,0,0.15)" }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #FFD700, #FF2D78)" }}>
            <Crown className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 text-left">
            <span className="text-xs font-bold text-white block">VIP / SVIP Privileges</span>
            <span className="text-[9px] text-[#8888AA]">Anti-kick, room lock, badges & more</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
        </button>
      </div>

      {/* Menu Items */}
      <div className="mt-3 mx-4">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => item.action === 'vip' ? setShowVip(true) : undefined}
            className="flex items-center gap-3 w-full px-3 py-3.5 rounded-xl hover:bg-[rgba(255,255,255,0.03)] transition-colors"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: `${item.color}20` }}>
              <item.icon className="w-4 h-4" style={{ color: item.color }} />
            </div>
            <span className="flex-1 text-sm text-white text-left">{item.label}</span>
            <ChevronRight className="w-4 h-4 text-[#8888AA]" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="mx-4 mt-4">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-3 w-full px-3 py-3.5 rounded-xl hover:bg-[rgba(255,255,255,0.03)] transition-colors disabled:opacity-50"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[rgba(239,68,68,0.1)]">
            {loggingOut ? <Loader2 className="w-4 h-4 text-[#EF4444] animate-spin" /> : <LogOut className="w-4 h-4 text-[#EF4444]" />}
          </div>
          <span className="flex-1 text-sm text-[#EF4444] text-left">{loggingOut ? "Logging out..." : "Log Out"}</span>
        </button>
      </div>

      {/* Modals */}
      {showRecharge && <RechargeModal onClose={() => setShowRecharge(false)} onCheckout={setCheckoutProductId} />}
      {showVip && <VipModal onClose={() => setShowVip(false)} />}
    </div>
  )
}
