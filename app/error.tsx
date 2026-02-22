"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[LotChat] Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-foreground">
          Something went wrong
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          An unexpected error occurred. Please try again.
        </p>
      </div>
      <button
        onClick={reset}
        className="h-12 rounded-xl gradient-primary px-8 text-sm font-semibold text-primary-foreground"
      >
        Try Again
      </button>
    </div>
  );
}
