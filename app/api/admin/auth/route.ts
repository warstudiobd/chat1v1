import { NextResponse } from "next/server"

const ADMIN_USERNAME = "wares"
const ADMIN_PASSWORD = "Bdritu1@"

export async function POST(request: Request) {
  const { username, password } = await request.json()
  
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = Buffer.from(`${ADMIN_USERNAME}:${Date.now()}`).toString("base64")
    const response = NextResponse.json({ success: true })
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    })
    return response
  }

  return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete("admin_token")
  return response
}
