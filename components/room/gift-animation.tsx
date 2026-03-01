"use client";

import { useEffect, useState, useCallback } from "react";
import { getGiftSvg } from "@/components/room/gift-svgs";
import type { Gift } from "@/lib/gifts";

type GiftAnimationProps = {
  gift: Gift;
  senderName: string;
  quantity: number;
  onComplete: () => void;
};

function SvgParticle({ giftId, delay, x, y }: { giftId: string; delay: number; x: number; y: number }) {
  const SvgComp = getGiftSvg(giftId);
  return (
    <span
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        animation: `sparkle 1.5s ${delay}s ease-out forwards`,
        opacity: 0,
      }}
    >
      {SvgComp ? <SvgComp size={28} /> : <span className="text-2xl">{giftId}</span>}
    </span>
  );
}

export function GiftAnimation({ gift, senderName, quantity, onComplete }: GiftAnimationProps) {
  const [phase, setPhase] = useState<"enter" | "main" | "exit">("enter");
  const SvgComp = getGiftSvg(gift.id);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("main"), 400);
    const t2 = setTimeout(() => setPhase("exit"), 2800);
    const t3 = setTimeout(onComplete, 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  const renderMainSvg = useCallback((size: number, className?: string) => {
    if (SvgComp) return <SvgComp size={size} />;
    return <span className={className}>{gift.emoji}</span>;
  }, [SvgComp, gift.emoji]);

  const renderAnimation = useCallback(() => {
    const { animation } = gift;

    switch (animation) {
      case "fly":
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            {Array.from({ length: Math.min(quantity, 10) }).map((_, i) => (
              <span
                key={i}
                className="absolute"
                style={{
                  animation: `gift-fly 2.5s ${i * 0.15}s ease-out forwards`,
                  left: `${30 + Math.random() * 40}%`,
                  bottom: "20%",
                }}
              >
                {renderMainSvg(48)}
              </span>
            ))}
          </div>
        );

      case "burst":
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="animate-[gift-burst_0.6s_ease-out]">
              {renderMainSvg(80)}
            </span>
            {Array.from({ length: 8 }).map((_, i) => (
              <SvgParticle
                key={i}
                giftId={gift.id}
                delay={i * 0.1}
                x={50 + Math.cos((i * Math.PI) / 4) * 25}
                y={50 + Math.sin((i * Math.PI) / 4) * 25}
              />
            ))}
          </div>
        );

      case "rain":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: "-10%",
                  animation: `gift-fly 3s ${i * 0.12}s linear forwards`,
                  transform: "rotate(180deg)",
                }}
              >
                {renderMainSvg(32)}
              </span>
            ))}
          </div>
        );

      case "spin":
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="animate-[spin_2s_linear_infinite]">
              {renderMainSvg(80)}
            </span>
          </div>
        );

      case "shake":
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="animate-[shake_0.5s_ease-in-out_infinite]">
              {renderMainSvg(80)}
            </span>
          </div>
        );

      case "hearts":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="absolute"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  bottom: "10%",
                  animation: `heart-float 3s ${i * 0.2}s ease-out forwards`,
                }}
              >
                {renderMainSvg(36)}
              </span>
            ))}
          </div>
        );

      case "firework":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
                const r = 120;
                return (
                  <span
                    key={i}
                    className="absolute"
                    style={{
                      animation: `gift-burst 0.8s ${i * 0.05}s ease-out forwards`,
                      transform: `translate(${Math.cos(angle) * r}px, ${Math.sin(angle) * r}px)`,
                    }}
                  >
                    {renderMainSvg(32)}
                  </span>
                );
              })}
            </div>
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[gift-burst_0.6s_ease-out]">
              {renderMainSvg(64)}
            </span>
          </div>
        );

      case "mega":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Central glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-primary/20 blur-3xl animate-pulse" />
            {/* Main SVG */}
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[gift-burst_0.8s_ease-out]">
              {renderMainSvg(96)}
            </span>
            {/* Surrounding sparkle particles */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 22.5 * Math.PI) / 180;
              return (
                <span
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    animation: `sparkle 1.5s ${i * 0.08}s ease-out infinite`,
                    transform: `translate(${Math.cos(angle) * 100}px, ${Math.sin(angle) * 100}px)`,
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <polygon points="6,0 7.5,4.5 12,6 7.5,7.5 6,12 4.5,7.5 0,6 4.5,4.5" fill={["hsl(45 100% 55%)", "hsl(330 80% 55%)", "hsl(200 80% 55%)", "hsl(120 60% 50%)"][i % 4]} />
                  </svg>
                </span>
              );
            })}
          </div>
        );

      default:
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="animate-[gift-burst_0.6s_ease-out]">{renderMainSvg(80)}</span>
          </div>
        );
    }
  }, [gift, quantity, renderMainSvg]);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Dimmed backdrop for mega gifts */}
      {gift.animation === "mega" && (
        <div
          className="absolute inset-0 bg-background/40 transition-opacity duration-500"
          style={{ opacity: phase === "exit" ? 0 : 0.6 }}
        />
      )}

      {/* Animation canvas */}
      {renderAnimation()}

      {/* Banner at bottom */}
      <div
        className="absolute bottom-28 left-0 right-0 flex justify-center transition-all duration-500"
        style={{
          opacity: phase === "enter" ? 0 : phase === "exit" ? 0 : 1,
          transform: phase === "enter" ? "translateY(30px)" : "translateY(0)",
        }}
      >
        <div className="flex items-center gap-3 rounded-2xl glass-dark px-5 py-3">
          <span>{renderMainSvg(36)}</span>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">
              {senderName}
            </span>
            <span className="text-xs text-muted-foreground">
              {"sent "}
              <span className="font-semibold text-gold">{gift.name}</span>
              {quantity > 1 && <span className="text-pink">{" x"}{quantity}</span>}
            </span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-gold/20 px-2.5 py-1">
            <span className="text-xs font-bold text-gold">{(gift.cost * quantity).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
