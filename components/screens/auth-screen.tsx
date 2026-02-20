"use client"

import { useState, useEffect, useRef } from "react"
import { Mail, Phone, ArrowRight, Eye, EyeOff, ArrowLeft, Shield, CheckCircle } from "lucide-react"

type AuthStep = "welcome" | "login" | "signup" | "otp" | "profile-setup"

interface AuthScreenProps {
  onComplete: () => void
}

function OTPInput({ length = 6, onComplete }: { length?: number; onComplete: (code: string) => void }) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""))
  const refs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newValues = [...values]
    newValues[index] = value.slice(-1)
    setValues(newValues)
    if (value && index < length - 1) {
      refs.current[index + 1]?.focus()
    }
    if (newValues.every(v => v !== "")) {
      onComplete(newValues.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      refs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex gap-2 justify-center">
      {values.map((v, i) => (
        <input
          key={i}
          ref={el => { refs.current[i] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={v}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-11 h-13 rounded-xl glass text-center text-lg font-bold text-white outline-none focus:ring-2 focus:ring-[#FF2D78]"
          style={{ minHeight: "52px" }}
        />
      ))}
    </div>
  )
}

function WelcomeView({ onLogin, onSignup }: { onLogin: () => void; onSignup: () => void }) {
  return (
    <div className="flex flex-col items-center justify-between h-full px-6 py-8">
      <div />
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>
            <span className="text-4xl font-black text-white tracking-tight">LC</span>
          </div>
          <div className="absolute -inset-2 rounded-3xl animate-pulse-ring" style={{ border: "2px solid rgba(255,45,120,0.3)" }} />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-black text-white mb-2">LotChat</h1>
          <p className="text-sm text-[#8888AA] max-w-[260px] leading-relaxed">
            Live voice rooms, virtual gifts, games & more. Connect with people worldwide.
          </p>
        </div>
        {/* Features */}
        <div className="flex gap-4">
          {[
            { icon: "MIC", label: "Voice Rooms" },
            { icon: "GIFT", label: "Gifts" },
            { icon: "GAME", label: "Games" },
          ].map(f => (
            <div key={f.label} className="flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl glass">
              <span className="text-sm font-bold text-[#FF2D78]">{f.icon}</span>
              <span className="text-[9px] text-[#8888AA]">{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <button
          onClick={onSignup}
          className="w-full py-3.5 rounded-2xl text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}
        >
          Create Account
        </button>
        <button
          onClick={onLogin}
          className="w-full py-3.5 rounded-2xl text-sm font-bold text-white glass"
        >
          Sign In
        </button>
        <p className="text-center text-[9px] text-[#8888AA] mt-1">
          {"By continuing, you agree to our Terms of Service & Privacy Policy"}
        </p>
      </div>
    </div>
  )
}

function LoginView({ onBack, onOtp }: { onBack: () => void; onOtp: (method: string) => void }) {
  const [method, setMethod] = useState<"email" | "phone">("email")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)

  return (
    <div className="flex flex-col h-full px-6 py-6">
      <button onClick={onBack} className="w-8 h-8 rounded-full glass flex items-center justify-center mb-6">
        <ArrowLeft className="w-4 h-4 text-white" />
      </button>
      <h2 className="text-2xl font-black text-white mb-1">Welcome Back</h2>
      <p className="text-sm text-[#8888AA] mb-6">Sign in to continue</p>

      {/* Method Toggle */}
      <div className="flex rounded-xl glass p-1 mb-5">
        <button onClick={() => setMethod("email")} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors" style={{ background: method === "email" ? "#FF2D78" : "transparent", color: method === "email" ? "#FFFFFF" : "#8888AA" }}>
          <Mail className="w-3.5 h-3.5" /> Email
        </button>
        <button onClick={() => setMethod("phone")} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors" style={{ background: method === "phone" ? "#FF2D78" : "transparent", color: method === "phone" ? "#FFFFFF" : "#8888AA" }}>
          <Phone className="w-3.5 h-3.5" /> Phone
        </button>
      </div>

      {method === "email" ? (
        <>
          <label className="text-xs text-[#8888AA] mb-1.5">Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl glass text-sm text-white placeholder-[#8888AA] outline-none focus:ring-1 focus:ring-[#FF2D78] mb-3 bg-transparent" />
          <label className="text-xs text-[#8888AA] mb-1.5">Password</label>
          <div className="relative mb-2">
            <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="w-full px-4 py-3 rounded-xl glass text-sm text-white placeholder-[#8888AA] outline-none focus:ring-1 focus:ring-[#FF2D78] bg-transparent pr-10" />
            <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2" aria-label="Toggle password visibility">
              {showPw ? <EyeOff className="w-4 h-4 text-[#8888AA]" /> : <Eye className="w-4 h-4 text-[#8888AA]" />}
            </button>
          </div>
          <button className="text-[10px] text-[#FF2D78] text-right mb-5 self-end">Forgot Password?</button>
        </>
      ) : (
        <>
          <label className="text-xs text-[#8888AA] mb-1.5">Phone Number</label>
          <div className="flex gap-2 mb-5">
            <select className="w-20 px-2 py-3 rounded-xl glass text-sm text-white bg-transparent outline-none">
              <option value="+91" className="bg-[#12121A]">+91</option>
              <option value="+1" className="bg-[#12121A]">+1</option>
              <option value="+44" className="bg-[#12121A]">+44</option>
              <option value="+81" className="bg-[#12121A]">+81</option>
              <option value="+55" className="bg-[#12121A]">+55</option>
            </select>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" className="flex-1 px-4 py-3 rounded-xl glass text-sm text-white placeholder-[#8888AA] outline-none focus:ring-1 focus:ring-[#FF2D78] bg-transparent" />
          </div>
        </>
      )}

      <button
        onClick={() => onOtp(method)}
        className="w-full py-3.5 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2"
        style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}
      >
        {method === "phone" ? "Send OTP" : "Sign In"} <ArrowRight className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
        <span className="text-[10px] text-[#8888AA]">or continue with</span>
        <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
      </div>

      <div className="flex gap-3">
        {["Google", "Apple", "Facebook"].map(p => (
          <button key={p} className="flex-1 py-2.5 rounded-xl glass text-xs font-semibold text-white">{p}</button>
        ))}
      </div>
    </div>
  )
}

function SignupView({ onBack, onOtp }: { onBack: () => void; onOtp: () => void }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="flex flex-col h-full px-6 py-6 overflow-y-auto">
      <button onClick={onBack} className="w-8 h-8 rounded-full glass flex items-center justify-center mb-6 flex-shrink-0">
        <ArrowLeft className="w-4 h-4 text-white" />
      </button>
      <h2 className="text-2xl font-black text-white mb-1">Create Account</h2>
      <p className="text-sm text-[#8888AA] mb-5">Join millions on LotChat</p>

      <label className="text-xs text-[#8888AA] mb-1.5">Display Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full px-4 py-3 rounded-xl glass text-sm text-white placeholder-[#8888AA] outline-none focus:ring-1 focus:ring-[#FF2D78] mb-3 bg-transparent" />

      <label className="text-xs text-[#8888AA] mb-1.5">Email Address</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl glass text-sm text-white placeholder-[#8888AA] outline-none focus:ring-1 focus:ring-[#FF2D78] mb-3 bg-transparent" />

      <label className="text-xs text-[#8888AA] mb-1.5">Phone Number</label>
      <div className="flex gap-2 mb-3">
        <select className="w-20 px-2 py-3 rounded-xl glass text-sm text-white bg-transparent outline-none">
          <option value="+91" className="bg-[#12121A]">+91</option>
          <option value="+1" className="bg-[#12121A]">+1</option>
          <option value="+44" className="bg-[#12121A]">+44</option>
        </select>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" className="flex-1 px-4 py-3 rounded-xl glass text-sm text-white placeholder-[#8888AA] outline-none focus:ring-1 focus:ring-[#FF2D78] bg-transparent" />
      </div>

      <label className="text-xs text-[#8888AA] mb-1.5">Password</label>
      <div className="relative mb-3">
        <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 8 characters" className="w-full px-4 py-3 rounded-xl glass text-sm text-white placeholder-[#8888AA] outline-none focus:ring-1 focus:ring-[#FF2D78] bg-transparent pr-10" />
        <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2" aria-label="Toggle password visibility">
          {showPw ? <EyeOff className="w-4 h-4 text-[#8888AA]" /> : <Eye className="w-4 h-4 text-[#8888AA]" />}
        </button>
      </div>

      {/* Password Strength */}
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex-1 h-1 rounded-full" style={{ background: password.length >= i * 2 ? (password.length >= 8 ? "#10B981" : "#F59E0B") : "rgba(255,255,255,0.1)" }} />
        ))}
      </div>

      <label className="flex items-start gap-2 mb-5 cursor-pointer">
        <button onClick={() => setAgreed(!agreed)} className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: agreed ? "#FF2D78" : "rgba(255,255,255,0.1)" }}>
          {agreed && <CheckCircle className="w-3.5 h-3.5 text-white" />}
        </button>
        <span className="text-[11px] text-[#8888AA] leading-relaxed">
          {"I agree to the Terms of Service and Privacy Policy. I am 18 years or older."}
        </span>
      </label>

      <button
        onClick={onOtp}
        disabled={!agreed || !name || !email}
        className="w-full py-3.5 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-40"
        style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}
      >
        Continue <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  )
}

function OTPView({ onBack, onVerify, method }: { onBack: () => void; onVerify: () => void; method: string }) {
  const [timer, setTimer] = useState(30)
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [timer])

  const handleComplete = () => {
    setVerified(true)
    setTimeout(onVerify, 1200)
  }

  return (
    <div className="flex flex-col h-full px-6 py-6">
      <button onClick={onBack} className="w-8 h-8 rounded-full glass flex items-center justify-center mb-6">
        <ArrowLeft className="w-4 h-4 text-white" />
      </button>

      <div className="flex flex-col items-center flex-1 justify-center gap-6">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: verified ? "rgba(16,185,129,0.15)" : "linear-gradient(135deg, rgba(255,45,120,0.15), rgba(139,92,246,0.15))" }}>
          {verified ? <CheckCircle className="w-8 h-8 text-[#10B981]" /> : <Shield className="w-8 h-8 text-[#FF2D78]" />}
        </div>

        <div className="text-center">
          <h2 className="text-xl font-black text-white mb-1">{verified ? "Verified!" : "Enter OTP"}</h2>
          <p className="text-sm text-[#8888AA]">
            {verified ? "Redirecting you..." : `We sent a 6-digit code to your ${method}`}
          </p>
        </div>

        {!verified && (
          <>
            <OTPInput onComplete={handleComplete} />

            <div className="flex flex-col items-center gap-2">
              {timer > 0 ? (
                <span className="text-xs text-[#8888AA]">Resend code in <span className="text-[#FF2D78] font-bold">{timer}s</span></span>
              ) : (
                <button onClick={() => setTimer(30)} className="text-xs text-[#FF2D78] font-bold">Resend Code</button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function ProfileSetupView({ onComplete }: { onComplete: () => void }) {
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [gender, setGender] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState(0)

  const avatarGradients = [
    "gradient-avatar-1", "gradient-avatar-2", "gradient-avatar-3", "gradient-avatar-4",
    "gradient-avatar-5", "gradient-avatar-6", "gradient-avatar-7", "gradient-avatar-8",
  ]

  return (
    <div className="flex flex-col h-full px-6 py-6 overflow-y-auto">
      <h2 className="text-2xl font-black text-white mb-1">Set Up Profile</h2>
      <p className="text-sm text-[#8888AA] mb-6">Let people know who you are</p>

      {/* Avatar Selection */}
      <div className="flex flex-col items-center mb-6">
        <div className={`w-24 h-24 rounded-full ${avatarGradients[selectedAvatar]} flex items-center justify-center text-3xl font-bold text-white mb-3`}>
          {name ? name.charAt(0).toUpperCase() : "?"}
        </div>
        <div className="flex gap-2">
          {avatarGradients.map((g, i) => (
            <button
              key={i}
              onClick={() => setSelectedAvatar(i)}
              className={`w-8 h-8 rounded-full ${g} transition-transform ${selectedAvatar === i ? "scale-110 ring-2 ring-[#FF2D78]" : "opacity-50"}`}
            />
          ))}
        </div>
      </div>

      <label className="text-xs text-[#8888AA] mb-1.5">Display Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="How should we call you?" className="w-full px-4 py-3 rounded-xl glass text-sm text-white placeholder-[#8888AA] outline-none focus:ring-1 focus:ring-[#FF2D78] mb-3 bg-transparent" />

      <label className="text-xs text-[#8888AA] mb-1.5">Bio</label>
      <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell people about yourself..." rows={2} className="w-full px-4 py-3 rounded-xl glass text-sm text-white placeholder-[#8888AA] outline-none focus:ring-1 focus:ring-[#FF2D78] mb-3 bg-transparent resize-none" />

      <label className="text-xs text-[#8888AA] mb-1.5">Gender</label>
      <div className="flex gap-2 mb-6">
        {["Male", "Female", "Other"].map(g => (
          <button
            key={g}
            onClick={() => setGender(g)}
            className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-colors"
            style={{ background: gender === g ? "#FF2D78" : "rgba(255,255,255,0.05)", color: gender === g ? "#FFFFFF" : "#8888AA" }}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="mt-auto">
        <button
          onClick={onComplete}
          disabled={!name}
          className="w-full py-3.5 rounded-2xl text-sm font-bold text-white disabled:opacity-40"
          style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}
        >
          Start Chatting
        </button>
        <button onClick={onComplete} className="w-full py-2.5 text-xs text-[#8888AA] mt-2">Skip for now</button>
      </div>
    </div>
  )
}

export function AuthScreen({ onComplete }: AuthScreenProps) {
  const [step, setStep] = useState<AuthStep>("welcome")
  const [authMethod, setAuthMethod] = useState("email")

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#050508]">
      <div className="relative w-full max-w-[430px] h-screen max-h-[932px] bg-background flex flex-col overflow-hidden">
        {step === "welcome" && <WelcomeView onLogin={() => setStep("login")} onSignup={() => setStep("signup")} />}
        {step === "login" && <LoginView onBack={() => setStep("welcome")} onOtp={(m) => { setAuthMethod(m); setStep(m === "phone" ? "otp" : "profile-setup") }} />}
        {step === "signup" && <SignupView onBack={() => setStep("welcome")} onOtp={() => setStep("otp")} />}
        {step === "otp" && <OTPView onBack={() => setStep("login")} onVerify={() => setStep("profile-setup")} method={authMethod} />}
        {step === "profile-setup" && <ProfileSetupView onComplete={onComplete} />}
      </div>
    </div>
  )
}
