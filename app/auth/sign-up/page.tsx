"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Eye, EyeOff, Check } from "lucide-react";
import { OAuthButtons } from "@/components/oauth-buttons";

export default function SignUpPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const pw6 = password.length >= 6;
  const pwUpper = /[A-Z]/.test(password);
  const pwNum = /[0-9]/.test(password);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!pw6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { display_name: displayName.trim() },
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
          `${window.location.origin}/home`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/auth/sign-up-success");
    }
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 gradient-chamet">
      <div className="flex w-full max-w-sm flex-col gap-6">
        {/* Branding */}
        <div className="flex flex-col items-center gap-3">
          <Image
            src="/icon-512.jpg"
            alt="LotChat"
            width={72}
            height={72}
            className="h-18 w-18 rounded-2xl shadow-lg"
            priority
          />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Create account
          </h1>
          <p className="text-sm text-muted-foreground">
            Join the LotChat community
          </p>
        </div>

        {/* OAuth */}
        <OAuthButtons />

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">or sign up with email</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          {error && (
            <div className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="displayName" className="text-xs font-medium text-muted-foreground">
              Display Name
            </label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
              required
              autoComplete="name"
              className="h-12 rounded-xl border border-input bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-medium text-muted-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="h-12 rounded-xl border border-input bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-medium text-muted-foreground">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
                minLength={6}
                autoComplete="new-password"
                className="h-12 w-full rounded-xl border border-input bg-card px-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {/* Password strength */}
            {password.length > 0 && (
              <div className="flex flex-col gap-1 pt-1">
                {[
                  { ok: pw6, label: "At least 6 characters" },
                  { ok: pwUpper, label: "One uppercase letter" },
                  { ok: pwNum, label: "One number" },
                ].map((rule) => (
                  <div key={rule.label} className="flex items-center gap-2">
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded-full ${
                        rule.ok ? "bg-emerald-500/20" : "bg-muted"
                      }`}
                    >
                      {rule.ok && <Check className="h-2.5 w-2.5 text-emerald-400" />}
                    </div>
                    <span
                      className={`text-[11px] ${
                        rule.ok ? "text-emerald-400" : "text-muted-foreground"
                      }`}
                    >
                      {rule.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={loading || !pw6}
            className="flex h-12 items-center justify-center rounded-xl gradient-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-opacity active:opacity-90 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-primary">
            Sign in
          </Link>
        </p>

        <p className="text-center text-[10px] text-muted-foreground/50 leading-relaxed">
          By creating an account you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </main>
  );
}
