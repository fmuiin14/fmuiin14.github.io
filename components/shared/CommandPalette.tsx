"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  Home,
  FolderOpen,
  BookOpen,
  Briefcase,
  Code,
  FileText,
  Mail,
  Download,
  Copy,
  ExternalLink,
  Search,
  User,
  Wrench,
  Clock,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/Icons";
import { siteConfig } from "@/lib/constants";

// Blog posts for search (hardcoded titles for static export)
const blogPosts = [
  {
    slug: "building-scalable-apis-with-laravel",
    title: "Building Scalable APIs with Laravel",
  },
  {
    slug: "ai-integration-patterns",
    title: "AI Integration Patterns for Web Applications",
  },
  {
    slug: "docker-development-workflow",
    title: "Docker Development Workflow for PHP Developers",
  },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Listen for ⌘K / Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(siteConfig.email);
    setOpen(false);
  }, []);

  const openExternal = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command Palette"
      className="fixed inset-0 z-50"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Dialog */}
      <div className="fixed top-[20%] left-1/2 w-full max-w-lg -translate-x-1/2 rounded-xl border border-border bg-surface shadow-2xl">
        <div className="flex items-center gap-2 border-b border-border px-4">
          <Search size={16} className="text-text-muted" />
          <Command.Input
            placeholder="Type a command or search..."
            className="h-12 w-full bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 text-xs text-text-muted">
            ESC
          </kbd>
        </div>

        <Command.List className="max-h-[300px] overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-text-muted">
            No results found.
          </Command.Empty>

          {/* Navigation */}
          <Command.Group
            heading="Navigation"
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-text-muted"
          >
            <CommandItem icon={<Home size={16} />} onSelect={() => navigate("/")}>
              Home
            </CommandItem>
            <CommandItem icon={<User size={16} />} onSelect={() => navigate("/about")}>
              About
            </CommandItem>
            <CommandItem icon={<FolderOpen size={16} />} onSelect={() => navigate("/projects")}>
              Projects
            </CommandItem>
            <CommandItem icon={<BookOpen size={16} />} onSelect={() => navigate("/blog")}>
              Blog
            </CommandItem>
            <CommandItem icon={<Briefcase size={16} />} onSelect={() => navigate("/experience")}>
              Experience
            </CommandItem>
            <CommandItem icon={<Code size={16} />} onSelect={() => navigate("/open-source")}>
              Open Source
            </CommandItem>
            <CommandItem icon={<FileText size={16} />} onSelect={() => navigate("/resume")}>
              Resume
            </CommandItem>
            <CommandItem icon={<Mail size={16} />} onSelect={() => navigate("/contact")}>
              Contact
            </CommandItem>
            <CommandItem icon={<Wrench size={16} />} onSelect={() => navigate("/uses")}>
              Uses
            </CommandItem>
            <CommandItem icon={<Clock size={16} />} onSelect={() => navigate("/now")}>
              Now
            </CommandItem>
          </Command.Group>

          {/* Blog Search */}
          <Command.Group
            heading="Blog Posts"
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-text-muted"
          >
            {blogPosts.map((post) => (
              <CommandItem
                key={post.slug}
                icon={<BookOpen size={16} />}
                onSelect={() => navigate(`/blog/${post.slug}`)}
              >
                {post.title}
              </CommandItem>
            ))}
          </Command.Group>

          {/* Actions */}
          <Command.Group
            heading="Actions"
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-text-muted"
          >
            <CommandItem icon={<Copy size={16} />} onSelect={copyEmail}>
              Copy Email Address
            </CommandItem>
            <CommandItem
              icon={<Download size={16} />}
              onSelect={() => navigate("/resume")}
            >
              Download Resume
            </CommandItem>
            <CommandItem
              icon={<GitHubIcon size={16} />}
              onSelect={() => openExternal(siteConfig.github)}
            >
              Open GitHub
            </CommandItem>
            <CommandItem
              icon={<LinkedInIcon size={16} />}
              onSelect={() => openExternal(siteConfig.linkedin)}
            >
              Open LinkedIn
            </CommandItem>
            <CommandItem
              icon={<ExternalLink size={16} />}
              onSelect={() => openExternal(`mailto:${siteConfig.email}`)}
            >
              Send Email
            </CommandItem>
          </Command.Group>
        </Command.List>

        {/* Footer hint */}
        <div className="border-t border-border px-4 py-2">
          <p className="text-xs text-text-muted">
            Navigate with arrow keys, select with Enter
          </p>
        </div>
      </div>
    </Command.Dialog>
  );
}

function CommandItem({
  children,
  icon,
  onSelect,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-text-muted transition-colors data-[selected=true]:bg-background data-[selected=true]:text-text"
    >
      {icon}
      {children}
    </Command.Item>
  );
}
