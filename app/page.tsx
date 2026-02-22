import Link from "next/link";
import Image from "next/image";
import { Mic, Users, Gift, Gamepad2, Video, Shield } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/home");
  }

  return (
    <main className="flex min-h-dvh flex-col gradient-chamet">
      {/* Hero */}
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-12">
        {/* App Icon */}
        <div className="relative">
          <div className="absolute -inset-4 animate-pulse-ring rounded-3xl gradient-primary opacity-30" />
          <Image
            src="/icon-512.jpg"
            alt="LotChat"
            width={96}
            height={96}
            className="relative h-24 w-24 rounded-3xl shadow-2xl"
            priority
          />
        </div>

        {/* Title */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground text-balance">
            LotChat
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed text-pretty">
            Voice & Video Room
          </p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            by WarStudio Ltd
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid w-full max-w-xs grid-cols-3 gap-3">
          {[
            { icon: Mic, label: "Voice Rooms", color: "text-primary" },
            { icon: Video, label: "Video Chat", color: "text-cyan" },
            { icon: Gift, label: "Send Gifts", color: "text-pink" },
            { icon: Gamepad2, label: "Games", color: "text-gold" },
            { icon: Users, label: "Community", color: "text-primary" },
            { icon: Shield, label: "Secure", color: "text-cyan" },
          ].map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 rounded-2xl glass p-4"
            >
              <f.icon className={`h-6 w-6 ${f.color}`} />
              <span className="text-[10px] font-medium text-muted-foreground">
                {f.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-3 px-6 pb-10 pt-4">
        <Link
          href="/auth/login"
          className="flex h-14 w-full items-center justify-center rounded-2xl gradient-primary text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-opacity active:opacity-90"
        >
          Log In
        </Link>
        <Link
          href="/auth/sign-up"
          className="flex h-14 w-full items-center justify-center rounded-2xl glass border border-border text-base font-bold text-foreground transition-colors active:bg-muted"
        >
          Create Account
        </Link>
        <p className="mt-2 text-center text-[11px] text-muted-foreground/60 leading-relaxed">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </main>
  );
}
