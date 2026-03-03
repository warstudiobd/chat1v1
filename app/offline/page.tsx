"use client";

import { WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card">
        <WifiOff className="h-10 w-10 text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold text-foreground">
          You are offline
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Please check your internet connection and try again.
        </p>
      </div>
      <button
        onClick={() => typeof window !== "undefined" && window.location.reload()}
        className="h-12 rounded-xl gradient-primary px-8 text-sm font-semibold text-primary-foreground"
      >
        Retry
      </button>
    </main>
  );
}
