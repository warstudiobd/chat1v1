import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy - LotChat",
  description: "LotChat Refund Policy by WarStudio Ltd.",
};

export default function RefundPolicyPage() {
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
          Refund Policy
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Last updated: March 20, 2026
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-secondary-foreground">
          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              1. Overview
            </h2>
            <p>
              This Refund Policy applies to all purchases made through the
              LotChat application and website, operated by WarStudio Ltd. Please
              read this policy carefully before making any purchases.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              2. Virtual Items and In-App Purchases
            </h2>
            <p>
              All purchases of virtual items, including but not limited to
              coins, gifts, and premium features ("Virtual Items"), are
              generally considered final and non-refundable. Virtual Items have
              no real-world monetary value and cannot be redeemed for cash.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              3. Eligible Refund Scenarios
            </h2>
            <p className="mb-3">
              We may issue refunds under the following circumstances:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">
                  Unauthorized Transactions:
                </strong>{" "}
                If a purchase was made without your authorization (e.g., due to
                account compromise), you must report it within 48 hours of the
                transaction.
              </li>
              <li>
                <strong className="text-foreground">
                  Technical Errors:
                </strong>{" "}
                If you were charged but did not receive the purchased Virtual
                Items due to a technical issue on our end.
              </li>
              <li>
                <strong className="text-foreground">
                  Duplicate Charges:
                </strong>{" "}
                If you were charged more than once for the same purchase.
              </li>
              <li>
                <strong className="text-foreground">
                  Service Discontinuation:
                </strong>{" "}
                If we discontinue the Service entirely and you have unused
                purchased Virtual Items.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              4. Non-Refundable Scenarios
            </h2>
            <p className="mb-3">Refunds will not be issued for:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Virtual Items that have already been used, sent as gifts, or
                consumed within the Service.
              </li>
              <li>
                Change of mind or dissatisfaction with purchased items.
              </li>
              <li>Account suspension or termination due to violation of our Terms of Service.</li>
              <li>
                Purchases made more than 30 days prior to the refund request
                (unless required by applicable law).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              5. How to Request a Refund
            </h2>
            <p className="mb-3">To request a refund, please:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li>
                Email us at{" "}
                <span className="text-primary">contact@warstudio.com</span> with
                the subject line "Refund Request".
              </li>
              <li>
                Include your account email, transaction ID or receipt, date of
                purchase, and the reason for your refund request.
              </li>
              <li>
                Provide any supporting evidence (e.g., screenshots of
                errors, duplicate charges).
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              6. Refund Processing
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                We will review your refund request within 5-7 business days.
              </li>
              <li>
                If approved, refunds will be processed to your original payment
                method within 10-14 business days.
              </li>
              <li>
                We will notify you via email about the status of your refund
                request.
              </li>
              <li>
                Processing times may vary depending on your payment provider or
                financial institution.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              7. App Store Purchases
            </h2>
            <p>
              If you made a purchase through the Apple App Store or Google Play
              Store, refund requests must be directed to the respective platform
              as they handle the payment processing. WarStudio Ltd does not have
              the ability to process refunds for app store purchases directly.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              8. Changes to This Policy
            </h2>
            <p>
              We reserve the right to modify this Refund Policy at any time. Any
              changes will be posted on this page with an updated "Last updated"
              date. Your continued use of the Service after changes constitutes
              acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              9. Contact Us
            </h2>
            <p>
              If you have any questions about this Refund Policy, please contact
              us at:
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
          <Link href="/terms" className="transition-colors hover:text-foreground">
            Terms of Service
          </Link>
        </div>
      </div>
    </main>
  );
}
