import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function AboutPreview() {
  return (
    <AnimatedSection className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="About Me" />
        <div className="max-w-3xl">
          <p className="text-lg leading-relaxed text-text-muted">
            I&apos;m a Full Stack Software Engineer with 7+ years of experience
            building scalable web applications. I specialize in turning complex
            business requirements into elegant, maintainable software solutions.
            My approach combines clean architecture principles with pragmatic
            engineering to deliver systems that are both robust and adaptable.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-text-muted">
            Currently focused on AI integration, cloud-native architectures, and
            helping teams ship better software faster.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-accent"
          >
            Learn more about me
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
