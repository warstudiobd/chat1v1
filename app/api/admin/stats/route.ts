import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@supabase/supabase-js"

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
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

  const [users, online, vip, svip, rooms, messages] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("is_online", true),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("is_vip", true),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("is_svip", true),
    supabase.from("voice_rooms").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("messages").select("*", { count: "exact", head: true }),
  ])

  const { data: diamondsData } = await supabase.from("profiles").select("diamonds, beans")
  const totalDiamonds = diamondsData?.reduce((sum, u) => sum + (u.diamonds ?? 0), 0) ?? 0
  const totalBeans = diamondsData?.reduce((sum, u) => sum + (u.beans ?? 0), 0) ?? 0

  return NextResponse.json({
    totalUsers: users.count ?? 0,
    onlineUsers: online.count ?? 0,
    vipUsers: vip.count ?? 0,
    svipUsers: svip.count ?? 0,
    activeRooms: rooms.count ?? 0,
    totalMessages: messages.count ?? 0,
    totalDiamonds,
    totalBeans,
  })
}
