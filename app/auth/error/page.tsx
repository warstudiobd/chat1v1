import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function AuthErrorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="flex max-w-sm flex-col items-center gap-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/20">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Authentication Error
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Something went wrong during authentication. Please try again.
        </p>
        <Link
          href="/auth/login"
          className="flex h-10 items-center justify-center rounded-xl gradient-primary px-6 text-sm font-semibold text-primary-foreground"
        >
          Try Again
        </Link>
      </div>
    </main>
  );
}
