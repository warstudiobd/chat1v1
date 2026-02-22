// LotChat Gift System - 120+ gifts
// 1$ = 10,000 coins. Minimum gift = 100 coins.

export type GiftCategory = "love" | "fun" | "luxury" | "festival" | "vip" | "animated" | "magic" | "nature";

export type Gift = {
  id: string;
  name: string;
  cost: number;
  emoji: string;
  category: GiftCategory;
  animation: "fly" | "burst" | "rain" | "spin" | "shake" | "hearts" | "firework" | "mega";
};

export const GIFT_CATEGORIES: { id: GiftCategory; label: string }[] = [
  { id: "love", label: "Love" },
  { id: "fun", label: "Fun" },
  { id: "luxury", label: "Luxury" },
  { id: "festival", label: "Festival" },
  { id: "vip", label: "VIP" },
  { id: "animated", label: "Animated" },
  { id: "magic", label: "Magic" },
  { id: "nature", label: "Nature" },
];

export const GIFTS: Gift[] = [
  // LOVE category (100-5000 coins)
  { id: "rose", name: "Rose", cost: 100, emoji: "\u{1F339}", category: "love", animation: "fly" },
  { id: "heart", name: "Heart", cost: 100, emoji: "\u{2764}\u{FE0F}", category: "love", animation: "hearts" },
  { id: "kiss", name: "Kiss", cost: 200, emoji: "\u{1F48B}", category: "love", animation: "fly" },
  { id: "love-letter", name: "Love Letter", cost: 300, emoji: "\u{1F48C}", category: "love", animation: "fly" },
  { id: "bouquet", name: "Bouquet", cost: 500, emoji: "\u{1F490}", category: "love", animation: "burst" },
  { id: "cupid", name: "Cupid", cost: 800, emoji: "\u{1F498}", category: "love", animation: "hearts" },
  { id: "chocolate", name: "Chocolate Box", cost: 1000, emoji: "\u{1F36B}", category: "love", animation: "burst" },
  { id: "teddy-bear", name: "Teddy Bear", cost: 1500, emoji: "\u{1F9F8}", category: "love", animation: "shake" },
  { id: "diamond-ring", name: "Diamond Ring", cost: 2000, emoji: "\u{1F48D}", category: "love", animation: "spin" },
  { id: "love-potion", name: "Love Potion", cost: 3000, emoji: "\u{1F9EA}", category: "love", animation: "burst" },
  { id: "red-heart-box", name: "Heart Box", cost: 4000, emoji: "\u{1F381}", category: "love", animation: "hearts" },
  { id: "forever-rose", name: "Forever Rose", cost: 5000, emoji: "\u{1F33A}", category: "love", animation: "hearts" },

  // FUN category (100-5000 coins)
  { id: "thumbs-up", name: "Thumbs Up", cost: 100, emoji: "\u{1F44D}", category: "fun", animation: "fly" },
  { id: "clap", name: "Clap", cost: 100, emoji: "\u{1F44F}", category: "fun", animation: "burst" },
  { id: "lollipop", name: "Lollipop", cost: 200, emoji: "\u{1F36D}", category: "fun", animation: "fly" },
  { id: "beer", name: "Beer", cost: 300, emoji: "\u{1F37A}", category: "fun", animation: "shake" },
  { id: "pizza", name: "Pizza", cost: 300, emoji: "\u{1F355}", category: "fun", animation: "fly" },
  { id: "ice-cream", name: "Ice Cream", cost: 400, emoji: "\u{1F366}", category: "fun", animation: "fly" },
  { id: "donut", name: "Donut", cost: 500, emoji: "\u{1F369}", category: "fun", animation: "spin" },
  { id: "cake", name: "Cake", cost: 800, emoji: "\u{1F382}", category: "fun", animation: "burst" },
  { id: "popcorn", name: "Popcorn", cost: 500, emoji: "\u{1F37F}", category: "fun", animation: "rain" },
  { id: "party-hat", name: "Party Hat", cost: 600, emoji: "\u{1F389}", category: "fun", animation: "firework" },
  { id: "confetti", name: "Confetti", cost: 1000, emoji: "\u{1F38A}", category: "fun", animation: "rain" },
  { id: "balloon", name: "Balloon", cost: 700, emoji: "\u{1F388}", category: "fun", animation: "fly" },
  { id: "trophy", name: "Trophy", cost: 2000, emoji: "\u{1F3C6}", category: "fun", animation: "burst" },
  { id: "medal", name: "Gold Medal", cost: 1500, emoji: "\u{1F3C5}", category: "fun", animation: "spin" },
  { id: "dice", name: "Lucky Dice", cost: 500, emoji: "\u{1F3B2}", category: "fun", animation: "shake" },
  { id: "guitar", name: "Guitar", cost: 3000, emoji: "\u{1F3B8}", category: "fun", animation: "shake" },

  // LUXURY category (5000-100000 coins)
  { id: "perfume", name: "Perfume", cost: 5000, emoji: "\u{1F9F4}", category: "luxury", animation: "burst" },
  { id: "handbag", name: "Handbag", cost: 8000, emoji: "\u{1F45C}", category: "luxury", animation: "spin" },
  { id: "high-heel", name: "High Heel", cost: 6000, emoji: "\u{1F460}", category: "luxury", animation: "fly" },
  { id: "watch", name: "Luxury Watch", cost: 10000, emoji: "\u{231A}", category: "luxury", animation: "spin" },
  { id: "diamond", name: "Diamond", cost: 15000, emoji: "\u{1F48E}", category: "luxury", animation: "spin" },
  { id: "crown", name: "Crown", cost: 20000, emoji: "\u{1F451}", category: "luxury", animation: "burst" },
  { id: "sports-car", name: "Sports Car", cost: 30000, emoji: "\u{1F3CE}\u{FE0F}", category: "luxury", animation: "shake" },
  { id: "helicopter", name: "Helicopter", cost: 40000, emoji: "\u{1F681}", category: "luxury", animation: "fly" },
  { id: "yacht", name: "Yacht", cost: 50000, emoji: "\u{1F6F3}\u{FE0F}", category: "luxury", animation: "shake" },
  { id: "jet", name: "Private Jet", cost: 60000, emoji: "\u{2708}\u{FE0F}", category: "luxury", animation: "fly" },
  { id: "castle", name: "Castle", cost: 80000, emoji: "\u{1F3F0}", category: "luxury", animation: "mega" },
  { id: "island", name: "Private Island", cost: 100000, emoji: "\u{1F3DD}\u{FE0F}", category: "luxury", animation: "mega" },
  { id: "rocket-lux", name: "Rocket", cost: 50000, emoji: "\u{1F680}", category: "luxury", animation: "fly" },
  { id: "money-bag", name: "Money Bag", cost: 25000, emoji: "\u{1F4B0}", category: "luxury", animation: "rain" },
  { id: "gem-stone", name: "Gem Stone", cost: 35000, emoji: "\u{1F48E}", category: "luxury", animation: "spin" },
  { id: "gold-bar", name: "Gold Bar", cost: 45000, emoji: "\u{1FAA9}", category: "luxury", animation: "burst" },

  // FESTIVAL category (500-20000 coins)
  { id: "firecracker", name: "Firecracker", cost: 500, emoji: "\u{1F9E8}", category: "festival", animation: "firework" },
  { id: "fireworks", name: "Fireworks", cost: 2000, emoji: "\u{1F386}", category: "festival", animation: "firework" },
  { id: "sparkler", name: "Sparkler", cost: 800, emoji: "\u{1F387}", category: "festival", animation: "firework" },
  { id: "christmas-tree", name: "Xmas Tree", cost: 3000, emoji: "\u{1F384}", category: "festival", animation: "burst" },
  { id: "santa", name: "Santa", cost: 5000, emoji: "\u{1F385}", category: "festival", animation: "fly" },
  { id: "gift-box", name: "Gift Box", cost: 1500, emoji: "\u{1F381}", category: "festival", animation: "shake" },
  { id: "snowman", name: "Snowman", cost: 2000, emoji: "\u{26C4}", category: "festival", animation: "shake" },
  { id: "lantern", name: "Lantern", cost: 1000, emoji: "\u{1F3EE}", category: "festival", animation: "fly" },
  { id: "moon-cake", name: "Moon Cake", cost: 1200, emoji: "\u{1F96E}", category: "festival", animation: "fly" },
  { id: "dragon", name: "Dragon", cost: 8000, emoji: "\u{1F409}", category: "festival", animation: "mega" },
  { id: "pumpkin", name: "Pumpkin", cost: 1500, emoji: "\u{1F383}", category: "festival", animation: "shake" },
  { id: "ghost", name: "Ghost", cost: 600, emoji: "\u{1F47B}", category: "festival", animation: "fly" },
  { id: "skull", name: "Skull", cost: 800, emoji: "\u{1F480}", category: "festival", animation: "shake" },
  { id: "candy", name: "Candy", cost: 300, emoji: "\u{1F36C}", category: "festival", animation: "rain" },
  { id: "easter-egg", name: "Easter Egg", cost: 1000, emoji: "\u{1F95A}", category: "festival", animation: "fly" },
  { id: "four-leaf", name: "Four Leaf", cost: 2500, emoji: "\u{1F340}", category: "festival", animation: "rain" },

  // VIP category (10000-200000 coins)
  { id: "gold-crown", name: "Gold Crown", cost: 10000, emoji: "\u{1F451}", category: "vip", animation: "burst" },
  { id: "throne", name: "Throne", cost: 30000, emoji: "\u{1FA91}", category: "vip", animation: "mega" },
  { id: "scepter", name: "Scepter", cost: 20000, emoji: "\u{1FA84}", category: "vip", animation: "spin" },
  { id: "universe", name: "Universe", cost: 100000, emoji: "\u{1F30C}", category: "vip", animation: "mega" },
  { id: "planet", name: "Planet", cost: 80000, emoji: "\u{1FA90}", category: "vip", animation: "spin" },
  { id: "star", name: "Shooting Star", cost: 50000, emoji: "\u{1F320}", category: "vip", animation: "fly" },
  { id: "comet", name: "Comet", cost: 60000, emoji: "\u{2604}\u{FE0F}", category: "vip", animation: "fly" },
  { id: "aurora", name: "Aurora", cost: 70000, emoji: "\u{1F308}", category: "vip", animation: "mega" },
  { id: "palace", name: "Palace", cost: 150000, emoji: "\u{1F3F0}", category: "vip", animation: "mega" },
  { id: "space-station", name: "Space Station", cost: 200000, emoji: "\u{1F6F8}", category: "vip", animation: "mega" },
  { id: "diamond-vip", name: "VIP Diamond", cost: 120000, emoji: "\u{1F48E}", category: "vip", animation: "spin" },
  { id: "golden-dragon", name: "Golden Dragon", cost: 180000, emoji: "\u{1F432}", category: "vip", animation: "mega" },

  // ANIMATED category (1000-50000 coins)
  { id: "nyan-cat", name: "Nyan Cat", cost: 5000, emoji: "\u{1F431}", category: "animated", animation: "fly" },
  { id: "dancing-girl", name: "Dancer", cost: 3000, emoji: "\u{1F483}", category: "animated", animation: "shake" },
  { id: "disco-ball", name: "Disco Ball", cost: 4000, emoji: "\u{1FA69}", category: "animated", animation: "spin" },
  { id: "rainbow", name: "Rainbow", cost: 6000, emoji: "\u{1F308}", category: "animated", animation: "mega" },
  { id: "unicorn", name: "Unicorn", cost: 8000, emoji: "\u{1F984}", category: "animated", animation: "fly" },
  { id: "phoenix", name: "Phoenix", cost: 15000, emoji: "\u{1F426}\u{200D}\u{1F525}", category: "animated", animation: "mega" },
  { id: "butterfly", name: "Butterfly", cost: 2000, emoji: "\u{1F98B}", category: "animated", animation: "fly" },
  { id: "dolphin", name: "Dolphin", cost: 3000, emoji: "\u{1F42C}", category: "animated", animation: "fly" },
  { id: "eagle", name: "Eagle", cost: 5000, emoji: "\u{1F985}", category: "animated", animation: "fly" },
  { id: "lion", name: "Lion", cost: 10000, emoji: "\u{1F981}", category: "animated", animation: "shake" },
  { id: "wolf", name: "Wolf", cost: 7000, emoji: "\u{1F43A}", category: "animated", animation: "shake" },
  { id: "pegasus", name: "Pegasus", cost: 20000, emoji: "\u{1FACF}", category: "animated", animation: "fly" },
  { id: "fire-bird", name: "Fire Bird", cost: 25000, emoji: "\u{1F525}", category: "animated", animation: "mega" },
  { id: "tornado", name: "Tornado", cost: 30000, emoji: "\u{1F32A}\u{FE0F}", category: "animated", animation: "mega" },
  { id: "lightning", name: "Lightning", cost: 12000, emoji: "\u{26A1}", category: "animated", animation: "firework" },
  { id: "volcano", name: "Volcano", cost: 50000, emoji: "\u{1F30B}", category: "animated", animation: "mega" },

  // MAGIC category (2000-80000 coins)
  { id: "crystal-ball", name: "Crystal Ball", cost: 3000, emoji: "\u{1F52E}", category: "magic", animation: "spin" },
  { id: "magic-wand", name: "Magic Wand", cost: 2000, emoji: "\u{1FA84}", category: "magic", animation: "burst" },
  { id: "fairy", name: "Fairy", cost: 5000, emoji: "\u{1F9DA}", category: "magic", animation: "fly" },
  { id: "genie", name: "Genie", cost: 8000, emoji: "\u{1F9DE}", category: "magic", animation: "burst" },
  { id: "wizard", name: "Wizard", cost: 10000, emoji: "\u{1F9D9}", category: "magic", animation: "burst" },
  { id: "potion", name: "Magic Potion", cost: 4000, emoji: "\u{1F9EA}", category: "magic", animation: "burst" },
  { id: "spell-book", name: "Spell Book", cost: 6000, emoji: "\u{1F4D6}", category: "magic", animation: "shake" },
  { id: "enchanted-sword", name: "Enchanted Sword", cost: 15000, emoji: "\u{1F5E1}\u{FE0F}", category: "magic", animation: "shake" },
  { id: "magic-carpet", name: "Magic Carpet", cost: 20000, emoji: "\u{1F9F5}", category: "magic", animation: "fly" },
  { id: "portal", name: "Portal", cost: 30000, emoji: "\u{1F300}", category: "magic", animation: "mega" },
  { id: "dream-catcher", name: "Dream Catcher", cost: 12000, emoji: "\u{1F311}", category: "magic", animation: "spin" },
  { id: "ancient-scroll", name: "Ancient Scroll", cost: 25000, emoji: "\u{1F4DC}", category: "magic", animation: "burst" },
  { id: "magic-mirror", name: "Magic Mirror", cost: 40000, emoji: "\u{1FA9E}", category: "magic", animation: "spin" },
  { id: "infinity", name: "Infinity", cost: 80000, emoji: "\u{267E}\u{FE0F}", category: "magic", animation: "mega" },

  // NATURE category (200-15000 coins)
  { id: "sunflower", name: "Sunflower", cost: 200, emoji: "\u{1F33B}", category: "nature", animation: "fly" },
  { id: "cherry-blossom", name: "Cherry Blossom", cost: 500, emoji: "\u{1F338}", category: "nature", animation: "rain" },
  { id: "maple-leaf", name: "Maple Leaf", cost: 300, emoji: "\u{1F341}", category: "nature", animation: "rain" },
  { id: "tulip", name: "Tulip", cost: 400, emoji: "\u{1F337}", category: "nature", animation: "fly" },
  { id: "hibiscus", name: "Hibiscus", cost: 600, emoji: "\u{1F33A}", category: "nature", animation: "fly" },
  { id: "lotus", name: "Lotus", cost: 1000, emoji: "\u{1FAB7}", category: "nature", animation: "burst" },
  { id: "snowflake", name: "Snowflake", cost: 800, emoji: "\u{2744}\u{FE0F}", category: "nature", animation: "rain" },
  { id: "ocean-wave", name: "Ocean Wave", cost: 2000, emoji: "\u{1F30A}", category: "nature", animation: "shake" },
  { id: "sunrise", name: "Sunrise", cost: 3000, emoji: "\u{1F305}", category: "nature", animation: "burst" },
  { id: "northern-lights", name: "Northern Lights", cost: 8000, emoji: "\u{1F30C}", category: "nature", animation: "mega" },
  { id: "waterfall", name: "Waterfall", cost: 5000, emoji: "\u{1F4A7}", category: "nature", animation: "rain" },
  { id: "mountain", name: "Mountain", cost: 4000, emoji: "\u{1F3D4}\u{FE0F}", category: "nature", animation: "burst" },
  { id: "rainbow-nat", name: "Rainbow", cost: 6000, emoji: "\u{1F308}", category: "nature", animation: "mega" },
  { id: "bonsai", name: "Bonsai", cost: 2500, emoji: "\u{1F333}", category: "nature", animation: "burst" },
  { id: "garden", name: "Garden", cost: 10000, emoji: "\u{1F3E1}", category: "nature", animation: "mega" },
  { id: "aurora-nat", name: "Aurora", cost: 15000, emoji: "\u{2728}", category: "nature", animation: "mega" },
];

export function getGiftsByCategory(category: GiftCategory): Gift[] {
  return GIFTS.filter((g) => g.category === category);
}

export function formatCoinPrice(coins: number): string {
  if (coins >= 100000) return `${(coins / 1000).toFixed(0)}K`;
  if (coins >= 10000) return `${(coins / 1000).toFixed(1)}K`;
  return coins.toLocaleString();
}

// 1$ = 10,000 coins
export function coinsToDollars(coins: number): string {
  const dollars = coins / 10000;
  if (dollars < 0.01) return "$0.01";
  return `$${dollars.toFixed(2)}`;
}
