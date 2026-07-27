import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RepoCard } from "@/components/shared/RepoCard";
import { GitHubStatsDisplay } from "@/components/shared/GitHubStats";
import { getGitHubRepos, getGitHubStats } from "@/lib/github";
import { siteConfig } from "@/lib/constants";
import { GitHubIcon } from "@/components/shared/Icons";

export const metadata: Metadata = {
  title: "Open Source",
  description:
    "My open source contributions and GitHub repositories.",
};

export default async function OpenSourcePage() {
  const [repos, stats] = await Promise.all([
    getGitHubRepos(),
    getGitHubStats(),
  ]);

  return (
    <PageWrapper className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Open Source"
          subtitle="Contributing to the developer community and building tools that help others"
        />

        {/* GitHub Stats */}
        <div className="mb-12">
          <GitHubStatsDisplay stats={stats} />
        </div>

        {/* Profile link */}
        <div className="mb-8">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-text transition-colors hover:border-primary/50 hover:text-primary"
          >
            <GitHubIcon size={16} />
            @{siteConfig.githubUsername}
          </a>
        </div>

        {/* Repositories */}
        <h3 className="mb-6 text-xl font-semibold text-text">
          Repositories
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {repos.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
