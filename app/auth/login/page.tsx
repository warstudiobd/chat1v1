"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"
import { Phone, ArrowRight, Shield, Loader2, Mail, Eye, EyeOff, CheckCircle2 } from "lucide-react"

type AuthStep = "welcome" | "phone" | "otp" | "email"

export default function LoginPage() {
  const [step, setStep] = useState<AuthStep>("welcome")
  const [phone, setPhone] = useState("")
  const [countryCode, setCountryCode] = useState("+880")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [countdown, setCountdown] = useState(0)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [emailSuccess, setEmailSuccess] = useState(false)
  const [displayName, setDisplayName] = useState("")

  const supabase = createClient()

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError("")
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  const handleSendOtp = async () => {
    if (!phone || phone.length < 8) {
      setError("Please enter a valid phone number")
      return
    }
    setLoading(true)
    setError("")
    const fullPhone = `${countryCode}${phone}`
    const { error } = await supabase.auth.signInWithOtp({
      phone: fullPhone,
    })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    setLoading(false)
    setCountdown(60)
    setStep("otp")
  }

  const handleVerifyOtp = async () => {
    const otpCode = otp.join("")
    if (otpCode.length !== 6) {
      setError("Please enter the 6-digit code")
      return
    }
    setLoading(true)
    setError("")
    const fullPhone = `${countryCode}${phone}`
    const { error } = await supabase.auth.verifyOtp({
      phone: fullPhone,
      token: otpCode,
      type: "sms",
    })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    window.location.href = "/"
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleEmailAuth = async () => {
    if (!email) { setError("Please enter your email"); return }
    if (!password || password.length < 6) { setError("Password must be at least 6 characters"); return }
    if (isSignUp && password !== confirmPassword) { setError("Passwords do not match"); return }

    setLoading(true)
    setError("")

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/callback`,
          data: {
            display_name: displayName || email.split("@")[0],
          },
        },
      })
      if (error) { setError(error.message); setLoading(false); return }
      setLoading(false)
      setEmailSuccess(true)
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      window.location.href = "/"
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0F] px-4">
      <div className="w-full max-w-[380px]">

        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <Image src="/images/logo.png" alt="LotChat" width={96} height={96} className="mx-auto mb-3 rounded-3xl" priority />
          <h1 className="text-2xl font-black text-white tracking-tight">LotChat</h1>
          <p className="text-sm text-[#8888AA] mt-1">Voice Room & Chat</p>
        </div>

        {/* Welcome Step */}
        {step === "welcome" && (
          <div className="flex flex-col gap-3 animate-fade-in">
            {/* Google Sign In */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex items-center justify-center gap-3 w-full py-3.5 rounded-2xl text-sm font-bold text-[#0A0A0F] bg-white hover:bg-[#f0f0f0] transition-colors disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              )}
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]" />
              <span className="text-[11px] text-[#8888AA] font-medium">or</span>
              <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]" />
            </div>

            {/* Email */}
            <button
              onClick={() => { setStep("email"); setIsSignUp(false); setError("") }}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold text-white glass hover:bg-[rgba(255,255,255,0.08)] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#8B5CF6]" />
              Continue with Email
            </button>

            {/* Phone Number */}
            <button
              onClick={() => { setStep("phone"); setError("") }}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold text-white glass hover:bg-[rgba(255,255,255,0.08)] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#FF2D78]" />
              Continue with Phone
            </button>

            {/* Terms */}
            <p className="text-[10px] text-[#8888AA] text-center mt-4 leading-relaxed">
              By continuing, you agree to our{" "}
              <a href="/terms" target="_blank" className="text-[#FF2D78] hover:underline">Terms of Service</a> and{" "}
              <a href="/privacy" target="_blank" className="text-[#FF2D78] hover:underline">Privacy Policy</a>
            </p>
          </div>
        )}

        {/* Email Step */}
        {step === "email" && !emailSuccess && (
          <div className="flex flex-col gap-3.5 animate-fade-in">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">{isSignUp ? "Create your account" : "Welcome back"}</h2>
              <p className="text-xs text-[#8888AA]">{isSignUp ? "Sign up with your email address" : "Sign in with your email and password"}</p>
            </div>

            {isSignUp && (
              <input
                type="text"
                placeholder="Display name"
                value={displayName}
                onChange={(e) => { setDisplayName(e.target.value); setError("") }}
                className="w-full py-3 px-4 rounded-2xl glass text-sm text-white placeholder-[#8888AA] bg-transparent outline-none"
              />
            )}

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError("") }}
              className="w-full py-3 px-4 rounded-2xl glass text-sm text-white placeholder-[#8888AA] bg-transparent outline-none"
              autoFocus
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError("") }}
                className="w-full py-3 px-4 pr-12 rounded-2xl glass text-sm text-white placeholder-[#8888AA] bg-transparent outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="w-4 h-4 text-[#8888AA]" /> : <Eye className="w-4 h-4 text-[#8888AA]" />}
              </button>
            </div>

            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError("") }}
                className="w-full py-3 px-4 rounded-2xl glass text-sm text-white placeholder-[#8888AA] bg-transparent outline-none"
              />
            )}

            {error && <p className="text-xs text-[#EF4444] text-center">{error}</p>}

            <button
              onClick={handleEmailAuth}
              disabled={loading || !email || !password}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold text-white disabled:opacity-40 transition-opacity"
              style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              {isSignUp ? "Create Account" : "Sign In"}
            </button>

            <p className="text-xs text-[#8888AA] text-center">
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <button
                onClick={() => { setIsSignUp(!isSignUp); setError(""); setPassword(""); setConfirmPassword("") }}
                className="text-[#FF2D78] font-semibold hover:underline"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>

            <button
              onClick={() => { setStep("welcome"); setError("") }}
              className="text-xs text-[#8888AA] text-center hover:text-white transition-colors"
            >
              Back to other options
            </button>
          </div>
        )}

        {/* Email Success - Check inbox */}
        {step === "email" && emailSuccess && (
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "rgba(16,185,129,0.15)" }}
            >
              <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
            </div>
            <h2 className="text-lg font-bold text-white">Check your email</h2>
            <p className="text-xs text-[#8888AA] text-center leading-relaxed">
              {"We've sent a confirmation link to"}<br />
              <span className="text-white font-semibold">{email}</span><br />
              Click the link to activate your account.
            </p>
            <button
              onClick={() => { setStep("email"); setEmailSuccess(false); setIsSignUp(false); setPassword("") }}
              className="text-xs text-[#FF2D78] font-semibold hover:underline mt-2"
            >
              Back to Sign In
            </button>
          </div>
        )}

        {/* Phone Number Step */}
        {step === "phone" && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Enter your phone number</h2>
              <p className="text-xs text-[#8888AA]">{"We'll send you a verification code via SMS"}</p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-24 py-3 px-3 rounded-2xl glass text-sm text-white bg-transparent outline-none appearance-none"
              >
                <option value="+91" className="bg-[#12121A]">+91</option>
                <option value="+1" className="bg-[#12121A]">+1</option>
                <option value="+44" className="bg-[#12121A]">+44</option>
                <option value="+971" className="bg-[#12121A]">+971</option>
                <option value="+966" className="bg-[#12121A]">+966</option>
                <option value="+92" className="bg-[#12121A]">+92</option>
                <option value="+880" className="bg-[#12121A]">+880</option>
                <option value="+62" className="bg-[#12121A]">+62</option>
                <option value="+55" className="bg-[#12121A]">+55</option>
                <option value="+234" className="bg-[#12121A]">+234</option>
              </select>
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "")); setError("") }}
                className="flex-1 py-3 px-4 rounded-2xl glass text-sm text-white placeholder-[#8888AA] bg-transparent outline-none"
                maxLength={15}
                autoFocus
              />
            </div>

            {error && (
              <p className="text-xs text-[#EF4444] text-center">{error}</p>
            )}

            <button
              onClick={handleSendOtp}
              disabled={loading || !phone}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold text-white disabled:opacity-40 transition-opacity"
              style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              Send Verification Code
            </button>

            <button
              onClick={() => { setStep("welcome"); setError("") }}
              className="text-xs text-[#8888AA] text-center hover:text-white transition-colors"
            >
              Back to other options
            </button>
          </div>
        )}

        {/* OTP Verification Step */}
        {step === "otp" && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ background: "rgba(139,92,246,0.15)" }}>
                <Shield className="w-6 h-6 text-[#8B5CF6]" />
              </div>
              <h2 className="text-lg font-bold text-white mb-1">Verify your number</h2>
              <p className="text-xs text-[#8888AA]">
                Enter the 6-digit code sent to{" "}
                <span className="text-white font-semibold">{countryCode}{phone}</span>
              </p>
            </div>

            {/* OTP Input Boxes */}
            <div className="flex items-center justify-center gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className="w-12 h-14 rounded-xl glass text-center text-lg font-bold text-white bg-transparent outline-none focus:ring-2 focus:ring-[#FF2D78] transition-all"
                  autoFocus={i === 0}
                />
              ))}
            </div>

            {error && (
              <p className="text-xs text-[#EF4444] text-center">{error}</p>
            )}

            <button
              onClick={handleVerifyOtp}
              disabled={loading || otp.join("").length !== 6}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold text-white disabled:opacity-40 transition-opacity"
              style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Verify & Continue
            </button>

            <div className="text-center">
              {countdown > 0 ? (
                <p className="text-xs text-[#8888AA]">
                  Resend code in <span className="text-white font-bold">{countdown}s</span>
                </p>
              ) : (
                <button
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="text-xs text-[#FF2D78] font-semibold hover:underline disabled:opacity-50"
                >
                  Resend Code
                </button>
              )}
            </div>

            <button
              onClick={() => { setStep("phone"); setOtp(["", "", "", "", "", ""]); setError("") }}
              className="text-xs text-[#8888AA] text-center hover:text-white transition-colors"
            >
              Change phone number
            </button>
          </div>
        )}
      </div>

      {/* Legal Links */}
      <div className="flex items-center justify-center gap-3 mt-auto pb-6 pt-4">
        <a href="/landing" className="text-[10px] text-[#8888AA] hover:text-white transition-colors">Home</a>
        <span className="text-[10px] text-[rgba(255,255,255,0.1)]">|</span>
        <a href="/privacy" className="text-[10px] text-[#8888AA] hover:text-white transition-colors">Privacy Policy</a>
        <span className="text-[10px] text-[rgba(255,255,255,0.1)]">|</span>
        <a href="/terms" className="text-[10px] text-[#8888AA] hover:text-white transition-colors">Terms of Service</a>
      </div>
    </div>
  )
}
