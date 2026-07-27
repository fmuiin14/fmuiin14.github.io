import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { usesData } from "@/content/data/uses";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "The hardware, software, and tools I use for software development and productivity.",
};

export default function UsesPage() {
  return (
    <PageWrapper className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          title="Uses"
          subtitle="The tools, software, and hardware that power my daily workflow"
        />

        <div className="space-y-10">
          {usesData.map((category) => (
            <section key={category.title}>
              <h2 className="mb-4 text-lg font-semibold text-text">
                {category.title}
              </h2>
              <ul className="space-y-3">
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:border-primary/30"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-text">
                          {item.name}
                        </span>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-muted transition-colors hover:text-primary"
                            aria-label={`Visit ${item.name}`}
                          >
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm text-text-muted">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
