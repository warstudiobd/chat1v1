"use client"

import { useState } from "react"
import {
  Settings, ChevronRight, Diamond, Star, Heart, HelpCircle, Crown, LogOut, X,
  Coins, Shield, Mic, Award, Users, Loader2, Edit3,
} from "lucide-react"
import { AvatarBadge } from "@/components/shared/avatar-badge"
import { vipPackages, formatNumber, getRoleBadgeColor } from "@/lib/mock-data"
import { getDiamondProducts, formatPrice } from "@/lib/products"
import { createClient } from "@/lib/supabase/client"
import { StripeCheckout } from "@/components/stripe-checkout"
import { useMyProfile, useFollowCounts, updateProfile, getAvatarGradient } from "@/lib/supabase/hooks"

function WalletSection({ diamonds, beans, onRecharge }: { diamonds: number; beans: number; onRecharge: () => void }) {
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
          <span className="text-lg font-bold text-white">{formatNumber(diamonds)}</span>
          <span className="text-[10px] text-[#8888AA]">Diamonds</span>
        </div>
        <div className="flex flex-col items-center flex-1 py-2 rounded-xl bg-[rgba(0,0,0,0.2)]">
          <Coins className="w-5 h-5 text-[#10B981] mb-1" />
          <span className="text-lg font-bold text-white">{formatNumber(beans)}</span>
          <span className="text-[10px] text-[#8888AA]">Beans</span>
        </div>
      </div>
    </div>
  )
}

function EditProfileModal({ profile, onClose, onSave }: { profile: any; onClose: () => void; onSave: () => void }) {
  const [displayName, setDisplayName] = useState(profile?.display_name ?? "")
  const [bio, setBio] = useState(profile?.bio ?? "")
  const [country, setCountry] = useState(profile?.country ?? "")
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateProfile({ display_name: displayName.trim() || null, bio: bio.trim() || null, country: country.trim() || null })
      onSave()
      onClose()
    } catch { /* ignore */ }
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(0,0,0,0.6)]">
      <div className="w-full max-w-[430px] rounded-t-3xl glass-strong animate-slide-up">
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h3 className="text-base font-bold text-white">Edit Profile</h3>
          <button onClick={onClose} aria-label="Close"><X className="w-5 h-5 text-[#8888AA]" /></button>
        </div>
        <div className="px-5 pb-2 flex flex-col gap-3">
          <div>
            <label className="text-[10px] text-[#8888AA] mb-1 block">Display Name</label>
            <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={30} className="w-full py-2.5 px-3 rounded-xl glass text-sm text-white bg-transparent outline-none" />
          </div>
          <div>
            <label className="text-[10px] text-[#8888AA] mb-1 block">Bio</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} maxLength={150} rows={3} className="w-full py-2.5 px-3 rounded-xl glass text-sm text-white bg-transparent outline-none resize-none" />
          </div>
          <div>
            <label className="text-[10px] text-[#8888AA] mb-1 block">Country</label>
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} maxLength={30} className="w-full py-2.5 px-3 rounded-xl glass text-sm text-white bg-transparent outline-none" />
          </div>
        </div>
        <div className="px-5 pb-6 pt-3">
          <button onClick={handleSave} disabled={saving} className="w-full py-3 rounded-xl text-sm font-bold text-white disabled:opacity-40" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )
}

