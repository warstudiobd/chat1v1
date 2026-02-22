"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type Profile = {
  id: string;
  display_name: string | null;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  country: string | null;
  gender: string | null;
  phone: string | null;
  diamonds: number;
  beans: number;
  xp: number;
  level: number;
  role: string | null;
  is_online: boolean;
  is_banned: boolean;
  anti_kick: boolean;
  vip_expiry: string | null;
  svip_expiry: string | null;
  created_at: string;
  updated_at: string | null;
};

type UserContextType = {
  profile: Profile | null;
  /** Instantly update the client-side diamond count (also persists via games) */
  updateDiamonds: (newAmount: number) => void;
  /** Replace the entire profile object (e.g. after editing) */
  updateProfile: (partial: Partial<Profile>) => void;
};

const UserContext = createContext<UserContextType>({
  profile: null,
  updateDiamonds: () => {},
  updateProfile: () => {},
});

export function UserProvider({
  profile: initialProfile,
  children,
}: {
  profile: Profile | null;
  children: ReactNode;
}) {
  const [profile, setProfile] = useState<Profile | null>(initialProfile);

  const updateDiamonds = useCallback((newAmount: number) => {
    setProfile((prev) =>
      prev ? { ...prev, diamonds: Math.max(0, newAmount) } : prev
    );
  }, []);

  const updateProfile = useCallback((partial: Partial<Profile>) => {
    setProfile((prev) => (prev ? { ...prev, ...partial } : prev));
  }, []);

  return (
    <UserContext.Provider value={{ profile, updateDiamonds, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
