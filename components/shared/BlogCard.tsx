import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group rounded-lg border border-border p-6 transition-all hover:border-primary/50"
    >
      <div className="flex items-center gap-3 text-sm text-text-muted">
        <span className="flex items-center gap-1">
          <Calendar size={14} />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </span>
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {post.readingTime}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-text transition-colors group-hover:text-primary">
        {post.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted line-clamp-2">
        {post.excerpt}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
