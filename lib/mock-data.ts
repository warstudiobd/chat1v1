// ============================================================================
// LotChat - Voice Room Based Social App
// Diamond Rate: $1 = 10,000 Diamonds
// ============================================================================

export type UserRole = "user" | "host" | "vip" | "svip" | "moderator" | "admin"
export type GiftEffect = "none" | "sparkle" | "burst" | "firework" | "ultra" | "legendary"
export type RoomCategory = "Chat" | "Music" | "Party" | "Dating" | "Gaming" | "Karaoke" | "Chill" | "Entertainment"

export interface Badge {
  id: string
  name: string
  icon: string
  color: string
  bgColor: string
}

export interface User {
  id: string
  name: string
  age: number
  country: string
  flag: string
  avatar: string
  gradientClass: string
  isOnline: boolean
  level: number
  followers: number
  following: number
  bio: string
  distance?: string
  isBanned: boolean
  diamonds: number
  beans: number
  badge?: Badge | null
  role: UserRole
  vipExpiry?: string
  svipExpiry?: string
  antiKick: boolean
  frameId?: string
  entryEffect?: string
}

export interface Message {
  id: string
  text: string
  senderId: string
  timestamp: string
  isMe: boolean
}

export interface Conversation {
  id: string
  user: User
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  messages: Message[]
}

export interface VoiceRoomSeat {
  id: number
  user?: User | null
  isMuted: boolean
  isLocked: boolean
}

export interface VoiceRoom {
  id: string
  name: string
  host: User
  description: string
  coverGradient: string
  seats: VoiceRoomSeat[]
  maxSeats: number
  category: RoomCategory
  isActive: boolean
  isLocked: boolean
  password?: string
  viewerCount: number
  promoterId?: string
  tags: string[]
  antiKickEnabled: boolean
}

export interface Gift {
  id: string
  name: string
  icon: string
  price: number
  color: string
  effect: GiftEffect
  effectDuration: number
}

export interface GameItem {
  id: string
  name: string
  icon: string
  description: string
  color: string
  players: number
  isActive: boolean
  entryFee: number
  jackpot?: number
  category: "luck" | "card" | "casual" | "battle"
}

export interface EventItem {
  id: string
  title: string
  description: string
  gradientClass: string
  startDate: string
  endDate: string
  reward: string
  isActive: boolean
  participants: number
}

export interface Announcement {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "promo" | "update"
  timestamp: string
  isActive: boolean
}

export interface Offer {
  id: string
  title: string
  description: string
  discount: string
  originalPrice: string
  newPrice: string
  diamonds: number
  gradientClass: string
  expiresAt: string
  isActive: boolean
}

// ============================================================================
// GRADIENT CLASSES
// ============================================================================
const g = [
  'gradient-avatar-1', 'gradient-avatar-2', 'gradient-avatar-3', 'gradient-avatar-4',
  'gradient-avatar-5', 'gradient-avatar-6', 'gradient-avatar-7', 'gradient-avatar-8',
]

// ============================================================================
// BADGES
// ============================================================================
export const mockBadges: Badge[] = [
  { id: 'b1', name: 'VIP', icon: 'VIP', color: '#FFD700', bgColor: 'rgba(255,215,0,0.15)' },
  { id: 'b2', name: 'SVIP', icon: 'SVIP', color: '#FF2D78', bgColor: 'rgba(255,45,120,0.15)' },
  { id: 'b3', name: 'Top Host', icon: 'TH', color: '#FF6B35', bgColor: 'rgba(255,107,53,0.15)' },
  { id: 'b4', name: 'Rising Star', icon: 'RS', color: '#8B5CF6', bgColor: 'rgba(139,92,246,0.15)' },
  { id: 'b5', name: 'Elite', icon: 'EL', color: '#06B6D4', bgColor: 'rgba(6,182,212,0.15)' },
  { id: 'b6', name: 'Premium', icon: 'PM', color: '#10B981', bgColor: 'rgba(16,185,129,0.15)' },
  { id: 'b7', name: 'Verified', icon: 'VR', color: '#3B82F6', bgColor: 'rgba(59,130,246,0.15)' },
  { id: 'b8', name: 'Diamond', icon: 'DM', color: '#F59E0B', bgColor: 'rgba(245,158,11,0.15)' },
  { id: 'b9', name: 'Legend', icon: 'LG', color: '#EF4444', bgColor: 'rgba(239,68,68,0.15)' },
  { id: 'b10', name: 'Crown', icon: 'CR', color: '#FFD700', bgColor: 'rgba(255,215,0,0.2)' },
]

