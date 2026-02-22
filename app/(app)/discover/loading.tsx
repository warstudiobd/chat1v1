export default function DiscoverLoading() {
  return (
    <div className="flex flex-col animate-pulse">
      <div className="flex h-14 items-center px-4">
        <div className="h-6 w-24 rounded-lg bg-muted" />
      </div>
      <div className="mx-4 h-10 rounded-xl bg-muted" />
      <div className="flex gap-4 px-4 py-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex shrink-0 flex-col items-center gap-2">
            <div className="h-14 w-14 rounded-full bg-muted" />
            <div className="h-3 w-12 rounded bg-muted" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 px-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-40 rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  );
}
