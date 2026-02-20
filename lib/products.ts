export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  diamonds: number
  bonus: number
  popular: boolean
  category: "diamonds" | "vip" | "svip" | "offer"
}

// $1 = 10,000 Diamonds
export const PRODUCTS: Product[] = [
  // Diamond Packages
  {
    id: "diamonds-10k",
    name: "10,000 Diamonds",
    description: "Starter diamond pack",
    priceInCents: 99,
    diamonds: 10000,
    bonus: 0,
    popular: false,
    category: "diamonds",
  },
  {
    id: "diamonds-50k",
    name: "50,000 Diamonds",
    description: "Value diamond pack",
    priceInCents: 499,
    diamonds: 50000,
    bonus: 5000,
    popular: false,
    category: "diamonds",
  },
  {
    id: "diamonds-100k",
    name: "100,000 Diamonds",
    description: "Popular diamond pack",
    priceInCents: 999,
    diamonds: 100000,
    bonus: 15000,
    popular: true,
    category: "diamonds",
  },
  {
    id: "diamonds-200k",
    name: "200,000 Diamonds",
    description: "Premium diamond pack",
    priceInCents: 1999,
    diamonds: 200000,
    bonus: 40000,
    popular: false,
    category: "diamonds",
  },
  {
    id: "diamonds-500k",
    name: "500,000 Diamonds",
    description: "Mega diamond pack",
    priceInCents: 4999,
    diamonds: 500000,
    bonus: 125000,
    popular: false,
    category: "diamonds",
  },
  {
    id: "diamonds-1m",
    name: "1,000,000 Diamonds",
    description: "Ultimate diamond pack",
    priceInCents: 9999,
    diamonds: 1000000,
    bonus: 300000,
    popular: false,
    category: "diamonds",
  },
  // VIP Packages
  {
    id: "vip-7d",
    name: "VIP 7 Days",
    description: "VIP Badge, Priority Seat, Special Entry Effect",
    priceInCents: 499,
    diamonds: 5000,
    bonus: 0,
    popular: false,
    category: "vip",
  },
  {
    id: "vip-30d",
    name: "VIP 30 Days",
    description: "VIP Badge, Priority Seat, Entry Effect, Anti-Kick",
    priceInCents: 1499,
    diamonds: 15000,
    bonus: 0,
    popular: true,
    category: "vip",
  },
  // SVIP Packages
  {
    id: "svip-7d",
    name: "SVIP 7 Days",
    description: "SVIP Badge, Priority Seat, Premium Entry, Anti-Kick, Room Lock",
    priceInCents: 1999,
    diamonds: 20000,
    bonus: 0,
    popular: false,
    category: "svip",
  },
  {
    id: "svip-30d",
    name: "SVIP 30 Days",
    description: "SVIP Badge, Priority Seat, Premium Entry, Anti-Kick, Room Lock, Custom Frame",
    priceInCents: 5999,
    diamonds: 60000,
    bonus: 0,
    popular: true,
    category: "svip",
  },
  // Special Offers
  {
    id: "offer-starter",
    name: "Starter Pack",
    description: "80% OFF - Perfect for new users - 99,900 Diamonds",
    priceInCents: 999,
    diamonds: 99900,
    bonus: 20000,
    popular: false,
    category: "offer",
  },
  {
    id: "offer-mega",
    name: "Diamond Bundle",
    description: "50% OFF - Best value - 499,900 Diamonds",
    priceInCents: 4999,
    diamonds: 499900,
    bonus: 100000,
    popular: true,
    category: "offer",
  },
]

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id)
}

export function getDiamondProducts() {
  return PRODUCTS.filter((p) => p.category === "diamonds")
}

export function getVipProducts() {
  return PRODUCTS.filter((p) => p.category === "vip" || p.category === "svip")
}

export function getOfferProducts() {
  return PRODUCTS.filter((p) => p.category === "offer")
}

export function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`
}
