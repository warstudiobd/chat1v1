export default function MessagesLoading() {
  return (
    <div className="flex flex-col animate-pulse">
      <div className="flex h-14 items-center px-4">
        <div className="h-6 w-28 rounded-lg bg-muted" />
      </div>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3">
          <div className="h-12 w-12 shrink-0 rounded-full bg-muted" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-4 w-28 rounded bg-muted" />
            <div className="h-3 w-44 rounded bg-muted" />
          </div>
          <div className="h-3 w-10 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}
