import { Calendar, Users, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const events = [
  {
    title: "Voice Room Festival",
    desc: "Host rooms & win exclusive badges",
    joined: "15.6K",
    reward: "100,000 coins",
    gradient: "from-pink-600 via-rose-500 to-orange-400",
    icon: "\u{1F3A4}",
  },
  {
    title: "Top Gifter Week",
    desc: "Send the most gifts to win",
    joined: "8.9K",
    reward: "SVIP Badge",
    gradient: "from-purple-600 via-violet-500 to-blue-400",
    icon: "\u{1F381}",
  },
  {
    title: "New User Bonus",
    desc: "Special rewards for newcomers",
    joined: "24.5K",
    reward: "50,000 coins",
    gradient: "from-emerald-600 via-green-500 to-teal-400",
    icon: "\u{2B50}",
  },
  {
    title: "Couple Challenge",
    desc: "Match & complete tasks together",
    joined: "12.1K",
    reward: "Exclusive frame",
    gradient: "from-red-600 via-pink-500 to-rose-400",
    icon: "\u{1F495}",
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
        <Link href="/discover" className="text-[10px] font-semibold text-pink">See All</Link>
      </div>
      <div className="scrollbar-hide flex gap-2.5 overflow-x-auto pb-1">
        {events.map((event, i) => (
          <div
            key={i}
            className={cn("w-[180px] shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br", event.gradient)}
          >
            <div className="p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-base">{event.icon}</span>
                <span className="text-xs font-bold text-primary-foreground">{event.title}</span>
              </div>
              <p className="mb-2.5 text-[9px] text-primary-foreground/70">{event.desc}</p>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-0.5 text-[8px] text-primary-foreground/60">
                  <Users className="h-2.5 w-2.5" />
                  {event.joined}
                </span>
                <span className="flex items-center gap-0.5 rounded-full bg-black/30 px-2 py-0.5 text-[8px] font-bold text-gold">
                  <Trophy className="h-2 w-2" />
                  {event.reward}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
