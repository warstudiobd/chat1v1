"use client";

export function GiftSvgRose({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <ellipse cx="32" cy="28" rx="14" ry="16" fill="hsl(350 80% 55%)">
        <animate attributeName="ry" values="16;17;16" dur="1.5s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="26" cy="26" rx="9" ry="12" fill="hsl(350 70% 48%)" opacity="0.7" />
      <ellipse cx="38" cy="26" rx="8" ry="11" fill="hsl(350 85% 62%)" opacity="0.6" />
      <path d="M32 36 C32 36 30 50 30 56 L34 56 C34 50 32 36 32 36Z" fill="hsl(140 50% 35%)" />
      <path d="M30 48 C26 44 22 46 20 44" stroke="hsl(140 50% 35%)" strokeWidth="2" fill="none" />
      <circle cx="20" cy="14" r="2" fill="hsl(350 80% 70%)" opacity="0">
        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0s" />
        <animate attributeName="cy" values="14;6" dur="2s" repeatCount="indefinite" begin="0s" />
      </circle>
      <circle cx="44" cy="18" r="1.5" fill="hsl(350 80% 75%)" opacity="0">
        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0.6s" />
        <animate attributeName="cy" values="18;10" dur="2s" repeatCount="indefinite" begin="0.6s" />
      </circle>
    </svg>
  );
}

export function GiftSvgHeart({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M32 56 C32 56 8 38 8 22 C8 14 14 8 22 8 C27 8 31 11 32 14 C33 11 37 8 42 8 C50 8 56 14 56 22 C56 38 32 56 32 56Z" fill="hsl(350 80% 55%)">
        <animate attributeName="d" values="M32 56 C32 56 8 38 8 22 C8 14 14 8 22 8 C27 8 31 11 32 14 C33 11 37 8 42 8 C50 8 56 14 56 22 C56 38 32 56 32 56Z;M32 54 C32 54 6 36 6 20 C6 12 12 6 20 6 C26 6 30 10 32 13 C34 10 38 6 44 6 C52 6 58 12 58 20 C58 36 32 54 32 54Z;M32 56 C32 56 8 38 8 22 C8 14 14 8 22 8 C27 8 31 11 32 14 C33 11 37 8 42 8 C50 8 56 14 56 22 C56 38 32 56 32 56Z" dur="1s" repeatCount="indefinite" />
      </path>
      <path d="M22 18 Q26 14 30 18" stroke="hsl(350 85% 70%)" strokeWidth="2" fill="none" opacity="0.5" />
      <circle cx="32" cy="20" r="18" fill="hsl(350 80% 55%)" opacity="0">
        <animate attributeName="r" values="18;26" dur="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0" dur="1s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function GiftSvgCrown({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M8 44 L16 20 L26 32 L32 12 L38 32 L48 20 L56 44 Z" fill="hsl(45 100% 50%)" />
      <rect x="8" y="44" width="48" height="8" rx="2" fill="hsl(40 100% 45%)" />
      <circle cx="16" cy="20" r="3" fill="hsl(45 100% 60%)">
        <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" begin="0s" />
      </circle>
      <circle cx="32" cy="12" r="3.5" fill="hsl(45 100% 60%)">
        <animate attributeName="r" values="3.5;4.5;3.5" dur="2s" repeatCount="indefinite" begin="0.3s" />
      </circle>
      <circle cx="48" cy="20" r="3" fill="hsl(45 100% 60%)">
        <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" begin="0.6s" />
      </circle>
      <circle cx="22" cy="8" r="1.5" fill="hsl(45 100% 70%)" opacity="0">
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="46" cy="10" r="1" fill="hsl(45 100% 70%)" opacity="0">
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
      </circle>
    </svg>
  );
}

