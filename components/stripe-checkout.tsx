"use client"

import { useCallback, useState } from "react"
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { startCheckoutSession } from "@/app/actions/stripe"
import { ArrowLeft, Diamond, CheckCircle, Loader2 } from "lucide-react"
import { getProduct, formatPrice } from "@/lib/products"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

interface StripeCheckoutProps {
  productId: string
  onClose: () => void
  onSuccess: (diamonds: number) => void
}

export function StripeCheckout({ productId, onClose, onSuccess }: StripeCheckoutProps) {
  const [status, setStatus] = useState<"checkout" | "success" | "error">("checkout")
  const product = getProduct(productId)

  const fetchClientSecret = useCallback(
    () => startCheckoutSession(productId),
    [productId]
  )

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <p className="text-sm text-[#EF4444]">Product not found</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 rounded-xl glass text-sm text-white">Go Back</button>
      </div>
    )
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 animate-fade-in">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(16,185,129,0.15)" }}>
          <CheckCircle className="w-10 h-10 text-[#10B981]" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Payment Successful!</h2>
        <div className="flex items-center gap-2 mb-1">
          <Diamond className="w-5 h-5 text-[#06B6D4]" />
          <span className="text-2xl font-bold text-white">{(product.diamonds + product.bonus).toLocaleString()}</span>
        </div>
        <p className="text-xs text-[#8888AA] mb-1">
          {product.diamonds.toLocaleString()} diamonds
          {product.bonus > 0 && ` + ${product.bonus.toLocaleString()} bonus`}
        </p>
        <p className="text-xs text-[#10B981] mb-6">Added to your wallet</p>
        <button
          onClick={() => {
            onSuccess(product.diamonds + product.bonus)
            onClose()
          }}
          className="px-8 py-3 rounded-xl text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}
        >
          Continue
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
        <button onClick={onClose} className="w-8 h-8 rounded-full glass flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>
        <div className="flex-1">
          <h1 className="text-sm font-bold text-white">{product.name}</h1>
          <span className="text-[10px] text-[#8888AA]">{formatPrice(product.priceInCents)}</span>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full glass">
          <Diamond className="w-3.5 h-3.5 text-[#06B6D4]" />
          <span className="text-xs font-bold text-white">{product.diamonds.toLocaleString()}</span>
        </div>
      </div>

      {/* Stripe Embedded Checkout */}
      <div className="flex-1 overflow-y-auto bg-white rounded-t-2xl mt-2">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{
            clientSecret: fetchClientSecret,
            onComplete: () => setStatus("success"),
          }}
        >
          <EmbeddedCheckout className="h-full" />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  )
}
