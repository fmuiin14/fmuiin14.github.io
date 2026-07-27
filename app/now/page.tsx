import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { nowData, lastUpdated } from "@/content/data/now";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What I'm currently focused on, learning, reading, and building.",
};

export default function NowPage() {
  return (
    <PageWrapper className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          title="Now"
          subtitle="What I'm currently focused on"
        />

        <p className="mb-8 text-sm text-text-muted">
          Last updated: {formatDate(lastUpdated)} — Inspired by{" "}
          <a
            href="https://nownownow.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-accent"
          >
            nownownow.com
          </a>
        </p>

        <div className="space-y-8">
          {nowData.map((section) => (
            <section key={section.category}>
              <h2 className="mb-3 text-lg font-semibold text-text">
                {section.category}
              </h2>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i} className="flex gap-3 text-text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
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
