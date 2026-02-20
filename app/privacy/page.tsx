import Link from "next/link"
import { Mic, ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center gap-4 px-6 py-4 max-w-3xl mx-auto" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Link href="/landing" className="flex items-center justify-center w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.05)]">
          <ArrowLeft className="w-4 h-4 text-[#8888AA]" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>
            <Mic className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-bold text-white">LotChat</span>
        </div>
      </header>

      <main className="px-6 py-10 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-xs text-[#8888AA] mb-8">Last updated: February 18, 2026</p>

        <div className="flex flex-col gap-6 text-sm text-[rgba(255,255,255,0.7)] leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-white mb-2">1. Introduction</h2>
            <p>Welcome to LotChat, operated by War Studio Ltd. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website. Please read this privacy policy carefully. By using LotChat, you consent to the data practices described in this policy.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">2. Information We Collect</h2>
            <p className="mb-2">We collect information you provide directly to us, including:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li><strong className="text-white">Account Information:</strong> Name, email address, phone number, date of birth, gender, and profile photo when you create an account.</li>
              <li><strong className="text-white">Authentication Data:</strong> Login credentials through email/password, Google Sign-In, or phone OTP verification.</li>
              <li><strong className="text-white">Profile Information:</strong> Bio, country, and other optional details you choose to share.</li>
              <li><strong className="text-white">Transaction Data:</strong> Purchase history, diamond balance, bean balance, gift transactions, and payment information processed through Stripe or in-app purchase providers.</li>
              <li><strong className="text-white">Usage Data:</strong> Voice room participation, messages sent, gifts given/received, game activity, and interaction patterns.</li>
              <li><strong className="text-white">Device Information:</strong> Device type, operating system, unique device identifiers, and mobile network information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>To create and manage your account</li>
              <li>To provide voice room, messaging, and social features</li>
              <li>To process diamond/bean purchases and gift transactions</li>
              <li>To match you with other users based on preferences</li>
              <li>To send push notifications about room activities, messages, and events</li>
              <li>To enforce our Terms of Service and moderate content</li>
              <li>To detect and prevent fraud, abuse, and security threats</li>
              <li>To improve and optimize our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">4. Virtual Currency & Payments</h2>
            <p>LotChat uses virtual currencies (Diamonds and Beans) for in-app transactions. Payment processing is handled by third-party providers including Stripe, Google Play Billing, and Apple In-App Purchases. We do not store your full credit card number or bank details. All payment data is processed securely by these providers in accordance with PCI DSS standards.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">5. Data Sharing</h2>
            <p className="mb-2">We do not sell your personal data. We may share information with:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li><strong className="text-white">Service Providers:</strong> Payment processors (Stripe), hosting (Vercel), database (Supabase), and analytics providers.</li>
              <li><strong className="text-white">Other Users:</strong> Your profile information, display name, and activity are visible to other users as part of the social experience.</li>
              <li><strong className="text-white">Legal Requirements:</strong> When required by law, regulation, or legal process.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">6. Data Security</h2>
            <p>We use industry-standard security measures including encryption (SSL/TLS), secure authentication (Supabase Auth with Row Level Security), and access controls to protect your data. However, no method of electronic transmission or storage is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">7. Data Retention</h2>
            <p>We retain your personal data for as long as your account is active or as needed to provide services. You can request deletion of your account and associated data by contacting us. Some data may be retained for legal compliance purposes.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">8. Children's Privacy</h2>
            <p>LotChat is not intended for users under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child under 18 has provided us with personal data, we will take steps to delete that information.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">9. Your Rights</h2>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>Access and download your personal data</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Delete your account and associated data</li>
              <li>Opt out of marketing communications</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Continued use of LotChat after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">11. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-2"><strong className="text-white">Company:</strong> War Studio Ltd</p>
            <p className="mt-1"><strong className="text-white">Email:</strong> support@lotchat.app</p>
          </section>
        </div>
      </main>

      <footer className="px-6 py-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-center gap-4 text-xs text-[#8888AA]">
          <Link href="/landing" className="hover:text-white transition-colors">Home</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
        <p className="text-[10px] text-[#8888AA] mt-2">{"War Studio Ltd 2026. All rights reserved."}</p>
      </footer>
    </div>
  )
}
