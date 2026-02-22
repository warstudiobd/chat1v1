export default function ProfileLoading() {
  return (
    <div className="flex flex-col animate-pulse">
      <div className="flex h-14 items-center px-4">
        <div className="h-6 w-20 rounded-lg bg-muted" />
      </div>
      {/* Avatar + name */}
      <div className="flex flex-col items-center gap-3 py-8">
        <div className="h-24 w-24 rounded-full bg-muted" />
        <div className="h-5 w-32 rounded bg-muted" />
        <div className="h-4 w-20 rounded bg-muted" />
      </div>
      {/* Stats */}
      <div className="flex justify-center gap-8 py-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="h-6 w-12 rounded bg-muted" />
            <div className="h-3 w-10 rounded bg-muted" />
          </div>
        ))}
      </div>
      {/* Tabs */}
      <div className="flex gap-2 px-4 pt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-20 rounded-full bg-muted" />
        ))}
      </div>
    </div>
  );
}
