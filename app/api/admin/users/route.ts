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
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Map vip_expiry/svip_expiry to is_vip/is_svip for the frontend
  const now = new Date().toISOString()
  const mapped = (data ?? []).map(u => ({
    ...u,
    is_vip: !!(u.vip_expiry && u.vip_expiry > now),
    is_svip: !!(u.svip_expiry && u.svip_expiry > now),
  }))

  return NextResponse.json(mapped)
}

export async function PATCH(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { userId, updates } = await request.json()
  const supabase = getSupabaseAdmin()

  // Convert is_vip/is_svip back to expiry dates
  const dbUpdates: Record<string, any> = { ...updates }
  if ("is_vip" in dbUpdates) {
    dbUpdates.vip_expiry = dbUpdates.is_vip ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : null
    delete dbUpdates.is_vip
  }
  if ("is_svip" in dbUpdates) {
    dbUpdates.svip_expiry = dbUpdates.is_svip ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : null
    delete dbUpdates.is_svip
  }

  const { data, error } = await supabase
    .from("profiles")
    .update(dbUpdates)
    .eq("id", userId)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