function RechargeModal({ diamonds, onClose, onCheckout }: { diamonds: number; onClose: () => void; onCheckout: (productId: string) => void }) {
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
          <span className="text-sm text-white">Current balance: <span className="font-bold text-[#FFD700]">{diamonds.toLocaleString()}</span></span>
        </div>
        <div className="grid grid-cols-3 gap-2 px-5 py-3">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => { onCheckout(product.id); onClose() }}
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
              <button key={pkg.id} onClick={() => setSelectedPkg(pkg.id)} className="relative text-left w-full p-3.5 rounded-2xl transition-all" style={{
                background: isSelected ? isSvip ? "linear-gradient(135deg, rgba(255,45,120,0.2), rgba(139,92,246,0.2))" : "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,107,53,0.15))" : "rgba(255,255,255,0.04)",
                border: isSelected ? isSvip ? "1px solid #FF2D78" : "1px solid #FFD700" : "1px solid rgba(255,255,255,0.06)",
              }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {isSvip ? <Crown className="w-4 h-4 text-[#FF2D78]" /> : <Shield className="w-4 h-4 text-[#FFD700]" />}
                    <span className="text-sm font-bold text-white">{pkg.name}</span>
                    <span className="text-[10px] text-[#8888AA]">({pkg.duration})</span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: isSvip ? "#FF2D78" : "#FFD700" }}>{formatNumber(pkg.price)} D</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {pkg.features.map((f) => <span key={f} className="px-2 py-0.5 rounded-full text-[9px] font-medium text-white bg-[rgba(255,255,255,0.08)]">{f}</span>)}
                </div>
              </button>
            )
          })}
        </div>
        <div className="px-5 pb-6 pt-1">
          <button className="w-full py-3 rounded-xl text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>Purchase Membership</button>
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
  const { data: profile, isLoading, mutate: refreshProfile } = useMyProfile()
  const { data: followCounts } = useFollowCounts(profile?.id)
  const [showRecharge, setShowRecharge] = useState(false)
  const [showVip, setShowVip] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [checkoutProductId, setCheckoutProductId] = useState<string | null>(null)

  if (checkoutProductId) {
    return (
      <div className="flex flex-col h-full bg-background">
        <StripeCheckout productId={checkoutProductId} onClose={() => setCheckoutProductId(null)} onSuccess={() => { setCheckoutProductId(null); refreshProfile() }} />
      </div>
    )
  }

  if (isLoading || !profile) {
    return <div className="flex items-center justify-center h-full"><Loader2 className="w-6 h-6 text-[#FF2D78] animate-spin" /></div>
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = "/auth/login"
  }

  const displayName = profile.display_name ?? "User"
  const gradient = getAvatarGradient(displayName)
  const roleBadge = profile.is_svip ? "svip" : profile.is_vip ? "vip" : profile.role
  const levelProgress = (profile.level % 10) / 10

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-4">
      {/* Profile Header */}
      <div className="flex flex-col items-center px-4 py-6 relative">
        <button className="absolute top-4 right-4 flex items-center justify-center w-9 h-9 rounded-full glass" aria-label="Settings">
          <Settings className="w-4 h-4 text-white" />
        </button>

        <div className="relative">
          <AvatarBadge name={displayName} gradientClass={gradient} size="xl" level={profile.level} />
          <button
            onClick={() => setShowEdit(true)}
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}
            aria-label="Edit profile"
          >
            <Edit3 className="w-3 h-3 text-white" />
          </button>
        </div>

        <h2 className="text-xl font-bold text-white mt-3">{displayName}</h2>
        <span className="text-xs text-[#8888AA] mt-0.5">ID: {profile.id.substring(0, 8)}</span>

        {(roleBadge === "vip" || roleBadge === "svip") ? (
          <span className="mt-1.5 px-3 py-0.5 rounded-full text-[10px] font-black text-white" style={{ background: getRoleBadgeColor(roleBadge) }}>
            {roleBadge.toUpperCase()} MEMBER
          </span>
        ) : (
          <button onClick={() => setShowVip(true)} className="mt-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-[#FFD700] flex items-center gap-1" style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)" }}>
            <Crown className="w-3 h-3" /> Become VIP
          </button>
        )}

        {profile.bio && <p className="text-sm text-[rgba(255,255,255,0.6)] mt-1 text-center max-w-[280px]">{profile.bio}</p>}
        {profile.country && <span className="text-[10px] text-[#8888AA]">{profile.country}</span>}

        {/* Level Progress */}
        <div className="w-full max-w-[200px] mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded-full" style={{ background: "linear-gradient(135deg, #8B5CF6, #FF2D78)" }}>Lv.{profile.level}</span>
            <span className="text-[10px] text-[#8888AA]">Lv.{profile.level + 1}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[rgba(255,255,255,0.1)]">
            <div className="h-full rounded-full" style={{ width: `${levelProgress * 100}%`, background: "linear-gradient(90deg, #FF2D78, #8B5CF6)" }} />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8 mt-5">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-white">{formatNumber(followCounts?.followers ?? 0)}</span>
            <span className="text-[10px] text-[#8888AA]">Followers</span>
          </div>
          <div className="w-px h-8 bg-[rgba(255,255,255,0.1)]" />
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-white">{formatNumber(followCounts?.following ?? 0)}</span>
            <span className="text-[10px] text-[#8888AA]">Following</span>
          </div>
        </div>
      </div>

      {/* Wallet */}
      <WalletSection diamonds={profile.diamonds} beans={profile.beans} onRecharge={() => setShowRecharge(true)} />

      {/* VIP Banner */}
      <div className="mx-4 mt-3">
        <button onClick={() => setShowVip(true)} className="w-full rounded-2xl p-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,45,120,0.08))", border: "1px solid rgba(255,215,0,0.15)" }}>
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
          <button key={item.label} onClick={() => item.action === "vip" ? setShowVip(true) : undefined} className="flex items-center gap-3 w-full px-3 py-3.5 rounded-xl hover:bg-[rgba(255,255,255,0.03)] transition-colors">
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
        <button onClick={handleLogout} disabled={loggingOut} className="flex items-center gap-3 w-full px-3 py-3.5 rounded-xl hover:bg-[rgba(255,255,255,0.03)] transition-colors disabled:opacity-50">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[rgba(239,68,68,0.1)]">
            {loggingOut ? <Loader2 className="w-4 h-4 text-[#EF4444] animate-spin" /> : <LogOut className="w-4 h-4 text-[#EF4444]" />}
          </div>
          <span className="flex-1 text-sm text-[#EF4444] text-left">{loggingOut ? "Logging out..." : "Log Out"}</span>
        </button>
      </div>

      {/* Modals */}
      {showRecharge && <RechargeModal diamonds={profile.diamonds} onClose={() => setShowRecharge(false)} onCheckout={setCheckoutProductId} />}
      {showVip && <VipModal onClose={() => setShowVip(false)} />}
      {showEdit && <EditProfileModal profile={profile} onClose={() => setShowEdit(false)} onSave={() => refreshProfile()} />}
    </div>
  )
}
