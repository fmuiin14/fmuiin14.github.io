"use client";

import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);

  useEffect(() => {
    // Extract headings from rendered content
    const matches = content.match(/^#{2,3}\s+.+$/gm);
    if (!matches) return;

    const items = matches.map((match) => {
      const level = match.startsWith("###") ? 3 : 2;
      const text = match.replace(/^#{2,3}\s+/, "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return { id, text, level };
    });

    setHeadings(items);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <nav className="rounded-lg border border-border p-4" aria-label="Table of contents">
      <h4 className="mb-3 text-sm font-semibold text-text">On this page</h4>
      <ul className="space-y-1.5">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`block text-sm text-text-muted transition-colors hover:text-text ${
                heading.level === 3 ? "pl-4" : ""
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
