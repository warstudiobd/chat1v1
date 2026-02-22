import { createClient } from "@/lib/supabase/server";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default async function AdminPage() {
  const supabase = await createClient();

  const { count: totalUsers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  const { count: activeRooms } = await supabase
    .from("voice_rooms")
    .select("*", { count: "exact", head: true })
    .eq("is_live", true);

  const { data: recentUsers } = await supabase
    .from("profiles")
    .select("id, display_name, diamonds, level, role, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  const { data: recentRooms } = await supabase
    .from("voice_rooms")
    .select(
      `
      id, name, category, viewer_count, is_live, created_at,
      owner:profiles!voice_rooms_owner_id_fkey ( display_name )
    `
    )
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <AdminDashboard
      stats={{
        totalUsers: totalUsers || 0,
        activeRooms: activeRooms || 0,
      }}
      recentUsers={(recentUsers || []) as any}
      recentRooms={(recentRooms || []) as any}
    />
  );
}
