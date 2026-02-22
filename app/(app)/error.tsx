"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[LotChat] App error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-foreground">
          Oops, something broke
        </h2>
        <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
          We hit an unexpected error. This has been logged and we will look into it.
        </p>
      </div>
      <button
        onClick={reset}
        className="flex h-12 items-center gap-2 rounded-xl gradient-primary px-6 text-sm font-semibold text-primary-foreground"
      >
        <RotateCcw className="h-4 w-4" />
        Try Again
      </button>
    </div>
  );
}
