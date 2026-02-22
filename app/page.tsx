import Link from "next/link";
import { Mic, Users, Gift, MessageCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-center gap-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary">
          <Mic className="h-10 w-10 text-primary-foreground" />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground text-balance">
            Welcome to LotChat
          </h1>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Join voice rooms, meet new people, send gifts, and build your
            community.
          </p>
        </div>
        <div className="grid w-full grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-2 rounded-xl bg-card p-4">
            <Users className="h-6 w-6 text-primary" />
            <span className="text-xs text-muted-foreground">Voice Rooms</span>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-xl bg-card p-4">
            <Gift className="h-6 w-6 text-pink" />
            <span className="text-xs text-muted-foreground">Send Gifts</span>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-xl bg-card p-4">
            <MessageCircle className="h-6 w-6 text-gold" />
            <span className="text-xs text-muted-foreground">Chat</span>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3">
          <Link
            href="/auth/login"
            className="flex h-12 w-full items-center justify-center rounded-xl gradient-primary text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Log In
          </Link>
          <Link
            href="/auth/sign-up"
            className="flex h-12 w-full items-center justify-center rounded-xl border border-border bg-card text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Create Account
          </Link>
        </div>
      </div>
    </main>
  );
}
