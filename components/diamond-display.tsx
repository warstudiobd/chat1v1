import { cn, formatNumber } from "@/lib/utils";
import { Diamond } from "lucide-react";

export function DiamondDisplay({
  amount,
  className,
}: {
  amount: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-sm font-semibold",
        className
      )}
    >
      <Diamond className="h-4 w-4 text-gold" />
      <span className="text-gold">{formatNumber(amount)}</span>
    </span>
  );
}
