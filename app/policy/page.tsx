import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - LotChat",
  description: "LotChat Privacy Policy by WarStudio Ltd.",
};

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Last updated: March 20, 2026
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-secondary-foreground">
          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              1. Introduction
            </h2>
            <p>
              Welcome to LotChat, operated by WarStudio Ltd ("we", "our", "us").
              We are committed to protecting your personal information and your
              right to privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use the LotChat
              application and website (collectively, the "Service").
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              2. Information We Collect
            </h2>
            <p className="mb-3">
              We may collect the following types of information:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">Account Information:</strong>{" "}
                Email address, username, profile picture, and password when you
                create an account.
              </li>
              <li>
                <strong className="text-foreground">Usage Data:</strong> Information
                about how you interact with the Service, including voice and video
                room participation, messages, gifts sent and received, and game
                activity.
              </li>
              <li>
                <strong className="text-foreground">Device Information:</strong>{" "}
                Device type, operating system, browser type, IP address, and unique
                device identifiers.
              </li>
              <li>
                <strong className="text-foreground">Payment Information:</strong>{" "}
                When you make purchases (such as virtual gifts or coins), payment
                processing is handled by third-party providers. We do not store your
                full payment card details.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>To create and manage your account.</li>
              <li>To provide, maintain, and improve the Service.</li>
              <li>To process transactions and send related information.</li>
              <li>
                To communicate with you, including sending updates, security
                alerts, and support messages.
              </li>
              <li>To enforce our terms, conditions, and policies.</li>
              <li>
                To detect, prevent, and address technical issues, fraud, or
                illegal activity.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              4. Sharing Your Information
            </h2>
            <p className="mb-3">
              We do not sell your personal information. We may share your
              information in the following circumstances:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">Service Providers:</strong>{" "}
                Third-party companies that assist us in operating the Service
                (e.g., hosting, payment processing, analytics).
              </li>
              <li>
                <strong className="text-foreground">Legal Requirements:</strong> If
                required by law, regulation, or legal process.
              </li>
              <li>
                <strong className="text-foreground">Safety:</strong> To protect the
                rights, property, or safety of WarStudio Ltd, our users, or the
                public.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              5. Data Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your
              personal information. However, no method of transmission over the
              internet or electronic storage is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              6. Data Retention
            </h2>
            <p>
              We retain your personal information for as long as your account is
              active or as needed to provide the Service. You may request
              deletion of your account and associated data at any time by
              contacting us.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              7. Your Rights
            </h2>
            <p className="mb-3">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Access, update, or delete your personal information.</li>
              <li>Object to or restrict the processing of your data.</li>
              <li>Request a copy of your data in a portable format.</li>
              <li>Withdraw consent where processing is based on consent.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              8. Children&apos;s Privacy
            </h2>
            <p>
              The Service is not intended for users under the age of 13. We do
              not knowingly collect personal information from children under 13.
              If we learn we have collected such information, we will take steps
              to delete it.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              10. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <p className="mt-2 text-foreground">
              WarStudio Ltd
              <br />
              Email: contact@warstudio.com
            </p>
          </section>
        </div>

        <div className="mt-12 flex gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
          <Link href="/terms" className="transition-colors hover:text-foreground">
            Terms of Service
          </Link>
          <Link href="/refund" className="transition-colors hover:text-foreground">
            Refund Policy
          </Link>
        </div>
      </div>
    </main>
  );
}
