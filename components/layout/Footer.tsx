import Link from "next/link";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/Icons";
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
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between">
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

        {/* Built with */}
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
      </div>
    </footer>
  );
}
