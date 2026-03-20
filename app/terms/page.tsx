import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - LotChat",
  description: "LotChat Terms of Service by WarStudio Ltd.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-dvh gradient-chamet">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-foreground text-balance">
          Terms of Service
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Last updated: March 20, 2026
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-secondary-foreground">
          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using LotChat (the "Service"), operated by
              WarStudio Ltd, you agree to be bound by these Terms of Service
              ("Terms"). If you do not agree to these Terms, you may not use the
              Service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              2. Eligibility
            </h2>
            <p>
              You must be at least 13 years of age to use the Service. By using
              the Service, you represent and warrant that you meet this age
              requirement. Users under 18 must have parental or guardian consent.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              3. User Accounts
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                You are responsible for maintaining the confidentiality of your
                account credentials.
              </li>
              <li>
                You agree to provide accurate and complete information when
                creating your account.
              </li>
              <li>
                You are responsible for all activities that occur under your
                account.
              </li>
              <li>
                We reserve the right to suspend or terminate accounts that
                violate these Terms.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              4. Acceptable Use
            </h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Use the Service for any illegal, harmful, or fraudulent purpose.
              </li>
              <li>
                Harass, bully, threaten, or intimidate other users.
              </li>
              <li>
                Share or distribute obscene, offensive, or inappropriate content.
              </li>
              <li>
                Impersonate another person or entity.
              </li>
              <li>
                Attempt to gain unauthorized access to other users&apos; accounts or
                the Service&apos;s systems.
              </li>
              <li>
                Use bots, scripts, or automated tools to interact with the
                Service without authorization.
              </li>
              <li>
                Engage in any activity that disrupts or interferes with the
                Service.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              5. Virtual Items and Purchases
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                LotChat may offer virtual items such as gifts, coins, or other
                in-app purchases ("Virtual Items").
              </li>
              <li>
                Virtual Items have no real-world monetary value and cannot be
                exchanged for cash or real currency.
              </li>
              <li>
                All purchases of Virtual Items are final unless otherwise stated
                in our{" "}
                <Link
                  href="/refund"
                  className="text-primary underline underline-offset-2"
                >
                  Refund Policy
                </Link>
                .
              </li>
              <li>
                We reserve the right to modify, manage, or eliminate Virtual
                Items at any time.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              6. Voice and Video Rooms
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Voice and video rooms are social spaces. You are responsible for
                your conduct within these rooms.
              </li>
              <li>
                We reserve the right to monitor, record, or moderate rooms to
                ensure compliance with these Terms.
              </li>
              <li>
                Room hosts may set rules for their rooms, and participants must
                comply with both room-specific and platform-wide rules.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              7. Intellectual Property
            </h2>
            <p>
              All content, trademarks, logos, and intellectual property displayed
              on the Service are owned by WarStudio Ltd or its licensors. You
              may not copy, reproduce, distribute, or create derivative works
              from any part of the Service without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              8. User Content
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                You retain ownership of content you create and share on the
                Service.
              </li>
              <li>
                By posting content, you grant WarStudio Ltd a worldwide,
                non-exclusive, royalty-free license to use, display, and
                distribute your content within the Service.
              </li>
              <li>
                We reserve the right to remove any content that violates these
                Terms.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              9. Termination
            </h2>
            <p>
              We may suspend or terminate your access to the Service at any
              time, with or without cause, and with or without notice. Upon
              termination, your right to use the Service will immediately cease.
              Any Virtual Items or account balances may be forfeited upon
              termination.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              10. Disclaimer of Warranties
            </h2>
            <p>
              The Service is provided "as is" and "as available" without
              warranties of any kind, whether express or implied. WarStudio Ltd
              does not warrant that the Service will be uninterrupted, secure,
              or error-free.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              11. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, WarStudio Ltd shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages arising out of or related to your use of the
              Service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              12. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms at any time. We will
              notify you of material changes by posting the updated Terms on
              this page. Your continued use of the Service after changes
              constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              13. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2 text-foreground">
              WarStudio Ltd
              <br />
              Email: contact@warstudio.com
            </p>
          </section>
        </div>

        <div className="mt-12 flex gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
          <Link href="/policy" className="transition-colors hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="/refund" className="transition-colors hover:text-foreground">
            Refund Policy
          </Link>
        </div>
      </div>
    </main>
  );
}
