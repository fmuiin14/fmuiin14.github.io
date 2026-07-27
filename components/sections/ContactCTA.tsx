import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function ContactCTA() {
  return (
    <AnimatedSection className="px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-text">
          Let&apos;s work together
        </h2>
        <p className="mt-4 text-lg text-text-muted">
          I&apos;m always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            Get in touch
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/resume"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-text transition-colors hover:border-text-muted hover:bg-surface"
          >
            View Resume
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
