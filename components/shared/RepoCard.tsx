import { Star, GitFork } from "lucide-react";
import type { GitHubRepo } from "@/types";

interface RepoCardProps {
  repo: GitHubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-lg border border-border p-5 transition-all hover:border-primary/50"
    >
      <h3 className="font-medium text-text transition-colors group-hover:text-primary">
        {repo.name}
      </h3>
      <p className="mt-2 text-sm text-text-muted line-clamp-2">
        {repo.description}
      </p>
      <div className="mt-4 flex items-center gap-4 text-sm text-text-muted">
        <span className="flex items-center gap-1.5">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: repo.languageColor }}
          />
          {repo.language}
        </span>
        <span className="flex items-center gap-1">
          <Star size={14} />
          {repo.stars}
        </span>
        <span className="flex items-center gap-1">
          <GitFork size={14} />
          {repo.forks}
        </span>
      </div>
    </a>
  );
}
