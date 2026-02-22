"use client";

import { createContext, useContext, type ReactNode } from "react";

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
};

const UserContext = createContext<UserContextType>({ profile: null });

export function UserProvider({
  profile,
  children,
}: {
  profile: Profile | null;
  children: ReactNode;
}) {
  return (
    <UserContext.Provider value={{ profile }}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
