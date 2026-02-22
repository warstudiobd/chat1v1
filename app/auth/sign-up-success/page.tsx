import Link from "next/link";
import { Mail } from "lucide-react";

export default function SignUpSuccessPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="flex max-w-sm flex-col items-center gap-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Check your email
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We sent you a confirmation link. Please check your email and click the
          link to activate your account.
        </p>
        <Link
          href="/auth/login"
          className="text-sm font-medium text-primary hover:underline"
        >
          Back to Sign In
        </Link>
      </div>
    </main>
  );
}
