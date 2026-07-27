import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TimelineItem } from "@/components/shared/TimelineItem";
import { experiences } from "@/content/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "My professional journey as a Full Stack Software Engineer — companies, roles, and achievements.",
};

export default function ExperiencePage() {
  return (
    <PageWrapper className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          title="Experience"
          subtitle="My professional journey building software that matters"
        />
        <div className="mt-8">
          {experiences.map((exp, index) => (
            <TimelineItem key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