export function GiftSvgDiamond({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <polygon points="32,4 52,24 32,60 12,24" fill="hsl(200 80% 65%)" />
      <polygon points="32,4 42,24 32,60" fill="hsl(210 80% 55%)" />
      <polygon points="32,4 22,24 32,60" fill="hsl(195 85% 70%)" />
      <line x1="12" y1="24" x2="52" y2="24" stroke="hsl(200 90% 80%)" strokeWidth="1" />
      <line x1="32" y1="4" x2="22" y2="24" stroke="hsl(200 90% 80%)" strokeWidth="0.5" opacity="0.5" />
      <line x1="32" y1="4" x2="42" y2="24" stroke="hsl(200 90% 80%)" strokeWidth="0.5" opacity="0.5" />
      <polygon points="32,4 52,24 32,60 12,24" fill="none" stroke="hsl(200 90% 80%)" strokeWidth="0.5" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
      </polygon>
      <line x1="20" y1="10" x2="44" y2="10" stroke="hsl(200 100% 90%)" strokeWidth="2" opacity="0">
        <animate attributeName="opacity" values="0;0.6;0" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="y1" values="10;50" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="y2" values="10;50" dur="2.5s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}

export function GiftSvgCar({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M10 38 L14 26 Q18 18 28 18 L44 18 Q50 18 52 26 L56 38" fill="hsl(0 75% 50%)" />
      <rect x="6" y="38" width="52" height="12" rx="4" fill="hsl(0 70% 45%)" />
      <circle cx="18" cy="50" r="5" fill="hsl(0 0% 20%)" />
      <circle cx="18" cy="50" r="2.5" fill="hsl(0 0% 40%)" />
      <circle cx="46" cy="50" r="5" fill="hsl(0 0% 20%)" />
      <circle cx="46" cy="50" r="2.5" fill="hsl(0 0% 40%)" />
      <rect x="18" y="22" width="12" height="10" rx="2" fill="hsl(200 60% 70%)" opacity="0.7" />
      <rect x="34" y="22" width="12" height="10" rx="2" fill="hsl(200 60% 70%)" opacity="0.7" />
      <rect x="50" y="34" width="8" height="4" rx="1" fill="hsl(45 100% 55%)" opacity="0.8" />
      <line x1="0" y1="42" x2="6" y2="42" stroke="hsl(0 0% 60%)" strokeWidth="1.5" strokeDasharray="3 3">
        <animate attributeName="x1" values="0;-10" dur="0.3s" repeatCount="indefinite" />
        <animate attributeName="x2" values="6;-4" dur="0.3s" repeatCount="indefinite" />
      </line>
      <line x1="-2" y1="38" x2="4" y2="38" stroke="hsl(0 0% 50%)" strokeWidth="1" strokeDasharray="2 4">
        <animate attributeName="x1" values="-2;-12" dur="0.25s" repeatCount="indefinite" />
        <animate attributeName="x2" values="4;-6" dur="0.25s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}

export function GiftSvgRocket({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <ellipse cx="32" cy="26" rx="10" ry="20" fill="hsl(0 0% 92%)" />
      <ellipse cx="32" cy="14" rx="6" ry="8" fill="hsl(0 75% 50%)" />
      <path d="M22 36 L18 48 L26 42Z" fill="hsl(210 70% 50%)" />
      <path d="M42 36 L46 48 L38 42Z" fill="hsl(210 70% 50%)" />
      <circle cx="32" cy="28" r="4" fill="hsl(200 80% 60%)" />
      <circle cx="32" cy="28" r="2" fill="hsl(200 90% 80%)" />
      <ellipse cx="32" cy="50" rx="5" ry="8" fill="hsl(30 90% 55%)" opacity="0.9">
        <animate attributeName="ry" values="8;12;6;10;8" dur="0.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0.6;0.9" dur="0.3s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="32" cy="52" rx="3" ry="5" fill="hsl(45 100% 55%)" opacity="0.7">
        <animate attributeName="ry" values="5;8;4;7;5" dur="0.35s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  );
}

export function GiftSvgCastle({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="16" y="24" width="32" height="32" fill="hsl(30 20% 60%)" />
      <rect x="10" y="16" width="10" height="40" fill="hsl(30 20% 55%)" />
      <rect x="44" y="16" width="10" height="40" fill="hsl(30 20% 55%)" />
      <rect x="8" y="12" width="4" height="6" fill="hsl(30 20% 50%)" />
      <rect x="18" y="12" width="4" height="6" fill="hsl(30 20% 50%)" />
      <rect x="42" y="12" width="4" height="6" fill="hsl(30 20% 50%)" />
      <rect x="52" y="12" width="4" height="6" fill="hsl(30 20% 50%)" />
      <path d="M28 56 L28 42 Q32 36 36 42 L36 56Z" fill="hsl(25 30% 40%)" />
      <rect x="26" y="6" width="12" height="20" fill="hsl(30 20% 58%)" />
      <polygon points="32,2 24,10 40,10" fill="hsl(0 70% 45%)" />
      <line x1="32" y1="2" x2="32" y2="0" stroke="hsl(45 100% 55%)" strokeWidth="1" />
      <rect x="34" y="0" width="6" height="4" fill="hsl(45 100% 55%)">
        <animate attributeName="width" values="6;7;5;6" dur="1s" repeatCount="indefinite" />
      </rect>
      <circle cx="14" cy="10" r="1.5" fill="hsl(45 100% 65%)" opacity="0">
        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="10" r="1.5" fill="hsl(45 100% 65%)" opacity="0">
        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0.8s" />
      </circle>
    </svg>
  );
}

export function GiftSvgFireworks({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const colors = ["hsl(0 80% 55%)", "hsl(45 100% 55%)", "hsl(120 70% 50%)", "hsl(200 80% 55%)", "hsl(280 80% 60%)", "hsl(330 80% 55%)", "hsl(60 80% 55%)", "hsl(160 70% 50%)"];
        const rad = (angle * Math.PI) / 180;
        const x = 32 + Math.cos(rad) * 20;
        const y = 32 + Math.sin(rad) * 20;
        return (
          <circle key={i} cx={x} cy={y} r="3" fill={colors[i]} opacity="0">
            <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.1}s`} />
            <animate attributeName="r" values="1;4;1" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.1}s`} />
          </circle>
        );
      })}
      <circle cx="32" cy="32" r="4" fill="hsl(45 100% 65%)">
        <animate attributeName="r" values="2;5;2" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function GiftSvgButterfly({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <ellipse cx="22" cy="24" rx="12" ry="14" fill="hsl(280 70% 60%)" opacity="0.8">
        <animate attributeName="rx" values="12;8;12" dur="0.8s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="42" cy="24" rx="12" ry="14" fill="hsl(300 70% 60%)" opacity="0.8">
        <animate attributeName="rx" values="12;8;12" dur="0.8s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="24" cy="38" rx="8" ry="10" fill="hsl(270 60% 55%)" opacity="0.7">
        <animate attributeName="rx" values="8;5;8" dur="0.8s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="40" cy="38" rx="8" ry="10" fill="hsl(290 60% 55%)" opacity="0.7">
        <animate attributeName="rx" values="8;5;8" dur="0.8s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="32" cy="32" rx="2" ry="14" fill="hsl(0 0% 25%)" />
      <line x1="30" y1="18" x2="26" y2="10" stroke="hsl(0 0% 25%)" strokeWidth="1" />
      <line x1="34" y1="18" x2="38" y2="10" stroke="hsl(0 0% 25%)" strokeWidth="1" />
      <circle cx="26" cy="9" r="1.5" fill="hsl(280 70% 60%)" />
      <circle cx="38" cy="9" r="1.5" fill="hsl(300 70% 60%)" />
    </svg>
  );
}

export function GiftSvgDragon({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <ellipse cx="24" cy="30" rx="14" ry="16" fill="hsl(140 60% 35%)" />
      <circle cx="18" cy="18" r="10" fill="hsl(140 55% 40%)" />
      <polygon points="12,10 8,4 16,8" fill="hsl(140 60% 30%)" />
      <polygon points="24,10 28,4 20,8" fill="hsl(140 60% 30%)" />
      <circle cx="14" cy="16" r="2" fill="hsl(45 100% 55%)" />
      <circle cx="22" cy="16" r="2" fill="hsl(45 100% 55%)" />
      <circle cx="14" cy="16" r="0.8" fill="hsl(0 0% 10%)" />
      <circle cx="22" cy="16" r="0.8" fill="hsl(0 0% 10%)" />
      <path d="M36 28 Q46 20 54 24 Q50 30 54 36 Q44 32 36 38" fill="hsl(140 50% 30%)" />
      <path d="M28 44 Q32 54 26 58" stroke="hsl(140 55% 35%)" strokeWidth="3" fill="none" />
      <ellipse cx="44" cy="20" rx="8" ry="3" fill="hsl(15 80% 50%)" opacity="0.8">
        <animate attributeName="rx" values="8;12;6;8" dur="0.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.4;0.8" dur="0.5s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="46" cy="20" rx="4" ry="1.5" fill="hsl(45 100% 55%)" opacity="0.6">
        <animate attributeName="rx" values="4;8;3;4" dur="0.4s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  );
}

export function GiftSvgPhoenix({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M32 14 Q26 20 22 32 Q18 42 24 50 L32 44 L40 50 Q46 42 42 32 Q38 20 32 14Z" fill="hsl(15 85% 55%)" />
      <path d="M32 14 Q30 22 28 30 Q26 38 30 44 L32 40 L34 44 Q38 38 36 30 Q34 22 32 14Z" fill="hsl(45 100% 55%)" opacity="0.7" />
      <path d="M22 32 Q14 28 8 32 Q12 24 18 26" fill="hsl(15 80% 50%)" />
      <path d="M42 32 Q50 28 56 32 Q52 24 46 26" fill="hsl(15 80% 50%)" />
      <circle cx="28" cy="22" r="1.5" fill="hsl(0 0% 10%)" />
      <circle cx="36" cy="22" r="1.5" fill="hsl(0 0% 10%)" />
      <path d="M30 26 Q32 28 34 26" stroke="hsl(45 80% 45%)" strokeWidth="1" fill="none" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={20 + i * 6} cy={50 + (i % 2) * 4} r="1.5" fill="hsl(30 90% 55%)" opacity="0">
          <animate attributeName="opacity" values="0;0.8;0" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
          <animate attributeName="cy" values={`${50 + (i % 2) * 4};${56 + (i % 2) * 4}`} dur="1.5s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
        </circle>
      ))}
    </svg>
  );
}

