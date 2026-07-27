import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { OpenSourcePreview } from "@/components/sections/OpenSourcePreview";
import { ExperiencePreview } from "@/components/sections/ExperiencePreview";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { LatestArticles } from "@/components/sections/LatestArticles";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <FeaturedProjects />
      <OpenSourcePreview />
      <ExperiencePreview />
      <SkillsSection />
      <LatestArticles />
      <ContactCTA />
    </>
  );
}