// ============================================================================
// USERS
// ============================================================================
export const mockUsers: User[] = [
  { id: '1', name: 'Sofia', age: 23, country: 'Brazil', flag: 'BR', avatar: '', gradientClass: g[0], isOnline: true, level: 28, followers: 12400, following: 340, bio: 'Love music & dance', distance: '2.3 km', isBanned: false, diamonds: 34000, beans: 120000, badge: mockBadges[2], role: 'host', antiKick: false },
  { id: '2', name: 'Aisha', age: 21, country: 'Turkey', flag: 'TR', avatar: '', gradientClass: g[1], isOnline: true, level: 15, followers: 5600, following: 210, bio: 'Let\'s chat!', distance: '5.1 km', isBanned: false, diamonds: 8000, beans: 25000, badge: null, role: 'user', antiKick: false },
  { id: '3', name: 'Yuki', age: 25, country: 'Japan', flag: 'JP', avatar: '', gradientClass: g[2], isOnline: true, level: 42, followers: 34200, following: 89, bio: 'Singing is my passion', distance: '8.7 km', isBanned: false, diamonds: 156000, beans: 890000, badge: mockBadges[0], role: 'vip', vipExpiry: '2026-06-15', antiKick: true },
  { id: '4', name: 'Maria', age: 22, country: 'Colombia', flag: 'CO', avatar: '', gradientClass: g[3], isOnline: false, level: 8, followers: 2100, following: 455, bio: 'New here, say hi!', distance: '12 km', isBanned: false, diamonds: 2000, beans: 5000, badge: null, role: 'user', antiKick: false },
  { id: '5', name: 'Priya', age: 24, country: 'India', flag: 'IN', avatar: '', gradientClass: g[4], isOnline: true, level: 19, followers: 8900, following: 167, bio: 'Dancing queen', distance: '3.5 km', isBanned: false, diamonds: 12000, beans: 45000, badge: mockBadges[3], role: 'host', antiKick: false },
  { id: '6', name: 'Luna', age: 20, country: 'Philippines', flag: 'PH', avatar: '', gradientClass: g[5], isOnline: true, level: 35, followers: 21500, following: 120, bio: 'Karaoke night!', distance: '15 km', isBanned: false, diamonds: 98000, beans: 450000, badge: mockBadges[1], role: 'svip', svipExpiry: '2026-12-31', antiKick: true },
  { id: '7', name: 'Mei', age: 26, country: 'China', flag: 'CN', avatar: '', gradientClass: g[6], isOnline: false, level: 12, followers: 4300, following: 290, bio: 'Travel lover', distance: '20 km', isBanned: true, diamonds: 500, beans: 1200, badge: null, role: 'user', antiKick: false },
  { id: '8', name: 'Nadia', age: 22, country: 'Morocco', flag: 'MA', avatar: '', gradientClass: g[7], isOnline: true, level: 22, followers: 9800, following: 198, bio: 'Good vibes only', distance: '7.2 km', isBanned: false, diamonds: 22000, beans: 78000, badge: mockBadges[4], role: 'user', antiKick: false },
  { id: '9', name: 'Chloe', age: 24, country: 'France', flag: 'FR', avatar: '', gradientClass: g[0], isOnline: true, level: 31, followers: 15600, following: 245, bio: 'Art & fashion', distance: '4.8 km', isBanned: false, diamonds: 67000, beans: 230000, badge: mockBadges[0], role: 'vip', vipExpiry: '2026-08-20', antiKick: true },
  { id: '10', name: 'Anya', age: 21, country: 'Russia', flag: 'RU', avatar: '', gradientClass: g[1], isOnline: false, level: 9, followers: 3200, following: 178, bio: 'Love to cook', distance: '25 km', isBanned: false, diamonds: 3500, beans: 8000, badge: null, role: 'user', antiKick: false },
  { id: '11', name: 'Isabella', age: 23, country: 'Italy', flag: 'IT', avatar: '', gradientClass: g[2], isOnline: true, level: 17, followers: 7400, following: 312, bio: 'Pizza & pasta', distance: '9.1 km', isBanned: false, diamonds: 15000, beans: 52000, badge: null, role: 'user', antiKick: false },
  { id: '12', name: 'Fatima', age: 25, country: 'Egypt', flag: 'EG', avatar: '', gradientClass: g[3], isOnline: true, level: 38, followers: 28900, following: 76, bio: 'Voice room queen', distance: '18 km', isBanned: false, diamonds: 124000, beans: 670000, badge: mockBadges[8], role: 'host', antiKick: false },
  { id: '13', name: 'Suki', age: 22, country: 'Thailand', flag: 'TH', avatar: '', gradientClass: g[4], isOnline: false, level: 14, followers: 6100, following: 234, bio: 'Beach life', distance: '30 km', isBanned: false, diamonds: 7500, beans: 19000, badge: null, role: 'user', antiKick: false },
  { id: '14', name: 'Ana', age: 20, country: 'Spain', flag: 'ES', avatar: '', gradientClass: g[5], isOnline: true, level: 11, followers: 4800, following: 189, bio: 'Flamenco dancer', distance: '6.3 km', isBanned: false, diamonds: 9000, beans: 28000, badge: null, role: 'user', antiKick: false },
  { id: '15', name: 'Kim', age: 24, country: 'South Korea', flag: 'KR', avatar: '', gradientClass: g[6], isOnline: true, level: 45, followers: 41200, following: 55, bio: 'K-pop fan', distance: '11 km', isBanned: false, diamonds: 210000, beans: 1200000, badge: mockBadges[1], role: 'svip', svipExpiry: '2027-01-01', antiKick: true },
  { id: '16', name: 'Emma', age: 23, country: 'USA', flag: 'US', avatar: '', gradientClass: g[7], isOnline: true, level: 20, followers: 10300, following: 267, bio: 'Netflix & chill', distance: '1.2 km', isBanned: false, diamonds: 18000, beans: 62000, badge: mockBadges[5], role: 'user', antiKick: false },
  { id: '17', name: 'Zara', age: 21, country: 'Pakistan', flag: 'PK', avatar: '', gradientClass: g[0], isOnline: false, level: 7, followers: 1900, following: 345, bio: 'Henna artist', distance: '22 km', isBanned: false, diamonds: 1200, beans: 3500, badge: null, role: 'user', antiKick: false },
  { id: '18', name: 'Lina', age: 25, country: 'Germany', flag: 'DE', avatar: '', gradientClass: g[1], isOnline: true, level: 26, followers: 13100, following: 156, bio: 'Yoga & meditation', distance: '14 km', isBanned: false, diamonds: 45000, beans: 180000, badge: mockBadges[6], role: 'moderator', antiKick: true },
  { id: '19', name: 'Sakura', age: 22, country: 'Japan', flag: 'JP', avatar: '', gradientClass: g[2], isOnline: true, level: 33, followers: 19700, following: 98, bio: 'Anime lover', distance: '16 km', isBanned: false, diamonds: 78000, beans: 340000, badge: mockBadges[7], role: 'host', antiKick: false },
  { id: '20', name: 'Valentina', age: 24, country: 'Argentina', flag: 'AR', avatar: '', gradientClass: g[3], isOnline: true, level: 16, followers: 7800, following: 223, bio: 'Tango nights', distance: '10 km', isBanned: false, diamonds: 11000, beans: 38000, badge: null, role: 'user', antiKick: false },
]