export function GiftSvgUniverse({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" fill="hsl(250 40% 15%)" />
      <ellipse cx="32" cy="32" rx="26" ry="10" fill="none" stroke="hsl(270 60% 50%)" strokeWidth="1" opacity="0.4" transform="rotate(-30 32 32)">
        <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="32" cy="32" rx="20" ry="8" fill="none" stroke="hsl(200 60% 50%)" strokeWidth="1" opacity="0.3" transform="rotate(20 32 32)">
        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
      </ellipse>
      <circle cx="32" cy="32" r="6" fill="hsl(270 70% 55%)">
        <animate attributeName="r" values="6;7;6" dur="2s" repeatCount="indefinite" />
      </circle>
      {[
        { cx: 14, cy: 16, r: 1, d: "0s" }, { cx: 50, cy: 12, r: 1.5, d: "0.4s" },
        { cx: 48, cy: 48, r: 1, d: "0.8s" }, { cx: 18, cy: 50, r: 1.2, d: "1.2s" },
        { cx: 40, cy: 24, r: 0.8, d: "1.6s" }, { cx: 22, cy: 38, r: 1, d: "2s" },
      ].map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="hsl(0 0% 95%)" opacity="0.5">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin={s.d} />
        </circle>
      ))}
    </svg>
  );
}

