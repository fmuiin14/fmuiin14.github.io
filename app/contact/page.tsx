import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactForm } from "@/components/shared/ContactForm";
import { CopyEmailButton } from "@/components/shared/CopyEmailButton";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/Icons";
import { siteConfig, socialLinks } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Fathul Muiin. Available for freelance work, consulting, and collaboration.",
};

export default function ContactPage() {
  return (
    <PageWrapper className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="Get in Touch"
          subtitle="I'm always open to discussing new projects, creative ideas, or opportunities"
        />

        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-text">
                Reach out directly
              </h3>
              <p className="mb-4 text-sm text-text-muted">
                Prefer email? Click to copy my address or send me a message
                directly.
              </p>
              <CopyEmailButton />
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-text">
                Connect with me
              </h3>
              <div className="space-y-3">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-text-muted transition-colors hover:text-text"
                >
                  <GitHubIcon size={18} />
                  GitHub
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-text-muted transition-colors hover:text-text"
                >
                  <LinkedInIcon size={18} />
                  LinkedIn
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-sm text-text-muted transition-colors hover:text-text"
                >
                  <Mail size={18} />
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-text">
                Response time
              </h3>
              <p className="text-sm text-text-muted">
                I typically respond within 24-48 hours. For urgent matters,
                please reach out via LinkedIn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
