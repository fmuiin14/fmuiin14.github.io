import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TechBadge } from "@/components/shared/TechBadge";
import { GitHubIcon } from "@/components/shared/Icons";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <PageWrapper className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        {/* Back link */}
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </Link>

        {/* Header */}
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-text-muted">{project.description}</p>

        {/* Tech Stack */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>

        {/* Links */}
        {(project.githubLink || project.demoLink) && (
          <div className="mt-6 flex gap-4">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-text transition-colors hover:border-primary/50 hover:text-primary"
              >
                <GitHubIcon size={16} />
                Source Code
              </a>
            )}
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </div>
        )}

        {/* Content sections */}
        <div className="mt-12 space-y-10">
          {/* Overview */}
          <section>
            <h2 className="text-xl font-semibold text-text">Overview</h2>
            <p className="mt-3 leading-relaxed text-text-muted">
              {project.overview}
            </p>
          </section>

          {/* Problem */}
          <section>
            <h2 className="text-xl font-semibold text-text">The Problem</h2>
            <p className="mt-3 leading-relaxed text-text-muted">
              {project.problem}
            </p>
          </section>

          {/* Solution */}
          <section>
            <h2 className="text-xl font-semibold text-text">The Solution</h2>
            <p className="mt-3 leading-relaxed text-text-muted">
              {project.solution}
            </p>
          </section>

          {/* Architecture */}
          <section>
            <h2 className="text-xl font-semibold text-text">Architecture</h2>
            <p className="mt-3 leading-relaxed text-text-muted">
              {project.architecture}
            </p>
          </section>

          {/* Challenges */}
          <section>
            <h2 className="text-xl font-semibold text-text">Challenges</h2>
            <ul className="mt-3 space-y-2">
              {project.challenges.map((challenge, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-text-muted"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {challenge}
                </li>
              ))}
            </ul>
          </section>

          {/* Key Learnings */}
          <section>
            <h2 className="text-xl font-semibold text-text">Key Learnings</h2>
            <ul className="mt-3 space-y-2">
              {project.keyLearnings.map((learning, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-text-muted"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                  {learning}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </PageWrapper>
  );
}