export function GiftSvgYacht({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M10 40 Q20 36 32 36 Q44 36 54 40 L50 50 L14 50 Z" fill="hsl(0 0% 95%)" />
      <rect x="30" y="14" width="3" height="24" fill="hsl(30 20% 40%)" />
      <polygon points="33,16 52,34 33,34" fill="hsl(0 0% 100%)" stroke="hsl(0 0% 80%)" strokeWidth="0.5" />
      <polygon points="30,18 16,34 30,34" fill="hsl(200 60% 80%)" stroke="hsl(200 40% 60%)" strokeWidth="0.5" />
      <rect x="20" y="42" width="4" height="4" rx="1" fill="hsl(200 60% 70%)" opacity="0.5" />
      <rect x="28" y="42" width="4" height="4" rx="1" fill="hsl(200 60% 70%)" opacity="0.5" />
      <rect x="36" y="42" width="4" height="4" rx="1" fill="hsl(200 60% 70%)" opacity="0.5" />
      <path d="M4 52 Q16 48 32 52 Q48 56 60 52" stroke="hsl(200 70% 55%)" strokeWidth="2" fill="none" opacity="0.5">
        <animate attributeName="d" values="M4 52 Q16 48 32 52 Q48 56 60 52;M4 54 Q16 50 32 54 Q48 58 60 54;M4 52 Q16 48 32 52 Q48 56 60 52" dur="2s" repeatCount="indefinite" />
      </path>
      <path d="M0 56 Q16 52 32 56 Q48 60 64 56" stroke="hsl(200 60% 45%)" strokeWidth="2" fill="none" opacity="0.3">
        <animate attributeName="d" values="M0 56 Q16 52 32 56 Q48 60 64 56;M0 58 Q16 54 32 58 Q48 62 64 58;M0 56 Q16 52 32 56 Q48 60 64 56" dur="2s" repeatCount="indefinite" begin="0.5s" />
      </path>
    </svg>
  );
}

