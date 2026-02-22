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

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

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
