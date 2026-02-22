import { createClient } from "@/lib/supabase/server";
import { UserProvider } from "@/components/user-provider";
import { BottomNav } from "@/components/bottom-nav";
import { Sidebar } from "@/components/sidebar";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  let { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Fallback: if no profile exists (e.g. OAuth user before trigger existed),
  // create one on-the-fly from the auth metadata.
  if (!profile) {
    const meta = user.user_metadata ?? {};
    const displayName =
      meta.display_name ?? meta.full_name ?? meta.name ?? user.email?.split("@")[0] ?? "User";
    const avatarUrl = meta.avatar_url ?? meta.picture ?? null;

    const { data: newProfile } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        display_name: displayName,
        avatar_url: avatarUrl,
        username: displayName.toLowerCase().replace(/\s+/g, "_"),
      })
      .select("*")
      .single();

    profile = newProfile;
  }

  return (
    <UserProvider profile={profile}>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 pb-20 md:ml-64 md:pb-0">{children}</main>
        <BottomNav />
      </div>
    </UserProvider>
  );
}
