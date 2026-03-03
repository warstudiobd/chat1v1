"use client";

import { useState, useEffect, useCallback } from "react";
import { Lock, Eye, EyeOff, Shield } from "lucide-react";

const ADMIN_USER = "ritu";
const ADMIN_PASS = "bdritu1";
const SESSION_KEY = "admin_auth";

export function AdminLoginGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored === "true") setAuthenticated(true);
    setChecking(false);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        sessionStorage.setItem(SESSION_KEY, "true");
        setAuthenticated(true);
      } else {
        setError("Invalid credentials");
        setShaking(true);
        setTimeout(() => setShaking(false), 500);
      }
    },
    [username, password]
  );

  if (checking) {
    return (
      <div className="flex min-h-dvh items-center justify-center gradient-chamet">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 px-6 gradient-chamet">
      {/* Shield Illustration */}
      <div className="relative">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          aria-hidden="true"
        >
          {/* Outer glow */}
          <circle cx="60" cy="60" r="55" fill="hsl(270 80% 60%)" opacity="0.06">
            <animate
              attributeName="r"
              values="50;55;50"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          {/* Shield body */}
          <path
            d="M60 12 L98 30 L98 62 C98 85 78 104 60 110 C42 104 22 85 22 62 L22 30 Z"
            fill="hsl(250 16% 10%)"
            stroke="hsl(270 80% 60%)"
            strokeWidth="2"
          />
          {/* Inner shield */}
          <path
            d="M60 22 L88 36 L88 60 C88 78 72 94 60 100 C48 94 32 78 32 60 L32 36 Z"
            fill="hsl(270 80% 60%)"
            opacity="0.1"
          />
          {/* Lock icon inside shield */}
          <rect
            x="48"
            y="55"
            width="24"
            height="18"
            rx="3"
            fill="hsl(270 80% 60%)"
            opacity="0.8"
          />
          <path
            d="M52 55 L52 48 C52 42 68 42 68 48 L68 55"
            stroke="hsl(270 80% 60%)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Keyhole */}
          <circle cx="60" cy="63" r="2.5" fill="hsl(250 16% 10%)" />
          <rect x="59" y="64" width="2" height="4" rx="1" fill="hsl(250 16% 10%)" />

          {/* Sparkle accents */}
          <circle cx="38" cy="28" r="1.5" fill="hsl(270 80% 60%)" opacity="0.5">
            <animate
              attributeName="opacity"
              values="0.2;0.7;0.2"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="85" cy="22" r="1" fill="hsl(270 80% 60%)" opacity="0.4">
            <animate
              attributeName="opacity"
              values="0.3;0.6;0.3"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-foreground">Admin Access</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your credentials to continue
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 ${
            shaking ? "animate-[shake_0.5s_ease-in-out]" : ""
          }`}
        >
          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="admin-user"
              className="text-xs font-medium text-muted-foreground"
            >
              Username
            </label>
            <div className="flex h-11 items-center gap-2 rounded-xl border border-border bg-background px-3 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30">
              <Shield className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                id="admin-user"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                autoComplete="username"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="admin-pass"
              className="text-xs font-medium text-muted-foreground"
            >
              Password
            </label>
            <div className="flex h-11 items-center gap-2 rounded-xl border border-border bg-background px-3 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30">
              <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                id="admin-pass"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="shrink-0 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-center text-xs font-medium text-destructive">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="mt-1 flex h-11 items-center justify-center rounded-xl gradient-primary text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.97]"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
