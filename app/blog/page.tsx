import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { BlogList } from "@/components/shared/BlogList";
import { getAllPosts, getAllTags } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on software engineering, architecture, and technology.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <PageWrapper className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="Blog"
          subtitle="Thoughts on software engineering, architecture, and technology"
        />
        <BlogList posts={posts} tags={tags} />
      </div>
    </PageWrapper>
  );
}
