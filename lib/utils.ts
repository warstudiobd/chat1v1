import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

export function getLevelColor(level: number): string {
  if (level >= 51) return "bg-red-500";
  if (level >= 41) return "gradient-gold";
  if (level >= 31) return "bg-purple-500";
  if (level >= 21) return "bg-blue-500";
  if (level >= 11) return "bg-green-500";
  return "bg-muted-foreground/50";
}

export function getLevelTextColor(level: number): string {
  if (level >= 51) return "text-red-400";
  if (level >= 41) return "text-gold";
  if (level >= 31) return "text-purple-400";
  if (level >= 21) return "text-blue-400";
  if (level >= 11) return "text-green-400";
  return "text-muted-foreground";
}

export function calculateLevel(xp: number): { level: number; progress: number } {
  const level = Math.floor(Math.sqrt(xp / 100)) + 1;
  const currentLevelXp = Math.pow(level - 1, 2) * 100;
  const nextLevelXp = Math.pow(level, 2) * 100;
  const progress = ((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;
  return { level, progress: Math.min(progress, 100) };
}

export const GIFT_LIST = [
  { id: "rose", name: "Rose", cost: 1, emoji: "rose" },
  { id: "beer", name: "Beer", cost: 5, emoji: "beer" },
  { id: "cake", name: "Cake", cost: 10, emoji: "cake" },
  { id: "heart", name: "Heart", cost: 20, emoji: "heart" },
  { id: "fireworks", name: "Fireworks", cost: 50, emoji: "fireworks" },
  { id: "car", name: "Sports Car", cost: 100, emoji: "car" },
  { id: "yacht", name: "Yacht", cost: 500, emoji: "yacht" },
  { id: "castle", name: "Castle", cost: 1000, emoji: "castle" },
  { id: "rocket", name: "Rocket", cost: 2000, emoji: "rocket" },
  { id: "planet", name: "Planet", cost: 5000, emoji: "planet" },
] as const;

export const ROOM_CATEGORIES = [
  "All",
  "Music",
  "Chat",
  "Gaming",
  "Chill",
  "Party",
  "Study",
  "Dating",
] as const;
