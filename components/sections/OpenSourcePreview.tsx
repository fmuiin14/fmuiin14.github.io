import Link from "next/link";
import { ArrowRight, Star, GitFork } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GitHubIcon } from "@/components/shared/Icons";

// Placeholder data — will be replaced with real GitHub API data in Task 7
const previewRepos = [
  {
    name: "laravel-api-toolkit",
    description:
      "A toolkit for building robust REST APIs with Laravel including authentication, pagination, and error handling.",
    stars: 45,
    forks: 12,
    language: "PHP",
  },
  {
    name: "vue-dashboard-starter",
    description:
      "Production-ready Vue.js dashboard template with authentication, state management, and component library.",
    stars: 32,
    forks: 8,
    language: "Vue",
  },
  {
    name: "docker-laravel",
    description:
      "Docker development environment for Laravel applications with MySQL, Redis, and Nginx.",
    stars: 28,
    forks: 15,
    language: "Dockerfile",
  },
];

export function OpenSourcePreview() {
  return (
    <AnimatedSection className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Open Source"
          subtitle="Contributing to the developer community"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {previewRepos.map((repo) => (
            <div
              key={repo.name}
              className="rounded-lg border border-border p-5 transition-colors hover:border-primary/30"
            >
              <div className="flex items-center gap-2">
                <GitHubIcon size={16} className="text-text-muted" />
                <h3 className="font-medium text-text">{repo.name}</h3>
              </div>
              <p className="mt-2 text-sm text-text-muted line-clamp-2">
                {repo.description}
              </p>
              <div className="mt-4 flex items-center gap-4 text-sm text-text-muted">
                <span className="flex items-center gap-1">
                  <Star size={14} />
                  {repo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={14} />
                  {repo.forks}
                </span>
                <span>{repo.language}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/open-source"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-accent"
          >
            View all contributions
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
