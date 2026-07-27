import Link from "next/link";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/Icons";
import { VisitorCounter } from "@/components/shared/VisitorCounter";
import { siteConfig, socialLinks } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  github: <GitHubIcon size={18} />,
  linkedin: <LinkedInIcon size={18} />,
  mail: <Mail size={18} />,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Copyright */}
          <p className="text-sm text-text-muted">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted transition-colors hover:text-text"
                aria-label={link.name}
              >
                {iconMap[link.icon]}
              </a>
            ))}
          </div>

          {/* Built with + Visitor Counter */}
          <div className="flex items-center gap-4">
            <p className="text-sm text-text-muted">
              Built with{" "}
              <Link
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text transition-colors hover:text-primary"
              >
                Next.js
              </Link>
            </p>
            <VisitorCounter />
          </div>
        </div>

        {/* ⌘K hint */}
        <div className="mt-6 text-center">
          <p className="text-xs text-text-muted">
            Press{" "}
            <kbd className="rounded border border-border px-1.5 py-0.5 text-xs">
              ⌘K
            </kbd>{" "}
            to navigate quickly
          </p>
        </div>
      </div>
    </footer>
  );
}
