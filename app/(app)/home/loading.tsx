export default function HomeLoading() {
  return (
    <div className="flex flex-col animate-pulse">
      {/* Header skeleton */}
      <div className="flex h-14 items-center justify-between px-4">
        <div className="h-8 w-24 rounded-lg bg-muted" />
        <div className="flex gap-2">
          <div className="h-8 w-20 rounded-full bg-muted" />
          <div className="h-8 w-8 rounded-full bg-muted" />
        </div>
      </div>
      {/* Quick actions */}
      <div className="flex gap-3 px-4 py-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 w-16 shrink-0 rounded-2xl bg-muted" />
        ))}
      </div>
      {/* Banner */}
      <div className="mx-4 h-32 rounded-2xl bg-muted" />
      {/* Room cards */}
      <div className="flex gap-3 px-4 py-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-48 w-36 shrink-0 rounded-2xl bg-muted" />
        ))}
      </div>
      {/* Games grid */}
      <div className="grid grid-cols-4 gap-3 px-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-20 rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  );
}