// ============================================================================
// CONVERSATIONS
// ============================================================================
export const mockConversations: Conversation[] = [
  { id: 'c1', user: mockUsers[0], lastMessage: 'Come join my voice room!', lastMessageTime: '2m', unreadCount: 3, messages: [
    { id: 'm1', text: 'Hi there!', senderId: '1', timestamp: '10:30 AM', isMe: false },
    { id: 'm2', text: 'Hey Sofia!', senderId: 'me', timestamp: '10:31 AM', isMe: true },
    { id: 'm3', text: 'I am hosting a room right now', senderId: '1', timestamp: '10:32 AM', isMe: false },
    { id: 'm4', text: 'That sounds fun!', senderId: 'me', timestamp: '10:33 AM', isMe: true },
    { id: 'm5', text: 'Come join my voice room!', senderId: '1', timestamp: '10:40 AM', isMe: false },
  ]},
  { id: 'c2', user: mockUsers[2], lastMessage: 'Want to join karaoke?', lastMessageTime: '15m', unreadCount: 1, messages: [
    { id: 'm1', text: 'Hello!', senderId: '3', timestamp: '9:00 AM', isMe: false },
    { id: 'm2', text: 'Hi Yuki!', senderId: 'me', timestamp: '9:01 AM', isMe: true },
    { id: 'm3', text: 'Want to join karaoke?', senderId: '3', timestamp: '9:15 AM', isMe: false },
  ]},
  { id: 'c3', user: mockUsers[4], lastMessage: 'See you in the room!', lastMessageTime: '1h', unreadCount: 0, messages: [
    { id: 'm1', text: 'Great hosting today!', senderId: '5', timestamp: '8:00 AM', isMe: false },
    { id: 'm2', text: 'Thanks!', senderId: 'me', timestamp: '8:01 AM', isMe: true },
    { id: 'm3', text: 'See you in the room!', senderId: '5', timestamp: '8:05 AM', isMe: false },
  ]},
  { id: 'c4', user: mockUsers[5], lastMessage: 'Sent you a gift!', lastMessageTime: '2h', unreadCount: 2, messages: [
    { id: 'm1', text: 'Your voice is amazing!', senderId: '6', timestamp: '7:00 AM', isMe: false },
    { id: 'm2', text: 'Thank you so much!', senderId: 'me', timestamp: '7:02 AM', isMe: true },
    { id: 'm3', text: 'Sent you a gift!', senderId: '6', timestamp: '7:10 AM', isMe: false },
  ]},
  { id: 'c5', user: mockUsers[8], lastMessage: 'Love your profile!', lastMessageTime: '3h', unreadCount: 0, messages: [
    { id: 'm1', text: 'Love your profile!', senderId: '9', timestamp: '6:00 AM', isMe: false },
  ]},
  { id: 'c6', user: mockUsers[11], lastMessage: 'Join my room tonight!', lastMessageTime: '5h', unreadCount: 1, messages: [
    { id: 'm1', text: 'Join my room tonight!', senderId: '12', timestamp: '4:00 AM', isMe: false },
  ]},
]

