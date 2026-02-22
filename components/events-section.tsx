import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const events = [
  {
    title: "Voice Room Festival",
    desc: "Host voice rooms and win exclusive badges",
    joined: "15.6K",
    reward: "10,000 D",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Top Host Week",
    desc: "Most popular hosts get rewarded",
    joined: "8.9K",
    reward: "SVIP Badge",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "New User Bonus",
    desc: "Special rewards for new users",
    joined: "24.5K",
    reward: "500 Free D",
    gradient: "from-green-500 to-emerald-500",
  },
];

export function EventsSection() {
  return (
    <section className="mb-4 px-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-accent" />
          <h2 className="text-sm font-bold text-foreground">Events</h2>
        </div>
        <Link href="/discover" className="text-[10px] font-semibold text-pink">
          See All
        </Link>
      </div>
      <div className="scrollbar-hide flex gap-2.5 overflow-x-auto pb-1">
        {events.map((event, i) => (
          <div
            key={i}
            className={cn(
              "w-[200px] shrink-0 rounded-2xl bg-gradient-to-br p-3",
              event.gradient
            )}
          >
            <span className="mb-1 block text-xs font-bold text-foreground">
              {event.title}
            </span>
            <p className="mb-2 text-[9px] text-[rgba(255,255,255,0.7)]">
              {event.desc}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[8px] text-[rgba(255,255,255,0.6)]">
                {event.joined} joined
              </span>
              <span className="rounded-full bg-[rgba(0,0,0,0.3)] px-2 py-0.5 text-[8px] font-bold text-gold">
                {event.reward}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
