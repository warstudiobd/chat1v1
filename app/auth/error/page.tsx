"use client"

import Link from "next/link"

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0F] px-4">
      <div className="w-full max-w-[380px] text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[rgba(239,68,68,0.15)] flex items-center justify-center">
          <span className="text-3xl text-[#EF4444]">!</span>
        </div>
        <h1 className="text-xl font-bold text-white mb-2">Authentication Error</h1>
        <p className="text-sm text-[#8888AA] mb-6">
          Something went wrong during sign in. Please try again.
        </p>
        <Link
          href="/auth/login"
          className="inline-flex items-center justify-center w-full py-3 rounded-2xl text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}
        >
          Try Again
        </Link>
      </div>
    </div>
  )
}
