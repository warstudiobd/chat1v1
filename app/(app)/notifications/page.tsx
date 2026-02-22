import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NotificationList } from "@/components/notifications/notification-list";

export default async function NotificationsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: notifications } = await supabase
    .from("notifications")
    .select(
      `
      id,
      type,
      title,
      body,
      is_read,
      created_at,
      from_user:profiles!notifications_from_user_id_fkey (
        id, display_name, avatar_url
      )
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border bg-background/95 px-4 backdrop-blur-md">
        <h1 className="text-lg font-bold text-foreground">Notifications</h1>
      </header>
      <NotificationList
        notifications={
          notifications?.map((n) => ({
            id: n.id,
            type: n.type,
            title: n.title,
            body: n.body,
            isRead: n.is_read,
            createdAt: n.created_at,
            fromUser: n.from_user as any,
          })) || []
        }
      />
    </div>
  );
}
