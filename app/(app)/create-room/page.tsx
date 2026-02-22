"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mic, Loader2 } from "lucide-react";
import { cn, ROOM_CATEGORIES, formatCategory } from "@/lib/utils";
import { useUser } from "@/components/user-provider";
import { createClient } from "@/lib/supabase/client";

const seatOptions = [2, 4, 6, 8] as const;

export default function CreateRoomPage() {
  const router = useRouter();
  const { profile } = useUser();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("chat");
  const [maxSeats, setMaxSeats] = useState<number>(8);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!profile || !name.trim()) return;
    setCreating(true);
    setError(null);

    const { data, error: insertError } = await supabase
      .from("voice_rooms")
      .insert({
        name: name.trim(),
        owner_id: profile.id,
        category,
        max_seats: maxSeats,
        is_live: true,
        viewer_count: 0,
      })
      .select("id")
      .single();

    if (insertError) {
      setError(insertError.message);
      setCreating(false);
    } else if (data) {
      router.push(`/room/${data.id}`);
    }
  }

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur-md">
        <button
          onClick={() => router.push("/home")}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Create Room</h1>
      </header>

      <form onSubmit={handleCreate} className="flex flex-col gap-6 p-4">
        {/* Room Preview */}
        <div className="flex flex-col items-center gap-3 py-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary">
            <Mic className="h-10 w-10 text-primary-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            Your voice room awaits
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Room Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="roomName" className="text-sm font-medium text-foreground">
            Room Name
          </label>
          <input
            id="roomName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Give your room a name"
            required
            maxLength={50}
            className="h-12 rounded-xl border border-input bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">Category</label>
          <div className="flex flex-wrap gap-2">
            {ROOM_CATEGORIES.filter((c) => c !== "All").map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-medium transition-colors",
                  category === cat
                    ? "gradient-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {formatCategory(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Max Seats */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">Max Seats</label>
          <div className="flex gap-3">
            {seatOptions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setMaxSeats(s)}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold transition-colors",
                  maxSeats === s
                    ? "gradient-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={creating || !name.trim()}
          className="flex h-12 items-center justify-center rounded-xl gradient-primary text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {creating ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Create Room"
          )}
        </button>
      </form>
    </div>
  );
}