// ============================================================================
// VOICE ROOMS (Core feature)
// ============================================================================
function makeSeats(count: number, users: (User | null)[]): VoiceRoomSeat[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    user: users[i] || null,
    isMuted: false,
    isLocked: false,
  }))
}

export const mockVoiceRooms: VoiceRoom[] = [
  { id: 'vr1', name: 'Chill Vibes Lounge', host: mockUsers[0], description: 'Relax and chat with friends', coverGradient: g[1], seats: makeSeats(8, [mockUsers[0], mockUsers[1], mockUsers[7], mockUsers[10], null, null, null, null]), maxSeats: 8, category: 'Chill', isActive: true, isLocked: false, viewerCount: 142, tags: ['Chill', 'Talk'], antiKickEnabled: false, promoterId: '18' },
  { id: 'vr2', name: 'Music Lounge', host: mockUsers[2], description: 'Share your favorite songs', coverGradient: g[2], seats: makeSeats(8, [mockUsers[2], mockUsers[4], mockUsers[8], null, null, null, null, null]), maxSeats: 8, category: 'Music', isActive: true, isLocked: false, viewerCount: 289, tags: ['Music', 'Vibes'], antiKickEnabled: false },
  { id: 'vr3', name: 'Late Night Party', host: mockUsers[5], description: 'Party all night!', coverGradient: g[5], seats: makeSeats(8, [mockUsers[5], mockUsers[11], mockUsers[14], mockUsers[18], mockUsers[15], null, null, null]), maxSeats: 8, category: 'Party', isActive: true, isLocked: true, password: '1234', viewerCount: 567, tags: ['Party', 'Fun', 'VIP'], antiKickEnabled: true, promoterId: '18' },
  { id: 'vr4', name: 'K-pop Fan Room', host: mockUsers[14], description: 'All about K-pop!', coverGradient: g[6], seats: makeSeats(8, [mockUsers[14], mockUsers[18], mockUsers[1], mockUsers[13], null, null, null, null]), maxSeats: 8, category: 'Music', isActive: true, isLocked: false, viewerCount: 834, tags: ['K-pop', 'Music', 'Dance'], antiKickEnabled: false },
  { id: 'vr5', name: 'Karaoke Night', host: mockUsers[11], description: 'Sing your heart out!', coverGradient: g[3], seats: makeSeats(8, [mockUsers[11], mockUsers[0], mockUsers[4], null, null, null, null, null]), maxSeats: 8, category: 'Karaoke', isActive: true, isLocked: false, viewerCount: 456, tags: ['Karaoke', 'Singing'], antiKickEnabled: false },
  { id: 'vr6', name: 'Game Zone', host: mockUsers[8], description: 'Play games together', coverGradient: g[0], seats: makeSeats(8, [mockUsers[8], mockUsers[9], null, null, null, null, null, null]), maxSeats: 8, category: 'Gaming', isActive: true, isLocked: false, viewerCount: 198, tags: ['Gaming', 'Fun'], antiKickEnabled: false },
  { id: 'vr7', name: 'Dating Corner', host: mockUsers[4], description: 'Meet new people', coverGradient: g[4], seats: makeSeats(8, [mockUsers[4], mockUsers[19], mockUsers[3], null, null, null, null, null]), maxSeats: 8, category: 'Dating', isActive: true, isLocked: false, viewerCount: 321, tags: ['Dating', 'Love'], antiKickEnabled: false },
  { id: 'vr8', name: 'VIP Exclusive', host: mockUsers[5], description: 'SVIP members only', coverGradient: g[7], seats: makeSeats(8, [mockUsers[5], mockUsers[2], mockUsers[14], null, null, null, null, null]), maxSeats: 8, category: 'Chat', isActive: true, isLocked: true, password: 'svip', viewerCount: 89, tags: ['VIP', 'SVIP', 'Exclusive'], antiKickEnabled: true },
]

