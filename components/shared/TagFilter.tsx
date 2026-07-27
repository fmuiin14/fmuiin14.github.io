"use client";

import { cn } from "@/lib/utils";

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

export function TagFilter({ tags, selectedTag, onTagSelect }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onTagSelect(null)}
        className={cn(
          "rounded-full px-3 py-1 text-sm font-medium transition-colors",
          selectedTag === null
            ? "bg-primary text-white"
            : "bg-surface text-text-muted hover:text-text"
        )}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onTagSelect(tag)}
          className={cn(
            "rounded-full px-3 py-1 text-sm font-medium transition-colors",
            selectedTag === tag
              ? "bg-primary text-white"
              : "bg-surface text-text-muted hover:text-text"
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
