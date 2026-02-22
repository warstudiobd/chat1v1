"use client";

import { createContext, useContext, type ReactNode } from "react";

export type Profile = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  country: string | null;
  gender: string | null;
  diamonds: number;
  beans: number;
  xp: number;
  level: number;
  is_vip: boolean;
  is_svip: boolean;
  vip_expiry: string | null;
  created_at: string;
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
