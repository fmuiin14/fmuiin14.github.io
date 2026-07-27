import Link from "next/link";
import type { Project } from "@/types";
import { TechBadge } from "@/components/shared/TechBadge";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col rounded-lg border border-border bg-surface p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Cover image placeholder */}
      <div className="mb-4 aspect-video w-full overflow-hidden rounded-md bg-background">
        <div className="flex h-full items-center justify-center text-sm text-text-muted">
          {project.title}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-text transition-colors group-hover:text-primary">
        {project.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted line-clamp-3">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.slice(0, 5).map((tech) => (
          <TechBadge key={tech} name={tech} />
        ))}
      </div>
    </Link>
  );
}
