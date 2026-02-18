"use client"

import Link from "next/link"
import { Mic, Users, Gift, Shield, Crown, Gamepad2, ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>
            <Mic className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">LotChat</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="text-xs text-[#8888AA] hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="text-xs text-[#8888AA] hover:text-white transition-colors">Terms</Link>
          <Link
            href="/auth/login"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}
          >
            Open App
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-16 pb-20 max-w-3xl mx-auto">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
          style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}
        >
          <Mic className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4 text-balance leading-tight md:text-5xl">
          Connect Through Live Voice Rooms
        </h1>
        <p className="text-base text-[#8888AA] mb-8 max-w-lg leading-relaxed">
          Join millions on LotChat. Host voice rooms, send gifts, play games, and make friends from around the world. Your voice, your community.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { icon: Mic, title: "Live Voice Rooms", desc: "Host and join voice rooms with up to 8 speakers. Chat, sing, or debate with people worldwide.", color: "#FF2D78" },
            { icon: Gift, title: "Virtual Gifts", desc: "Send stunning animated gifts to your favorite hosts. Diamonds and beans power the gift economy.", color: "#FFD700" },
            { icon: Gamepad2, title: "Play Games", desc: "Greedy Cat, Teen Patti, Lucky Wheel, Crash and more. Bet diamonds and win big jackpots.", color: "#8B5CF6" },
            { icon: Crown, title: "VIP & SVIP", desc: "Unlock exclusive badges, entry effects, anti-kick protection, room lock, and premium frames.", color: "#FF2D78" },
            { icon: Users, title: "Discover People", desc: "Find users by country, age, or interest. Follow your favorites and never miss a room.", color: "#06B6D4" },
            { icon: Shield, title: "Safe & Secure", desc: "Moderation tools, room locks, anti-kick for VIPs, and admin controls keep the community safe.", color: "#10B981" },
          ].map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${f.color}15` }}
              >
                <f.icon className="w-5 h-5" style={{ color: f.color }} />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{f.title}</h3>
              <p className="text-xs text-[#8888AA] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Download CTA */}
      <section className="px-6 pb-20 max-w-3xl mx-auto text-center">
        <div
          className="p-8 rounded-3xl"
          style={{ background: "linear-gradient(135deg, rgba(255,45,120,0.1), rgba(139,92,246,0.1))", border: "1px solid rgba(255,45,120,0.2)" }}
        >
          <h2 className="text-2xl font-bold text-white mb-2">Ready to Join?</h2>
          <p className="text-sm text-[#8888AA] mb-6">Download LotChat on Play Store or App Store</p>
          <div className="flex items-center justify-center gap-3">
            <div className="px-5 py-3 rounded-xl bg-[rgba(255,255,255,0.05)] text-xs font-bold text-white" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
              Google Play
            </div>
            <div className="px-5 py-3 rounded-xl bg-[rgba(255,255,255,0.05)] text-xs font-bold text-white" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
              App Store
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex flex-col items-center gap-1 mb-3">
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>
              <Mic className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-bold text-white">LotChat</span>
          </div>
          <span className="text-[9px] text-[#8888AA]">by War Studio Ltd</span>
        </div>
        <div className="flex items-center justify-center gap-4 mb-3">
          <Link href="/privacy" className="text-xs text-[#8888AA] hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="text-xs text-[#8888AA] hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/auth/login" className="text-xs text-[#8888AA] hover:text-white transition-colors">Login</Link>
        </div>
        <p className="text-[10px] text-[#8888AA]">{"War Studio Ltd 2026. All rights reserved."}</p>
      </footer>
    </div>
  )
}
