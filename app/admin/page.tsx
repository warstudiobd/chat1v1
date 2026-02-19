"use client"

import { useState, useEffect, useMemo } from "react"
import {
  Users, Diamond, Ban, Award, Calendar, Megaphone, Mic2,
  Search, Plus, Edit3, Trash2, Check, X, Shield, BarChart3,
  Eye, EyeOff, Coins, Crown, LogOut, Loader2, RefreshCw, Lock,
} from "lucide-react"
import useSWR, { mutate } from "swr"

// ===================== LOGIN GATE =====================

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true); setError("")
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json()
    if (data.success) { onLogin() } else { setError("Invalid credentials") }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0A0A0F]">
      <div className="w-full max-w-[380px] mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <p className="text-xs text-[#8888AA] mt-1">LotChat Control Panel</p>
        </div>
        <div className="flex flex-col gap-3">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
            className="w-full py-3 px-4 rounded-2xl text-sm text-white placeholder-[#8888AA] bg-transparent outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} autoFocus />
          <div className="relative">
            <input type={showPw ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 px-4 pr-12 rounded-2xl text-sm text-white placeholder-[#8888AA] bg-transparent outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
            <button onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2">
              {showPw ? <EyeOff className="w-4 h-4 text-[#8888AA]" /> : <Eye className="w-4 h-4 text-[#8888AA]" />}
            </button>
          </div>
          {error && <p className="text-xs text-[#EF4444] text-center">{error}</p>}
          <button onClick={handleLogin} disabled={loading || !username || !password}
            className="w-full py-3.5 rounded-2xl text-sm font-bold text-white disabled:opacity-40"
            style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  )
}

// ===================== DATA FETCHERS =====================
const fetcher = (url: string) => fetch(url).then(r => r.json())

function useAdminStats() { return useSWR("/api/admin/stats", fetcher, { refreshInterval: 15000 }) }
function useAdminUsers() { return useSWR("/api/admin/users", fetcher, { refreshInterval: 10000 }) }
function useAdminRooms() { return useSWR("/api/admin/rooms", fetcher, { refreshInterval: 10000 }) }

// ===================== HELPER =====================
function formatNumber(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M"
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K"
  return n.toString()
}

// ===================== SECTIONS =====================

type AdminSection = "dashboard" | "users" | "coins" | "bans" | "vipManage" | "rooms"

function DashboardSection() {
  const { data: stats, isLoading } = useAdminStats()
  if (isLoading || !stats) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 text-[#FF2D78] animate-spin" /></div>
  const cards = [
    { label: "Total Users", value: stats.totalUsers, color: "#8B5CF6", icon: Users },
    { label: "Online Now", value: stats.onlineUsers, color: "#10B981", icon: Eye },
    { label: "VIP Members", value: stats.vipUsers, color: "#FFD700", icon: Shield },
    { label: "SVIP Members", value: stats.svipUsers, color: "#FF2D78", icon: Crown },
    { label: "Active Rooms", value: stats.activeRooms, color: "#06B6D4", icon: Mic2 },
    { label: "Total Messages", value: formatNumber(stats.totalMessages), color: "#F59E0B", icon: Megaphone },
    { label: "Total Diamonds", value: formatNumber(stats.totalDiamonds), color: "#FFD700", icon: Diamond },
    { label: "Total Beans", value: formatNumber(stats.totalBeans), color: "#10B981", icon: Coins },
  ]
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2 mb-2">
              <c.icon className="w-4 h-4" style={{ color: c.color }} />
              <span className="text-xs text-[#8888AA]">{c.label}</span>
            </div>
            <span className="text-2xl font-bold text-white">{c.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function UsersSection() {
  const { data: users, isLoading } = useAdminUsers()
  const [search, setSearch] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [saving, setSaving] = useState(false)

  const filtered = useMemo(() => {
    if (!users || !Array.isArray(users)) return []
    if (!search) return users
    return users.filter((u: any) => (u.display_name ?? "").toLowerCase().includes(search.toLowerCase()) || u.id.includes(search))
  }, [users, search])

  const handleSaveName = async (userId: string) => {
    setSaving(true)
    await fetch("/api/admin/users", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId, updates: { display_name: editName } }) })
    mutate("/api/admin/users")
    setEditingId(null); setSaving(false)
  }

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 text-[#FF2D78] animate-spin" /></div>

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">User Management</h2>
      <div className="flex items-center gap-2 mb-4 px-3 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <Search className="w-4 h-4 text-[#8888AA]" />
        <input type="text" placeholder="Search by name or ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-transparent text-sm text-white placeholder-[#8888AA] outline-none" />
      </div>
      <div className="flex flex-col gap-1.5 max-h-[60vh] overflow-y-auto">
        {filtered.map((user: any) => (
          <div key={user.id} className="flex items-center gap-3 px-3 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
              {(user.display_name ?? "U").charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              {editingId === user.id ? (
                <div className="flex items-center gap-2">
                  <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="bg-transparent text-sm text-white outline-none border-b border-[#FF2D78] pb-0.5" autoFocus />
                  <button onClick={() => handleSaveName(user.id)} disabled={saving} className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center"><Check className="w-3 h-3 text-white" /></button>
                  <button onClick={() => setEditingId(null)} className="w-6 h-6 rounded-full bg-[#EF4444] flex items-center justify-center"><X className="w-3 h-3 text-white" /></button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">{user.display_name ?? "No Name"}</span>
                  {user.is_svip && <span className="px-1 py-0 rounded text-[7px] font-black text-white" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>SVIP</span>}
                  {user.is_vip && !user.is_svip && <span className="px-1 py-0 rounded text-[7px] font-black text-white" style={{ background: "linear-gradient(135deg, #FFD700, #FF6B35)" }}>VIP</span>}
                  {user.is_online && <span className="w-2 h-2 rounded-full bg-[#10B981]" />}
                </div>
              )}
              <span className="text-[10px] text-[#8888AA] block">Lv.{user.level} | D: {formatNumber(user.diamonds)} | ID: {user.id.substring(0, 8)}</span>
            </div>
            <button onClick={() => { setEditingId(user.id); setEditName(user.display_name ?? "") }} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(139,92,246,0.15)" }}>
              <Edit3 className="w-3 h-3 text-[#8B5CF6]" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function CoinsSection() {
  const { data: users } = useAdminUsers()
  const [search, setSearch] = useState("")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [amount, setAmount] = useState("")
  const [coinType, setCoinType] = useState<"diamonds" | "beans">("diamonds")
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState("")

  const filtered = useMemo(() => {
    if (!users || !Array.isArray(users) || !search) return []
    return users.filter((u: any) => (u.display_name ?? "").toLowerCase().includes(search.toLowerCase()) || u.id.includes(search)).slice(0, 10)
  }, [users, search])

  const handleAddCoins = async () => {
    if (!selectedUser || !amount) return
    setSaving(true); setSuccess("")
    const numAmount = parseInt(amount)
    const current = coinType === "diamonds" ? selectedUser.diamonds : selectedUser.beans
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: selectedUser.id, updates: { [coinType]: current + numAmount } }),
    })
    mutate("/api/admin/users")
    setSuccess(`Added ${formatNumber(numAmount)} ${coinType} to ${selectedUser.display_name ?? "User"}`)
    setSaving(false); setAmount(""); setSelectedUser(null); setSearch("")
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Add Coins Manually</h2>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setCoinType("diamonds")} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: coinType === "diamonds" ? "linear-gradient(135deg, #FF2D78, #8B5CF6)" : "rgba(255,255,255,0.05)", color: coinType === "diamonds" ? "#fff" : "#8888AA" }}>
          <Diamond className="w-4 h-4" /> Diamonds
        </button>
        <button onClick={() => setCoinType("beans")} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: coinType === "beans" ? "linear-gradient(135deg, #10B981, #06B6D4)" : "rgba(255,255,255,0.05)", color: coinType === "beans" ? "#fff" : "#8888AA" }}>
          <Coins className="w-4 h-4" /> Beans
        </button>
      </div>

      <div className="mb-3 px-3 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <input type="text" placeholder="Search user..." value={search} onChange={(e) => { setSearch(e.target.value); setSelectedUser(null) }} className="w-full bg-transparent text-sm text-white placeholder-[#8888AA] outline-none" />
      </div>

      {search && !selectedUser && filtered.length > 0 && (
        <div className="mb-3 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
          {filtered.map((u: any) => (
            <button key={u.id} onClick={() => { setSelectedUser(u); setSearch(u.display_name ?? u.id) }}
              className="flex items-center gap-2 w-full px-3 py-2.5 text-left hover:bg-[rgba(255,255,255,0.05)]">
              <span className="text-sm text-white">{u.display_name ?? "No Name"}</span>
              <span className="text-[10px] text-[#8888AA]">D: {formatNumber(u.diamonds)}</span>
            </button>
          ))}
        </div>
      )}

      {selectedUser && (
        <div className="mb-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <span className="text-sm text-white font-semibold">{selectedUser.display_name ?? "No Name"}</span>
          <span className="text-[10px] text-[#8888AA] block">Current {coinType}: {formatNumber(coinType === "diamonds" ? selectedUser.diamonds : selectedUser.beans)}</span>
        </div>
      )}

      <input type="number" placeholder="Amount to add..." value={amount} onChange={(e) => setAmount(e.target.value)}
        className="w-full mb-3 py-3 px-4 rounded-xl text-sm text-white placeholder-[#8888AA] bg-transparent outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />

      <button onClick={handleAddCoins} disabled={!selectedUser || !amount || saving}
        className="w-full py-3 rounded-xl text-sm font-bold text-white disabled:opacity-40"
        style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>
        {saving ? "Adding..." : `Add ${coinType === "diamonds" ? "Diamonds" : "Beans"}`}
      </button>

      {success && <p className="text-xs text-[#10B981] text-center mt-3">{success}</p>}
    </div>
  )
}

