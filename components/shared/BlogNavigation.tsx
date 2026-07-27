import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types";

interface BlogNavigationProps {
  previousPost: BlogPost | null;
  nextPost: BlogPost | null;
}

export function BlogNavigation({
  previousPost,
  nextPost,
}: BlogNavigationProps) {
  if (!previousPost && !nextPost) return null;

  return (
    <nav
      className="mt-12 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:justify-between"
      aria-label="Blog post navigation"
    >
      {previousPost ? (
        <Link
          href={`/blog/${previousPost.slug}`}
          className="group flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-1"
          />
          <div>
            <span className="block text-xs text-text-muted">Previous</span>
            <span className="font-medium text-text">{previousPost.title}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {nextPost ? (
        <Link
          href={`/blog/${nextPost.slug}`}
          className="group flex items-center gap-2 text-right text-sm text-text-muted transition-colors hover:text-text sm:ml-auto"
        >
          <div>
            <span className="block text-xs text-text-muted">Next</span>
            <span className="font-medium text-text">{nextPost.title}</span>
          </div>
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
