import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { skills, skillCategories } from "@/content/data/skills";
import type { SkillCategory } from "@/types";

export function SkillsSection() {
  const categories = Object.keys(skillCategories) as SkillCategory[];

  return (
    <AnimatedSection className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="The tools and technologies I work with daily"
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const categorySkills = skills.filter(
              (s) => s.category === category
            );
            return (
              <div key={category}>
                <h3 className="mb-3 text-sm font-semibold tracking-wider text-text-muted uppercase">
                  {skillCategories[category]}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill.name}
                      className="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-text transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