export function GiftSvgTeddyBear({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="16" cy="16" r="8" fill="hsl(25 40% 50%)" />
      <circle cx="16" cy="16" r="4" fill="hsl(25 35% 60%)" />
      <circle cx="48" cy="16" r="8" fill="hsl(25 40% 50%)" />
      <circle cx="48" cy="16" r="4" fill="hsl(25 35% 60%)" />
      <ellipse cx="32" cy="30" rx="18" ry="16" fill="hsl(25 40% 50%)" />
      <ellipse cx="32" cy="48" rx="14" ry="12" fill="hsl(25 40% 50%)" />
      <ellipse cx="32" cy="50" rx="8" ry="6" fill="hsl(25 35% 60%)" />
      <circle cx="26" cy="26" r="2.5" fill="hsl(0 0% 15%)" />
      <circle cx="38" cy="26" r="2.5" fill="hsl(0 0% 15%)" />
      <ellipse cx="32" cy="32" rx="4" ry="3" fill="hsl(25 30% 40%)" />
      <path d="M30 34 Q32 36 34 34" stroke="hsl(25 20% 30%)" strokeWidth="1" fill="none" />
      <circle cx="44" cy="6" r="3" fill="hsl(350 75% 55%)" opacity="0">
        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
        <animate attributeName="cy" values="6;-2" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function GiftSvgTrophy({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M20 10 L44 10 L42 34 Q38 42 32 42 Q26 42 22 34 Z" fill="hsl(45 100% 50%)" />
      <path d="M20 10 Q10 10 10 20 Q10 28 20 28" fill="none" stroke="hsl(45 100% 50%)" strokeWidth="3" />
      <path d="M44 10 Q54 10 54 20 Q54 28 44 28" fill="none" stroke="hsl(45 100% 50%)" strokeWidth="3" />
      <rect x="28" y="42" width="8" height="8" fill="hsl(40 80% 45%)" />
      <rect x="22" y="50" width="20" height="6" rx="2" fill="hsl(40 70% 40%)" />
      <path d="M26 20 L30 16 L34 20 L38 16" stroke="hsl(45 100% 70%)" strokeWidth="1.5" fill="none" opacity="0.6" />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={20 + i * 8} cy={4} r="1.5" fill={["hsl(0 75% 55%)", "hsl(45 100% 55%)", "hsl(200 75% 55%)", "hsl(120 60% 50%)"][i]} opacity="0">
          <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
          <animate attributeName="cy" values="4;-4" dur="1s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
        </circle>
      ))}
    </svg>
  );
}

const GIFT_SVG_MAP: Record<string, React.FC<{ size?: number }>> = {
  rose: GiftSvgRose,
  heart: GiftSvgHeart,
  crown: GiftSvgCrown,
  "gold-crown": GiftSvgCrown,
  diamond: GiftSvgDiamond,
  "diamond-ring": GiftSvgDiamond,
  "diamond-vip": GiftSvgDiamond,
  "gem-stone": GiftSvgDiamond,
  "sports-car": GiftSvgCar,
  "rocket-lux": GiftSvgRocket,
  castle: GiftSvgCastle,
  palace: GiftSvgCastle,
  fireworks: GiftSvgFireworks,
  firecracker: GiftSvgFireworks,
  sparkler: GiftSvgFireworks,
  butterfly: GiftSvgButterfly,
  dragon: GiftSvgDragon,
  "golden-dragon": GiftSvgDragon,
  phoenix: GiftSvgPhoenix,
  "fire-bird": GiftSvgPhoenix,
  universe: GiftSvgUniverse,
  "northern-lights": GiftSvgUniverse,
  "aurora-nat": GiftSvgUniverse,
  yacht: GiftSvgYacht,
  "teddy-bear": GiftSvgTeddyBear,
  trophy: GiftSvgTrophy,
  medal: GiftSvgTrophy,
};

export function getGiftSvg(giftId: string): React.FC<{ size?: number }> | null {
  return GIFT_SVG_MAP[giftId] || null;
}