function BanSection() {
  const { data: users } = useAdminUsers()
  const [search, setSearch] = useState("")
  const [saving, setSaving] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (!users || !Array.isArray(users)) return []
    if (!search) return users
    return users.filter((u: any) => (u.display_name ?? "").toLowerCase().includes(search.toLowerCase()) || u.id.includes(search))
  }, [users, search])

  const handleToggleBan = async (user: any) => {
    setSaving(user.id)
    const currentRole = user.role
    const newRole = currentRole === "banned" ? "user" : "banned"
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, updates: { role: newRole } }),
    })
    mutate("/api/admin/users")
    setSaving(null)
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Ban / Unban Users</h2>
      <div className="flex items-center gap-2 mb-4 px-3 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <Search className="w-4 h-4 text-[#8888AA]" />
        <input type="text" placeholder="Search user..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-transparent text-sm text-white placeholder-[#8888AA] outline-none" />
      </div>
      <div className="flex flex-col gap-1.5 max-h-[60vh] overflow-y-auto">
        {filtered.map((user: any) => {
          const isBanned = user.role === "banned"
          return (
            <div key={user.id} className="flex items-center gap-3 px-3 py-3 rounded-xl" style={{ background: isBanned ? "rgba(239,68,68,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${isBanned ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.06)"}` }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">{user.display_name ?? "No Name"}</span>
                  {isBanned && <span className="px-1.5 py-0.5 rounded text-[8px] font-bold text-white bg-[#EF4444]">BANNED</span>}
                </div>
                <span className="text-[10px] text-[#8888AA]">ID: {user.id.substring(0, 8)}</span>
              </div>
              <button onClick={() => handleToggleBan(user)} disabled={saving === user.id}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white disabled:opacity-50"
                style={{ background: isBanned ? "#10B981" : "#EF4444" }}>
                {saving === user.id ? "..." : isBanned ? "Unban" : "Ban"}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function VipManageSection() {
  const { data: users } = useAdminUsers()
  const [search, setSearch] = useState("")
  const [saving, setSaving] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (!users || !Array.isArray(users)) return []
    if (!search) return users
    return users.filter((u: any) => (u.display_name ?? "").toLowerCase().includes(search.toLowerCase()) || u.id.includes(search))
  }, [users, search])

  const handleSetVip = async (userId: string, type: "vip" | "svip" | "none") => {
    setSaving(userId)
    const updates = type === "vip" ? { is_vip: true, is_svip: false } : type === "svip" ? { is_vip: false, is_svip: true } : { is_vip: false, is_svip: false }
    await fetch("/api/admin/users", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId, updates }) })
    mutate("/api/admin/users")
    setSaving(null)
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">VIP / SVIP Management</h2>
      <div className="flex items-center gap-2 mb-4 px-3 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <Search className="w-4 h-4 text-[#8888AA]" />
        <input type="text" placeholder="Search user..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-transparent text-sm text-white placeholder-[#8888AA] outline-none" />
      </div>
      <div className="flex flex-col gap-1.5 max-h-[60vh] overflow-y-auto">
        {filtered.map((user: any) => (
          <div key={user.id} className="flex items-center gap-3 px-3 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">{user.display_name ?? "No Name"}</span>
                {user.is_svip && <span className="px-1.5 py-0.5 rounded text-[7px] font-black text-white" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>SVIP</span>}
                {user.is_vip && !user.is_svip && <span className="px-1.5 py-0.5 rounded text-[7px] font-black text-white" style={{ background: "linear-gradient(135deg, #FFD700, #FF6B35)" }}>VIP</span>}
              </div>
              <span className="text-[10px] text-[#8888AA]">Lv.{user.level}</span>
            </div>
            <div className="flex gap-1">
              <button onClick={() => handleSetVip(user.id, "vip")} disabled={saving === user.id}
                className="px-2 py-1 rounded-lg text-[10px] font-bold text-white disabled:opacity-50" style={{ background: user.is_vip && !user.is_svip ? "#FFD700" : "rgba(255,215,0,0.15)" }}>VIP</button>
              <button onClick={() => handleSetVip(user.id, "svip")} disabled={saving === user.id}
                className="px-2 py-1 rounded-lg text-[10px] font-bold text-white disabled:opacity-50" style={{ background: user.is_svip ? "#FF2D78" : "rgba(255,45,120,0.15)" }}>SVIP</button>
              <button onClick={() => handleSetVip(user.id, "none")} disabled={saving === user.id}
                className="px-2 py-1 rounded-lg text-[10px] font-bold text-[#8888AA] disabled:opacity-50" style={{ background: "rgba(255,255,255,0.05)" }}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RoomsSection() {
  const { data: rooms, isLoading } = useAdminRooms()
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDelete = async (roomId: string) => {
    setDeleting(roomId)
    await fetch("/api/admin/rooms", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ roomId }) })
    mutate("/api/admin/rooms")
    setDeleting(null)
  }

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 text-[#FF2D78] animate-spin" /></div>

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Voice Rooms</h2>
      {(!rooms || !Array.isArray(rooms) || rooms.length === 0) ? (
        <p className="text-sm text-[#8888AA] text-center py-10">No voice rooms found</p>
      ) : (
        <div className="flex flex-col gap-1.5 max-h-[60vh] overflow-y-auto">
          {rooms.map((room: any) => (
            <div key={room.id} className="flex items-center gap-3 px-3 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-white block">{room.name}</span>
                <span className="text-[10px] text-[#8888AA]">Host: {room.host?.display_name ?? "Unknown"} | Category: {room.category} | Viewers: {room.viewer_count}</span>
              </div>
              <button onClick={() => handleDelete(room.id)} disabled={deleting === room.id}
                className="w-7 h-7 rounded-lg flex items-center justify-center disabled:opacity-50" style={{ background: "rgba(239,68,68,0.15)" }}>
                {deleting === room.id ? <Loader2 className="w-3 h-3 text-[#EF4444] animate-spin" /> : <Trash2 className="w-3 h-3 text-[#EF4444]" />}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ===================== SIDEBAR =====================

const sidebarItems = [
  { id: "dashboard" as AdminSection, label: "Dashboard", icon: BarChart3, color: "#3B82F6" },
  { id: "users" as AdminSection, label: "Users", icon: Users, color: "#8B5CF6" },
  { id: "vipManage" as AdminSection, label: "VIP / SVIP", icon: Crown, color: "#FFD700" },
  { id: "coins" as AdminSection, label: "Add Coins", icon: Diamond, color: "#FFD700" },
  { id: "bans" as AdminSection, label: "Ban / Unban", icon: Ban, color: "#EF4444" },
  { id: "rooms" as AdminSection, label: "Voice Rooms", icon: Mic2, color: "#06B6D4" },
]

// ===================== MAIN =====================

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false)
  const [section, setSection] = useState<AdminSection>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Check if already authenticated
  useEffect(() => {
    fetch("/api/admin/stats").then(r => { if (r.ok) setAuthenticated(true) })
  }, [])

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />
  }

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" })
    setAuthenticated(false)
  }

  return (
    <div className="flex h-screen bg-[#0A0A0F]">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-56" : "w-16"} flex-shrink-0 flex flex-col border-r border-[rgba(255,255,255,0.06)] transition-all duration-200`}>
        <div className="flex items-center gap-2 px-4 py-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>
            <span className="text-white font-bold text-sm">A</span>
          </div>
          {sidebarOpen && <span className="text-sm font-bold text-white">Admin Panel</span>}
        </div>

        <nav className="flex-1 px-2 py-2">
          {sidebarItems.map((item) => (
            <button key={item.id} onClick={() => setSection(item.id)}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl mb-0.5 text-sm transition-colors ${section === item.id ? "text-white" : "text-[#8888AA]"}`}
              style={section === item.id ? { background: "rgba(255,45,120,0.12)" } : {}}>
              <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: section === item.id ? item.color : "#8888AA" }} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="px-2 py-3 border-t border-[rgba(255,255,255,0.06)]">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-[#EF4444] hover:bg-[rgba(239,68,68,0.08)]">
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          {section === "dashboard" && <DashboardSection />}
          {section === "users" && <UsersSection />}
          {section === "vipManage" && <VipManageSection />}
          {section === "coins" && <CoinsSection />}
          {section === "bans" && <BanSection />}
          {section === "rooms" && <RoomsSection />}
        </div>
      </main>
    </div>
  )
}
