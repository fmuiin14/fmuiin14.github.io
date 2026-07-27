import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  className?: string;
}

export function TechBadge({ name, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-text-muted",
        className
      )}
    >
      {name}
    </span>
  );
}
