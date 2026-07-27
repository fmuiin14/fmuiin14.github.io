"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Using hits.seeyoufarm.com for simple visitor counting
    async function fetchCount() {
      try {
        const response = await fetch(
          "https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Ffmuiin.github.io&count_bg=%232563EB&title_bg=%23111827&icon=&icon_color=%23E7E7E7&title=visitors&edge_flat=true",
          { mode: "no-cors" }
        );
        // Since no-cors doesn't give us the response body, we use a fallback approach
        // The badge is loaded as an image in the background
      } catch {
        // Silent fail
      }
    }

    fetchCount();
  }, []);

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
      <Eye size={12} />
      {/* Use the hits badge as an image for reliable counting */}
      <img
        src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Ffmuiin.github.io&count_bg=%232563EB&title_bg=%23111827&icon=&icon_color=%23E7E7E7&title=visits&edge_flat=true"
        alt="Visitor count"
        className="h-5"
      />
    </span>
  );
}
