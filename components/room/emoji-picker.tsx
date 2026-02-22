"use client";

import { X } from "lucide-react";

const EMOJI_CATEGORIES = [
  {
    name: "Smileys",
    emojis: [
      "\u{1F600}", "\u{1F602}", "\u{1F60D}", "\u{1F618}", "\u{1F609}",
      "\u{1F60E}", "\u{1F60B}", "\u{1F917}", "\u{1F914}", "\u{1F60F}",
      "\u{1F644}", "\u{1F633}", "\u{1F62D}", "\u{1F621}", "\u{1F631}",
      "\u{1F47B}", "\u{1F4A9}", "\u{1F44D}", "\u{1F44F}", "\u{1F64F}",
      "\u{1F525}", "\u{2764\uFE0F}", "\u{1F495}", "\u{1F48B}", "\u{1F49C}",
      "\u{1F389}", "\u{1F381}", "\u{1F3B6}", "\u{1F3B5}", "\u{2B50}",
    ],
  },
  {
    name: "Gestures",
    emojis: [
      "\u{1F44B}", "\u{270C\uFE0F}", "\u{1F91F}", "\u{1F919}", "\u{1F44C}",
      "\u{1F448}", "\u{1F449}", "\u{1F446}", "\u{1F447}", "\u{270D\uFE0F}",
      "\u{1F4AA}", "\u{1F9D1}\u200D\u{1F3A4}", "\u{1F483}", "\u{1F57A}",
      "\u{1F646}", "\u{1F645}", "\u{1F64B}", "\u{1F647}", "\u{1F926}", "\u{1F937}",
    ],
  },
  {
    name: "Objects",
    emojis: [
      "\u{1F3A4}", "\u{1F3B8}", "\u{1F3B9}", "\u{1F941}", "\u{1F3AC}",
      "\u{1F4F1}", "\u{1F48E}", "\u{1F451}", "\u{1F396\uFE0F}", "\u{1F3C6}",
      "\u{1F37B}", "\u{1F377}", "\u{1F370}", "\u{1F382}", "\u{1F339}",
      "\u{1F33A}", "\u{1F490}", "\u{1F680}", "\u{1F6F8}", "\u{1F308}",
    ],
  },
];

export function EmojiPicker({
  onSelect,
  onClose,
}: {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-background/40" onClick={onClose} />
      <div className="relative w-full max-w-lg animate-slide-up rounded-t-3xl border-t border-border bg-card">
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-sm font-bold text-foreground">Emoji</h3>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-64 overflow-y-auto px-4 pb-4 scrollbar-hide">
          {EMOJI_CATEGORIES.map((cat) => (
            <div key={cat.name} className="mb-3">
              <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {cat.name}
              </p>
              <div className="grid grid-cols-8 gap-1">
                {cat.emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      onSelect(emoji);
                      onClose();
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-xl hover:bg-muted transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
