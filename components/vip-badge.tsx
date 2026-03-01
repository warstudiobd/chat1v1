import { cn } from "@/lib/utils";

function VipCrownSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="animate-[badge-pulse_2s_ease-in-out_infinite]">
      <path d="M3 18 L6 8 L10 13 L12 4 L14 13 L18 8 L21 18Z" fill="hsl(45 100% 55%)" />
      <rect x="3" y="18" width="18" height="3" rx="1" fill="hsl(40 100% 45%)" />
      <circle cx="6" cy="8" r="1.2" fill="hsl(45 100% 70%)" />
      <circle cx="12" cy="4" r="1.2" fill="hsl(45 100% 70%)" />
      <circle cx="18" cy="8" r="1.2" fill="hsl(45 100% 70%)" />
    </svg>
  );
}

function SvipGemSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="animate-[gem-sparkle_2.5s_ease-in-out_infinite]">
      <polygon points="12,2 20,9 12,22 4,9" fill="hsl(280 80% 60%)" />
      <polygon points="12,2 16,9 12,22" fill="hsl(290 70% 50%)" />
      <polygon points="12,2 8,9 12,22" fill="hsl(270 85% 70%)" />
      <line x1="4" y1="9" x2="20" y2="9" stroke="hsl(280 90% 80%)" strokeWidth="0.5" />
      <circle cx="12" cy="9" r="8" fill="none" stroke="hsl(280 80% 70%)" strokeWidth="0.3" opacity="0.4">
        <animate attributeName="r" values="8;12;8" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

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
          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold",
          className
        )}
        style={{
          background: "linear-gradient(135deg, hsl(280 60% 25%), hsl(320 60% 30%))",
          border: "1px solid hsl(280 60% 45%)",
        }}
      >
        <SvipGemSvg />
        <span className="text-svip-gradient">SVIP</span>
      </span>
    );
  }
  if (isVip) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold",
          className
        )}
        style={{
          background: "linear-gradient(135deg, hsl(45 80% 20%), hsl(35 80% 25%))",
          border: "1px solid hsl(45 70% 45%)",
        }}
      >
        <VipCrownSvg />
        <span className="text-vip-gradient">VIP</span>
      </span>
    );
  }
  return null;
}
