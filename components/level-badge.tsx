import { cn, getLevelColor } from "@/lib/utils";

export function LevelBadge({
  level,
  className,
}: {
  level: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-bold text-foreground",
        getLevelColor(level),
        className
      )}
    >
      Lv.{level}
    </span>
  );
}
