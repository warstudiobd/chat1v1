"use client"

import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"
import type { User as AuthUser } from "@supabase/supabase-js"

// ---------- Types ----------
export interface Profile {
  id: string
  display_name: string | null
  avatar_url: string | null
  phone: string | null
  country: string | null
  bio: string | null
  diamonds: number
  beans: number
  level: number
  role: string
  is_vip: boolean
  is_svip: boolean
  vip_expires_at: string | null
  svip_expires_at: string | null
  anti_kick: boolean
  is_online: boolean
  last_seen: string | null
  created_at: string
}

export interface ChatMessage {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  message_type: string
  is_read: boolean
  created_at: string
  sender?: Profile
  receiver?: Profile
}

export interface Friendship {
  id: string
  user_id: string
  friend_id: string
  status: string
  created_at: string
  friend?: Profile
}

export interface VoiceRoomRow {
  id: string
  name: string
  description: string | null
  host_id: string
  category: string
  is_active: boolean
  is_locked: boolean
  password_hash: string | null
  max_seats: number
  viewer_count: number
  tags: string[]
  anti_kick_enabled: boolean
  created_at: string
  host?: Profile
}

// ---------- Auth Hook ----------
export function useAuth() {
  const supabase = createClient()
  return useSWR("auth-user", async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  }, { revalidateOnFocus: true, dedupingInterval: 5000 })
}

// ---------- Profile Hooks ----------
export function useProfile(userId?: string) {
  const supabase = createClient()
  return useSWR(
    userId ? `profile-${userId}` : null,
    async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId!)
        .single()
      if (error) throw error
      return data as Profile
    },
    { revalidateOnFocus: false, dedupingInterval: 10000 }
  )
}

export function useMyProfile() {
  const { data: user } = useAuth()
  return useProfile(user?.id)
}

export function useDiscoverUsers(filter: string, searchQuery: string) {
  const supabase = createClient()
  const { data: user } = useAuth()
  return useSWR(
    user ? `discover-${filter}-${searchQuery}` : null,
    async () => {
      let query = supabase
        .from("profiles")
        .select("*")
        .neq("id", user!.id)
        .order("created_at", { ascending: false })
        .limit(50)

      if (searchQuery) {
        query = query.ilike("display_name", `%${searchQuery}%`)
      }
      if (filter === "online") {
        query = query.eq("is_online", true)
      }
      if (filter === "vip") {
        query = query.or("is_vip.eq.true,is_svip.eq.true")
      }

      const { data, error } = await query
      if (error) throw error
      return (data ?? []) as Profile[]
    },
    { revalidateOnFocus: true, dedupingInterval: 5000 }
  )
}

// ---------- Chat Hooks ----------
export function useConversations() {
  const supabase = createClient()
  const { data: user } = useAuth()
  return useSWR(
    user ? `conversations-${user.id}` : null,
    async () => {
      // Get all messages involving the current user, grouped by conversation partner
      const { data: sent, error: e1 } = await supabase
        .from("messages")
        .select("*, receiver:profiles!messages_receiver_id_fkey(*)")
        .eq("sender_id", user!.id)
        .order("created_at", { ascending: false })

      const { data: received, error: e2 } = await supabase
        .from("messages")
        .select("*, sender:profiles!messages_sender_id_fkey(*)")
        .eq("receiver_id", user!.id)
        .order("created_at", { ascending: false })

      if (e1) throw e1
      if (e2) throw e2

      // Merge and group by partner
      const allMessages = [
        ...(sent ?? []).map((m: any) => ({ ...m, partnerId: m.receiver_id, partner: m.receiver })),
        ...(received ?? []).map((m: any) => ({ ...m, partnerId: m.sender_id, partner: m.sender })),
      ]

      const grouped = new Map<string, { partner: Profile; messages: any[]; lastMessage: any; unread: number }>()

      for (const msg of allMessages) {
        const pid = msg.partnerId
        if (!grouped.has(pid)) {
          grouped.set(pid, { partner: msg.partner, messages: [], lastMessage: msg, unread: 0 })
        }
        const entry = grouped.get(pid)!
        entry.messages.push(msg)
        if (!msg.is_read && msg.receiver_id === user!.id) {
          entry.unread++
        }
        if (new Date(msg.created_at) > new Date(entry.lastMessage.created_at)) {
          entry.lastMessage = msg
        }
      }

      return Array.from(grouped.values())
        .sort((a, b) => new Date(b.lastMessage.created_at).getTime() - new Date(a.lastMessage.created_at).getTime())
    },
    { revalidateOnFocus: true, refreshInterval: 3000 }
  )
}

export function useChatMessages(partnerId?: string) {
  const supabase = createClient()
  const { data: user } = useAuth()
  return useSWR(
    user && partnerId ? `chat-${user.id}-${partnerId}` : null,
    async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(`and(sender_id.eq.${user!.id},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${user!.id})`)
        .order("created_at", { ascending: true })

      if (error) throw error
      return (data ?? []) as ChatMessage[]
    },
    { revalidateOnFocus: true, refreshInterval: 2000 }
  )
}

