import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", className)}>
      <h2 className="text-3xl font-bold text-text">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-lg text-text-muted">{subtitle}</p>
      )}
    </div>
  );
}
