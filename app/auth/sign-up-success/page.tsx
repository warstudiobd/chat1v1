import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowRight } from "lucide-react";

export default function SignUpSuccessPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 gradient-chamet">
      <div className="flex max-w-sm flex-col items-center gap-6 text-center">
        <Image
          src="/icon-512.jpg"
          alt="LotChat"
          width={64}
          height={64}
          className="h-16 w-16 rounded-2xl shadow-lg"
        />
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Check your email
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We sent a confirmation link to your email. Click it to activate your
          LotChat account and start connecting.
        </p>
        <Link
          href="/auth/login"
          className="flex h-12 items-center gap-2 rounded-xl gradient-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25"
        >
          Go to Sign In
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
