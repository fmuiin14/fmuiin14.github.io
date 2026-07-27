"use client";

import { useState } from "react";
import type { BlogPost } from "@/types";
import { BlogCard } from "@/components/shared/BlogCard";
import { TagFilter } from "@/components/shared/TagFilter";

interface BlogListProps {
  posts: BlogPost[];
  tags: string[];
}

export function BlogList({ posts, tags }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts;

  return (
    <div>
      <div className="mb-8">
        <TagFilter
          tags={tags}
          selectedTag={selectedTag}
          onTagSelect={setSelectedTag}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      {filteredPosts.length === 0 && (
        <p className="text-center text-text-muted">
          No articles found for this tag.
        </p>
      )}
    </div>
  );
}
