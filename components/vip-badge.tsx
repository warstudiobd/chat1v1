import { cn } from "@/lib/utils";
import { Crown, Gem } from "lucide-react";

export function VipBadge({
  isVip,
  isSvip,
  className,
}: {
  isVip: boolean;
  isSvip: boolean;
  className?: string;
}) {
  if (isSvip) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary",
          className
        )}
      >
        <Gem className="h-3 w-3" />
        SVIP
      </span>
    );
  }
  if (isVip) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold gradient-gold text-background",
          className
        )}
      >
        <Crown className="h-3 w-3" />
        VIP
      </span>
    );
  }
  return null;
}