// ============================================================================
// GIFTS - $1 = 10,000 Diamonds rate
// ============================================================================
export const mockGifts: Gift[] = [
  { id: 'g1', name: 'Rose', icon: '\u{1F339}', price: 1, color: '#FF4D6A', effect: 'none', effectDuration: 0 },
  { id: 'g2', name: 'Heart', icon: '\u{1F496}', price: 5, color: '#FF2D78', effect: 'none', effectDuration: 0 },
  { id: 'g3', name: 'Star', icon: '\u{2B50}', price: 10, color: '#FFD700', effect: 'none', effectDuration: 0 },
  { id: 'g4', name: 'Fire', icon: '\u{1F525}', price: 15, color: '#FF6B35', effect: 'sparkle', effectDuration: 1500 },
  { id: 'g5', name: 'Kiss', icon: '\u{1F48B}', price: 25, color: '#FF2D78', effect: 'sparkle', effectDuration: 1500 },
  { id: 'g6', name: 'Diamond', icon: '\u{1F48E}', price: 50, color: '#00D4FF', effect: 'sparkle', effectDuration: 2000 },
  { id: 'g7', name: 'Crown', icon: '\u{1F451}', price: 100, color: '#FFD700', effect: 'burst', effectDuration: 2500 },
  { id: 'g8', name: 'Rocket', icon: '\u{1F680}', price: 200, color: '#FF6B35', effect: 'burst', effectDuration: 2500 },
  { id: 'g9', name: 'Castle', icon: '\u{1F3F0}', price: 500, color: '#8B5CF6', effect: 'firework', effectDuration: 3000 },
  { id: 'g10', name: 'Sports Car', icon: '\u{1F3CE}\u{FE0F}', price: 1000, color: '#EF4444', effect: 'firework', effectDuration: 3500 },
  { id: 'g11', name: 'Yacht', icon: '\u{1F6E5}\u{FE0F}', price: 2000, color: '#06B6D4', effect: 'firework', effectDuration: 3500 },
  { id: 'g12', name: 'Private Jet', icon: '\u{2708}\u{FE0F}', price: 5000, color: '#3B82F6', effect: 'ultra', effectDuration: 4000 },
  { id: 'g13', name: 'Island', icon: '\u{1F3DD}\u{FE0F}', price: 10000, color: '#10B981', effect: 'ultra', effectDuration: 4500 },
  { id: 'g14', name: 'Planet', icon: '\u{1FA90}', price: 25000, color: '#8B5CF6', effect: 'ultra', effectDuration: 5000 },
  { id: 'g15', name: 'Universe', icon: '\u{1F30C}', price: 50000, color: '#6366F1', effect: 'legendary', effectDuration: 6000 },
  { id: 'g16', name: 'Infinity Love', icon: '\u{1F49D}', price: 100000, color: '#FF2D78', effect: 'legendary', effectDuration: 7000 },
]

