"use client"

import { useState, useMemo } from "react"
import {
  Users, Diamond, Ban, Gift, Award, Gamepad2, Calendar, Megaphone, Tag, Mic2,
  Search, ChevronDown, Plus, Edit3, Trash2, Check, X, Shield, BarChart3,
  ArrowLeft, Eye, EyeOff, Coins, RefreshCw, Crown,
} from "lucide-react"
import {
  mockUsers, mockGifts, mockBadges, mockGames, mockEvents, mockAnnouncements,
  mockOffers, mockVoiceRooms, formatNumber,
  type User, type Gift as GiftType, type Badge, type GameItem, type EventItem,
  type Announcement, type Offer, type VoiceRoom, type GiftEffect,
} from "@/lib/mock-data"

// =============================================================================
// ADMIN PANEL STATE TYPES
// =============================================================================

type AdminSection =
  | "dashboard"
  | "users"
  | "vipManage"
  | "coins"
  | "bans"
  | "rewards"
  | "gifts"
  | "badges"
  | "events"
  | "games"
  | "announcements"
  | "offers"
  | "voiceRooms"

interface AdminSidebarItem {
  id: AdminSection
  label: string
  icon: React.ElementType
  color: string
}

const sidebarItems: AdminSidebarItem[] = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3, color: "#3B82F6" },
  { id: "users", label: "Users", icon: Users, color: "#8B5CF6" },
  { id: "vipManage", label: "VIP / SVIP", icon: Crown, color: "#FFD700" },
  { id: "coins", label: "Add Coins", icon: Diamond, color: "#FFD700" },
  { id: "bans", label: "Ban / Unban", icon: Ban, color: "#EF4444" },
  { id: "rewards", label: "Rewards", icon: Award, color: "#10B981" },
  { id: "gifts", label: "Gifts", icon: Gift, color: "#FF2D78" },
  { id: "badges", label: "Badges", icon: Shield, color: "#06B6D4" },
  { id: "events", label: "Events", icon: Calendar, color: "#8B5CF6" },
  { id: "games", label: "Games", icon: Gamepad2, color: "#F59E0B" },
  { id: "announcements", label: "Announcements", icon: Megaphone, color: "#FF6B35" },
  { id: "offers", label: "Offers", icon: Tag, color: "#FF2D78" },
  { id: "voiceRooms", label: "Voice Rooms", icon: Mic2, color: "#06B6D4" },
]

// =============================================================================
// DASHBOARD
// =============================================================================