// ---------- Actions ----------
export async function sendMessage(receiverId: string, content: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { data, error } = await supabase
    .from("messages")
    .insert({ sender_id: user.id, receiver_id: receiverId, content, message_type: "text" })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function markMessagesRead(senderId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("sender_id", senderId)
    .eq("receiver_id", user.id)
    .eq("is_read", false)
}

export async function updateProfile(updates: Partial<Profile>) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function setOnlineStatus(online: boolean) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase
    .from("profiles")
    .update({ is_online: online, last_seen: new Date().toISOString() })
    .eq("id", user.id)
}

export async function followUser(targetId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { error } = await supabase
    .from("user_follows")
    .insert({ follower_id: user.id, following_id: targetId })

  if (error && error.code !== "23505") throw error // ignore duplicate
}

export async function unfollowUser(targetId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  await supabase
    .from("user_follows")
    .delete()
    .eq("follower_id", user.id)
    .eq("following_id", targetId)
}

// ---------- Voice Room Hooks ----------
export function useVoiceRooms(category?: string) {
  const supabase = createClient()
  return useSWR(
    `voice-rooms-${category ?? "all"}`,
    async () => {
      let query = supabase
        .from("voice_rooms")
        .select("*, host:profiles!voice_rooms_host_id_fkey(*)")
        .eq("is_active", true)
        .order("viewer_count", { ascending: false })
        .limit(50)

      if (category && category !== "all") {
        query = query.eq("category", category)
      }

      const { data, error } = await query
      if (error) throw error
      return (data ?? []) as VoiceRoomRow[]
    },
    { revalidateOnFocus: true, refreshInterval: 10000 }
  )
}

export async function createVoiceRoom(name: string, category: string, description?: string, maxSeats?: number) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { data, error } = await supabase
    .from("voice_rooms")
    .insert({
      name,
      host_id: user.id,
      category,
      description: description ?? "",
      max_seats: maxSeats ?? 8,
      tags: [category],
    })
    .select("*, host:profiles!voice_rooms_host_id_fkey(*)")
    .single()

  if (error) throw error
  return data as VoiceRoomRow
}

// ---------- Follow Counts ----------
export function useFollowCounts(userId?: string) {
  const supabase = createClient()
  return useSWR(
    userId ? `follow-counts-${userId}` : null,
    async () => {
      const [{ count: followers }, { count: following }] = await Promise.all([
        supabase.from("user_follows").select("*", { count: "exact", head: true }).eq("following_id", userId!),
        supabase.from("user_follows").select("*", { count: "exact", head: true }).eq("follower_id", userId!),
      ])
      return { followers: followers ?? 0, following: following ?? 0 }
    },
    { revalidateOnFocus: false, dedupingInterval: 10000 }
  )
}

// ---------- Gift Sending ----------
export async function sendGift(receiverId: string, giftType: string, diamondAmount: number, roomId?: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  // Check balance
  const { data: profile } = await supabase.from("profiles").select("diamonds").eq("id", user.id).single()
  if (!profile || profile.diamonds < diamondAmount) throw new Error("Insufficient diamonds")

  // Deduct diamonds and record gift
  const [, , giftResult] = await Promise.all([
    supabase.from("profiles").update({ diamonds: profile.diamonds - diamondAmount }).eq("id", user.id),
    supabase.from("profiles").update({ beans: supabase.rpc ? diamondAmount : 0 }).eq("id", receiverId),
    supabase.from("gifts_sent").insert({
      sender_id: user.id,
      receiver_id: receiverId,
      gift_type: giftType,
      diamond_amount: diamondAmount,
      room_id: roomId ?? null,
    }).select().single(),
  ])

  return giftResult.data
}

// ---------- Helpers ----------
export function getAvatarGradient(name: string): string {
  const gradients = [
    "bg-gradient-to-br from-pink-500 to-purple-600",
    "bg-gradient-to-br from-cyan-500 to-blue-600",
    "bg-gradient-to-br from-orange-500 to-red-600",
    "bg-gradient-to-br from-green-500 to-teal-600",
    "bg-gradient-to-br from-indigo-500 to-violet-600",
    "bg-gradient-to-br from-yellow-500 to-orange-600",
    "bg-gradient-to-br from-rose-500 to-pink-600",
    "bg-gradient-to-br from-emerald-500 to-cyan-600",
  ]
  const hash = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return gradients[hash % gradients.length]
}

export function timeAgo(dateStr: string): string {
  const now = Date.now()
  const diff = now - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "now"
  if (mins < 60) return `${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h`
  const days = Math.floor(hrs / 24)
  return `${days}d`
}
