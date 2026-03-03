"use client";

import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function RoomNotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 px-6 text-center gradient-chamet">
      {/* SVG Illustration: empty room with open door */}
      <div className="relative">
        <svg
          width="220"
          height="200"
          viewBox="0 0 220 200"
          fill="none"
          className="drop-shadow-lg"
          aria-hidden="true"
        >
          {/* Floor */}
          <ellipse cx="110" cy="175" rx="90" ry="14" fill="hsl(250 12% 14%)" />

          {/* Back wall */}
          <rect
            x="40"
            y="40"
            width="140"
            height="130"
            rx="6"
            fill="hsl(250 16% 10%)"
            stroke="hsl(250 12% 18%)"
            strokeWidth="1.5"
          />

          {/* Wall pattern lines */}
          <line
            x1="60"
            y1="55"
            x2="160"
            y2="55"
            stroke="hsl(250 12% 18%)"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />
          <line
            x1="60"
            y1="75"
            x2="160"
            y2="75"
            stroke="hsl(250 12% 18%)"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />

          {/* Window on wall */}
          <rect
            x="65"
            y="60"
            width="35"
            height="30"
            rx="3"
            fill="hsl(250 20% 6%)"
            stroke="hsl(270 80% 60%)"
            strokeWidth="1"
            opacity="0.4"
          />
          <line
            x1="82.5"
            y1="60"
            x2="82.5"
            y2="90"
            stroke="hsl(270 80% 60%)"
            strokeWidth="0.7"
            opacity="0.4"
          />
          <line
            x1="65"
            y1="75"
            x2="100"
            y2="75"
            stroke="hsl(270 80% 60%)"
            strokeWidth="0.7"
            opacity="0.4"
          />

          {/* Door frame */}
          <rect
            x="118"
            y="55"
            width="45"
            height="85"
            rx="3"
            fill="hsl(250 20% 6%)"
            stroke="hsl(250 12% 18%)"
            strokeWidth="1.5"
          />

          {/* Open door (rotated) */}
          <g transform="translate(118 55)">
            <rect
              x="-20"
              y="0"
              width="40"
              height="85"
              rx="3"
              fill="hsl(270 80% 60%)"
              opacity="0.15"
              transform="skewY(-5)"
            />
            <rect
              x="-18"
              y="2"
              width="36"
              height="81"
              rx="2"
              fill="hsl(250 16% 12%)"
              transform="skewY(-5)"
            />
            {/* Door handle */}
            <circle cx="-4" cy="44" r="2.5" fill="hsl(270 80% 60%)" opacity="0.6" />
          </g>

          {/* Void/darkness through door with stars */}
          <rect
            x="119"
            y="56"
            width="43"
            height="83"
            rx="2"
            fill="hsl(250 20% 4%)"
          />
          {/* Stars in void */}
          <circle cx="130" cy="70" r="1" fill="hsl(0 0% 95%)" opacity="0.5">
            <animate
              attributeName="opacity"
              values="0.2;0.8;0.2"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="148" cy="80" r="0.8" fill="hsl(0 0% 95%)" opacity="0.3">
            <animate
              attributeName="opacity"
              values="0.3;0.7;0.3"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="138" cy="100" r="1.2" fill="hsl(270 80% 60%)" opacity="0.4">
            <animate
              attributeName="opacity"
              values="0.2;0.6;0.2"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="155" cy="115" r="0.7" fill="hsl(0 0% 95%)" opacity="0.4">
            <animate
              attributeName="opacity"
              values="0.1;0.5;0.1"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Empty chair */}
          <g transform="translate(58 110)">
            {/* Seat */}
            <rect
              x="0"
              y="10"
              width="22"
              height="4"
              rx="2"
              fill="hsl(250 12% 18%)"
            />
            {/* Back */}
            <rect
              x="2"
              y="0"
              width="3"
              height="14"
              rx="1.5"
              fill="hsl(250 12% 18%)"
            />
            {/* Legs */}
            <line
              x1="3"
              y1="14"
              x2="1"
              y2="28"
              stroke="hsl(250 12% 18%)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="19"
              y1="14"
              x2="21"
              y2="28"
              stroke="hsl(250 12% 18%)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          {/* Subtle mic icon on floor */}
          <g transform="translate(100 145)" opacity="0.2">
            <rect x="0" y="0" width="6" height="14" rx="3" stroke="hsl(0 0% 95%)" strokeWidth="1" fill="none" />
            <path d="M-2 10 C-2 16 8 16 8 10" stroke="hsl(0 0% 95%)" strokeWidth="1" fill="none" />
            <line x1="3" y1="16" x2="3" y2="20" stroke="hsl(0 0% 95%)" strokeWidth="1" />
          </g>

          {/* Question mark floating */}
          <text
            x="140"
            y="50"
            fontSize="22"
            fontWeight="bold"
            fill="hsl(270 80% 60%)"
            opacity="0.6"
            textAnchor="middle"
          >
            ?
            <animate
              attributeName="y"
              values="50;45;50"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.4;0.8;0.4"
              dur="2s"
              repeatCount="indefinite"
            />
          </text>

          {/* Glow ring from door */}
          <ellipse
            cx="140"
            cy="140"
            rx="30"
            ry="5"
            fill="hsl(270 80% 60%)"
            opacity="0.1"
          >
            <animate
              attributeName="opacity"
              values="0.05;0.15;0.05"
              dur="3s"
              repeatCount="indefinite"
            />
          </ellipse>
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-6xl font-black tracking-tight text-primary/20">
          404
        </span>
        <h2 className="text-xl font-bold text-foreground text-balance">
          Room not found
        </h2>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
          This room may have been closed, deleted, or the link is
          incorrect. Try browsing for active rooms instead.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/discover"
          className="flex h-12 items-center gap-2 rounded-xl gradient-primary px-6 text-sm font-semibold text-primary-foreground transition-transform active:scale-95"
        >
          <Search className="h-4 w-4" />
          Browse Rooms
        </Link>
        <Link
          href="/home"
          className="flex h-12 items-center gap-2 rounded-xl border border-border bg-card px-6 text-sm font-semibold text-foreground transition-transform active:scale-95"
        >
          <Home className="h-4 w-4" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
