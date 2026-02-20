import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@supabase/supabase-js"

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
  return createClient(url, key)
}

async function isAdmin() {
  const cookieStore = await cookies()
  return cookieStore.has("admin_token")
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const supabase = getSupabaseAdmin()

  const [users, online, rooms, messages] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("is_online", true),
    supabase.from("voice_rooms").select("*", { count: "exact", head: true }).eq("is_live", true),
    supabase.from("messages").select("*", { count: "exact", head: true }),
  ])

  const { data: diamondsData } = await supabase.from("profiles").select("diamonds, beans, vip_expiry, svip_expiry")
  const now = new Date().toISOString()
  const totalDiamonds = diamondsData?.reduce((sum, u) => sum + (u.diamonds ?? 0), 0) ?? 0
  const totalBeans = diamondsData?.reduce((sum, u) => sum + (u.beans ?? 0), 0) ?? 0
  const vipCount = diamondsData?.filter(u => u.vip_expiry && u.vip_expiry > now).length ?? 0
  const svipCount = diamondsData?.filter(u => u.svip_expiry && u.svip_expiry > now).length ?? 0

  return NextResponse.json({
    totalUsers: users.count ?? 0,
    onlineUsers: online.count ?? 0,
    vipUsers: vipCount,
    svipUsers: svipCount,
    activeRooms: rooms.count ?? 0,
    totalMessages: messages.count ?? 0,
    totalDiamonds,
    totalBeans,
  })
}
