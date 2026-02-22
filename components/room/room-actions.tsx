"use client";

import { useState } from "react";
import {
  MessageCircle,
  MicOff,
  Mic,
  Smile,
  Gift,
  VolumeX,
  Volume2,
  LayoutGrid,
  Settings2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GiftPanel } from "@/components/room/gift-panel";
import { EmojiPicker } from "@/components/room/emoji-picker";
import { RoomGames } from "@/components/room/room-games";
import { SeatModeSwitcher } from "@/components/room/seat-mode-switcher";
import type { Gift as GiftType } from "@/lib/gifts";

type RoomToolbarProps = {
  roomId: string;
  seatMode: number;
  onSeatModeChange: (mode: number) => void;
  onSendMessage: (msg: string) => void;
  onGiftSent?: (gift: GiftType, quantity: number) => void;
};

export function RoomActions({
  roomId,
  seatMode,
  onSeatModeChange,
  onSendMessage,
  onGiftSent,
}: RoomToolbarProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isSpeakerOff, setIsSpeakerOff] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showGames, setShowGames] = useState(false);
  const [showSeatMode, setShowSeatMode] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMsg, setChatMsg] = useState("");

  function handleSendChat() {
    if (chatMsg.trim()) {
      onSendMessage(chatMsg.trim());
      setChatMsg("");
      setShowChat(false);
    }
  }

  function handleGiftSent(gift: GiftType, quantity: number) {
    onGiftSent?.(gift, quantity);
    setShowGifts(false);
  }

  return (
    <>
      {/* Chat input overlay */}
      {showChat && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-background/30" onClick={() => setShowChat(false)} />
          <div className="relative w-full max-w-lg animate-slide-up px-3 pb-3">
            <div className="flex items-center gap-2 rounded-full border border-border/50 glass px-4">
              <input
                type="text"
                value={chatMsg}
                onChange={(e) => setChatMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                placeholder="Say something..."
                autoFocus
                className="h-11 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                onClick={handleSendChat}
                className="shrink-0 rounded-full gradient-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main toolbar */}
      <div className="relative z-10 flex items-center justify-around glass-dark border-t border-white/5 px-2 py-2.5">
        {/* Chat */}
        <button
          onClick={() => setShowChat(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-muted-foreground hover:text-foreground"
          aria-label="Chat"
        >
          <MessageCircle className="h-5 w-5" />
        </button>

        {/* Mic */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            isMuted ? "bg-white/8 text-muted-foreground" : "bg-green-500/20 text-green-400"
          )}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>

        {/* Emoji */}
        <button
          onClick={() => setShowEmoji(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-muted-foreground hover:text-foreground"
          aria-label="Emoji"
        >
          <Smile className="h-5 w-5" />
        </button>

        {/* Gift - elevated center button */}
        <button
          onClick={() => setShowGifts(true)}
          className="flex h-14 w-14 -translate-y-3 items-center justify-center rounded-full gradient-primary shadow-lg shadow-primary/40"
          aria-label="Gifts"
        >
          <Gift className="h-6 w-6 text-primary-foreground" />
        </button>

        {/* Seat mode */}
        <button
          onClick={() => setShowSeatMode(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-muted-foreground hover:text-foreground"
          aria-label="Seat mode"
        >
          <Settings2 className="h-5 w-5" />
        </button>

        {/* Volume */}
        <button
          onClick={() => setIsSpeakerOff(!isSpeakerOff)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            isSpeakerOff ? "bg-white/8 text-muted-foreground" : "bg-white/8 text-foreground"
          )}
          aria-label={isSpeakerOff ? "Unmute speaker" : "Mute speaker"}
        >
          {isSpeakerOff ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>

        {/* Games */}
        <button
          onClick={() => setShowGames(true)}
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-muted-foreground hover:text-foreground"
          aria-label="Games"
        >
          <LayoutGrid className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-pink" />
        </button>
      </div>

      {/* Panels */}
      {showGifts && (
        <GiftPanel roomId={roomId} onClose={() => setShowGifts(false)} onGiftSent={handleGiftSent} />
      )}
      {showEmoji && (
        <EmojiPicker
          onSelect={(emoji) => onSendMessage(emoji)}
          onClose={() => setShowEmoji(false)}
        />
      )}
      {showGames && <RoomGames onClose={() => setShowGames(false)} />}
      {showSeatMode && (
        <SeatModeSwitcher currentMode={seatMode} onSelect={onSeatModeChange} onClose={() => setShowSeatMode(false)} />
      )}
    </>
  );
}
