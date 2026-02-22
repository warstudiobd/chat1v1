import { cn } from "@/lib/utils";
import { User } from "lucide-react";

type UserAvatarProps = {
  src: string | null;
  name: string | null;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showOnline?: boolean;
  className?: string;
};

const sizeMap = {
  xs: "h-7 w-7",
  sm: "h-9 w-9",
  md: "h-12 w-12",
  lg: "h-16 w-16",
  xl: "h-24 w-24",
};

const iconSizeMap = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-7 w-7",
  xl: "h-10 w-10",
};

export function UserAvatar({
  src,
  name,
  size = "md",
  showOnline,
  className,
}: UserAvatarProps) {
  return (
    <div className={cn("relative shrink-0", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-full bg-muted flex items-center justify-center",
          sizeMap[size]
        )}
      >
        {src ? (
          <img
            src={src}
            alt={name || "User"}
            className="h-full w-full object-cover"
          />
        ) : (
          <User className={cn("text-muted-foreground", iconSizeMap[size])} />
        )}
      </div>
      {showOnline && (
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
      )}
    </div>
  );
}
