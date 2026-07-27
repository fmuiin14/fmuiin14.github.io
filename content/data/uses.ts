import type { UsesCategory } from "@/types";

export const usesData: UsesCategory[] = [
  {
    title: "Hardware",
    items: [
      { name: "MacBook Pro 14\"", description: "M3 Pro, 18GB RAM — primary development machine" },
      { name: "Dell U2723QE", description: "27\" 4K monitor for coding" },
      { name: "Keychron K2", description: "Mechanical keyboard with brown switches" },
      { name: "Logitech MX Master 3S", description: "Ergonomic mouse" },
      { name: "Sony WH-1000XM5", description: "Noise cancelling headphones for focus" },
    ],
  },
  {
    title: "Editor & Terminal",
    items: [
      { name: "VS Code", description: "Primary editor with Vim keybindings", link: "https://code.visualstudio.com" },
      { name: "PhpStorm", description: "For complex Laravel projects", link: "https://www.jetbrains.com/phpstorm" },
      { name: "iTerm2", description: "Terminal emulator with tmux", link: "https://iterm2.com" },
      { name: "Zsh + Oh My Zsh", description: "Shell with custom aliases" },
      { name: "Fira Code", description: "Monospace font with ligatures" },
    ],
  },
  {
    title: "Development Stack",
    items: [
      { name: "Laravel", description: "PHP framework for backend APIs", link: "https://laravel.com" },
      { name: "Next.js", description: "React framework for frontend", link: "https://nextjs.org" },
      { name: "Docker", description: "Containerized development environments", link: "https://docker.com" },
      { name: "PostgreSQL", description: "Primary database", link: "https://postgresql.org" },
      { name: "Redis", description: "Caching and queues", link: "https://redis.io" },
      { name: "AWS", description: "Cloud infrastructure (EC2, RDS, S3, Lambda)" },
    ],
  },
  {
    title: "Browser & Extensions",
    items: [
      { name: "Arc Browser", description: "Primary browser", link: "https://arc.net" },
      { name: "React DevTools", description: "For React debugging" },
      { name: "Laravel Debugbar", description: "For Laravel debugging" },
      { name: "Wappalyzer", description: "Technology profiler" },
    ],
  },
  {
    title: "AI Tools",
    items: [
      { name: "GitHub Copilot", description: "AI pair programming" },
      { name: "ChatGPT", description: "Research and brainstorming" },
      { name: "Cursor", description: "AI-powered code editor" },
    ],
  },
  {
    title: "Productivity",
    items: [
      { name: "Notion", description: "Notes, docs, and project management", link: "https://notion.so" },
      { name: "Linear", description: "Issue tracking and project management", link: "https://linear.app" },
      { name: "Raycast", description: "Launcher and productivity tool", link: "https://raycast.com" },
      { name: "1Password", description: "Password management" },
      { name: "CleanShot X", description: "Screenshots and screen recording" },
    ],
  },
];
