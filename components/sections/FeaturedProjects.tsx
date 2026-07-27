import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { featuredProjects } from "@/content/data/projects";

export function FeaturedProjects() {
  // Show first 3 featured projects on home page
  const displayProjects = featuredProjects.slice(0, 3);

  return (
    <AnimatedSection className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Featured Projects"
          subtitle="Selected work that showcases my engineering approach"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group rounded-lg border border-border bg-background p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <h3 className="text-lg font-semibold text-text transition-colors group-hover:text-primary">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted line-clamp-3">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-accent"
          >
            View all projects
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
