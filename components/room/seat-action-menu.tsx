"use client";

import { X, Lock, Unlock, UserPlus, UserMinus, MicOff, Shield, ShieldOff } from "lucide-react";

export type SeatAction = "lock" | "unlock" | "invite" | "kick" | "mute" | "make-admin" | "remove-admin" | "sit";

type SeatActionMenuProps = {
  seatNumber: number;
  isOccupied: boolean;
  isLocked: boolean;
  occupantName?: string;
  occupantIsAdmin?: boolean;
  currentUserRole: "owner" | "admin" | "user";
  onAction: (action: SeatAction) => void;
  onClose: () => void;
};

export function SeatActionMenu({
  seatNumber,
  isOccupied,
  isLocked,
  occupantName,
  occupantIsAdmin,
  currentUserRole,
  onAction,
  onClose,
}: SeatActionMenuProps) {
  const isPrivileged = currentUserRole === "owner" || currentUserRole === "admin";
  const isOwner = currentUserRole === "owner";

  const actions: { action: SeatAction; label: string; icon: React.ReactNode; variant?: string }[] = [];

  if (isOccupied) {
    if (isPrivileged) {
      actions.push({ action: "mute", label: "Mute", icon: <MicOff className="h-4 w-4" /> });
      actions.push({ action: "kick", label: "Kick from seat", icon: <UserMinus className="h-4 w-4" />, variant: "destructive" });
    }
    if (isOwner && !occupantIsAdmin) {
      actions.push({ action: "make-admin", label: "Make Admin", icon: <Shield className="h-4 w-4" /> });
    }
    if (isOwner && occupantIsAdmin) {
      actions.push({ action: "remove-admin", label: "Remove Admin", icon: <ShieldOff className="h-4 w-4" />, variant: "destructive" });
    }
  } else {
    if (!isLocked) {
      actions.push({ action: "sit", label: "Sit here", icon: <UserPlus className="h-4 w-4" /> });
    }
    if (isPrivileged) {
      if (isLocked) {
        actions.push({ action: "unlock", label: "Unlock Seat", icon: <Unlock className="h-4 w-4" /> });
      } else {
        actions.push({ action: "lock", label: "Lock Seat", icon: <Lock className="h-4 w-4" /> });
      }
      actions.push({ action: "invite", label: "Invite User", icon: <UserPlus className="h-4 w-4" /> });
    }
  }

  if (actions.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-background/40" onClick={onClose} />
      <div className="relative w-full max-w-lg animate-slide-up rounded-t-3xl border-t border-border bg-card">
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-sm font-bold text-foreground">
            {isOccupied ? occupantName || "User" : `Seat ${seatNumber + 1}`}
          </h3>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col gap-1.5 px-4 pb-6">
          {actions.map(({ action, label, icon, variant }) => (
            <button
              key={action}
              onClick={() => {
                onAction(action);
                onClose();
              }}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
                variant === "destructive"
                  ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {icon}
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
