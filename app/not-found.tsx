import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center gradient-chamet">
      <div className="flex flex-col items-center gap-2">
        <span className="text-7xl font-black text-primary/20">404</span>
        <h2 className="text-lg font-bold text-foreground">Page not found</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The page you are looking for does not exist.
        </p>
      </div>
      <Link
        href="/home"
        className="flex h-12 items-center gap-2 rounded-xl gradient-primary px-6 text-sm font-semibold text-primary-foreground"
      >
        <Home className="h-4 w-4" />
        Go Home
      </Link>
    </div>
  );
}
