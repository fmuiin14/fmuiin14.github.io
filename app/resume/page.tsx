import type { Metadata } from "next";
import { Download, ExternalLink } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { experiences } from "@/content/data/experience";
import { skills, skillCategories } from "@/content/data/skills";
import type { SkillCategory } from "@/types";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Fathul Muiin's resume — Full Stack Software Engineer with 7+ years of experience.",
};

export default function ResumePage() {
  const categories = Object.keys(skillCategories) as SkillCategory[];

  return (
    <PageWrapper className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-start justify-between">
          <SectionHeading title="Resume" />
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            <Download size={16} />
            Download PDF
          </a>
        </div>

        {/* Summary */}
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-text">Summary</h2>
          <p className="text-text-muted">
            Full Stack Software Engineer with 7+ years of experience building
            scalable web applications. Specializing in Laravel, Vue.js/React,
            PostgreSQL, Redis, AWS, and Docker. Passionate about clean
            architecture, AI integration, and solving complex business problems
            with elegant software solutions.
          </p>
        </section>

        {/* Experience */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-text">Experience</h2>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id} className="border-l-2 border-border pl-4">
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-semibold text-text">{exp.role}</h3>
                  <span className="text-sm text-text-muted">
                    {exp.duration}
                  </span>
                </div>
                <p className="text-sm text-primary">{exp.company}</p>
                <ul className="mt-2 space-y-1">
                  {exp.achievements.map((a, i) => (
                    <li key={i} className="text-sm text-text-muted">
                      • {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-text">Skills</h2>
          <div className="space-y-4">
            {categories.map((category) => {
              const categorySkills = skills.filter(
                (s) => s.category === category
              );
              return (
                <div key={category}>
                  <h3 className="mb-2 text-sm font-medium text-text-muted">
                    {skillCategories[category]}
                  </h3>
                  <p className="text-sm text-text">
                    {categorySkills.map((s) => s.name).join(" · ")}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-text">Education</h2>
          <div className="border-l-2 border-border pl-4">
            <h3 className="font-semibold text-text">
              Bachelor of Computer Science
            </h3>
            <p className="text-sm text-primary">University</p>
            <p className="text-sm text-text-muted">2012 - 2016</p>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
