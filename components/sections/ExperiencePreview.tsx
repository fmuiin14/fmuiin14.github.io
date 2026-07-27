import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { experiences } from "@/content/data/experience";

export function ExperiencePreview() {
  const recentExperiences = experiences.slice(0, 3);

  return (
    <AnimatedSection className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Experience"
          subtitle="Where I've worked and what I've built"
        />
        <div className="space-y-6">
          {recentExperiences.map((exp) => (
            <div
              key={exp.id}
              className="flex gap-4 rounded-lg border border-border p-5 transition-colors hover:border-primary/30"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Briefcase size={18} className="text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-semibold text-text">{exp.role}</h3>
                  <span className="text-sm text-text-muted">
                    {exp.duration}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-primary">{exp.company}</p>
                <p className="mt-2 text-sm text-text-muted">
                  {exp.achievements[0]}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-accent"
          >
            View full experience
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
