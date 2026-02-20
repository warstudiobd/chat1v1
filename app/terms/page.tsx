import Link from "next/link"
import { Mic, ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-xs text-[#8888AA] mb-8">Last updated: February 18, 2026</p>

        <div className="flex flex-col gap-6 text-sm text-[rgba(255,255,255,0.7)] leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-white mb-2">1. Acceptance of Terms</h2>
            <p>By accessing or using LotChat (operated by War Studio Ltd), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, do not use LotChat. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">2. Eligibility</h2>
            <p>You must be at least 18 years old to use LotChat. By creating an account, you represent and warrant that you are at least 18 years of age and have the legal capacity to enter into these terms. Accounts created by minors will be terminated upon discovery.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">3. Account Registration</h2>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>You must provide accurate and complete registration information.</li>
              <li>You are responsible for maintaining the security of your account credentials.</li>
              <li>You must not share your account with others or create multiple accounts.</li>
              <li>You are responsible for all activities that occur under your account.</li>
              <li>Notify us immediately of any unauthorized use of your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">4. Voice Rooms & Content</h2>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>Voice rooms are public spaces unless locked by the room owner (SVIP feature).</li>
              <li>You must not use voice rooms to share illegal, harmful, abusive, or obscene content.</li>
              <li>Room owners and moderators may remove participants who violate room rules.</li>
              <li>LotChat reserves the right to monitor and moderate voice rooms for policy compliance.</li>
              <li>Recording or redistributing voice room content without consent is prohibited.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">5. Virtual Currency & Purchases</h2>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li><strong className="text-white">Diamonds:</strong> Virtual currency purchased with real money at a rate of 10,000 diamonds per $1 USD. Diamonds are used to send gifts and play games.</li>
              <li><strong className="text-white">Beans:</strong> Virtual currency earned by receiving gifts. Beans can be converted to real earnings based on LotChat conversion rates.</li>
              <li>Virtual currencies are non-refundable once purchased.</li>
              <li>Virtual currencies have no real-world monetary value and cannot be exchanged outside of LotChat except through official cashout programs.</li>
              <li>LotChat reserves the right to adjust virtual currency exchange rates and gift values.</li>
              <li>Attempting to exploit, hack, or manipulate the virtual currency system will result in immediate account termination.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">6. VIP & SVIP Memberships</h2>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>VIP and SVIP are premium subscription tiers with exclusive features.</li>
              <li>Features include special badges, entry effects, anti-kick protection, room lock, and priority seating.</li>
              <li>Membership durations and pricing are as listed at the time of purchase.</li>
              <li>Memberships are non-refundable and non-transferable.</li>
              <li>LotChat reserves the right to modify VIP/SVIP features and pricing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">7. Games & Gambling</h2>
            <p className="mb-2">LotChat offers in-app games (Greedy Cat, Teen Patti, Lucky Wheel, Coin Flip, Crash, etc.) that require Diamonds as entry fees.</p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>Game outcomes are determined by random number generation systems.</li>
              <li>Game winnings are credited as Diamonds to your account.</li>
              <li>LotChat is not responsible for losses incurred during gameplay.</li>
              <li>Users are responsible for complying with local gambling laws in their jurisdiction.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">8. Prohibited Conduct</h2>
            <p className="mb-2">You agree not to:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>Use LotChat for any illegal purpose or in violation of local, national, or international laws</li>
              <li>Harass, bully, threaten, or intimidate other users</li>
              <li>Share sexually explicit, violent, or hateful content</li>
              <li>Impersonate any person or entity</li>
              <li>Use bots, scripts, or automated tools to interact with the service</li>
              <li>Attempt to gain unauthorized access to other accounts or systems</li>
              <li>Engage in fraud, money laundering, or financial crimes</li>
              <li>Promote illegal activities, substances, or services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">9. Moderation & Bans</h2>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>LotChat employs automated and manual moderation to enforce these terms.</li>
              <li>Violations may result in warnings, temporary bans, or permanent account termination.</li>
              <li>Banned users forfeit all virtual currencies and items in their account.</li>
              <li>Ban appeals may be submitted to our support team.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">10. Intellectual Property</h2>
            <p>All content, features, and functionality of LotChat, including but not limited to the design, graphics, icons, gift animations, and software, are owned by LotChat and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works of any LotChat content.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">11. Limitation of Liability</h2>
            <p>LotChat is provided "as is" without warranties of any kind. To the maximum extent permitted by law, LotChat shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or virtual currency, arising from your use of or inability to use the service.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">12. Termination</h2>
            <p>We may terminate or suspend your account at any time, with or without cause, with or without notice. Upon termination, your right to use LotChat ceases immediately. All provisions of these terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">13. Governing Law</h2>
            <p>These Terms of Service shall be governed by and construed in accordance with the laws of Bangladesh. Any disputes arising from or relating to these terms shall be resolved through binding arbitration or in the courts of Bangladesh.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">14. Contact Us</h2>
            <p>If you have any questions about these Terms of Service, please contact us at:</p>
            <p className="mt-2"><strong className="text-white">Company:</strong> War Studio Ltd</p>
            <p className="mt-1"><strong className="text-white">Email:</strong> support@lotchat.app</p>
          </section>
        </div>
      </main>

      <footer className="px-6 py-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-center gap-4 text-xs text-[#8888AA]">
          <Link href="/landing" className="hover:text-white transition-colors">Home</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
        </div>
        <p className="text-[10px] text-[#8888AA] mt-2">{"War Studio Ltd 2026. All rights reserved."}</p>
      </footer>
    </div>
  )
}
