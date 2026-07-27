import type { GitHubRepo, GitHubStats } from "@/types";
import { siteConfig } from "@/lib/constants";

const GITHUB_API = "https://api.github.com";
const USERNAME = siteConfig.githubUsername;

// Language color mapping
const languageColors: Record<string, string> = {
  PHP: "#4F5D95",
  JavaScript: "#F1E05A",
  TypeScript: "#3178C6",
  Python: "#3572A5",
  Vue: "#41B883",
  HTML: "#E34C26",
  CSS: "#563D7C",
  Shell: "#89E051",
  Dockerfile: "#384D54",
  Blade: "#F7523F",
  Go: "#00ADD8",
  Rust: "#DEA584",
  Java: "#B07219",
};

interface GitHubAPIRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

interface GitHubAPIUser {
  public_repos: number;
  followers: number;
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${USERNAME}/repos?sort=stars&per_page=20&type=owner`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      console.warn("GitHub API failed, using fallback data");
      return getFallbackRepos();
    }

    const repos: GitHubAPIRepo[] = await response.json();

    return repos
      .filter((repo) => repo.description) // Only repos with description
      .map((repo) => ({
        name: repo.name,
        description: repo.description || "",
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || "Unknown",
        languageColor: languageColors[repo.language || ""] || "#8B8B8B",
      }))
      .sort((a, b) => b.stars - a.stars);
  } catch {
    console.warn("GitHub API error, using fallback data");
    return getFallbackRepos();
  }
}

export async function getGitHubStats(): Promise<GitHubStats> {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${GITHUB_API}/users/${USERNAME}`, {
        next: { revalidate: 3600 },
      }),
      fetch(
        `${GITHUB_API}/users/${USERNAME}/repos?per_page=100&type=owner`,
        { next: { revalidate: 3600 } }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return getFallbackStats();
    }

    const user: GitHubAPIUser = await userRes.json();
    const repos: GitHubAPIRepo[] = await reposRes.json();

    const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
    const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

    return {
      totalRepos: user.public_repos,
      totalStars,
      totalForks,
      followers: user.followers,
    };
  } catch {
    return getFallbackStats();
  }
}

// Fallback data in case GitHub API is unavailable during build
function getFallbackRepos(): GitHubRepo[] {
  return [
    {
      name: "laravel-api-toolkit",
      description:
        "A toolkit for building robust REST APIs with Laravel including authentication, pagination, and error handling.",
      url: `https://github.com/${USERNAME}/laravel-api-toolkit`,
      stars: 45,
      forks: 12,
      language: "PHP",
      languageColor: "#4F5D95",
    },
    {
      name: "vue-dashboard-starter",
      description:
        "Production-ready Vue.js dashboard template with authentication, state management, and component library.",
      url: `https://github.com/${USERNAME}/vue-dashboard-starter`,
      stars: 32,
      forks: 8,
      language: "Vue",
      languageColor: "#41B883",
    },
    {
      name: "docker-laravel",
      description:
        "Docker development environment for Laravel applications with MySQL, Redis, and Nginx.",
      url: `https://github.com/${USERNAME}/docker-laravel`,
      stars: 28,
      forks: 15,
      language: "Dockerfile",
      languageColor: "#384D54",
    },
    {
      name: "next-portfolio",
      description:
        "Personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.",
      url: `https://github.com/${USERNAME}/next-portfolio`,
      stars: 15,
      forks: 3,
      language: "TypeScript",
      languageColor: "#3178C6",
    },
  ];
}

function getFallbackStats(): GitHubStats {
  return {
    totalRepos: 25,
    totalStars: 120,
    totalForks: 38,
    followers: 50,
  };
}