function DashboardSection({ users }: { users: User[] }) {
  const stats = useMemo(() => ({
    totalUsers: users.length,
    onlineUsers: users.filter((u) => u.isOnline).length,
    bannedUsers: users.filter((u) => u.isBanned).length,
    totalDiamonds: users.reduce((sum, u) => sum + u.diamonds, 0),
    totalBeans: users.reduce((sum, u) => sum + u.beans, 0),
    vipUsers: users.filter((u) => u.role === "vip").length,
    svipUsers: users.filter((u) => u.role === "svip").length,
    hosts: users.filter((u) => u.role === "host").length,
  }), [users])

  const cards = [
    { label: "Total Users", value: stats.totalUsers, color: "#8B5CF6", icon: Users },
    { label: "Online Now", value: stats.onlineUsers, color: "#10B981", icon: Eye },
    { label: "Banned", value: stats.bannedUsers, color: "#EF4444", icon: Ban },
    { label: "VIP Members", value: stats.vipUsers, color: "#FFD700", icon: Shield },
    { label: "SVIP Members", value: stats.svipUsers, color: "#FF2D78", icon: Shield },
    { label: "Hosts", value: stats.hosts, color: "#06B6D4", icon: Mic2 },
    { label: "Total Diamonds", value: formatNumber(stats.totalDiamonds), color: "#FFD700", icon: Diamond },
    { label: "Total Beans", value: formatNumber(stats.totalBeans), color: "#10B981", icon: Coins },
  ]

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="p-4 rounded-2xl glass">
            <div className="flex items-center gap-2 mb-2">
              <card.icon className="w-4 h-4" style={{ color: card.color }} />
              <span className="text-xs text-[#8888AA]">{card.label}</span>
            </div>
            <span className="text-2xl font-bold text-white">{card.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// USER MANAGEMENT
// =============================================================================

function UsersSection({ users, onUpdateUser }: { users: User[]; onUpdateUser: (id: string, data: Partial<User>) => void }) {
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.id.includes(search)
    const matchRole = roleFilter === "all" || u.role === roleFilter
    return matchSearch && matchRole
  })

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">User Management</h2>

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <div className="flex-1 min-w-[200px] flex items-center gap-2 px-3 py-2 rounded-xl glass">
          <Search className="w-4 h-4 text-[#8888AA]" />
          <input
            type="text" placeholder="Search by name or ID..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-[#8888AA] outline-none"
          />
        </div>
        <select
          value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
          className="px-3 py-2 rounded-xl glass text-sm text-white bg-transparent outline-none"
        >
          <option value="all" className="bg-[#12121A]">All Roles</option>
          <option value="user" className="bg-[#12121A]">User</option>
          <option value="host" className="bg-[#12121A]">Host</option>
          <option value="vip" className="bg-[#12121A]">VIP</option>
          <option value="svip" className="bg-[#12121A]">SVIP</option>
          <option value="moderator" className="bg-[#12121A]">Moderator</option>
          <option value="admin" className="bg-[#12121A]">Admin</option>
        </select>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto rounded-2xl glass">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.06)]">
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-[#8888AA] font-semibold">User</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-[#8888AA] font-semibold">Role</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-[#8888AA] font-semibold">Level</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-[#8888AA] font-semibold">Diamonds</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-[#8888AA] font-semibold">Status</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-[#8888AA] font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id} className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full ${user.gradientClass} flex items-center justify-center text-xs font-bold text-white`}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-white">{user.name}</span>
                      <span className="block text-[10px] text-[#8888AA]">ID: {user.id}</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${
                    user.role === "svip" ? "bg-[rgba(255,45,120,0.2)] text-[#FF2D78]" :
                    user.role === "vip" ? "bg-[rgba(255,215,0,0.2)] text-[#FFD700]" :
                    user.role === "host" ? "bg-[rgba(139,92,246,0.2)] text-[#8B5CF6]" :
                    user.role === "moderator" ? "bg-[rgba(59,130,246,0.2)] text-[#3B82F6]" :
                    user.role === "admin" ? "bg-[rgba(239,68,68,0.2)] text-[#EF4444]" :
                    "bg-[rgba(255,255,255,0.1)] text-[#8888AA]"
                  }`}>
                    {user.role.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-white">{user.level}</td>
                <td className="px-4 py-3 text-xs text-[#FFD700]">{formatNumber(user.diamonds)}</td>
                <td className="px-4 py-3">
                  {user.isBanned ? (
                    <span className="px-2 py-0.5 rounded-full bg-[rgba(239,68,68,0.2)] text-[10px] font-bold text-[#EF4444]">BANNED</span>
                  ) : user.isOnline ? (
                    <span className="px-2 py-0.5 rounded-full bg-[rgba(16,185,129,0.2)] text-[10px] font-bold text-[#10B981]">ONLINE</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.1)] text-[10px] font-bold text-[#8888AA]">OFFLINE</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="px-3 py-1 rounded-lg text-[10px] font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #8B5CF6, #FF2D78)" }}
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} onUpdate={onUpdateUser} />
      )}
    </div>
  )
}

function UserDetailModal({ user, onClose, onUpdate }: { user: User; onClose: () => void; onUpdate: (id: string, data: Partial<User>) => void }) {
  const [role, setRole] = useState(user.role)
  const [level, setLevel] = useState(user.level.toString())
  const [selectedBadge, setSelectedBadge] = useState(user.badge?.id || "")

  const handleSave = () => {
    onUpdate(user.id, {
      role: role as User["role"],
      level: parseInt(level) || user.level,
      badge: mockBadges.find((b) => b.id === selectedBadge) || null,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)]">
      <div className="w-full max-w-[420px] mx-4 rounded-2xl glass-strong p-5 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white">Manage User</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-[#8888AA]" /></button>
        </div>

        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[rgba(255,255,255,0.06)]">
          <div className={`w-12 h-12 rounded-full ${user.gradientClass} flex items-center justify-center text-lg font-bold text-white`}>
            {user.name.charAt(0)}
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">{user.name}</h4>
            <span className="text-xs text-[#8888AA]">ID: {user.id} | {user.country}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#8888AA] font-semibold mb-1 block">Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value as User["role"])} className="w-full px-3 py-2 rounded-xl glass text-sm text-white bg-transparent outline-none">
              <option value="user" className="bg-[#12121A]">User</option>
              <option value="host" className="bg-[#12121A]">Host</option>
              <option value="vip" className="bg-[#12121A]">VIP</option>
              <option value="svip" className="bg-[#12121A]">SVIP</option>
              <option value="moderator" className="bg-[#12121A]">Moderator</option>
              <option value="admin" className="bg-[#12121A]">Admin</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#8888AA] font-semibold mb-1 block">Level</label>
            <input type="number" value={level} onChange={(e) => setLevel(e.target.value)} className="w-full px-3 py-2 rounded-xl glass text-sm text-white bg-transparent outline-none" />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#8888AA] font-semibold mb-1 block">Badge</label>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedBadge("")}
                className={`p-2 rounded-lg text-center text-[9px] ${!selectedBadge ? "ring-2 ring-[#FF2D78]" : ""} glass`}
              >
                <span className="text-white">None</span>
              </button>
              {mockBadges.map((badge) => (
                <button
                  key={badge.id}
                  onClick={() => setSelectedBadge(badge.id)}
                  className={`p-2 rounded-lg text-center ${selectedBadge === badge.id ? "ring-2 ring-[#FF2D78]" : ""}`}
                  style={{ background: badge.bgColor }}
                >
                  <span className="text-[10px] font-bold block" style={{ color: badge.color }}>{badge.icon}</span>
                  <span className="text-[8px] text-[#8888AA]">{badge.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl glass text-sm font-semibold text-[#8888AA]">Cancel</button>
          <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// VIP / SVIP MANAGEMENT
// =============================================================================

function VipManageSection({ users, onUpdateUser }: { users: User[]; onUpdateUser: (id: string, data: Partial<User>) => void }) {
  const [search, setSearch] = useState("")
  const [history, setHistory] = useState<{ userName: string; action: string; time: string }[]>([])

  const vipUsers = users.filter(u => u.role === "vip" || u.role === "svip")
  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.id.includes(search))

  const setVip = (user: User, newRole: "user" | "vip" | "svip") => {
    const expiry = new Date()
    expiry.setDate(expiry.getDate() + 30)
    const expiryStr = expiry.toISOString().split("T")[0]

    const updates: Partial<User> = { role: newRole, antiKick: newRole === "svip" || newRole === "vip" }
    if (newRole === "vip") updates.vipExpiry = expiryStr
    if (newRole === "svip") updates.svipExpiry = expiryStr
    if (newRole === "user") { updates.antiKick = false; updates.vipExpiry = undefined; updates.svipExpiry = undefined }

    onUpdateUser(user.id, updates)
    setHistory(prev => [{ userName: user.name, action: newRole === "user" ? "Removed VIP/SVIP" : `Set as ${newRole.toUpperCase()}`, time: new Date().toLocaleTimeString() }, ...prev])
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">VIP / SVIP Management</h2>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="p-4 rounded-2xl glass text-center">
          <Shield className="w-5 h-5 text-[#FFD700] mx-auto mb-1" />
          <span className="text-2xl font-bold text-white block">{vipUsers.filter(u => u.role === "vip").length}</span>
          <span className="text-[10px] text-[#8888AA]">VIP Members</span>
        </div>
        <div className="p-4 rounded-2xl glass text-center">
          <Crown className="w-5 h-5 text-[#FF2D78] mx-auto mb-1" />
          <span className="text-2xl font-bold text-white block">{vipUsers.filter(u => u.role === "svip").length}</span>
          <span className="text-[10px] text-[#8888AA]">SVIP Members</span>
        </div>
        <div className="p-4 rounded-2xl glass text-center">
          <Users className="w-5 h-5 text-[#8888AA] mx-auto mb-1" />
          <span className="text-2xl font-bold text-white block">{users.filter(u => u.role === "user").length}</span>
          <span className="text-[10px] text-[#8888AA]">Regular Users</span>
        </div>
      </div>

      {/* Current VIPs */}
      {vipUsers.length > 0 && (
        <div className="rounded-2xl glass p-4 mb-4">
          <h3 className="text-sm font-bold text-white mb-3">Current VIP/SVIP Members</h3>
          <div className="flex flex-col gap-2">
            {vipUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[rgba(255,255,255,0.03)]">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full ${user.gradientClass} flex items-center justify-center text-xs font-bold text-white`}>{user.name.charAt(0)}</div>
                  <div>
                    <span className="text-xs font-semibold text-white">{user.name}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0 rounded text-[8px] font-black text-white" style={{ background: user.role === "svip" ? "#FF2D78" : "#FFD700" }}>
                        {user.role.toUpperCase()}
                      </span>
                      <span className="text-[9px] text-[#8888AA]">
                        Exp: {user.role === "svip" ? user.svipExpiry : user.vipExpiry}
                      </span>
                      {user.antiKick && <Shield className="w-2.5 h-2.5 text-[#8B5CF6]" />}
                    </div>
                  </div>
                </div>
                <button onClick={() => setVip(user, "user")} className="px-3 py-1 rounded-lg text-[10px] font-bold text-white bg-[rgba(239,68,68,0.3)]">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Assign VIP */}
      <div className="rounded-2xl glass p-4 mb-4">
        <h3 className="text-sm font-bold text-white mb-3">Assign VIP / SVIP</h3>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[rgba(255,255,255,0.05)] mb-3">
          <Search className="w-4 h-4 text-[#8888AA]" />
          <input type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-transparent text-sm text-white placeholder-[#8888AA] outline-none" />
        </div>
        <div className="flex flex-col gap-1.5 max-h-[300px] overflow-y-auto">
          {filtered.map(user => (
            <div key={user.id} className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[rgba(255,255,255,0.03)]">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full ${user.gradientClass} flex items-center justify-center text-[10px] font-bold text-white`}>{user.name.charAt(0)}</div>
                <span className="text-xs text-white">{user.name}</span>
                {user.role !== "user" && (
                  <span className="px-1.5 py-0 rounded text-[7px] font-black text-white" style={{ background: user.role === "svip" ? "#FF2D78" : user.role === "vip" ? "#FFD700" : "#8888AA" }}>
                    {user.role.toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setVip(user, "vip")} disabled={user.role === "vip"} className="px-2.5 py-1 rounded-lg text-[9px] font-bold text-[#FFD700] disabled:opacity-30" style={{ background: "rgba(255,215,0,0.15)" }}>
                  VIP
                </button>
                <button onClick={() => setVip(user, "svip")} disabled={user.role === "svip"} className="px-2.5 py-1 rounded-lg text-[9px] font-bold text-[#FF2D78] disabled:opacity-30" style={{ background: "rgba(255,45,120,0.15)" }}>
                  SVIP
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features breakdown */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-4 rounded-2xl" style={{ background: "rgba(255,215,0,0.06)", border: "1px solid rgba(255,215,0,0.15)" }}>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-[#FFD700]" />
            <span className="text-sm font-bold text-[#FFD700]">VIP Features</span>
          </div>
          <ul className="flex flex-col gap-1">
            {["VIP Badge", "Priority Seat", "Entry Effect", "Anti-Kick (30d)"].map(f => (
              <li key={f} className="text-[10px] text-[rgba(255,255,255,0.7)] flex items-center gap-1"><Check className="w-2.5 h-2.5 text-[#FFD700]" /> {f}</li>
            ))}
          </ul>
        </div>
        <div className="p-4 rounded-2xl" style={{ background: "rgba(255,45,120,0.06)", border: "1px solid rgba(255,45,120,0.15)" }}>
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-4 h-4 text-[#FF2D78]" />
            <span className="text-sm font-bold text-[#FF2D78]">SVIP Features</span>
          </div>
          <ul className="flex flex-col gap-1">
            {["SVIP Badge", "Priority Seat", "Premium Entry Effect", "Anti-Kick", "Room Lock", "Custom Frame"].map(f => (
              <li key={f} className="text-[10px] text-[rgba(255,255,255,0.7)] flex items-center gap-1"><Check className="w-2.5 h-2.5 text-[#FF2D78]" /> {f}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="rounded-2xl glass p-4">
          <h3 className="text-sm font-bold text-white mb-3">Recent Actions</h3>
          {history.slice(0, 10).map((h, i) => (
            <div key={i} className="flex items-center justify-between px-3 py-2 rounded-xl bg-[rgba(255,255,255,0.03)] mb-1">
              <span className="text-xs text-white"><span className="font-bold text-[#FFD700]">{h.action}</span> - {h.userName}</span>
              <span className="text-[10px] text-[#8888AA]">{h.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// =============================================================================
// COINS (Add Diamonds / Beans)
// =============================================================================

function CoinsSection({ users, onUpdateUser }: { users: User[]; onUpdateUser: (id: string, data: Partial<User>) => void }) {
  const [selectedUserId, setSelectedUserId] = useState("")
  const [coinType, setCoinType] = useState<"diamonds" | "beans">("diamonds")
  const [amount, setAmount] = useState("")
  const [action, setAction] = useState<"add" | "remove">("add")
  const [history, setHistory] = useState<{ userId: string; userName: string; type: string; amount: number; action: string; time: string }[]>([])

  const handleSubmit = () => {
    const user = users.find((u) => u.id === selectedUserId)
    if (!user || !amount) return
    const num = parseInt(amount)
    if (isNaN(num) || num <= 0) return

    const currentVal = coinType === "diamonds" ? user.diamonds : user.beans
    const newVal = action === "add" ? currentVal + num : Math.max(0, currentVal - num)
    onUpdateUser(user.id, { [coinType]: newVal })
    setHistory((prev) => [
      { userId: user.id, userName: user.name, type: coinType, amount: num, action, time: new Date().toLocaleTimeString() },
      ...prev,
    ])
    setAmount("")
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Manually Add / Remove Coins</h2>

      <div className="p-5 rounded-2xl glass mb-4">
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#8888AA] font-semibold mb-1 block">Select User</label>
            <select
              value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass text-sm text-white bg-transparent outline-none"
            >
              <option value="" className="bg-[#12121A]">-- Choose a user --</option>
              {users.map((u) => (
                <option key={u.id} value={u.id} className="bg-[#12121A]">{u.name} (ID: {u.id}) - {formatNumber(u.diamonds)}D / {formatNumber(u.beans)}B</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-[10px] uppercase tracking-wider text-[#8888AA] font-semibold mb-1 block">Type</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setCoinType("diamonds")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold text-white ${coinType === "diamonds" ? "" : "glass"}`}
                  style={coinType === "diamonds" ? { background: "linear-gradient(135deg, #FFD700, #FF6B35)" } : {}}
                >
                  Diamonds
                </button>
                <button
                  onClick={() => setCoinType("beans")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold text-white ${coinType === "beans" ? "" : "glass"}`}
                  style={coinType === "beans" ? { background: "linear-gradient(135deg, #10B981, #06B6D4)" } : {}}
                >
                  Beans
                </button>
              </div>
            </div>
            <div className="flex-1">
              <label className="text-[10px] uppercase tracking-wider text-[#8888AA] font-semibold mb-1 block">Action</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setAction("add")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold text-white ${action === "add" ? "" : "glass"}`}
                  style={action === "add" ? { background: "linear-gradient(135deg, #10B981, #06B6D4)" } : {}}
                >
                  + Add
                </button>
                <button
                  onClick={() => setAction("remove")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold text-white ${action === "remove" ? "" : "glass"}`}
                  style={action === "remove" ? { background: "linear-gradient(135deg, #EF4444, #FF6B35)" } : {}}
                >
                  - Remove
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#8888AA] font-semibold mb-1 block">Amount</label>
            <input
              type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..." min="1"
              className="w-full px-3 py-2 rounded-xl glass text-sm text-white bg-transparent outline-none placeholder-[#8888AA]"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedUserId || !amount}
            className="w-full py-3 rounded-xl text-sm font-bold text-white disabled:opacity-40"
            style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}
          >
            {action === "add" ? "Add" : "Remove"} {coinType}
          </button>
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="rounded-2xl glass p-4">
          <h3 className="text-sm font-bold text-white mb-3">Recent Actions</h3>
          <div className="flex flex-col gap-2">
            {history.slice(0, 10).map((h, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2 rounded-xl bg-[rgba(255,255,255,0.03)]">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${h.action === "add" ? "bg-[#10B981]" : "bg-[#EF4444]"}`} />
                  <span className="text-xs text-white">{h.action === "add" ? "+" : "-"}{h.amount.toLocaleString()} {h.type} to <span className="font-bold">{h.userName}</span></span>
                </div>
                <span className="text-[10px] text-[#8888AA]">{h.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// =============================================================================
// BAN / UNBAN
// =============================================================================

function BansSection({ users, onUpdateUser }: { users: User[]; onUpdateUser: (id: string, data: Partial<User>) => void }) {
  const [search, setSearch] = useState("")
  const [showBannedOnly, setShowBannedOnly] = useState(false)
  const [banHistory, setBanHistory] = useState<{ userId: string; userName: string; action: string; time: string }[]>([])

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.id.includes(search)
    const matchBan = !showBannedOnly || u.isBanned
    return matchSearch && matchBan
  })

  const toggleBan = (user: User) => {
    onUpdateUser(user.id, { isBanned: !user.isBanned })
    setBanHistory((prev) => [
      { userId: user.id, userName: user.name, action: user.isBanned ? "Unbanned" : "Banned", time: new Date().toLocaleTimeString() },
      ...prev,
    ])
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Ban / Unban Users</h2>

      <div className="flex gap-2 mb-4 flex-wrap">
        <div className="flex-1 min-w-[200px] flex items-center gap-2 px-3 py-2 rounded-xl glass">
          <Search className="w-4 h-4 text-[#8888AA]" />
          <input type="text" placeholder="Search by name or ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-transparent text-sm text-white placeholder-[#8888AA] outline-none" />
        </div>
        <button
          onClick={() => setShowBannedOnly(!showBannedOnly)}
          className={`px-4 py-2 rounded-xl text-xs font-bold text-white ${showBannedOnly ? "" : "glass"}`}
          style={showBannedOnly ? { background: "linear-gradient(135deg, #EF4444, #FF6B35)" } : {}}
        >
          {showBannedOnly ? "Show All" : "Banned Only"}
        </button>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        {filtered.map((user) => (
          <div key={user.id} className="flex items-center justify-between px-4 py-3 rounded-2xl glass">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${user.gradientClass} flex items-center justify-center text-sm font-bold text-white`}>
                {user.name.charAt(0)}
              </div>
              <div>
                <span className="text-sm font-semibold text-white">{user.name}</span>
                <span className="block text-[10px] text-[#8888AA]">ID: {user.id} | {user.country}</span>
              </div>
              {user.isBanned && (
                <span className="px-2 py-0.5 rounded-full bg-[rgba(239,68,68,0.2)] text-[10px] font-bold text-[#EF4444]">BANNED</span>
              )}
            </div>
            <button
              onClick={() => toggleBan(user)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white"
              style={{
                background: user.isBanned
                  ? "linear-gradient(135deg, #10B981, #06B6D4)"
                  : "linear-gradient(135deg, #EF4444, #FF6B35)",
              }}
            >
              {user.isBanned ? "Unban" : "Ban"}
            </button>
          </div>
        ))}
      </div>

      {banHistory.length > 0 && (
        <div className="rounded-2xl glass p-4">
          <h3 className="text-sm font-bold text-white mb-3">Ban History</h3>
          {banHistory.slice(0, 10).map((h, i) => (
            <div key={i} className="flex items-center justify-between px-3 py-2 rounded-xl bg-[rgba(255,255,255,0.03)] mb-1">
              <span className="text-xs text-white">
                <span className={h.action === "Banned" ? "text-[#EF4444]" : "text-[#10B981]"}>{h.action}</span> {h.userName} (ID: {h.userId})
              </span>
              <span className="text-[10px] text-[#8888AA]">{h.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// =============================================================================
// REWARDS
// =============================================================================

function RewardsSection({ users, onUpdateUser }: { users: User[]; onUpdateUser: (id: string, data: Partial<User>) => void }) {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
  const [rewardType, setRewardType] = useState<"diamonds" | "beans" | "badge">("diamonds")
  const [amount, setAmount] = useState("")
  const [selectedBadge, setSelectedBadge] = useState("")
  const [rewardHistory, setRewardHistory] = useState<{ users: string; reward: string; time: string }[]>([])

  const toggleUser = (id: string) => {
    setSelectedUserIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])
  }

  const handleReward = () => {
    if (selectedUserIds.length === 0) return

    selectedUserIds.forEach((userId) => {
      const user = users.find((u) => u.id === userId)
      if (!user) return

      if (rewardType === "diamonds") {
        onUpdateUser(userId, { diamonds: user.diamonds + (parseInt(amount) || 0) })
      } else if (rewardType === "beans") {
        onUpdateUser(userId, { beans: user.beans + (parseInt(amount) || 0) })
      } else if (rewardType === "badge" && selectedBadge) {
        const badge = mockBadges.find((b) => b.id === selectedBadge)
        if (badge) onUpdateUser(userId, { badge })
      }
    })

    const userNames = selectedUserIds.map((id) => users.find((u) => u.id === id)?.name).filter(Boolean).join(", ")
    const rewardText = rewardType === "badge"
      ? `Badge: ${mockBadges.find((b) => b.id === selectedBadge)?.name}`
      : `${amount} ${rewardType}`

    setRewardHistory((prev) => [{ users: userNames, reward: rewardText, time: new Date().toLocaleTimeString() }, ...prev])
    setSelectedUserIds([])
    setAmount("")
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Send Rewards</h2>

      <div className="p-5 rounded-2xl glass mb-4">
        <h3 className="text-sm font-bold text-white mb-3">Select Users ({selectedUserIds.length} selected)</h3>
        <div className="flex flex-wrap gap-2 max-h-[150px] overflow-y-auto mb-4">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => toggleUser(user.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedUserIds.includes(user.id) ? "text-white" : "text-[#8888AA] glass"
              }`}
              style={selectedUserIds.includes(user.id) ? { background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" } : {}}
            >
              {user.name}
              {selectedUserIds.includes(user.id) && <Check className="w-3 h-3" />}
            </button>
          ))}
        </div>
        <button onClick={() => setSelectedUserIds(users.map((u) => u.id))} className="text-[10px] text-[#FF2D78] font-bold mb-3">Select All</button>

        <div className="flex gap-2 mb-3">
          {(["diamonds", "beans", "badge"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setRewardType(type)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold text-white ${rewardType === type ? "" : "glass"}`}
              style={rewardType === type ? { background: type === "diamonds" ? "linear-gradient(135deg, #FFD700, #FF6B35)" : type === "beans" ? "linear-gradient(135deg, #10B981, #06B6D4)" : "linear-gradient(135deg, #8B5CF6, #FF2D78)" } : {}}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {rewardType !== "badge" ? (
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount..." className="w-full px-3 py-2 rounded-xl glass text-sm text-white bg-transparent outline-none placeholder-[#8888AA] mb-3" />
        ) : (
          <div className="grid grid-cols-4 gap-2 mb-3">
            {mockBadges.map((badge) => (
              <button
                key={badge.id}
                onClick={() => setSelectedBadge(badge.id)}
                className={`p-2 rounded-lg text-center ${selectedBadge === badge.id ? "ring-2 ring-[#FF2D78]" : ""}`}
                style={{ background: badge.bgColor }}
              >
                <span className="text-[10px] font-bold block" style={{ color: badge.color }}>{badge.icon}</span>
                <span className="text-[8px] text-[#8888AA]">{badge.name}</span>
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleReward}
          disabled={selectedUserIds.length === 0}
          className="w-full py-3 rounded-xl text-sm font-bold text-white disabled:opacity-40"
          style={{ background: "linear-gradient(135deg, #10B981, #06B6D4)" }}
        >
          Send Reward to {selectedUserIds.length} users
        </button>
      </div>

      {rewardHistory.length > 0 && (
        <div className="rounded-2xl glass p-4">
          <h3 className="text-sm font-bold text-white mb-3">Reward History</h3>
          {rewardHistory.slice(0, 10).map((h, i) => (
            <div key={i} className="px-3 py-2 rounded-xl bg-[rgba(255,255,255,0.03)] mb-1">
              <span className="text-xs text-white">Sent <span className="text-[#10B981] font-bold">{h.reward}</span> to {h.users}</span>
              <span className="block text-[10px] text-[#8888AA]">{h.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// =============================================================================
// GIFTS MANAGEMENT
// =============================================================================

function GiftsSection() {
  const [gifts, setGifts] = useState(mockGifts)
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Gift Management</h2>
      <p className="text-xs text-[#8888AA] mb-4">1 Diamond = 10,000 value. Gift effects are tiered by price.</p>

      <div className="overflow-x-auto rounded-2xl glass">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.06)]">
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-[#8888AA] font-semibold">Gift</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-[#8888AA] font-semibold">Price</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-[#8888AA] font-semibold">Effect</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-[#8888AA] font-semibold">Duration</th>
            </tr>
          </thead>
          <tbody>
            {gifts.map((gift) => (
              <tr key={gift.id} className="border-b border-[rgba(255,255,255,0.04)]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{gift.icon}</span>
                    <span className="text-xs font-semibold text-white">{gift.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-[#FFD700] font-bold">{gift.price.toLocaleString()} D</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white`}
                    style={{ background: gift.effect === "legendary" ? "linear-gradient(135deg, #FFD700, #FF6B35)" : gift.effect === "ultra" ? "linear-gradient(135deg, #FF2D78, #8B5CF6)" : gift.effect === "firework" ? "#FF6B35" : gift.effect === "burst" ? "#8B5CF6" : gift.effect === "sparkle" ? "#06B6D4" : "rgba(255,255,255,0.1)" }}>
                    {gift.effect.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-[#8888AA]">{gift.effectDuration > 0 ? `${gift.effectDuration / 1000}s` : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// =============================================================================
// BADGES MANAGEMENT
// =============================================================================

function BadgesSection() {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Custom Badges</h2>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {mockBadges.map((badge) => (
          <div key={badge.id} className="p-4 rounded-2xl glass flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-black" style={{ background: badge.bgColor, color: badge.color }}>
              {badge.icon}
            </div>
            <span className="text-sm font-bold text-white">{badge.name}</span>
            <span className="text-[10px] text-[#8888AA]">ID: {badge.id}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// EVENTS MANAGEMENT
// =============================================================================

function EventsSection() {
  const [events, setEvents] = useState(mockEvents)

  const toggleEvent = (id: string) => {
    setEvents((prev) => prev.map((e) => e.id === id ? { ...e, isActive: !e.isActive } : e))
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Events</h2>
      <div className="flex flex-col gap-3">
        {events.map((event) => (
          <div key={event.id} className="p-4 rounded-2xl glass">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-white">{event.title}</h3>
              <button
                onClick={() => toggleEvent(event.id)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold text-white ${event.isActive ? "" : "opacity-50"}`}
                style={{ background: event.isActive ? "linear-gradient(135deg, #10B981, #06B6D4)" : "rgba(255,255,255,0.1)" }}
              >
                {event.isActive ? "Active" : "Inactive"}
              </button>
            </div>
            <p className="text-xs text-[#8888AA] mb-1">{event.description}</p>
            <div className="flex items-center gap-3 text-[10px] text-[#8888AA]">
              <span>{event.startDate} - {event.endDate}</span>
              <span>{formatNumber(event.participants)} participants</span>
            </div>
            <p className="text-[10px] text-[#FFD700] mt-1">Reward: {event.reward}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// GAMES MANAGEMENT
// =============================================================================

function GamesManageSection() {
  const [games, setGames] = useState(mockGames)

  const toggleGame = (id: string) => {
    setGames((prev) => prev.map((g) => g.id === id ? { ...g, isActive: !g.isActive } : g))
  }

  const totalPlayers = games.reduce((sum, g) => sum + g.players, 0)
  const activeCount = games.filter(g => g.isActive).length

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Games Management</h2>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="p-4 rounded-2xl glass text-center">
          <span className="text-2xl font-bold text-white block">{games.length}</span>
          <span className="text-[10px] text-[#8888AA]">Total Games</span>
        </div>
        <div className="p-4 rounded-2xl glass text-center">
          <span className="text-2xl font-bold text-[#10B981] block">{activeCount}</span>
          <span className="text-[10px] text-[#8888AA]">Active</span>
        </div>
        <div className="p-4 rounded-2xl glass text-center">
          <span className="text-2xl font-bold text-[#FFD700] block">{formatNumber(totalPlayers)}</span>
          <span className="text-[10px] text-[#8888AA]">Total Players</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {games.map((game) => (
          <div key={game.id} className="p-4 rounded-2xl glass">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl text-2xl" style={{ background: `${game.color}20` }}>
                  {game.icon}
                </div>
                <div>
                  <span className="text-sm font-bold text-white">{game.name}</span>
                  <span className="block text-[10px] text-[#8888AA]">{game.description}</span>
                </div>
              </div>
              <button
                onClick={() => toggleGame(game.id)}
                className="px-3 py-1.5 rounded-xl text-[10px] font-bold text-white"
                style={{ background: game.isActive ? "linear-gradient(135deg, #10B981, #06B6D4)" : "linear-gradient(135deg, #EF4444, #FF6B35)" }}
              >
                {game.isActive ? "Active" : "Disabled"}
              </button>
            </div>
            <div className="flex items-center gap-4 text-[10px]">
              <div className="flex items-center gap-1">
                <Diamond className="w-3 h-3 text-[#06B6D4]" />
                <span className="text-[#8888AA]">Entry:</span>
                <span className="font-bold text-white">{formatNumber(game.entryFee)}</span>
              </div>
              {game.jackpot && (
                <div className="flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#FFD700]" />
                  <span className="text-[#8888AA]">Jackpot:</span>
                  <span className="font-bold text-[#FFD700]">{formatNumber(game.jackpot)}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3 text-[#8B5CF6]" />
                <span className="font-bold text-white">{formatNumber(game.players)}</span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[8px] font-bold text-white" style={{ background: `${game.color}40` }}>
                {game.category.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// ANNOUNCEMENTS MANAGEMENT
// =============================================================================

function AnnouncementsSection() {
  const [anncs, setAnncs] = useState(mockAnnouncements)
  const [newTitle, setNewTitle] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [newType, setNewType] = useState<Announcement["type"]>("info")

  const addAnnouncement = () => {
    if (!newTitle || !newMessage) return
    setAnncs((prev) => [
      { id: `an${Date.now()}`, title: newTitle, message: newMessage, type: newType, timestamp: "Just now", isActive: true },
      ...prev,
    ])
    setNewTitle("")
    setNewMessage("")
  }

  const toggleAnnouncement = (id: string) => {
    setAnncs((prev) => prev.map((a) => a.id === id ? { ...a, isActive: !a.isActive } : a))
  }

  const typeColors: Record<string, string> = {
    info: '#3B82F6', warning: '#F59E0B', promo: '#FF2D78', update: '#10B981',
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Announcements</h2>

      {/* Create new */}
      <div className="p-5 rounded-2xl glass mb-4">
        <h3 className="text-sm font-bold text-white mb-3">New Announcement</h3>
        <div className="flex flex-col gap-3">
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Title..." className="w-full px-3 py-2 rounded-xl glass text-sm text-white bg-transparent outline-none placeholder-[#8888AA]" />
          <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Message..." rows={3} className="w-full px-3 py-2 rounded-xl glass text-sm text-white bg-transparent outline-none placeholder-[#8888AA] resize-none" />
          <div className="flex gap-2">
            {(["info", "warning", "promo", "update"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setNewType(type)}
                className={`flex-1 py-2 rounded-xl text-[10px] font-bold text-white ${newType === type ? "" : "glass opacity-50"}`}
                style={newType === type ? { background: typeColors[type] } : {}}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
          <button onClick={addAnnouncement} disabled={!newTitle || !newMessage} className="w-full py-3 rounded-xl text-sm font-bold text-white disabled:opacity-40" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>
            Publish Announcement
          </button>
        </div>
      </div>

      {/* Existing */}
      <div className="flex flex-col gap-2">
        {anncs.map((a) => (
          <div key={a.id} className="flex items-center justify-between px-4 py-3 rounded-2xl glass" style={{ borderLeft: `3px solid ${typeColors[a.type]}` }}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{a.title}</span>
                <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold text-white" style={{ background: typeColors[a.type] }}>{a.type.toUpperCase()}</span>
              </div>
              <p className="text-[10px] text-[#8888AA] truncate">{a.message}</p>
              <span className="text-[9px] text-[#8888AA]">{a.timestamp}</span>
            </div>
            <button
              onClick={() => toggleAnnouncement(a.id)}
              className={`px-3 py-1 rounded-full text-[10px] font-bold text-white flex-shrink-0 ml-2`}
              style={{ background: a.isActive ? "linear-gradient(135deg, #10B981, #06B6D4)" : "rgba(255,255,255,0.1)" }}
            >
              {a.isActive ? "Active" : "Hidden"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// OFFERS MANAGEMENT
// =============================================================================

function OffersManageSection() {
  const [offers, setOffers] = useState(mockOffers)

  const toggleOffer = (id: string) => {
    setOffers((prev) => prev.map((o) => o.id === id ? { ...o, isActive: !o.isActive } : o))
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Offers</h2>
      <div className="flex flex-col gap-3">
        {offers.map((offer) => (
          <div key={offer.id} className="flex items-center justify-between p-4 rounded-2xl glass">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{offer.title}</span>
                <span className="px-2 py-0.5 rounded-full bg-[rgba(255,45,120,0.2)] text-[10px] font-bold text-[#FF2D78]">{offer.discount}</span>
              </div>
              <p className="text-[10px] text-[#8888AA]">{offer.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-[#8888AA] line-through">{offer.originalPrice}</span>
                <span className="text-xs font-bold text-white">{offer.newPrice}</span>
                <span className="text-[10px] text-[#FFD700]">({formatNumber(offer.diamonds)} D)</span>
              </div>
            </div>
            <button
              onClick={() => toggleOffer(offer.id)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold text-white flex-shrink-0 ml-2`}
              style={{ background: offer.isActive ? "linear-gradient(135deg, #10B981, #06B6D4)" : "linear-gradient(135deg, #EF4444, #FF6B35)" }}
            >
              {offer.isActive ? "Active" : "Disabled"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// VOICE ROOMS MANAGEMENT
// =============================================================================

function VoiceRoomsSection() {
  const [rooms, setRooms] = useState(mockVoiceRooms)
  const [promoterSearch, setPromoterSearch] = useState("")

  const toggleRoom = (id: string) => {
    setRooms((prev) => prev.map((r) => r.id === id ? { ...r, isActive: !r.isActive } : r))
  }

  const setPromoter = (roomId: string, userId: string) => {
    setRooms((prev) => prev.map((r) => r.id === roomId ? { ...r, promoterId: userId } : r))
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Voice Rooms</h2>
      <div className="flex flex-col gap-3">
        {rooms.map((room) => {
          const promoter = room.promoterId ? mockUsers.find((u) => u.id === room.promoterId) : null
          return (
            <div key={room.id} className="p-4 rounded-2xl glass">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{room.name}</h3>
                  <span className="text-[10px] text-[#8888AA]">by {room.host.name}</span>
                </div>
                <button
                  onClick={() => toggleRoom(room.id)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold text-white`}
                  style={{ background: room.isActive ? "linear-gradient(135deg, #10B981, #06B6D4)" : "rgba(255,255,255,0.1)" }}
                >
                  {room.isActive ? "Active" : "Closed"}
                </button>
              </div>
              <p className="text-[10px] text-[#8888AA] mb-2">{room.description} | {formatNumber(room.viewerCount)} viewers | {room.seats.filter(s => s.user).length}/{room.maxSeats} seats | {room.category}</p>

              {/* Promoter assignment */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#8888AA]">Promoter:</span>
                {promoter ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>
                    {promoter.name}
                  </span>
                ) : (
                  <span className="text-[10px] text-[#8888AA]">None</span>
                )}
                <select
                  onChange={(e) => setPromoter(room.id, e.target.value)}
                  value={room.promoterId || ""}
                  className="px-2 py-1 rounded-lg glass text-[10px] text-white bg-transparent outline-none ml-auto"
                >
                  <option value="" className="bg-[#12121A]">Set promoter</option>
                  {mockUsers.map((u) => (
                    <option key={u.id} value={u.id} className="bg-[#12121A]">{u.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// =============================================================================
// MAIN ADMIN PANEL PAGE
// =============================================================================

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [users, setUsers] = useState<User[]>([...mockUsers])

  const updateUser = (id: string, data: Partial<User>) => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, ...data } : u))
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard": return <DashboardSection users={users} />
      case "users": return <UsersSection users={users} onUpdateUser={updateUser} />
      case "vipManage": return <VipManageSection users={users} onUpdateUser={updateUser} />
      case "coins": return <CoinsSection users={users} onUpdateUser={updateUser} />
      case "bans": return <BansSection users={users} onUpdateUser={updateUser} />
      case "rewards": return <RewardsSection users={users} onUpdateUser={updateUser} />
      case "gifts": return <GiftsSection />
      case "badges": return <BadgesSection />
      case "events": return <EventsSection />
      case "games": return <GamesManageSection />
      case "announcements": return <AnnouncementsSection />
      case "offers": return <OffersManageSection />
      case "voiceRooms": return <VoiceRoomsSection />
      default: return <DashboardSection users={users} />
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-[240px] bg-[#12121A] border-r border-[rgba(255,255,255,0.06)] flex flex-col transform transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5 border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: "linear-gradient(135deg, #FF2D78, #8B5CF6)" }}>
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-white">LotChat</h1>
            <span className="text-[9px] text-[#8888AA]">Admin Panel - War Studio Ltd</span>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5 ${
                activeSection === item.id
                  ? "text-white bg-[rgba(255,255,255,0.08)]"
                  : "text-[#8888AA] hover:text-white hover:bg-[rgba(255,255,255,0.04)]"
              }`}
            >
              <item.icon className="w-4 h-4" style={activeSection === item.id ? { color: item.color } : {}} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Back to app link */}
        <div className="px-3 py-4 border-t border-[rgba(255,255,255,0.06)]">
          <a
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[#8888AA] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to App
          </a>
        </div>
      </aside>

      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden flex items-center justify-center w-10 h-10 rounded-xl glass"
        aria-label="Toggle sidebar"
      >
        <BarChart3 className="w-5 h-5 text-white" />
      </button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-[rgba(0,0,0,0.5)] lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-[240px] p-4 lg:p-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6 pl-12 lg:pl-0">
          <div>
            <h2 className="text-sm text-[#8888AA]">
              {sidebarItems.find((i) => i.id === activeSection)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#8888AA]">{users.length} users</span>
            <div className="w-8 h-8 rounded-full bg-[rgba(255,45,120,0.2)] flex items-center justify-center text-xs font-bold text-[#FF2D78]">A</div>
          </div>
        </div>

        {renderContent()}
      </main>
    </div>
  )
}
