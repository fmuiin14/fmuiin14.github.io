import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Featured projects showcasing my engineering approach to solving real-world business problems.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <PageWrapper className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Projects"
          subtitle="A collection of projects that showcase my engineering approach to solving real-world problems"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