// ============================================================================
// GAMES
// ============================================================================
export const mockGames: GameItem[] = [
  { id: 'gm1', name: 'Greedy Cat', icon: '\u{1F431}', description: 'Feed the cat, win big!', color: '#FFD700', players: 12800, isActive: true, entryFee: 100, jackpot: 50000, category: 'luck' },
  { id: 'gm2', name: 'Teen Patti', icon: '\u{1F0CF}', description: '3-card poker battle', color: '#FF2D78', players: 8900, isActive: true, entryFee: 500, jackpot: 100000, category: 'card' },
  { id: 'gm3', name: 'Lucky Wheel', icon: '\u{1F3B0}', description: 'Spin to win diamonds!', color: '#8B5CF6', players: 15600, isActive: true, entryFee: 50, jackpot: 25000, category: 'luck' },
  { id: 'gm4', name: 'Ludo King', icon: '\u{1F3B2}', description: 'Roll dice, win coins!', color: '#06B6D4', players: 6700, isActive: true, entryFee: 200, jackpot: 30000, category: 'casual' },
  { id: 'gm5', name: 'Coin Flip', icon: '\u{1FA99}', description: 'Heads or tails, double up!', color: '#10B981', players: 21300, isActive: true, entryFee: 100, jackpot: 20000, category: 'luck' },
  { id: 'gm6', name: 'Rummy', icon: '\u{2660}\u{FE0F}', description: 'Classic card game', color: '#FF6B35', players: 5400, isActive: true, entryFee: 300, jackpot: 75000, category: 'card' },
  { id: 'gm7', name: 'Crash', icon: '\u{1F4C8}', description: 'Cash out before crash!', color: '#EF4444', players: 18200, isActive: true, entryFee: 100, jackpot: 200000, category: 'luck' },
  { id: 'gm8', name: 'Quiz Battle', icon: '\u{1F9E0}', description: 'Test your knowledge', color: '#F59E0B', players: 3200, isActive: true, entryFee: 150, jackpot: 15000, category: 'battle' },
  { id: 'gm9', name: 'Gift Rush', icon: '\u{1F381}', description: 'Race to collect gifts', color: '#A855F7', players: 4100, isActive: false, entryFee: 200, jackpot: 40000, category: 'casual' },
]

