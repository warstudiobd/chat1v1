"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const SEAT_MODES = [2, 9, 11, 21] as const;

const modeDescriptions: Record<number, string> = {
  2: "Duo - 1v1 conversation",
  9: "Standard - 4 column layout",
  11: "Large - 5 column layout",
  21: "Party mode - 5 column layout",
};

export function SeatModeSwitcher({
  currentMode,
  onSelect,
  onClose,
}: {
  currentMode: number;
  onSelect: (mode: number) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-background/40" onClick={onClose} />
      <div className="relative w-full max-w-lg animate-slide-up rounded-t-3xl border-t border-border bg-card">
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-sm font-bold text-foreground">
            Switch Mic Mode
          </h3>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col gap-2 px-4 pb-6">
          {SEAT_MODES.map((mode) => (
            <button
              key={mode}
              onClick={() => {
                onSelect(mode);
                onClose();
              }}
              className={cn(
                "flex items-center justify-between rounded-xl px-4 py-3 transition-colors",
                currentMode === mode
                  ? "gradient-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              )}
            >
              <div className="flex flex-col items-start gap-0.5">
                <span className="text-sm font-bold">
                  {mode}
                  {" Seats"}
                </span>
                <span
                  className={cn(
                    "text-[10px]",
                    currentMode === mode
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  )}
                >
                  {modeDescriptions[mode]}
                </span>
              </div>
              {currentMode === mode && (
                <span className="text-xs font-semibold">Current</span>
              )}
            </button>
          ))}

          <p className="mt-1 text-center text-[10px] text-muted-foreground">
            The room owner has switched to a new mic mode. The current mic position will be changed.
          </p>
        </div>
      </div>
    </div>
  );
}
