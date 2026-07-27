import type { NavItem, SocialLink } from "@/types";

export const siteConfig = {
  name: "Fathul Muiin",
  title: "Fathul Muiin - Full Stack Software Engineer",
  description:
    "Building scalable software that solves real-world business problems. Full Stack Software Engineer specializing in Laravel, Cloud, and AI-powered applications.",
  url: "https://fmuiin.github.io",
  github: "https://github.com/fmuiin",
  linkedin: "https://linkedin.com/in/fmuiin",
  email: "fathulmuiin@gmail.com",
  githubUsername: "fmuiin",
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Experience", href: "/experience" },
  { label: "Open Source", href: "/open-source" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/fmuiin",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/fmuiin",
    icon: "linkedin",
  },
  {
    name: "Email",
    url: "mailto:fathulmuiin@gmail.com",
    icon: "mail",
  },
];