// ============================================================================
// EVENTS
// ============================================================================
export const mockEvents: EventItem[] = [
  { id: 'ev1', title: 'Voice Room Festival', description: 'Host voice rooms and win exclusive badges', gradientClass: g[1], startDate: '2026-02-14', endDate: '2026-02-21', reward: '10,000 Diamonds + Exclusive Badge', isActive: true, participants: 15600 },
  { id: 'ev2', title: 'Top Host Week', description: 'Most popular hosts get rewarded', gradientClass: g[5], startDate: '2026-02-15', endDate: '2026-02-22', reward: 'SVIP Badge + 50,000 Diamonds', isActive: true, participants: 8900 },
  { id: 'ev3', title: 'New User Bonus', description: 'Special rewards for new users', gradientClass: g[2], startDate: '2026-02-10', endDate: '2026-02-28', reward: '500 Free Diamonds', isActive: true, participants: 24500 },
  { id: 'ev4', title: 'Karaoke Challenge', description: 'Best singer wins big prizes', gradientClass: g[4], startDate: '2026-03-01', endDate: '2026-03-07', reward: 'Crown Badge + 5,000 Diamonds', isActive: false, participants: 0 },
]

// ============================================================================
// ANNOUNCEMENTS
// ============================================================================
export const mockAnnouncements: Announcement[] = [
  { id: 'an1', title: 'System Maintenance', message: 'Scheduled maintenance on Feb 20, 2-4 AM UTC.', type: 'warning', timestamp: '2h ago', isActive: true },
  { id: 'an2', title: 'New Gift Effects!', message: 'Ultra and Legendary gift effects are now live!', type: 'update', timestamp: '5h ago', isActive: true },
  { id: 'an3', title: 'Double Diamond Weekend', message: 'Get double diamonds on all purchases this weekend!', type: 'promo', timestamp: '1d ago', isActive: true },
  { id: 'an4', title: 'SVIP Launch!', message: 'SVIP membership is now available with anti-kick and room lock features.', type: 'info', timestamp: '3d ago', isActive: true },
]

// ============================================================================
// OFFERS
// ============================================================================
export const mockOffers: Offer[] = [
  { id: 'of1', title: 'Starter Pack', description: 'Perfect for new users', discount: '80% OFF', originalPrice: '$49.99', newPrice: '$9.99', diamonds: 99900, gradientClass: g[1], expiresAt: '2026-02-25', isActive: true },
  { id: 'of2', title: 'Diamond Bundle', description: 'Best value diamond pack', discount: '50% OFF', originalPrice: '$99.99', newPrice: '$49.99', diamonds: 499900, gradientClass: g[5], expiresAt: '2026-02-28', isActive: true },
  { id: 'of3', title: 'VIP Monthly', description: 'VIP for 30 days + bonuses', discount: '30% OFF', originalPrice: '$29.99', newPrice: '$19.99', diamonds: 30000, gradientClass: g[2], expiresAt: '2026-03-05', isActive: true },
  { id: 'of4', title: 'SVIP Exclusive', description: 'SVIP for 30 days + mega bonuses', discount: '25% OFF', originalPrice: '$99.99', newPrice: '$74.99', diamonds: 100000, gradientClass: g[4], expiresAt: '2026-03-10', isActive: true },
]

