import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";

// Placeholder data — will be replaced with real MDX content in Task 6
const previewArticles = [
  {
    slug: "building-scalable-apis-with-laravel",
    title: "Building Scalable APIs with Laravel",
    excerpt:
      "A practical guide to designing and implementing REST APIs that can handle millions of requests with Laravel.",
    date: "2024-01-15",
    readingTime: "8 min read",
    tags: ["Laravel", "API", "Architecture"],
  },
  {
    slug: "ai-integration-patterns",
    title: "AI Integration Patterns for Web Applications",
    excerpt:
      "Exploring practical patterns for integrating AI capabilities into existing web applications without over-engineering.",
    date: "2024-01-02",
    readingTime: "6 min read",
    tags: ["AI", "Architecture", "Laravel"],
  },
  {
    slug: "docker-development-workflow",
    title: "Docker Development Workflow for PHP Developers",
    excerpt:
      "How to set up a productive Docker-based development environment for PHP and Laravel projects.",
    date: "2023-12-20",
    readingTime: "5 min read",
    tags: ["Docker", "PHP", "DevOps"],
  },
];

export function LatestArticles() {
  return (
    <AnimatedSection className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Latest Articles"
          subtitle="Thoughts on software engineering and technology"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {previewArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group rounded-lg border border-border bg-background p-6 transition-all hover:border-primary/50"
            >
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <Calendar size={14} />
                <time>{article.date}</time>
                <span>·</span>
                <span>{article.readingTime}</span>
              </div>
              <h3 className="mt-3 font-semibold text-text transition-colors group-hover:text-primary">
                {article.title}
              </h3>
              <p className="mt-2 text-sm text-text-muted line-clamp-2">
                {article.excerpt}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface px-2 py-0.5 text-xs text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-accent"
          >
            View all articles
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
