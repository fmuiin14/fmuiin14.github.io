import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { aboutData } from "@/content/data/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Fathul Muiin — a Full Stack Software Engineer passionate about building scalable software.",
};

export default function AboutPage() {
  return (
    <PageWrapper className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title="About Me" />

        {/* Professional Summary */}
        <section className="mb-12">
          <p className="text-lg leading-relaxed text-text-muted">
            {aboutData.summary}
          </p>
        </section>

        {/* Career Philosophy */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-text">
            Engineering Philosophy
          </h2>
          <p className="leading-relaxed text-text-muted">
            {aboutData.philosophy}
          </p>
        </section>

        {/* Mindset */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-text">
            How I Think
          </h2>
          <ul className="space-y-3">
            {aboutData.mindset.map((item, i) => (
              <li key={i} className="flex gap-3 text-text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Current Interests */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-text">
            Current Interests
          </h2>
          <ul className="space-y-3">
            {aboutData.interests.map((item, i) => (
              <li key={i} className="flex gap-3 text-text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageWrapper>
  );
}