// ============================================================================
// DIAMOND PACKAGES - $1 = 10,000 Diamonds
// ============================================================================
export const diamondPackages = [
  { id: 'p1', diamonds: 10000, price: '$0.99', popular: false },
  { id: 'p2', diamonds: 50000, price: '$4.99', popular: false },
  { id: 'p3', diamonds: 100000, price: '$9.99', popular: true },
  { id: 'p4', diamonds: 200000, price: '$19.99', popular: false },
  { id: 'p5', diamonds: 500000, price: '$49.99', popular: false },
  { id: 'p6', diamonds: 1000000, price: '$99.99', popular: false },
]

// VIP/SVIP PACKAGES
export const vipPackages = [
  { id: 'vip1', name: 'VIP 7 Days', price: 5000, duration: '7 days', features: ['VIP Badge', 'Priority Seat', 'Special Entry Effect'] },
  { id: 'vip2', name: 'VIP 30 Days', price: 15000, duration: '30 days', features: ['VIP Badge', 'Priority Seat', 'Special Entry Effect', 'Anti-Kick Protection'] },
  { id: 'svip1', name: 'SVIP 7 Days', price: 20000, duration: '7 days', features: ['SVIP Badge', 'Priority Seat', 'Premium Entry Effect', 'Anti-Kick', 'Room Lock'] },
  { id: 'svip2', name: 'SVIP 30 Days', price: 60000, duration: '30 days', features: ['SVIP Badge', 'Priority Seat', 'Premium Entry Effect', 'Anti-Kick', 'Room Lock', 'Custom Frame'] },
]

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
export const countryFlags: Record<string, string> = {
  BR: '\u{1F1E7}\u{1F1F7}', TR: '\u{1F1F9}\u{1F1F7}', JP: '\u{1F1EF}\u{1F1F5}', CO: '\u{1F1E8}\u{1F1F4}',
  IN: '\u{1F1EE}\u{1F1F3}', PH: '\u{1F1F5}\u{1F1ED}', CN: '\u{1F1E8}\u{1F1F3}', MA: '\u{1F1F2}\u{1F1E6}',
  FR: '\u{1F1EB}\u{1F1F7}', RU: '\u{1F1F7}\u{1F1FA}', IT: '\u{1F1EE}\u{1F1F9}', EG: '\u{1F1EA}\u{1F1EC}',
  TH: '\u{1F1F9}\u{1F1ED}', ES: '\u{1F1EA}\u{1F1F8}', KR: '\u{1F1F0}\u{1F1F7}', US: '\u{1F1FA}\u{1F1F8}',
  PK: '\u{1F1F5}\u{1F1F0}', DE: '\u{1F1E9}\u{1F1EA}', AR: '\u{1F1E6}\u{1F1F7}',
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

export function getEffectLabel(effect: GiftEffect): string {
  switch (effect) {
    case 'sparkle': return 'Sparkle'
    case 'burst': return 'Burst'
    case 'firework': return 'Firework'
    case 'ultra': return 'ULTRA'
    case 'legendary': return 'LEGENDARY'
    default: return ''
  }
}

export function getEffectColor(effect: GiftEffect): string {
  switch (effect) {
    case 'sparkle': return '#06B6D4'
    case 'burst': return '#8B5CF6'
    case 'firework': return '#FF6B35'
    case 'ultra': return '#FF2D78'
    case 'legendary': return '#FFD700'
    default: return '#8888AA'
  }
}

export function getRoleBadgeColor(role: UserRole): string {
  switch (role) {
    case 'svip': return '#FF2D78'
    case 'vip': return '#FFD700'
    case 'host': return '#8B5CF6'
    case 'moderator': return '#3B82F6'
    case 'admin': return '#EF4444'
    default: return '#8888AA'
  }
}
