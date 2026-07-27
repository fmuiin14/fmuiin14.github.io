import { Star, GitFork, Users, BookOpen } from "lucide-react";
import type { GitHubStats as GitHubStatsType } from "@/types";

interface GitHubStatsProps {
  stats: GitHubStatsType;
}

const statItems = [
  { key: "totalRepos", label: "Repositories", icon: BookOpen },
  { key: "totalStars", label: "Stars", icon: Star },
  { key: "totalForks", label: "Forks", icon: GitFork },
  { key: "followers", label: "Followers", icon: Users },
] as const;

export function GitHubStatsDisplay({ stats }: GitHubStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {statItems.map(({ key, label, icon: Icon }) => (
        <div
          key={key}
          className="rounded-lg border border-border p-4 text-center"
        >
          <Icon size={20} className="mx-auto text-primary" />
          <p className="mt-2 text-2xl font-bold text-text">
            {stats[key]}
          </p>
          <p className="text-xs text-text-muted">{label}</p>
        </div>
      ))}
    </div>
  );
}
